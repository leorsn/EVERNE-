import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { validateProductPublication } from './validate-product-publication.mjs';

const read = (name) => JSON.parse(fs.readFileSync(name, 'utf8'));

function preparedFixture() {
  // Fake approval data is confined to this in-memory unit test. It never
  // changes sourcing status, makes an order, or enters a published manifest.
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
  for (const gate of ['supplierQuote', 'fitAndFabricSample', 'verifiedVariantStock', 'licensedProductPhotography', 'labelAndSafetyEvidence', 'founderMerchandisingApproval']) {
    item[gate].status = 'VERIFIED'; item[gate].evidence = evidence;
  }
  const images = ['public/fixture-front.jpg', 'public/fixture-detail.jpg'];
  const visuals = {
    previewMode: 'REVIEWED_ASSETS_ONLY',
    approvedAssets: images.map((publicPath) => ({
      publicPath, sampleReference: item.supplierProductCode,
      approvalRecord: 'approvals/records/fixture.md',
    })),
  };
  const product = {
    supplierProductCode: item.supplierProductCode,
    handle: 'essential-rib-top',
    retailGrossEur: 34,
    priceEvidence: 'unit-test-price-record',
    variants: [{ sku: 'fixture-xs', size: 'XS', measurementEvidence: 'unit-test-measurements', stockEvidence: 'unit-test-availability' }],
    images: images.map((publicPath) => ({ publicPath, altText: `Verified test fixture view of ${item.conceptName}` })),
    approvalRecord: 'approvals/records/fixture.md',
    approvedBy: 'Fixture reviewer',
    approvedAt: '2026-11-02',
  };
  return { readiness, visuals, manifest: { version: 1, mode: 'REVIEWED_PRODUCTS_ONLY', approvedProducts: [product] }, recordExists: () => true };
}

test('current preview remains empty and explicitly non-commercial', () => {
  const result = validateProductPublication(
    read('approvals/product-publication.json'),
    read('sourcing/first-drop-readiness.json'),
    read('approvals/visual-assets.json'),
    () => false,
  );
  assert.deepEqual(result, { mode: 'NO_PRODUCTS', count: 0 });
});

test('no products may be injected while the manifest is locked', () => {
  const f = preparedFixture();
  f.manifest.mode = 'NO_PRODUCTS';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /may not declare/);
});

test('unapproved sourcing and owner release cannot be bypassed by a manifest', () => {
  const f = preparedFixture();
  const notReady = read('sourcing/first-drop-readiness.json');
  assert.throws(() => validateProductPublication(f.manifest, notReady, f.visuals, f.recordExists), /NO-GO/);
  f.readiness.globalGates.founderWrittenRelease.status = 'PENDING';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /founderWrittenRelease/);
});

test('complete in-memory example passes without authorizing actual merchandise', () => {
  const f = preparedFixture();
  assert.deepEqual(validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists),
    { mode: 'REVIEWED_PRODUCTS_ONLY', count: 1 });
});

test('planned price alone, missing sizes and mismatched photos block publication', () => {
  const f = preparedFixture();
  f.readiness.items[0].approvedRetailGrossEur = undefined;
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /research target/);
  f.readiness.items[0].approvedRetailGrossEur = 34;
  f.manifest.approvedProducts[0].variants = [];
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /verified size/);
  f.manifest.approvedProducts[0].variants = [{ sku: 'fixture-xs', size: 'XS', measurementEvidence: 'unit-test-measurements', stockEvidence: 'unit-test-availability' }];
  f.visuals.approvedAssets[0].sampleReference = 'wrong-sample';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /match its verified supplier sample/);
});

test('held products and missing release records remain blocked', () => {
  const f = preparedFixture();
  f.readiness.items[0].reviewStage = 'HOLD';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /held product/);
  f.readiness.items[0].reviewStage = 'SAMPLE_RESEARCH_PRIORITY';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, () => false), /Missing recorded approval/);
});

test('approved imagery still requires descriptive accessible alt text', () => {
  const f = preparedFixture();
  f.manifest.approvedProducts[0].images[0].altText = '';
  assert.throws(() => validateProductPublication(f.manifest, f.readiness, f.visuals, f.recordExists), /alt text/);
});
