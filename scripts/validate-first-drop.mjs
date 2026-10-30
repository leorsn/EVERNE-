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

const essentials = JSON.parse(fs.readFileSync('sourcing/essential-basics-alternatives.json', 'utf8'));
assert.equal(essentials.status, 'RESEARCH_ONLY', 'Essentials must be research-only');
assert.equal(essentials.approvedForSale, false, 'Essentials must never be sale-approved');
assert.equal(essentials.supplier, 'FactoryPrice', 'Essentials supplier identity must be explicit');
assert.equal(essentials.fulfilmentStatus, 'PUBLIC_GERMANY_TARIFF_UNCONFIRMED_DROPSHIP_LABEL', 'Public supplier shipping is not a confirmed own-label dropship rate');
assert.ok(essentials.shippingAndReturnWarnings.length >= 4, 'Document wholesale logistics/returns before any launch');
assert.ok(essentials.model.excludedCosts.some((cost) => cost.includes('inbound shipping')), 'FactoryPrice inbound shipping must remain excluded from the ceiling');
assert.equal(essentials.candidates.length, 5, 'Expected three essential models and two alternatives');
const essentialIds = new Set();
const essentialUrls = new Set();
const matchedConcepts = new Set();
for (const item of essentials.candidates) {
  const concept = conceptByName.get(item.conceptName);
  assert.ok(concept && concept.category === 'tops', `Only existing top concepts allowed: ${item.id}`);
  assert.ok(!essentialIds.has(item.id) && !essentialUrls.has(item.url), `Duplicate essentials listing: ${item.id}`);
  assert.equal(item.approvedForSale, false, `No SKU may be sale-approved: ${item.id}`);
  assert.equal(item.baselineRetailGrossEur, concept.targetPrice, `Wrong baseline retail: ${item.id}`);
  assert.equal(item.proposedRetailGrossEur, concept.targetPrice, `Price was changed without authorization: ${item.id}`);
  assert.ok(Number.isInteger(item.proposedRetailGrossEur) && [4, 9].includes(item.proposedRetailGrossEur % 10), `Whole-euro 4/9 price required: ${item.id}`);
  assert.ok(item.url.startsWith('https://factoryprice.eu/de/products/'), `Official supplier listing required: ${item.id}`);
  assert.ok(Number.isFinite(item.indicativeSupplierNetEur) && item.indicativeSupplierNetEur > 0, `Valid public cost required: ${item.id}`);
  assert.ok(item.listedComposition.length >= 15 && item.listedTexture.length >= 15, `Fabric and description evidence required: ${item.id}`);
  assert.ok(item.visibleSizesForSampleColor.length >= 2, `Actual color variants required: ${item.id}`);
  assert.ok(item.questions.length >= 3, `Open sample/fulfillment gates required: ${item.id}`);
  assert.ok(item.candidateStatus !== 'APPROVED', `Never approve research-only candidates: ${item.id}`);
  assert.ok(item.visibleSizesForSampleColor.every((size) => size !== 'ONESIZE'
    && Number.isInteger(item.publicStockObservedBySize[size]) && item.publicStockObservedBySize[size] > 0
    && typeof item.variantIdentifiersBySize[size] === 'string' && item.variantIdentifiersBySize[size].length >= 10
    && item.listedGarmentMeasurementsCmBySize[size]?.length > 0), `Each variant requires public stock, ID and garment length: ${item.id}`);
  const lowStock = item.visibleSizesForSampleColor.some((size) => item.publicStockObservedBySize[size] < 5);
  if (lowStock) assert.ok(item.candidateStatus.includes('LOW_'), `Low-stock variant must block or qualify sample decision: ${item.id}`);
  essentialIds.add(item.id);
  essentialUrls.add(item.url);
  matchedConcepts.add(item.conceptName);

  const m = essentials.model;
  const netRevenue = item.proposedRetailGrossEur / (1 + m.germanGrossVatRateAssumption);
  const paymentFee = item.proposedRetailGrossEur * m.paymentFeeGrossRateAssumption + m.paymentFeeFixedEurAssumption;
  const ceiling = netRevenue - item.indicativeSupplierNetEur - m.outboundShippingPerSaleExVatEurAssumption - m.packagingPerSaleExVatEurAssumption - paymentFee - m.returnCostReservePerSaleExVatEurAssumption;
  assert.ok(Number.isFinite(ceiling), `Contribution ceiling must be calculable: ${item.id}`);
  console.log(`  Basic ${item.conceptName.padEnd(20)} gross €${item.proposedRetailGrossEur} | public net goods €${item.indicativeSupplierNetEur.toFixed(2)} | ceiling before INBOUND/ads €${ceiling.toFixed(2)} | ${item.candidateStatus}`);
}
assert.deepEqual([...matchedConcepts].sort(), ['Essential Rib Top', 'Everyday Tank', 'Second Skin Body'].sort(), 'Cover exactly three outstanding essential concepts');
console.log('  Essentials audit passed: real size/stock snapshots, 4/9 prices, supplier inbound freight EXCLUDED pending route-specific scenario, no Shopify import or purchase.');

