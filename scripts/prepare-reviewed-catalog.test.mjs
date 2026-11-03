import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { prepareReviewedCatalog } from './prepare-reviewed-catalog.mjs';

const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

function fixture() {
  // All approvals in this file are synthetic in-memory tests, never merchant evidence.
  const readiness = read('sourcing/first-drop-readiness.json');
  const item = readiness.items[0];
  readiness.status = 'GO';
  readiness.approvedForSale = true;
  readiness.storefrontPublicationAuthorized = true;
  const evidence = { reference: 'unit-test-fixture', verifiedAt: '2026-11-02', reviewedBy: 'Fixture reviewer' };
  for (const gate of Object.values(readiness.globalGates)) {
    gate.status = 'VERIFIED'; gate.evidence = evidence;
  }
  item.approvedForSale = true;
  item.approvedRetailGrossEur = 34;
  item.approvedPublicName = 'Sample Rib Top';
  item.approvedCategory = 'tops';
  for (const key of ['supplierQuote', 'fitAndFabricSample', 'verifiedVariantStock', 'licensedProductPhotography', 'labelAndSafetyEvidence', 'founderMerchandisingApproval']) {
    item[key].status = 'VERIFIED'; item[key].evidence = evidence;
  }
  const imagePaths = ['public/products/sample-front.webp', 'public/products/sample-detail.webp'];
  const visuals = { previewMode: 'REVIEWED_ASSETS_ONLY', approvedAssets: imagePaths.map((publicPath) => ({
    publicPath, sampleReference: item.supplierProductCode, approvalRecord: 'approvals/records/fixture.md',
  })) };
  const product = {
    supplierProductCode: item.supplierProductCode,
    handle: 'sample-rib-top', retailGrossEur: 34, priceEvidence: 'unit-test-price-record',
    variants: [
      { sku: 'sample-xs', size: 'XS', measurementEvidence: 'unit-test-measurements', stockEvidence: 'unit-test-availability' },
      { sku: 'sample-s', size: 'S', measurementEvidence: 'unit-test-measurements', stockEvidence: 'unit-test-availability' },
    ],
    images: imagePaths.map((publicPath) => ({ publicPath, altText: 'Test-only sample garment in studio light' })),
    publicContent: {
      title: 'Sample Rib Top', category: 'tops',
      description: 'A fabricated product description used only in an isolated unit test.',
      colours: ['Black'], fitNote: 'Measured test garment is designed for a close fit.',
      composition: 'Test fabric composition of cotton and elastane.', careInstructions: 'Wash gently with similar colours.',
      deliveryTerms: 'Test dispatch and delivery window confirmed for isolated simulation.',
      returnsTerms: 'Test consumer return instructions for isolated simulation.',
    },
    approvalRecord: 'approvals/records/fixture.md',
    approvedBy: 'Fixture reviewer', approvedAt: '2026-11-02',
  };
  const manifest = { version: 1, mode: 'REVIEWED_PRODUCTS_ONLY', approvedProducts: [product] };
  return { readiness, visuals, manifest, recordExists: () => true };
}

test('current NO_PRODUCTS state yields no catalog and no release', () => {
  const result = prepareReviewedCatalog(
    read('approvals/product-publication.json'),
    read('sourcing/first-drop-readiness.json'),
    read('approvals/visual-assets.json'),
    () => false,
  );
  assert.deepEqual(result, { status: 'BLOCKED_NO_PRODUCTS', products: [] });
});

test('verified sources become a public-data-only, non-commercial review snapshot', () => {
  const f = fixture();
  const result = prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists);
  assert.equal(result.status, 'APPROVED_SOURCE_SNAPSHOT');
  assert.equal(result.products.length, 1);
  assert.equal(result.products[0].facts.retailGrossEur, 34);
  assert.deepEqual(result.products[0].facts.sizeLabels, ['XS', 'S']);
  assert.equal(result.products[0].images[0].publicPath, '/products/sample-front.webp');
  assert.equal(JSON.stringify(result).includes(f.manifest.approvedProducts[0].supplierProductCode), false,
    'Internal supplier identifiers must not enter the public handoff');
  assert.equal(JSON.stringify(result).includes('checkout'), false);
});

test('cross-product identity and category mismatches block the handoff', () => {
  const f = fixture();
  f.manifest.approvedProducts[0].publicContent.title = 'Another Item';
  assert.throws(() => prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists), /display name must match/);
  f.manifest.approvedProducts[0].publicContent.title = 'Sample Rib Top';
  f.manifest.approvedProducts[0].publicContent.category = 'dresses';
  assert.throws(() => prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists), /category must match/);
});

test('missing or placeholder customer information blocks the handoff', () => {
  const f = fixture();
  f.manifest.approvedProducts[0].publicContent.deliveryTerms = 'Pending delivery confirmation';
  assert.throws(() => prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists), /unfinished copy/);
  f.manifest.approvedProducts[0].publicContent.deliveryTerms = 'Test dispatch and delivery window confirmed for isolated simulation.';
  delete f.manifest.approvedProducts[0].publicContent.composition;
  assert.throws(() => prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists), /verified customer-facing copy is missing/);
});

test('unreviewed photo location or missing real sale approval blocks the handoff', () => {
  const f = fixture();
  f.manifest.approvedProducts[0].images[0].publicPath = 'public/editorial-study/06-bodysuit.jpg';
  f.visuals.approvedAssets[0].publicPath = 'public/editorial-study/06-bodysuit.jpg';
  assert.throws(() => prepareReviewedCatalog(f.manifest, f.readiness, f.visuals, f.recordExists), /product photos must reside/);
  const notReady = read('sourcing/first-drop-readiness.json');
  assert.throws(() => prepareReviewedCatalog(f.manifest, notReady, f.visuals, f.recordExists), /NO-GO/);
});
