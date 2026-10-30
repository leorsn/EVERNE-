import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces } from '../src/womenswearCatalog.ts';

const plan = JSON.parse(fs.readFileSync('sourcing/first-drop-candidates.json', 'utf8'));
const { modelAssumptions: assumption, candidates } = plan;
const conceptByName = new Map(conceptPieces.map((piece) => [piece.name, piece]));

assert.equal(plan.status, 'RESEARCH_ONLY', 'Supplier pilot must remain research-only');
assert.equal(plan.approvedForSale, false, 'Sourcing plan must never grant sale approval');
assert.equal(candidates.length, 5, 'Test sourcing round must have exactly five candidates');
assert.ok(assumption.testBatchUnits >= candidates.length, 'Batch cannot have fewer units than candidates');
assert.ok(assumption.germanGrossVatRate > 0, 'Gross-to-net rate must be stated');
assert.ok(assumption.returnCostReservePerSaleExVatEur > 0, 'A return cost reserve is required');

const seenNames = new Set();
const seenUrls = new Set();
const costs = [];

for (const item of candidates) {
  const concept = conceptByName.get(item.conceptName);
  assert.ok(concept, `Supplier candidate references missing concept: ${item.conceptName}`);
  assert.ok(!seenNames.has(item.conceptName), `Duplicate candidate concept: ${item.conceptName}`);
  assert.ok(!seenUrls.has(item.supplierUrl), `Duplicate supplier listing: ${item.supplierUrl}`);
  assert.equal(item.approvedForSale, false, `Approval must be false: ${item.conceptName}`);
  assert.equal(item.targetRetailGrossEur, concept.targetPrice, `Price must match concept: ${item.conceptName}`);
  assert.ok(Number.isInteger(item.targetRetailGrossEur), `Whole-euro price required: ${item.conceptName}`);
  assert.ok([4, 9].includes(item.targetRetailGrossEur % 10), `Price must end in 4 or 9: ${item.conceptName}`);
  assert.ok(Number.isFinite(item.listedCostExVatEur) && item.listedCostExVatEur > 0, `Valid indicative cost required: ${item.conceptName}`);
  assert.ok(item.supplierUrl.startsWith('https://leivip.com/'), `Unexpected supplier URL: ${item.conceptName}`);
  assert.ok(item.listedSizes.length > 0 && item.majorRisks.length > 0, `Size and risk notes required: ${item.conceptName}`);
  if (item.conceptMatch === 'MISMATCH_RENAME_REQUIRED') {
    assert.ok(item.majorRisks.some((risk) => risk.toLowerCase().includes('rename')), 'Concept mismatch must be documented');
  }
  seenNames.add(item.conceptName);
  seenUrls.add(item.supplierUrl);

  const netRevenue = item.targetRetailGrossEur / (1 + assumption.germanGrossVatRate);
  const inboundAllocated = assumption.inboundShippingExVatEur / assumption.testBatchUnits;
  const fee = (item.targetRetailGrossEur * assumption.paymentFeeGrossRate) + assumption.paymentFeeFixedEur;
  const contribution = netRevenue - item.listedCostExVatEur - inboundAllocated - assumption.outboundShippingPerSaleExVatEur - assumption.packagingPerSaleExVatEur - fee - assumption.returnCostReservePerSaleExVatEur;
  costs.push({ name: item.conceptName, gross: item.targetRetailGrossEur, wholesale: item.listedCostExVatEur, contribution });
}

const additional = candidates.find((item) => item.conceptName === plan.minimumOrderIllustration.additionalProductConceptName);
assert.ok(additional, 'Additional sample must refer to a candidate');
const goodsTotal = costs.reduce((total, item) => total + item.wholesale, 0) + additional.listedCostExVatEur * plan.minimumOrderIllustration.additionalUnits;
assert.ok(goodsTotal >= plan.supplier.minimumOrderExVatEur, 'Illustration must satisfy undiscounted supplier minimum');