const logistics = JSON.parse(fs.readFileSync('sourcing/fulfillment-gates.json', 'utf8'));
assert.equal(logistics.status, 'RESEARCH_ONLY', 'Logistics must remain research-only');
assert.equal(logistics.approvedForSale, false, 'Logistics assessment cannot authorize sales');
assert.equal(logistics.supplier, essentials.supplier, 'Logistics provider mismatch');
assert.ok(logistics.sourceUrls.publishedShipping.startsWith('https://factoryprice.eu/'), 'Official shipping rate source required');
assert.ok(logistics.sourceUrls.publishedReturnPolicy.startsWith('https://factoryprice.eu/'), 'Official returns source required');
assert.ok(logistics.sourceUrls.ownLabelDropshipProgram.startsWith('https://factoryprice.eu/'), 'Official dropship source required');
assert.ok(logistics.sourceUrls.ecbReference.startsWith('https://www.ecb.europa.eu/'), 'Central-bank reference required');
assert.equal(logistics.currencyReference.rateDate, '2026-10-29', 'Currency snapshot date must be explicit');
assert.ok(logistics.currencyReference.plnPerEur > 4, 'FX must be expressed as PLN per EUR');
assert.equal(logistics.supplierPublishedGermanyFreight.carrier, 'DHL', 'Warehouse sample illustration must use a named carrier');
assert.equal(logistics.supplierPublishedGermanyFreight.merchantOrderConfirmed, false, 'Public chart cannot stand in for a checkout quote');
assert.equal(logistics.supplierPublishedDropship.ownLabelCourierRateEur, null, 'Never invent a dropship courier label rate');
assert.equal(logistics.supplierPublishedDropship.returnsContractVerified, false, 'Wholesale returns need explicit confirmation');
assert.equal(logistics.returns.generalWholesalePolicyDays, 7, 'The shorter general policy must be retained');
assert.equal(logistics.returns.productPageWorkingDays, 7, 'The conflicting product-page policy must be retained');
assert.equal(logistics.returns.buyerPaysReturnFreight, true, 'Wholesale return freight must not be silently omitted');
assert.equal(logistics.examples.oneOfEachSizeForThreePreferredConcepts.approvedToPurchase, false, 'Illustrative basket may not be ordered');
assert.equal(logistics.examples.oneOfEachSizeForThreePreferredConcepts.sampleUnits, 6, 'Three models × two sizes require six samples');
assert.ok(logistics.decisionGates.length >= 5, 'Supplier diligence gates required before launch');

