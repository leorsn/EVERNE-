import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const evidenceKeys = [
  'supplierIdentity', 'actualProductSpecsAndSafety', 'commercialImageRights',
  'realGermanyShippingQuote', 'returnsAndDefectsProcess',
  'automaticOrderForwarding', 'automaticSupplierPayment',
  'zeroExtraRecurringCost', 'costsAndTaxTreatment',
  'channelRequirementsAndTestOrder',
];

function nonempty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function nonnegativeMoney(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 &&
    Math.abs(Math.round(value * 100) - value * 100) < 1e-6;
}

/** A review aid only. This does not transfer money, import products or publish listings. */
export function validateTrendFirstDrop(data, { photoExists = (publicPath) =>
  fs.existsSync(path.join('public', publicPath.slice(1))) } = {}) {
  assert.equal(data?.schemaVersion, 1, 'Unexpected cross-category product intake schema');
  assert.equal(data?.candidateSlug, 'jewellery-bag', 'Intake must refer to the owner-selected working candidate');
  assert.equal(data?.stage, 'RESEARCH_ONLY', 'Do not promote research status from the intake file');
  assert.equal(data?.economics?.currency, 'EUR');
  assert.deepEqual(Object.keys(data?.evidence ?? {}).sort(), [...evidenceKeys].sort(), 'All independent evidence gates are required');

  const missing = [];
  const requireField = (value, label) => { if (!nonempty(value)) missing.push(label); };
  requireField(data.supplier?.name, 'supplier.name');
  requireField(data.supplier?.sku, 'supplier.sku');
  if (!nonempty(data.supplier?.productUrl) || !/^https:\/\//.test(data.supplier.productUrl)) {
    missing.push('supplier.productUrl (HTTPS)');
  }
  requireField(data.product?.materialsAndDimensions, 'product.materialsAndDimensions');
  if (!Array.isArray(data.product?.variants) || data.product.variants.length === 0 ||
      !data.product.variants.every(nonempty)) missing.push('product.variants');
  if (!Array.isArray(data.product?.approvedProductPhotoPaths) || data.product.approvedProductPhotoPaths.length === 0 ||
      !data.product.approvedProductPhotoPaths.every((picture) => typeof picture === 'string' && /^\/products\/[a-z0-9/_-]+\.(?:avif|jpe?g|png|webp)$/.test(picture))) {
    missing.push('product.approvedProductPhotoPaths');
  } else if (!data.product.approvedProductPhotoPaths.every(photoExists)) {
    missing.push('product.approvedProductPhotoFiles');
  }

  for (const key of evidenceKeys) {
    const item = data.evidence[key];
    if (item?.verified !== true || !nonempty(item.reference) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt ?? '')) {
      missing.push(`evidence.${key}`);
    }
  }

  const moneyKeys = ['salePriceEur', 'landedUnitCostEur', 'paymentAndPlatformFeesEur',
    'returnsReserveEur', 'additionalRecurringAutomationCostEur'];
  for (const key of moneyKeys) {
    if (!nonnegativeMoney(data.economics?.[key])) missing.push(`economics.${key}`);
  }
  const salePrice = data.economics?.salePriceEur;
  if (nonnegativeMoney(salePrice) && (!Number.isInteger(salePrice) || ![4, 9].includes(salePrice % 10))) {
    missing.push('economics.salePriceEur (whole EUR ending in 4 or 9)');
  }
  if (nonnegativeMoney(data.economics?.additionalRecurringAutomationCostEur) &&
      data.economics.additionalRecurringAutomationCostEur !== 0) {
    missing.push('economics.additionalRecurringAutomationCostEur (additional budget is EUR 0)');
  }
  if (!['website', 'tiktok_shop'].includes(data.targetChannel)) missing.push('targetChannel');

  let projectedMargin = null;
  if (moneyKeys.every((key) => nonnegativeMoney(data.economics?.[key])) && salePrice > 0) {
    const totalVariableCosts = data.economics.landedUnitCostEur +
      data.economics.paymentAndPlatformFeesEur + data.economics.returnsReserveEur;
    projectedMargin = (salePrice - totalVariableCosts) / salePrice;
    if (projectedMargin < 0.3) missing.push('economics.minimum30PercentContributionBeforeFixedOverhead');
  }

  if (missing.length > 0) return { status: 'NO_GO', missing, projectedMargin };
  if (data.founderRelease?.approved !== true || !nonempty(data.founderRelease.reference) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.founderRelease.reviewedAt ?? '')) {
    return { status: 'FOUNDER_RELEASE_REQUIRED', missing: ['founderRelease'], projectedMargin };
  }
  return { status: 'READY_FOR_MANUAL_HANDOFF', missing: [], projectedMargin };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const data = JSON.parse(fs.readFileSync('sourcing/trend-first-drop.json', 'utf8'));
  const result = validateTrendFirstDrop(data);
  console.log(`EVERNE trend candidate: ${result.status}; ${result.missing.length} outstanding gates; channel ${data.targetChannel ?? 'not chosen'}; no supplier charges or commerce actions.`);
  if (result.missing.length > 0) console.log(`Next missing evidence: ${result.missing.slice(0, 6).join(', ')}${result.missing.length > 6 ? ', …' : ''}`);
}
