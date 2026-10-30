import assert from 'node:assert/strict';
import fs from 'node:fs';
import { reviewSyntheticOrder } from '../ops/manual-handoff.mjs';

// Zero-network/zero-PII prelaunch simulations, never Shopify order fixtures.
const readiness = JSON.parse(fs.readFileSync('sourcing/first-drop-readiness.json', 'utf8'));
const economics = JSON.parse(fs.readFileSync('sourcing/capsule-order-economics.json', 'utf8'));
const essential = JSON.parse(fs.readFileSync('sourcing/essential-basics-alternatives.json', 'utf8'));
const capsule = JSON.parse(fs.readFileSync('sourcing/capsule-hero-alternatives.json', 'utf8'));
const sourcing = { essentialCandidates: essential.candidates, capsuleCandidates: capsule.candidates };
const context = { readiness, economics, sourcing };

assert.equal(readiness.status, 'NO_GO');
assert.equal(readiness.approvedForSale, false);
assert.equal(readiness.storefrontPublicationAuthorized, false);
assert.equal(economics.approvedForSale, false);
const serviceConflict = readiness.knownTerms.supplierServiceContradiction;
assert.ok(serviceConflict && serviceConflict.newerMainSiteUrl.startsWith('https://factoryprice.eu/'));
assert.ok(serviceConflict.conflictingFaqUrl.startsWith('https://hurtownia.factoryprice.eu/'));
assert.ok(['OPEN_REQUIRES_WRITTEN_VERIFICATION', 'VERIFIED_BY_AUTHENTICATED_MERCHANT']
  .includes(serviceConflict.status), 'Unreviewed supplier claims must be documented');

function line(conceptName, size) {
  const entry = economics.items.find((item) => item.conceptName === conceptName);
  assert.ok(entry, 'Research SKU missing: ' + conceptName);
  const supplier = [...essential.candidates, ...capsule.candidates]
    .find((item) => item.supplierProductCode === entry.supplierProductCode);
  assert.ok(supplier, 'Variant source missing for: ' + conceptName);
  const ean = supplier.variantIdentifiersBySize[size];
  assert.ok(ean, 'Research size missing for: ' + conceptName + ' / ' + size);
  return { supplierProductCode: entry.supplierProductCode,
    variantEan: ean, quantity: 1, unitPriceGrossEur: entry.retailGrossEur };
}

function scenario(lines, changes = {}) {
  return {
    scenarioId: 'MOCK-NEVER-LIVE-001',
    currency: 'EUR',
    paymentStatus: 'PAID',
    fulfillmentStatus: 'UNFULFILLED',
    lines,
    ...changes,
  };
}

const top = line('Essential Rib Top', 'S/M');
const body = line('Second Skin Body', 'L/XL');
const pant = line('Tailored Everyday Pant', 'M');
const dress = line('Easy Slip Dress', 'S/M');

// Exercise every publicly observed size EAN for the THREE preferred research
// styles. A valid EAN checksum is not proof of actual retail inventory.
const preferredCodes = new Set(readiness.items
  .filter((item) => item.reviewStage === 'SAMPLE_RESEARCH_PRIORITY')
  .map((item) => item.supplierProductCode));
const verifiedResearchEans = new Set();
let sizeCases = 0;
for (const candidate of [...essential.candidates, ...capsule.candidates]) {
  if (!preferredCodes.has(candidate.supplierProductCode)) continue;
  for (const size of candidate.visibleSizesForSampleColor) {
    const ean = candidate.variantIdentifiersBySize[size];
    assert.ok(!verifiedResearchEans.has(ean), 'An EAN must not identify multiple mock research variants');
    verifiedResearchEans.add(ean);
    const plan = economics.items.find((item) =>
      item.supplierProductCode === candidate.supplierProductCode);
    const result = reviewSyntheticOrder(scenario([{
      supplierProductCode: plan.supplierProductCode,
      variantEan: ean,
      quantity: 1,
      unitPriceGrossEur: plan.retailGrossEur,
    }]), context);
    assert.equal(result.lines[0].mapping, 'RESEARCH_REFERENCE_ONLY');
    assert.equal(result.status, 'HOLD_NO_GO');
    sizeCases++;
  }
}
assert.equal(sizeCases, 8, 'Two rib, two body, four trouser supplier size variants expected');


const single = reviewSyntheticOrder(scenario([top]), context);
assert.equal(single.status, 'HOLD_NO_GO');
assert.equal(single.workflowMode, 'OFFLINE_MOCK_ONLY');
assert.deepEqual(single.parcelCountsForResearchOnly, [1]);
assert.equal(single.lines[0].conceptName, 'Essential Rib Top');
assert.equal(single.lines[0].mapping, 'RESEARCH_REFERENCE_ONLY');
assert.ok(single.blockers.includes('PRODUCTS_NOT_APPROVED_FOR_SALE'));
assert.ok(single.blockers.includes('GERMANY_CARRIER_LABEL_UNQUOTED'));
if (!serviceConflict.ownerSpecificServiceConfirmed) {
  assert.ok(single.blockers.includes('FACTORYPRICE_DROPSHIP_SERVICE_CONTRADICTION'));
}