const preferred = essentials.candidates.filter((item) => item.candidateStatus === 'PREFERRED_SAMPLE_RESEARCH_ONLY');
assert.equal(preferred.length, 3, 'Need exactly three preferred essential listings');
const illustrativeGoods = preferred.reduce((total, item) => total + item.indicativeSupplierNetEur * logistics.examples.oneOfEachSizeForThreePreferredConcepts.itemsPerConcept, 0);
assert.ok(Math.abs(illustrativeGoods - logistics.examples.oneOfEachSizeForThreePreferredConcepts.goodsSubtotalListedNetEur) < 0.00001, 'Basket goods total mismatch');
const warehouseParcelShippingEur = logistics.supplierPublishedGermanyFreight.netPlnPerParcel / logistics.currencyReference.plnPerEur;
const allocatedWarehouseInbound = warehouseParcelShippingEur / logistics.examples.oneOfEachSizeForThreePreferredConcepts.sampleUnits;
const dropshipHandlingEur = logistics.supplierPublishedDropship.feeNetPlnPerParcel / logistics.currencyReference.plnPerEur;
console.log(`  Supplier published DHL Germany <=${logistics.supplierPublishedGermanyFreight.upToKg}kg: PLN ${logistics.supplierPublishedGermanyFreight.netPlnPerParcel} net ≈ €${warehouseParcelShippingEur.toFixed(2)} (ECB ${logistics.currencyReference.rateDate}); not a merchant quote.`);
console.log(`  Illustrative six-sample goods €${illustrativeGoods.toFixed(2)} + DHL €${warehouseParcelShippingEur.toFixed(2)} ≈ €${(illustrativeGoods + warehouseParcelShippingEur).toFixed(2)} net, excl. VAT/FX/payment changes; NOT an order.`);
console.log(`  Own-label dropship handling PLN ${logistics.supplierPublishedDropship.feeNetPlnPerParcel} ≈ €${dropshipHandlingEur.toFixed(2)} plus merchant-purchased COURIER LABEL of UNQUOTED price.`);

for (const item of preferred) {
  const m = essentials.model;
  const netSale = item.proposedRetailGrossEur / (1 + m.germanGrossVatRateAssumption);
  const fee = item.proposedRetailGrossEur * m.paymentFeeGrossRateAssumption + m.paymentFeeFixedEurAssumption;
  const warehouseEstimate = netSale - item.indicativeSupplierNetEur - allocatedWarehouseInbound - m.outboundShippingPerSaleExVatEurAssumption - m.packagingPerSaleExVatEurAssumption - fee - m.returnCostReservePerSaleExVatEurAssumption;
  const maxDropshipLabelForBuffer = netSale - item.indicativeSupplierNetEur - dropshipHandlingEur - logistics.examples.dropshipConservativePackagingBufferEur - fee - m.returnCostReservePerSaleExVatEurAssumption - logistics.examples.dropshipIllustrativeMinimumContributionBeforeAdsAndFixedOverheadEur;
  assert.ok(Number.isFinite(warehouseEstimate) && Number.isFinite(maxDropshipLabelForBuffer), 'Shipping scenarios must calculate');
  assert.ok(maxDropshipLabelForBuffer > 0, 'Candidate fails provisional standalone dropship ceiling');
  console.log(`  Fulfillment ${item.conceptName.padEnd(20)} stocked-six-sample scenario €${warehouseEstimate.toFixed(2)} before ads/overhead; own-label dropship courier ceiling €${maxDropshipLabelForBuffer.toFixed(2)} to retain provisional €${logistics.examples.dropshipIllustrativeMinimumContributionBeforeAdsAndFixedOverheadEur} buffer. NOT confirmed.`);
}
console.log('  Fulfillment audit passed: warehouse parcel and own-label dropship economics kept separate; no payment, sale or live update.');

const capsule = JSON.parse(fs.readFileSync('sourcing/capsule-hero-alternatives.json', 'utf8'));
assert.equal(capsule.status, 'RESEARCH_ONLY', 'Capsule-hero research cannot authorize a sale');
assert.equal(capsule.approvedForSale, false, 'Capsule-hero approval must remain false');
assert.equal(capsule.supplier, 'FactoryPrice', 'Capsule supplier must be specified');
assert.equal(capsule.reviewedAt, '2026-10-30', 'Time-sensitive public stock must have a snapshot date');
assert.equal(capsule.candidates.length, 8, 'Eight additional hero/wardrobe alternatives expected');
assert.equal(capsule.provisionalCapsule.length, 5, 'Provisional launch edit contains five conceptual slots');
assert.ok(capsule.launchGates.length >= 5, 'A provisional capsule requires explicit launch blockers');

