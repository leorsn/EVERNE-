import assert from 'node:assert/strict';
import fs from 'node:fs';

// Explicit evidence requirements, not an automated authorisation to sell.
// The existing model remains the source for product identity and EUR 4/9 prices.
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const readiness = read('sourcing/first-drop-readiness.json');
const model = read('sourcing/capsule-order-economics.json');
const review = read('sourcing/merchandising-cohesion-review.json');
const logistics = read('sourcing/fulfillment-gates.json');

assert.equal(readiness.status, 'NO_GO', 'The first drop cannot auto-approve sales');
assert.equal(readiness.approvedForSale, false);
assert.equal(readiness.storefrontPublicationAuthorized, false);
assert.equal(readiness.supplier, 'FactoryPrice');
assert.equal(readiness.recordedExternalActions.supplierOutreachSent, false);
assert.equal(readiness.recordedExternalActions.samplesPurchased, false);
assert.equal(readiness.recordedExternalActions.shopifyProductsImported, false);
assert.equal(readiness.recordedExternalActions.paymentsAuthorized, false);
assert.equal(readiness.knownTerms.confirmedGermanyDropshipLabelNetEur, null,
  'An unquoted carrier label must not become an invented amount');
assert.equal(readiness.knownTerms.publishedDropshipHandlingPlnPerParcel,
  logistics.supplierPublishedDropship.feeNetPlnPerParcel, 'Dropship handling tariff mismatch');
assert.equal(readiness.knownTerms.publishedB2BReturnsCalendarDays,
  logistics.returns.generalWholesalePolicyDays, 'Wholesale returns period mismatch');
assert.equal(readiness.knownTerms.typicalOnlineConsumerWithdrawalDays, 14,
  'Consumer withdrawal cannot be equated with the supplier B2B policy');
assert.ok(readiness.knownTerms.publishedB2BReturnsCalendarDays <
  readiness.knownTerms.typicalOnlineConsumerWithdrawalDays,
  'The supplier-versus-consumer return-period gap must remain visible');
assert.equal(readiness.knownTerms.dropShipReturnConditionsSigned, false,
  'Unpublished or unsigned dropship return terms cannot be treated as verified');
assert.ok(readiness.sourceUrls.supplierB2BReturns.startsWith('https://factoryprice.eu/'));
assert.ok(readiness.sourceUrls.euConsumerWithdrawal.startsWith('https://europa.eu/'));

const requiredGlobalGates = [
  'authenticatedWholesalePrices',
  'ownLabelGermanyCourierQuote',
  'dropshipMultiSkuPackaging',
  'shopifyIntegrationRecurringCost',
  'dropshipMerchantReturnContract',
  'consumerWithdrawalWorkflow',
  'germanyReturnAddressAndCosts',
  'commercialImageAndCopyRights',
  'textileAndProductSafetyLabels',
  'finalLandingCostAndReturnEconomics',
  'shopifyTestOrderAndPrivacy',
  'founderWrittenRelease',
];
assert.deepEqual(Object.keys(readiness.globalGates).sort(), [...requiredGlobalGates].sort(),
  'Every operational, return, financial, legal and owner gate must be represented');

function validateGate(gate, label) {
  assert.ok(gate && ['PENDING', 'VERIFIED'].includes(gate.status), 'Invalid evidence state: ' + label);
  if (gate.status === 'VERIFIED') {
    assert.ok(gate.evidence && typeof gate.evidence.reference === 'string' &&
      gate.evidence.reference.length > 5 &&
      /^\d{4}-\d{2}-\d{2}$/.test(gate.evidence.verifiedAt) &&
      gate.evidence.reviewedBy,
      'Verified gates must contain a dated traceable source and reviewer: ' + label);
  } else {
    assert.equal(gate.evidence, null, 'Pending evidence must not appear approved: ' + label);
  }
}
let openGlobal = 0;
for (const [id, gate] of Object.entries(readiness.globalGates)) {
  validateGate(gate, id);
  assert.ok(gate.reason.length >= 20, 'Gate must include a useful acceptance question: ' + id);
  if (gate.status === 'PENDING') openGlobal++;
}
assert.ok(openGlobal > 0, 'A status change needs a separately authorised launch procedure');

assert.equal(readiness.items.length, 5, 'The first-drop register must cover exactly five concepts');
assert.equal(model.items.length, readiness.items.length, 'Economics model and launch gate must cover the same concepts');
assert.equal(review.items.length, readiness.items.length, 'Merchandising review must cover the same concepts');
const requiredItemGates = [
  'supplierQuote',
  'fitAndFabricSample',
  'verifiedVariantStock',
  'licensedProductPhotography',
  'labelAndSafetyEvidence',
  'founderMerchandisingApproval',
];
const seen = new Set();
let openItem = 0;
let held = 0;
for (const item of readiness.items) {
  assert.ok(!seen.has(item.conceptName), 'Duplicate concept in readiness register: ' + item.conceptName);
  seen.add(item.conceptName);
  const costing = model.items.find((row) => row.conceptName === item.conceptName);
  const m = review.items.find((row) => row.conceptName === item.conceptName);
  assert.ok(costing && m, 'Unrecognized capsule concept: ' + item.conceptName);
  assert.equal(item.supplierProductCode, costing.supplierProductCode);
  assert.equal(item.supplierProductCode, m.supplierProductCode);
  assert.equal(item.plannedGrossEur, costing.retailGrossEur);
  assert.equal(item.publicSupplierNetEur, costing.supplierPublicCostNetEur);
  assert.ok(Number.isInteger(item.plannedGrossEur) && [4, 9].includes(item.plannedGrossEur % 10),
    'The existing 4/9 whole-euro price rule must be preserved: ' + item.conceptName);
  assert.equal(item.approvedForSale, false, 'Research cannot approve retail products');
  const expectedStage = m.researchPriority.startsWith('HOLD_') ? 'HOLD' : 'SAMPLE_RESEARCH_PRIORITY';
  assert.equal(item.reviewStage, expectedStage, 'Merchandising HOLD must be respected: ' + item.conceptName);
  if (item.reviewStage === 'HOLD') held++;
  assert.ok(item.blockingReason.length > 20);
  for (const id of requiredItemGates) {
    assert.ok(Object.hasOwn(item, id), 'Missing item evidence: ' + item.conceptName + ' / ' + id);
    validateGate(item[id], item.conceptName + ' / ' + id);
    if (item[id].status === 'PENDING') openItem++;
  }
}
assert.equal(held, 2, 'The two dresses remain on hold, not launch-ready');
assert.ok(readiness.releaseRule.includes('founder written release'), 'Never auto-publish after evidence collection');

console.log(`EVERNE first-drop gate: NO-GO; ${openGlobal} unresolved global checks, ${openItem} pending item checks; ${seen.size} candidates, ${held} on HOLD. No merchant order or Shopify publication allowed.`);
