import assert from 'node:assert/strict';
import fs from 'node:fs';

// Quantify the benefit ONLY IF FactoryPrice confirms multi-SKU consolidation.
// Scenario analysis is not an inventory/cart/checkout, price or launch decision.
const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const model = read('sourcing/capsule-order-economics.json');
const readiness = read('sourcing/first-drop-readiness.json');
const screen = read('sourcing/priority-mixed-cart-scenarios.json');
const approximate = (a, b) => Math.abs(a - b) < 0.005;

assert.equal(model.approvedForSale, false);
assert.equal(model.status, 'RESEARCH_ONLY');
assert.equal(readiness.status, 'NO_GO');
assert.equal(readiness.approvedForSale, false);
assert.equal(readiness.storefrontPublicationAuthorized, false);
assert.equal(screen.status, 'RESEARCH_ONLY_NO_GO');
assert.equal(screen.approvedForSale, false);
assert.equal(screen.publishedPricesChanged, false);
assert.equal(screen.allowFreeShippingClaim, false);
// The mixed-cart exercise can retain hypothetical label scenarios even after
// real carrier or integration quotes are received, but it must distinguish
// the model's actual quoted values from the hypothetical baseline.
const quotedLabel = model.realGermanCustomerCourierLabelNetEur;
assert.equal(quotedLabel, readiness.knownTerms.confirmedGermanyDropshipLabelNetEur,
  'Merchant label quote in economics and readiness records must match');
assert.equal(screen.courierLabelQuoted, quotedLabel !== null,
  'Mixed-cart quote flag must reflect documented actual label evidence');
assert.equal(screen.routeGates.actualMerchantGermanLabelPriceNetEur, quotedLabel,
  'Mixed-cart quote must match source model, not a hypothetical price');
if (quotedLabel === null) {
  assert.equal(readiness.globalGates.ownLabelGermanyCourierQuote.status, 'PENDING');
} else {
  assert.ok(Number.isFinite(quotedLabel) && quotedLabel > 0,
    'Merchant courier quote must be a positive net EUR amount');
  const gate = readiness.globalGates.ownLabelGermanyCourierQuote;
  assert.equal(gate.status, 'VERIFIED');
  assert.ok(gate.evidence?.reference?.length > 5 &&
    gate.evidence?.reviewedBy &&
    /^\d{4}-\d{2}-\d{2}$/.test(gate.evidence.verifiedAt),
    'Merchant courier quote must have dated and reviewed evidence');
}
const quotedIntegration = model.realShopifyIntegrationSubscriptionEur;
assert.equal(screen.shopifyIntegrationCostQuoted, quotedIntegration !== null,
  'Mixed-cart integration flag must reflect an authenticated cost or explicit zero quote');
if (quotedIntegration === null) {
  assert.equal(readiness.globalGates.shopifyIntegrationRecurringCost.status, 'PENDING');
} else {
  assert.ok(Number.isFinite(quotedIntegration) && quotedIntegration >= 0,
    'Explicit zero integration fee is allowed only when independently evidenced');
  const gate = readiness.globalGates.shopifyIntegrationRecurringCost;
  assert.equal(gate.status, 'VERIFIED');
  assert.ok(gate.evidence?.reference?.length > 5 &&
    gate.evidence?.reviewedBy &&
    /^\d{4}-\d{2}-\d{2}$/.test(gate.evidence.verifiedAt),
    'Integration subscription cost must have dated and reviewed evidence');
}
for (const [key, value] of Object.entries(screen.routeGates)) {
  if (key === 'actualMerchantGermanLabelPriceNetEur') continue;
  assert.ok(value === false || value === null,
    'Do not bypass unverified packing, returns or owner-approval gates: ' + key);
}
assert.deepEqual(screen.scenarios.parcelCounts, [1, 2]);
assert.deepEqual(screen.scenarios.labelNetEurEachParcel, [5, 7.5, 10]);
assert.deepEqual(screen.scenarios.fullOrderRefundRates, [0.1, 0.2, 0.3]);
assert.equal(screen.scenarios.baseline.returnRate, 0.2);
assert.equal(screen.scenarios.baseline.labelNetEurEachParcel, 7.5);
assert.equal(screen.scenarios.baseline.returnedGoodsRecoveryShare, 0);
assert.equal(screen.scenarios.contributionTargetPerItemBeforeAdvertisingAndOverheadEur, 10);
assert.equal(screen.pairs.length, 3);