const capsuleIds = new Set();
const capsuleUrls = new Set();
let potentiallySampleable = 0;
for (const item of capsule.candidates) {
  const concept = conceptByName.get(item.conceptName);
  assert.ok(concept && concept.category !== 'tops', `Hero candidate must match an existing non-top concept: ${item.id}`);
  assert.ok(!capsuleIds.has(item.id) && !capsuleUrls.has(item.url), `Duplicate capsule candidate: ${item.id}`);
  assert.equal(item.approvedForSale, false, `Capsule candidate must not be sale-approved: ${item.id}`);
  assert.ok(item.url.startsWith('https://factoryprice.eu/de/products/'), `Official supplier source required: ${item.id}`);
  assert.equal(item.baselineRetailGrossEur, concept.targetPrice, `Concept retail mismatch: ${item.id}`);
  assert.equal(item.proposedRetailGrossEur, concept.targetPrice, `No unapproved repricing: ${item.id}`);
  assert.ok(Number.isInteger(item.proposedRetailGrossEur) && [4, 9].includes(item.proposedRetailGrossEur % 10), `Whole euro 4/9 required: ${item.id}`);
  assert.ok(Number.isFinite(item.indicativeSupplierNetEur) && item.indicativeSupplierNetEur > 0, `Public supplier cost required: ${item.id}`);
  assert.ok(item.listedComposition.length > 10 && item.listedSilhouette.length > 30, `Composition/silhouette needed: ${item.id}`);
  assert.ok(item.visibleSizesForSampleColor.length >= 2, `Two identifiable variants needed: ${item.id}`);
  assert.ok(item.questions.length >= 4 && item.seasonalRole.length > 50, `Acceptance and seasonal fit must be recorded: ${item.id}`);
  assert.ok(item.candidateStatus !== 'APPROVED', `Research-only listing cannot be approved: ${item.id}`);
  const availableSizes = item.visibleSizesForSampleColor.filter((size) => {
    const stock = item.publicStockObservedBySize[size];
    assert.ok(Number.isInteger(stock) && stock >= 0, `Public stock must be nonnegative: ${item.id}/${size}`);
    assert.ok(typeof item.variantIdentifiersBySize[size] === 'string' && item.variantIdentifiersBySize[size].length >= 10, `Variant id required: ${item.id}/${size}`);
    assert.ok(Number.isFinite(item.listedMeasurementsCmBySize[size]?.length) && item.listedMeasurementsCmBySize[size].length > 0, `Garment length required: ${item.id}/${size}`);
    return stock > 0;
  });
  if (availableSizes.length < 2) assert.ok(item.candidateStatus.includes('HOLD'), `Poor size coverage must be held: ${item.id}`);
  if (item.visibleSizesForSampleColor.some((size) => item.publicStockObservedBySize[size] < 5)) {
    assert.ok(item.candidateStatus.includes('HOLD'), `Out-of-stock or under-five variant must be held: ${item.id}`);
  }
  if (item.listedSilhouette.includes('NOT a wrap')) assert.ok(item.candidateStatus.includes('RENAME'), `Cardigan mismatch cannot be sold as wrap: ${item.id}`);
  if (item.candidateStatus.startsWith('SAMPLE_OPTION')) potentiallySampleable += 1;
  capsuleIds.add(item.id);
  capsuleUrls.add(item.url);

  const m = essentials.model;
  const netSale = item.proposedRetailGrossEur / (1 + m.germanGrossVatRateAssumption);
  const fee = item.proposedRetailGrossEur * m.paymentFeeGrossRateAssumption + m.paymentFeeFixedEurAssumption;
  const ceiling = netSale - item.indicativeSupplierNetEur - m.outboundShippingPerSaleExVatEurAssumption - m.packagingPerSaleExVatEurAssumption - fee - m.returnCostReservePerSaleExVatEurAssumption;
  const maxDropshipLabel = netSale - item.indicativeSupplierNetEur - dropshipHandlingEur - logistics.examples.dropshipConservativePackagingBufferEur - fee - m.returnCostReservePerSaleExVatEurAssumption - logistics.examples.dropshipIllustrativeMinimumContributionBeforeAdsAndFixedOverheadEur;
  assert.ok(Number.isFinite(ceiling) && Number.isFinite(maxDropshipLabel), `Price math must be finite: ${item.id}`);
  console.log(`  Hero ${item.conceptName.padEnd(20)} gross €${item.proposedRetailGrossEur} | public net goods €${item.indicativeSupplierNetEur.toFixed(2)} | pre-inbound ceiling €${ceiling.toFixed(2)} | max dropship label €${maxDropshipLabel.toFixed(2)} for €10 buffer | ${item.candidateStatus}`);
}
assert.equal(potentiallySampleable, 3, 'Exactly two dresses plus a four-size tailored pant are conditional sample options, not launch approvals');
const capsuleSlots = new Set();
for (const slot of capsule.provisionalCapsule) {
  const concept = conceptByName.get(slot.conceptName);
  assert.ok(concept && slot.retailGrossEur === concept.targetPrice, `Capsule slot references a valid unchanged price: ${slot.conceptName}`);
  assert.ok(!capsuleSlots.has(slot.conceptName), `No duplicate product slots: ${slot.conceptName}`);
  assert.ok(slot.gate.length >= 20 && slot.source.length >= 20, `Supplier-specific approval gate required: ${slot.conceptName}`);
  capsuleSlots.add(slot.conceptName);
}
console.log('  Capsule-hero audit passed: three conditional sample options, five explicitly held options; no sale or checkout changes.');

