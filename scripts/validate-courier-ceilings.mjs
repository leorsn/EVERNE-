import assert from 'node:assert/strict';
import fs from 'node:fs';

// Illustrative price screen only. Never use modelled shipping to authorize orders.
const read = (name) => JSON.parse(fs.readFileSync(name, 'utf8'));
const m = read('sourcing/capsule-order-economics.json');
const release = read('sourcing/first-drop-readiness.json');
const threshold = m.illustrativeMinimumContributionBeforeAdsAndFixedOverheadEur;
const risk = m.returnRateSensitivity;
const handling = m.supplierDropshipFeeNetPlnPerParcel / m.ecbPlnPerEurReference;

assert.equal(m.status, 'RESEARCH_ONLY');
assert.equal(m.approvedForSale, false);
assert.equal(release.status, 'NO_GO');
assert.equal(release.approvedForSale, false);
assert.equal(release.storefrontPublicationAuthorized, false);
// A future authenticated merchant quote may enter the research model only
// when the independent readiness register contains the same amount and a
// dated, reviewed source. Scenario snapshots remain hypothetical regardless.
const actualLabel = m.realGermanCustomerCourierLabelNetEur;
assert.equal(actualLabel, release.knownTerms.confirmedGermanyDropshipLabelNetEur,
  'The source model and readiness register disagree on a real courier quote');
const labelGate = release.globalGates.ownLabelGermanyCourierQuote;
if (actualLabel === null) {
  assert.equal(labelGate.status, 'PENDING', 'An unquoted label cannot be verified');
} else {
  assert.ok(Number.isFinite(actualLabel) && actualLabel > 0,
    'Real German courier label price must be a positive net EUR amount');
  assert.equal(labelGate.status, 'VERIFIED', 'Quoted labels need verified supplier evidence');
  assert.ok(labelGate.evidence?.reference?.length > 5 &&
    labelGate.evidence?.reviewedBy &&
    /^\d{4}-\d{2}-\d{2}$/.test(labelGate.evidence.verifiedAt),
    'Quote evidence must be dated, attributable and source-linked');
}
const integration = m.realShopifyIntegrationSubscriptionEur;
const integrationGate = release.globalGates.shopifyIntegrationRecurringCost;
if (integration === null) {
  assert.equal(integrationGate.status, 'PENDING',
    'Do not claim that Shopify automation is free before receiving a quote');
} else {
  assert.ok(Number.isFinite(integration) && integration >= 0,
    'An authenticated Shopify integration cost must be non-negative');
  assert.equal(integrationGate.status, 'VERIFIED',
    'Known subscription costs, including EUR 0, need documented evidence');
  assert.ok(integrationGate.evidence?.reference?.length > 5 &&
    integrationGate.evidence?.reviewedBy &&
    /^\d{4}-\d{2}-\d{2}$/.test(integrationGate.evidence.verifiedAt),
    'Integration quote evidence must be dated and attributable');
}
assert.deepEqual(m.courierWhatIfNetEur, [5, 7.5, 10]);
assert.deepEqual(risk.illustrativeRates, [0.1, 0.2, 0.3]);
assert.equal(threshold, 10);
assert.equal(risk.outboundCourierNetEurPerOrderAssumption, 7.5);
assert.equal(risk.customerRefundsFullGrossRetailAssumption, true);
assert.equal(risk.paymentFeeNotRefundedAssumption, true);
assert.equal(risk.reverseCourierNetEurPerReturnedOrderAssumption, 5);
assert.equal(risk.inspectionAndHandlingNetEurPerReturnedItemAssumption, 3);
assert.equal(m.items.length, 5);
assert.equal(release.items.length, m.items.length);

function contribution(item, returnRate, outboundLabelNetEur, recoverableGoodsCostShare) {
  const netSale = item.retailGrossEur / (1 + m.retailVatRateAssumption);
  const fee = item.retailGrossEur * m.paymentFeeGrossRateAssumption
    + m.paymentFeeFixedEurPerOrderAssumption;
  const delivery = outboundLabelNetEur + handling + m.packagingBufferEurPerParcelExVatAssumption;
  const returnedCosts = risk.reverseCourierNetEurPerReturnedOrderAssumption
    + risk.inspectionAndHandlingNetEurPerReturnedItemAssumption;
  const kept = netSale - item.supplierPublicCostNetEur - fee - delivery;
  const refunded = -(1 - recoverableGoodsCostShare) * item.supplierPublicCostNetEur
    - fee - delivery - returnedCosts;
  return (1 - returnRate) * kept + returnRate * refunded;
}