const two = reviewSyntheticOrder(scenario([top, pant]), context);
assert.deepEqual(two.parcelCountsForResearchOnly, [1, 2]);
assert.ok(two.blockers.includes('MULTI_SKU_PACKING_UNCONFIRMED'));
assert.equal(two.lines[1].variantEan, pant.variantEan);
assert.equal(two.lines[1].grossUnitTargetEur, 59);
const alternate = reviewSyntheticOrder(scenario([body, pant]), context);
assert.equal(alternate.lines.length, 2);
assert.ok(alternate.blockers.includes('MULTI_SKU_PACKING_UNCONFIRMED'));
for (const result of [single, two, alternate]) {
  assert.equal(result.supplierOrderCreated, false);
  assert.equal(result.labelPurchasedOrCreated, false);
  assert.equal(result.shopifyMutationPerformed, false);
  assert.equal(result.customerMessageSent, false);
  assert.equal(result.noCustomerPersonalDataAccepted, true);
  assert.equal(result.status, 'HOLD_NO_GO');
}

const unrecognizedVariant = reviewSyntheticOrder(
  scenario([{ ...top, variantEan: '9999999999994' }]), context);
assert.ok(unrecognizedVariant.blockers.includes('VARIANT_EAN_NOT_VERIFIED_FROM_RESEARCH'));
assert.equal(unrecognizedVariant.lines[0].mapping, 'UNVERIFIED_VARIANT');
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, variantEan: '5906694124755' }]), context), /Invalid synthetic/,
  'Correct supplier EAN with altered check digit must be rejected');
const unknownProduct = reviewSyntheticOrder(
  scenario([{ ...top, supplierProductCode: 'UNKNOWN-SKU-000' }]), context);
assert.ok(unknownProduct.blockers.includes('UNKNOWN_SUPPLIER_PRODUCT'));
const wrongPrice = reviewSyntheticOrder(scenario([{ ...top, unitPriceGrossEur: 49 }]), context);
assert.ok(wrongPrice.blockers.includes('RETAIL_PRICE_NOT_MATCHED'));
assert.equal(wrongPrice.lines[0].mapping, 'PRICE_MISMATCH');
const bothInvalid = reviewSyntheticOrder(
  scenario([{ ...top, variantEan: '9999999999994', unitPriceGrossEur: 49 }]), context);
assert.equal(bothInvalid.lines[0].mapping, 'PRICE_AND_VARIANT_UNVERIFIED');
assert.ok(!bothInvalid.blockers.includes('UNKNOWN_SUPPLIER_PRODUCT'));

assert.ok(bothInvalid.blockers.includes('RETAIL_PRICE_NOT_MATCHED'));
assert.ok(bothInvalid.blockers.includes('VARIANT_EAN_NOT_VERIFIED_FROM_RESEARCH'));
const heldDress = reviewSyntheticOrder(scenario([dress]), context);
assert.ok(heldDress.blockers.includes('CONCEPT_ON_HOLD'));
assert.ok(heldDress.blockers.includes('NOT_A_PRIORITY_SAMPLE_CANDIDATE'));
const duplicates = reviewSyntheticOrder(scenario([top, { ...top }]), context);
assert.ok(duplicates.blockers.includes('DUPLICATE_VARIANT_LINE'));
const unpaid = reviewSyntheticOrder(scenario([top], { paymentStatus: 'PENDING' }), context);
assert.ok(unpaid.blockers.includes('PAYMENT_NOT_PAID'));
const alreadySent = reviewSyntheticOrder(
  scenario([top], { fulfillmentStatus: 'FULFILLED' }), context);
assert.ok(alreadySent.blockers.includes('ALREADY_OR_PARTIALLY_FULFILLED'));

// Personal data and real Shopify IDs are never accepted as mock input.
assert.throws(() => reviewSyntheticOrder(
  { ...scenario([top]), customer: { email: 'DO-NOT-ACCEPT' } }, context), /forbidden/);
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, shippingAddress: 'DO-NOT-ACCEPT' }]), context), /forbidden/);
assert.throws(() => reviewSyntheticOrder(
  scenario([top], { scenarioId: 'gid://shopify/Order/123456' }), context), /MOCK-/);
assert.throws(() => reviewSyntheticOrder(scenario([top, body, pant]), context),
  /One or two synthetic/);
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, quantity: 0 }]), context), /Invalid synthetic/);
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, quantity: 2 }]), context), /Invalid synthetic/);
// A single line with two garments previously created an unjustified
// one-parcel assumption, although the reviewed economics model one unit/line.
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, quantity: 500 }]), context), /Invalid synthetic/);
assert.throws(() => reviewSyntheticOrder(
  scenario([{ ...top, supplierProductCode: '<script>' }]), context), /Invalid synthetic/);
assert.throws(() => reviewSyntheticOrder(scenario([top]),
  { ...context, readiness: { ...readiness, approvedForSale: true } }), /may not run/);

const moduleSource = fs.readFileSync('ops/manual-handoff.mjs', 'utf8');
assert.doesNotMatch(moduleSource,
  /\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon|https?\.request)\s*\(/,
  'Offline reviewer cannot issue network requests');
assert.doesNotMatch(moduleSource, /process\.env|SHOPIFY_ACCESS_TOKEN|CUSTOMER_EMAIL/,
  'Offline reviewer cannot read live Shopify environment or customer secrets');
console.log('EVERNE manual fulfillment MOCK checks passed: approved references, variant/price mapping, one-unit limit, no-go, PII refusal, no external actions.');