const cartEconomics = JSON.parse(fs.readFileSync('sourcing/capsule-order-economics.json', 'utf8'));
assert.equal(cartEconomics.status, 'RESEARCH_ONLY', 'Cart economics must not authorize selling');
assert.equal(cartEconomics.approvedForSale, false, 'Cart approval must stay false');
assert.equal(cartEconomics.chosenRoute, 'ONE_FACTORYPRICE_SUPPLIER_RESEARCH_ONLY', 'Do not silently mix supplier routes');
assert.equal(cartEconomics.realGermanCustomerCourierLabelNetEur, null, 'Courier label is still unquoted');
assert.equal(cartEconomics.realShopifyIntegrationSubscriptionEur, null, 'Shopify integration cost is unverified');
assert.equal(cartEconomics.items.length, capsule.provisionalCapsule.length, 'Every capsule slot needs one matching source-cost record');
assert.ok(cartEconomics.warnings.length >= 6, 'Incomplete costs and constraints need warnings');
assert.equal(cartEconomics.secondarySupplierRoute.publicOrderMinimumGoodsEur, 100, 'LEIVIP EUR 100 minimum must remain explicit');
assert.equal(cartEconomics.secondarySupplierRoute.canDirectFulfillOneTrouserOrderInIsolation, false, 'LEIVIP single-trouser under-minimum route cannot be represented as directly fulfillable');
assert.ok(cartEconomics.secondarySupplierRoute.publishedGermanyInboundRateUpTo5KgEur > 0, 'Separate LEIVIP inbound carrier rate is required');
assert.deepEqual(cartEconomics.courierWhatIfNetEur, [5, 7.5, 10], 'Courier stress scenarios must be explicit hypothetical inputs');
assert.ok(cartEconomics.whatIfCarts.length >= 8, 'Single- and multi-item cart cases required');

const capsuleCatalog = new Map();
for (const item of cartEconomics.items) {
  const concept = conceptByName.get(item.conceptName);
  assert.ok(concept && item.retailGrossEur === concept.targetPrice, `Unapproved cart pricing: ${item.conceptName}`);
  assert.ok(item.supplier === 'FactoryPrice' && item.supplierPublicCostNetEur > 0, `Cart item cannot silently use separate supplier: ${item.conceptName}`);
  assert.ok(!capsuleCatalog.has(item.conceptName), `Duplicate cart item: ${item.conceptName}`);
  const sourceList = [...essentials.candidates, ...capsule.candidates];
  assert.ok(sourceList.some((source) => source.conceptName === item.conceptName
      && source.supplierProductCode === item.supplierProductCode
      && source.indicativeSupplierNetEur === item.supplierPublicCostNetEur), `Cart's supplier SKU/cost must match a documented research candidate: ${item.conceptName}`);
  capsuleCatalog.set(item.conceptName, item);
}
for (const slot of capsule.provisionalCapsule) assert.ok(capsuleCatalog.has(slot.conceptName), `Missing capsule cart item: ${slot.conceptName}`);
assert.ok(cartEconomics.items.every((item) => [4, 9].includes(item.retailGrossEur % 10)), 'Whole euro 4/9 rule must hold across cart selection');