const expectedPairs = [
  ['Essential Rib Top', 'Second Skin Body'],
  ['Essential Rib Top', 'Tailored Everyday Pant'],
  ['Second Skin Body', 'Tailored Everyday Pant'],
];
const priorities = new Set(readiness.items
  .filter((item) => item.reviewStage === 'SAMPLE_RESEARCH_PRIORITY')
  .map((item) => item.conceptName));
assert.equal(priorities.size, 3, 'Exactly three candidate research priorities expected');
const source = new Map(model.items.map((item) => [item.conceptName, item]));
const handling = model.supplierDropshipFeeNetPlnPerParcel / model.ecbPlnPerEurReference;
const refund = model.returnRateSensitivity;
const reverse = refund.reverseCourierNetEurPerReturnedOrderAssumption;
const inspect = refund.inspectionAndHandlingNetEurPerReturnedItemAssumption;

function componentContribution(names, parcels, label, rate, outcome) {
  const lines = names.map((name) => {
    const item = source.get(name);
    assert.ok(item, 'Missing source item: ' + name);
    return item;
  });
  const gross = lines.reduce((sum, item) => sum + item.retailGrossEur, 0);
  const goods = lines.reduce((sum, item) => sum + item.supplierPublicCostNetEur, 0);
  const fee = gross * model.paymentFeeGrossRateAssumption
    + model.paymentFeeFixedEurPerOrderAssumption;
  const outward = parcels * (label + handling + model.packagingBufferEurPerParcelExVatAssumption);
  const kept = gross / (1 + model.retailVatRateAssumption) - goods - fee - outward;
  if (outcome === 'FULL_RETURN_LOST') {
    // Complete-order refund; returned goods valued at zero. For two outbound
    // parcels we assume two reverse labels, and inspect both garments.
    const afterRefund = -goods - fee - outward - parcels * reverse - lines.length * inspect;
    return (1 - rate) * kept + rate * afterRefund;
  }
  if (outcome === 'ONE_ITEM_PARTIAL_RETURN_LOST') {
    // Alternative (not additive) stress case: refund ONLY the highest-priced
    // garment, with its recovered goods valued at zero. Assume one reverse label.
    const mostExpensiveGross = Math.max(...lines.map((item) => item.retailGrossEur));
    const afterPartialRefund = kept - mostExpensiveGross / (1 + model.retailVatRateAssumption)
      - reverse - inspect;
    return (1 - rate) * kept + rate * afterPartialRefund;
  }
  throw new Error('Unknown return scenario: ' + outcome);
}