console.log('EVERNE first-drop sourcing (indicative EUR, contribution before ads and fixed overhead):');
for (const item of costs) {
  console.log(`  ${item.name.padEnd(22)} gross €${item.gross.toFixed(0)} | wholesale €${item.wholesale.toFixed(2)} | contribution €${item.contribution.toFixed(2)}`);
}
console.log(`  Undiscounted six-unit basket: €${goodsTotal.toFixed(2)} goods + €${assumption.inboundShippingExVatEur.toFixed(2)} indicative inbound shipping = €${(goodsTotal + assumption.inboundShippingExVatEur).toFixed(2)} excl. VAT.`);
console.log('  Research only. No sale approval, Shopify import or actual supplier order.');

const sizeResearch = JSON.parse(fs.readFileSync('sourcing/sized-alternatives.json', 'utf8'));
assert.equal(sizeResearch.status, 'RESEARCH_ONLY', 'Sized alternatives must remain research-only');
assert.equal(sizeResearch.approvedForSale, false, 'Sized alternatives must not grant retail approval');
assert.equal(sizeResearch.alternatives.length, 4, 'Expected four researched alternatives');
const alternativeIds = new Set();
const alternativeUrls = new Set();
for (const alternative of sizeResearch.alternatives) {
  const base = conceptByName.get(alternative.conceptName);
  assert.ok(base, `Sized alternative needs an existing concept: ${alternative.conceptName}`);
  assert.ok(!alternativeIds.has(alternative.id), `Duplicate alternative ID: ${alternative.id}`);
  assert.ok(!alternativeUrls.has(alternative.url), `Duplicate supplier URL: ${alternative.url}`);
  assert.equal(alternative.baselineRetailGrossEur, base.targetPrice, `Wrong original concept price: ${alternative.id}`);
  assert.equal(alternative.approvedForSale, false, `Alternative must not be sale-approved: ${alternative.id}`);
  assert.ok(Number.isInteger(alternative.proposedRetailGrossEur), `Alternative retail price must be whole euro: ${alternative.id}`);
  assert.ok([4, 9].includes(alternative.proposedRetailGrossEur % 10), `Alternative retail price must end in 4/9: ${alternative.id}`);
  assert.ok(alternative.proposedRetailGrossEur >= 34 && alternative.proposedRetailGrossEur <= 59, `Alternative outside fashion retail band: ${alternative.id}`);
  assert.ok(alternative.visibleSizesForSampleColor.length >= 2, `Alternative must have at least two actual size options: ${alternative.id}`);
  assert.ok(alternative.questions.length >= 2, `Each candidate must have acceptance questions: ${alternative.id}`);
  assert.ok(alternative.indicativeSupplierNetEur > 0, `Invalid net cost: ${alternative.id}`);
  alternativeIds.add(alternative.id);
  alternativeUrls.add(alternative.url);
  if (alternative.supplier === 'LEIVIP') {
    const netSale = alternative.proposedRetailGrossEur / (1 + assumption.germanGrossVatRate);
    const fee = alternative.proposedRetailGrossEur * assumption.paymentFeeGrossRate + assumption.paymentFeeFixedEur;
    const contribution = netSale - alternative.indicativeSupplierNetEur - assumption.inboundShippingExVatEur / assumption.testBatchUnits - assumption.outboundShippingPerSaleExVatEur - assumption.packagingPerSaleExVatEur - fee - assumption.returnCostReservePerSaleExVatEur;
    console.log(`  Sized option ${alternative.id}: €${contribution.toFixed(2)} indicative contribution at €${alternative.proposedRetailGrossEur} gross; not approved.`);
  } else {
    console.log(`  Sized option ${alternative.id}: shipping unquoted, no contribution calculation; not approved.`);
  }
}
assert.ok(sizeResearch.rejectedOrOnHold.length >= 3, 'Need an explicit rejected or on-hold research trail');
console.log('  Sized-alternative audit passed: actual variant options, 4/9 price rule, no automatic import.');