const handlingEur = cartEconomics.supplierDropshipFeeNetPlnPerParcel / cartEconomics.ecbPlnPerEurReference;
const seenCarts = new Set();
for (const cart of cartEconomics.whatIfCarts) {
  assert.ok(!seenCarts.has(cart.id), `Duplicate what-if cart ID: ${cart.id}`);
  assert.ok(cart.itemConceptNames.length > 0 && new Set(cart.itemConceptNames).size === cart.itemConceptNames.length, `Cart items must be distinct and non-empty: ${cart.id}`);
  const items = cart.itemConceptNames.map((name) => {
    assert.ok(capsuleCatalog.has(name), `Unknown cart item: ${name}`);
    return capsuleCatalog.get(name);
  });
  assert.ok(cart.possibleParcelCounts.length >= 1 && cart.possibleParcelCounts.every((count) => Number.isInteger(count) && count > 0 && count <= items.length), `Invalid parcel count: ${cart.id}`);
  if (items.length > 1) assert.deepEqual(cart.possibleParcelCounts, [1, 2], 'Mixed carts must model consolidated and split parcels');
  seenCarts.add(cart.id);

  const gross = items.reduce((sum, item) => sum + item.retailGrossEur, 0);
  const cost = items.reduce((sum, item) => sum + item.supplierPublicCostNetEur, 0);
  const netRevenue = gross / (1 + cartEconomics.retailVatRateAssumption);
  const paymentFee = gross * cartEconomics.paymentFeeGrossRateAssumption + cartEconomics.paymentFeeFixedEurPerOrderAssumption;
  for (const parcels of cart.possibleParcelCounts) {
    for (const courierLabel of cartEconomics.courierWhatIfNetEur) {
      const projectedContribution = netRevenue - cost - paymentFee
        - items.length * cartEconomics.returnsReserveEurPerItemExVatAssumption
        - parcels * (handlingEur + cartEconomics.packagingBufferEurPerParcelExVatAssumption + courierLabel);
      assert.ok(Number.isFinite(projectedContribution), `Invalid cart what-if math for ${cart.id}`);
      if (courierLabel === 7.5) {
        const policy = projectedContribution >= cartEconomics.illustrativeMinimumContributionBeforeAdsAndFixedOverheadEur ? 'CLEARS_SCREENING_BUFFER' : 'BELOW_SCREENING_BUFFER';
        console.log(`  Cart what-if ${cart.id.padEnd(11)} ${parcels} parcel(s) @ hypothetical €7.50 net label EACH | €${projectedContribution.toFixed(2)} contribution BEFORE ads/overhead | ${policy}`);
      }
    }
  }
}
console.log('  Cart-economics audit passed: all five products match researched supplier SKUs, one-supplier alternative replaces under-MOQ LEIVIP mixed route; courier prices hypothetical and no purchase authorized.');

const returnRisk = cartEconomics.returnRateSensitivity;
assert.ok(returnRisk && returnRisk.customerRefundsFullGrossRetailAssumption && returnRisk.paymentFeeNotRefundedAssumption,
  'Stress test must explicitly assume full-refund returns and retained payment fees');
assert.deepEqual(returnRisk.illustrativeRates, [0.1, 0.2, 0.3], 'Return rates are hypothetical 10/20/30%, not an observed forecast');
assert.equal(returnRisk.outboundCourierNetEurPerOrderAssumption, 7.5, 'Return stress courier baseline must match one explicit what-if scenario');
assert.ok(returnRisk.reverseCourierNetEurPerReturnedOrderAssumption > 0 && returnRisk.inspectionAndHandlingNetEurPerReturnedItemAssumption > 0,
  'Never omit reverse shipping and inspection costs');
assert.deepEqual(returnRisk.recoveryCases.map((item) => [item.id, item.recoverableGoodsCostShare]), [
  ['RETURNED_GOODS_RESELLABLE', 1], ['RETURNED_GOODS_UNSELLABLE', 0],
], 'Evaluate returned stock recovery and complete goods loss separately');
assert.ok(returnRisk.limitations.includes('replaces the flat EUR 2.50'), 'Stress test must not double-count the separate flat returns reserve');

