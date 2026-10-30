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