function maxAffordableLabel(item, rate, recoverableGoodsCostShare) {
  // Outgoing label is paid on both kept and fully refunded orders: its slope
  // is -1 EUR per 1 EUR quoted, so remove it algebraically from the buffer.
  return contribution(item, rate, 0, recoverableGoodsCostShare) - threshold;
}
const euro = (amount) => amount.toFixed(2);
const baselineExpected = new Map([
  ['Essential Rib Top', [5.38, 2.88]],
  ['Second Skin Body', [7.31, 4.81]],
  ['Tailored Everyday Pant', [11.35, 8.85]],
  ['Easy Slip Dress', [3.25, 0.75]],
  ['Soft Midi Dress', [11.35, 8.85]],
]);
for (const item of m.items) {
  const gate = release.items.find((candidate) => candidate.conceptName === item.conceptName);
  assert.ok(gate, 'Missing supplier readiness record for ' + item.conceptName);
  assert.equal(gate.supplierProductCode, item.supplierProductCode);
  assert.equal(gate.plannedGrossEur, item.retailGrossEur);
  assert.equal(gate.publicSupplierNetEur, item.supplierPublicCostNetEur);
  assert.equal(gate.approvedForSale, false);
  assert.ok([4, 9].includes(item.retailGrossEur % 10));
  assert.ok(Number.isInteger(item.retailGrossEur));
  const baseline = contribution(item, 0.2, 7.5, 0);
  const maxLabel = maxAffordableLabel(item, 0.2, 0);
  const locked = baselineExpected.get(item.conceptName);
  assert.ok(locked && Math.abs(baseline - locked[0]) < 0.005,
    'The 20% goods-loss result differs from the reviewed baseline: ' + item.conceptName);
  assert.ok(Math.abs(maxLabel - locked[1]) < 0.005,
    'The courier ceiling differs from the reviewed baseline: ' + item.conceptName);
  assert.ok(Math.abs(contribution(item, 0.2, maxLabel, 0) - threshold) < 0.000001,
    'Courier price ceiling must algebraically meet the illustrative buffer');
  for (const rate of risk.illustrativeRates) {
    let last = Number.POSITIVE_INFINITY;
    for (const label of m.courierWhatIfNetEur) {
      const loss = contribution(item, rate, label, 0);
      const saved = contribution(item, rate, label, 1);
      assert.ok(Number.isFinite(loss) && Number.isFinite(saved));
      assert.ok(loss <= saved, 'Unsellable returned goods cannot look cheaper than recovered inventory');
      assert.ok(loss < last, 'Higher courier price must lower expected contribution');
      last = loss;
    }
  }
  const held = gate.reviewStage === 'HOLD' ? ' (HOLD)' : ' (research only)';
  console.log('  ' + item.conceptName + held + ': hypothetical full-loss 20% return contribution @ EUR 7.50 label EUR '
    + euro(baseline) + '; maximum net outbound label for EUR 10 buffer EUR ' + euro(maxLabel));
}
assert.equal(baselineExpected.size, m.items.length);
const report = fs.readFileSync('sourcing/COURIER-LABEL-CEILINGS.md', 'utf8');
for (const [name, [baseline, max]] of baselineExpected) {
  assert.ok(report.includes(name) && report.includes('€' + euro(baseline))
    && report.includes('€' + euro(max)), 'The written risk report must cover the calculated result: ' + name);
}
assert.ok(report.includes('NOT supplier quotes') && report.includes('NO-GO'),
  'The report must clearly disclaim unverified rates and absence of sale approval');
console.log('EVERNE courier ceiling checks passed: five model scenarios, 4/9 retail, returns stress, verified report figures, no-go unchanged.');