for (const item of cartEconomics.items) {
  const netRevenue = item.retailGrossEur / (1 + cartEconomics.retailVatRateAssumption);
  const fee = item.retailGrossEur * cartEconomics.paymentFeeGrossRateAssumption + cartEconomics.paymentFeeFixedEurPerOrderAssumption;
  const fulfillmentCost = returnRisk.outboundCourierNetEurPerOrderAssumption + handlingEur + cartEconomics.packagingBufferEurPerParcelExVatAssumption;
  // Unlike the basic cart model, this sensitivity replaces, rather than adds,
  // the flat per-item returns reserve with explicit returned-order outcomes.
  const keptContribution = netRevenue - item.supplierPublicCostNetEur - fee - fulfillmentCost;
  let previousWorstCase = keptContribution;
  for (const rate of returnRisk.illustrativeRates) {
    let resellableExpected = null;
    let unsellableExpected = null;
    for (const recovery of returnRisk.recoveryCases) {
      const returnedContribution = -item.supplierPublicCostNetEur * (1 - recovery.recoverableGoodsCostShare)
        - fee - fulfillmentCost - returnRisk.reverseCourierNetEurPerReturnedOrderAssumption
        - returnRisk.inspectionAndHandlingNetEurPerReturnedItemAssumption;
      const expected = (1 - rate) * keptContribution + rate * returnedContribution;
      assert.ok(Number.isFinite(expected) && expected < keptContribution, `Return risk must reduce contribution: ${item.conceptName}`);
      if (recovery.id === 'RETURNED_GOODS_RESELLABLE') resellableExpected = expected;
      if (recovery.id === 'RETURNED_GOODS_UNSELLABLE') unsellableExpected = expected;
    }
    assert.ok(Number.isFinite(resellableExpected) && Number.isFinite(unsellableExpected)
      && unsellableExpected <= resellableExpected && unsellableExpected < previousWorstCase,
    `Return goods-loss case must be no better and should worsen as return rate rises: ${item.conceptName}`);
    previousWorstCase = unsellableExpected;
    if (rate === 0.2) {
      const cutoff = cartEconomics.illustrativeMinimumContributionBeforeAdsAndFixedOverheadEur;
      console.log(`  Return stress ${item.conceptName.padEnd(22)} 20% HYPOTHETICAL full refunds @ €7.50 outbound: €${resellableExpected.toFixed(2)} if goods remain resellable, €${unsellableExpected.toFixed(2)} if goods are lost | €10 buffer ${unsellableExpected >= cutoff ? 'CLEARED' : 'MISSED'} in goods-loss case.`);
    }
  }
}
console.log('  Return-sensitivity audit passed: full-refund/fee/reverse-label risk, 10/20/30% assumptions, no duplicate €2.50 reserve, no live changes.');

const seasonal = JSON.parse(fs.readFileSync('sourcing/seasonal-replacement-screen.json', 'utf8'));
assert.equal(seasonal.status, 'RESEARCH_ONLY', 'Seasonal rescreen must be research-only');
assert.equal(seasonal.approvedForSale, false, 'Seasonal rescreen must not release products');
assert.equal(seasonal.reviewedAt, '2026-10-30', 'Date the public supplier listings were checked');
assert.equal(seasonal.screenedConceptName, 'Soft Midi Dress', 'Seasonal rescreen must use an existing concept');
assert.equal(seasonal.currentConditionalModel.supplierProductCode, capsuleCatalog.get('Soft Midi Dress').supplierProductCode, 'Original conditional dress must remain traceable');
assert.equal(seasonal.alternatives.length, 3, 'Three alternative seasonal silhouettes were screened');
assert.ok(seasonal.decision.includes('REVIEW') && seasonal.unresolvedBeforeAnySale.length >= 4,
  'Do not recommend a seasonal replacement without founder and supplier gates');