const topsDenimResearch = JSON.parse(fs.readFileSync('sourcing/tops-denim-alternatives.json', 'utf8'));
assert.equal(topsDenimResearch.status, 'RESEARCH_ONLY', 'Tops and denim research must remain research-only');
assert.equal(topsDenimResearch.approvedForSale, false, 'Tops and denim research must never grant retail approval');
assert.equal(topsDenimResearch.candidates.length, 6, 'Expected three top and three denim alternatives');
const topsDenimIds = new Set();
const topsDenimUrls = new Set();
let topsCount = 0;
let denimCount = 0;
for (const item of topsDenimResearch.candidates) {
  const concept = conceptByName.get(item.conceptName);
  assert.ok(concept, `Unknown top/denim concept: ${item.conceptName}`);
  assert.ok(!topsDenimIds.has(item.id), `Duplicate top/denim ID: ${item.id}`);
  assert.ok(!topsDenimUrls.has(item.url), `Duplicate top/denim listing: ${item.url}`);
  assert.equal(item.approvedForSale, false, `Top/denim may not be sale-approved: ${item.id}`);
  assert.equal(item.baselineRetailGrossEur, concept.targetPrice, `Price differs from plan: ${item.id}`);
  assert.ok(Number.isInteger(item.proposedRetailGrossEur) && [4, 9].includes(item.proposedRetailGrossEur % 10), `4/9 whole-euro retail required: ${item.id}`);
  assert.ok(item.indicativeSupplierNetEur > 0 && item.url.startsWith('https://leivip.com/'), `Invalid cost or source: ${item.id}`);
  assert.ok(item.listedComposition.length > 10, `Composition must be documented: ${item.id}`);
  assert.ok(item.visibleSizesForSampleColor.length >= 2, `At least two real selectable sizes required: ${item.id}`);
  assert.ok(item.visibleSizesForSampleColor.every((size) => size !== 'ONESIZE' && Number.isInteger(item.stockObservedBySize[size]) && item.stockObservedBySize[size] > 0), `Only in-stock real variants allowed: ${item.id}`);
  assert.ok(item.questions.length >= 3, `Unresolved acceptance gates required: ${item.id}`);
  assert.ok(item.candidateStatus !== 'APPROVED', `Candidate cannot be approved: ${item.id}`);
  topsDenimIds.add(item.id);
  topsDenimUrls.add(item.url);
  if (concept.category === 'tops') topsCount += 1;
  else if (concept.category === 'trousers') denimCount += 1;
  else assert.fail(`Wrong product category in tops/denim research: ${item.id}`);

  const netSale = item.proposedRetailGrossEur / (1 + assumption.germanGrossVatRate);
  const cardFee = item.proposedRetailGrossEur * assumption.paymentFeeGrossRate + assumption.paymentFeeFixedEur;
  const contribution = netSale - item.indicativeSupplierNetEur - assumption.inboundShippingExVatEur / assumption.testBatchUnits - assumption.outboundShippingPerSaleExVatEur - assumption.packagingPerSaleExVatEur - cardFee - assumption.returnCostReservePerSaleExVatEur;
  assert.ok(Number.isFinite(contribution), `Contribution must be calculable: ${item.id}`);
  if (concept.category === 'tops') {
    assert.ok(contribution < 5 && item.candidateStatus.includes('HOLD'), `Low-margin top must be held: ${item.id}`);
  }
  if (item.listedComposition.includes('97% — 3% missing')) {
    assert.ok(item.candidateStatus.includes('FIBRE'), 'Incomplete supplier fibre details must block launch');
  }
  console.log(`  Top/denim ${item.id}: €${contribution.toFixed(2)} indicative contribution; ${item.candidateStatus}; not approved.`);
}
assert.equal(topsCount, 3, 'Expected three top candidates');
assert.equal(denimCount, 3, 'Expected three denim candidates');
assert.ok(topsDenimResearch.rejectedOrOnHold.length >= 4, 'Must retain rejected listing evidence');
console.log('  Tops and denim audit passed: real size variants, margin/label blockers, no automatic Shopify import.');