const pairsSeen = new Set();
for (const pair of screen.pairs) {
  const names = pair.itemConceptNames;
  assert.equal(names.length, 2, 'Only two-item priority outfits are in this screen');
  assert.equal(new Set(names).size, 2, 'Do not count a concept twice in one cart');
  assert.ok(names.every((name) => priorities.has(name)), 'No held dress may be promoted to an outfit');
  const key = names.join('|');
  assert.ok(expectedPairs.some((namesExpected) => namesExpected.join('|') === key),
    'Unapproved priority pair: ' + key);
  assert.ok(!pairsSeen.has(key), 'Duplicate priority pair: ' + key);
  pairsSeen.add(key);
  const gross = names.reduce((sum, name) => sum + source.get(name).retailGrossEur, 0);
  assert.ok(Number.isInteger(gross) && gross > 0, 'Combined gross must use approved integer EUR price targets');
  assert.ok(names.every((name) => [4, 9].includes(source.get(name).retailGrossEur % 10)),
    'Individual prices must remain whole EUR ending in 4 or 9');
  const pairResults = {};
  for (const parcels of [1, 2]) {
    for (const outcome of ['FULL_RETURN_LOST', 'ONE_ITEM_PARTIAL_RETURN_LOST']) {
      const baseline = componentContribution(names, parcels, 7.5, 0.2, outcome);
      const expected = outcome === 'FULL_RETURN_LOST'
        ? pair.baseline20PercentFullLoss
        : pair.baseline20PercentPartialOneItem;
      assert.ok(approximate(baseline, parcels === 1
        ? expected.oneParcelContributionEur : expected.twoParcelsContributionEur),
        'Snapshot mismatch for ' + pair.id + ' / ' + parcels + ' / ' + outcome);
      pairResults[parcels + '/' + outcome] = baseline;
      for (const rate of [0.1, 0.2, 0.3]) {
        let last = Infinity;
        for (const label of [5, 7.5, 10]) {
          const value = componentContribution(names, parcels, label, rate, outcome);
          assert.ok(Number.isFinite(value) && value < last,
            'Increasing courier costs must lower contribution: ' + pair.id);
          last = value;
        }
      }
    }
  }
  const savedByConsolidation = pairResults['1/FULL_RETURN_LOST']
    - pairResults['2/FULL_RETURN_LOST'];
  const expectedSaved = 7.5 + handling + model.packagingBufferEurPerParcelExVatAssumption + 0.2 * reverse;
  assert.ok(approximate(savedByConsolidation, expectedSaved),
    'One-parcel saving must equal one label/handling/packaging and expected reverse cost');

  const individualOrders = names.reduce((sum, name) =>
    sum + componentContribution([name], 1, 7.5, 0.2, 'FULL_RETURN_LOST'), 0);
  assert.ok(approximate(individualOrders, pair.separateSingleItemOrdersFullLossContributionEur),
    'Separate single-order baseline mismatch: ' + pair.id);
  assert.ok(approximate(pairResults['2/FULL_RETURN_LOST'] - individualOrders,
    model.paymentFeeFixedEurPerOrderAssumption),
    'One combined payment saves fixed payment fee even if garments ship separately');

  // An illustrative EUR 10 buffer PER ARTICLE means EUR 20 across two pieces.
  const target = screen.scenarios.contributionTargetPerItemBeforeAdvertisingAndOverheadEur * 2;
  assert.ok(pairResults['1/FULL_RETURN_LOST'] >= target,
    'Consolidated priority pair falls below hypothetical EUR 20 buffer: ' + pair.id);
  assert.ok(pairResults['2/FULL_RETURN_LOST'] < target,
    'Split priority pair unexpectedly clears hypothetical EUR 20 buffer: ' + pair.id);
  console.log('  ' + pair.id + ' @ hypothetical EUR 7.50 net label and 20% full loss: '
    + 'one parcel EUR ' + pairResults['1/FULL_RETURN_LOST'].toFixed(2)
    + ', two parcels EUR ' + pairResults['2/FULL_RETURN_LOST'].toFixed(2)
    + ', consolidation effect EUR ' + savedByConsolidation.toFixed(2)
    + ', separate orders EUR ' + individualOrders.toFixed(2));
}
assert.equal(pairsSeen.size, expectedPairs.length);
const report = fs.readFileSync('sourcing/PRIORITY-MIXED-CART-ECONOMICS.md', 'utf8');
for (const pair of screen.pairs) {
  assert.ok(report.includes(pair.id), 'Mixed-cart report missing pair ' + pair.id);
  assert.ok(report.includes('€' + pair.baseline20PercentFullLoss.oneParcelContributionEur.toFixed(2)));
  assert.ok(report.includes('€' + pair.baseline20PercentFullLoss.twoParcelsContributionEur.toFixed(2)));
}
assert.ok(report.includes('NO-GO') && report.includes('NOT supplier quotes'),
  'Mixed-cart report must plainly retain the non-commerce and hypothetical status');
console.log('EVERNE mixed-cart sensitivity passed: three priority pairs, one/two parcels, independent versus combined payments, full and partial returns, no checkout.');