const seasonalIds = new Set();
const seasonalUrls = new Set();
for (const item of seasonal.alternatives) {
  assert.ok(!seasonalIds.has(item.id) && !seasonalUrls.has(item.url), `Duplicate seasonal alternative: ${item.id}`);
  assert.equal(item.conceptName, seasonal.screenedConceptName, `Unexpected concept in seasonal screen: ${item.id}`);
  assert.equal(item.approvedForSale, false, `Seasonal candidate cannot be approved: ${item.id}`);
  assert.ok(item.url.startsWith('https://factoryprice.eu/de/products/'), `Official FactoryPrice listing required: ${item.id}`);
  assert.equal(item.baselineRetailGrossEur, conceptByName.get(item.conceptName).targetPrice, `Wrong seasonal baseline price: ${item.id}`);
  assert.equal(item.proposedRetailGrossEur, item.baselineRetailGrossEur, `No silent seasonal retail price changes: ${item.id}`);
  assert.ok(Number.isInteger(item.proposedRetailGrossEur) && [4, 9].includes(item.proposedRetailGrossEur % 10), `Seasonal pricing must follow whole-euro 4/9 style: ${item.id}`);
  assert.ok(item.indicativeSupplierNetEur > 0 && item.listedComposition.length >= 15 && item.whyNotPromoted.length >= 80, `Research evidence missing for ${item.id}`);
  assert.ok(item.candidateStatus.startsWith('HOLD_'), `Seasonal research cannot silently promote: ${item.id}`);
  assert.deepEqual(item.visibleSizesForColor, ['S/M', 'L/XL'], `Require stated size pair for this screening round: ${item.id}`);
  assert.ok(item.visibleSizesForColor.every((size) => typeof item.variantIdentifiersBySize[size] === 'string'
    && item.variantIdentifiersBySize[size].length >= 10 && Number.isInteger(item.publicStockObservedBySize[size])
    && item.publicStockObservedBySize[size] >= 0), `Actual observed stock and supplier variant IDs needed: ${item.id}`);
  if (item.publicStockObservedBySize['L/XL'] < 5) assert.ok(item.candidateStatus.includes('LOW_STOCK') || item.candidateStatus.includes('NO_L_XL'), `L/XL stock gate missing for ${item.id}`);
  if (!item.colorInSupplierSelector.includes('Black')) assert.ok(item.candidateStatus.includes('BLACK_COLOR_NOT_VERIFIED'), `Conflicting black-color claim must block: ${item.id}`);
  if (item.listedCutAndSeason.includes('BEFORE THE KNEE')) assert.ok(item.candidateStatus.includes('CONCEPT_MISMATCH'), `Do not present a short dress as midi: ${item.id}`);
  if (item.listedCutAndSeason.includes('SHORT sleeve')) assert.ok(item.candidateStatus.includes('SHORT_SLEEVES'), `Short sleeves are not a proved winter upgrade: ${item.id}`);
  seasonalIds.add(item.id);
  seasonalUrls.add(item.url);

  const oneItem = capsuleCatalog.get('Soft Midi Dress');
  const netSale = oneItem.retailGrossEur / (1 + cartEconomics.retailVatRateAssumption);
  const fee = oneItem.retailGrossEur * cartEconomics.paymentFeeGrossRateAssumption + cartEconomics.paymentFeeFixedEurPerOrderAssumption;
  const hypotheticalContribution = netSale - item.indicativeSupplierNetEur - fee
    - 7.5 - handlingEur - cartEconomics.packagingBufferEurPerParcelExVatAssumption
    - cartEconomics.returnsReserveEurPerItemExVatAssumption;
  assert.ok(Number.isFinite(hypotheticalContribution), `Seasonal cost screening failed: ${item.id}`);
  console.log(`  Seasonal hold ${item.id}: at original €${item.proposedRetailGrossEur}, €7.50 HYPOTHETICAL label → €${hypotheticalContribution.toFixed(2)} before ads/overhead; ${item.candidateStatus}.`);
}
const inventoryConflict = seasonal.stockReliabilityIncident;
const originalMini = capsule.candidates.find((item) => item.id === inventoryConflict.existingCandidateId);
assert.ok(originalMini && originalMini.supplierProductCode === inventoryConflict.productCode && originalMini.url === inventoryConflict.url,
  'Inventory conflict must map to an existing held SKU');
assert.deepEqual(originalMini.publicStockObservedBySize, inventoryConflict.originalDocumentedSnapshot, 'Do not rewrite earlier stock snapshots without proof');
assert.deepEqual(inventoryConflict.directPageOpenOnReview, inventoryConflict.originalDocumentedSnapshot, 'Direct page currently confirms the earlier held mini stock');
assert.notDeepEqual(inventoryConflict.searchIndexSnippetFromDifferentCrawl, inventoryConflict.directPageOpenOnReview, 'The conflicting crawls must remain visible');
assert.equal(inventoryConflict.candidateStillBlocked, true, 'Search snippets cannot release stock');
console.log('  Seasonal rescreen passed: zero automatic replacements, contradictory mini stock snapshots retained, original conditional dress still gated.');
