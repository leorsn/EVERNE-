import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const requiredItemGates = [
  'supplierQuote',
  'fitAndFabricSample',
  'verifiedVariantStock',
  'licensedProductPhotography',
  'labelAndSafetyEvidence',
  'founderMerchandisingApproval',
];

function recordRef(reference, exists, label) {
  assert.ok(typeof reference === 'string' &&
    /^approvals\/records\/[a-zA-Z0-9_.-]+\.md$/.test(reference),
    `A local, reviewable approval record is required: ${label}`);
  assert.ok(exists(reference), `Missing recorded approval: ${label} / ${reference}`);
}

function evidenceReference(reference, label) {
  assert.ok(typeof reference === 'string' && reference.trim().length >= 6,
    `A specific evidence reference is required: ${label}`);
}

function verified(gate, label) {
  assert.equal(gate?.status, 'VERIFIED', `Unverified publication gate: ${label}`);
  evidenceReference(gate.evidence?.reference, label);
  assert.match(gate.evidence?.verifiedAt ?? '', /^\d{4}-\d{2}-\d{2}$/,
    `Dated evidence is required: ${label}`);
  assert.ok(typeof gate.evidence?.reviewedBy === 'string' && gate.evidence.reviewedBy.trim().length >= 3,
    `A named evidence reviewer is required: ${label}`);
}

/** A future release must pass independent sourcing, rights, and owner gates. */
export function validateProductPublication(manifest, readiness, visuals, recordExists) {
  assert.equal(manifest.version, 1, 'Unknown product publication manifest version');
  assert.ok(['NO_PRODUCTS', 'REVIEWED_PRODUCTS_ONLY'].includes(manifest.mode),
    'Product publication mode must be explicit');
  assert.ok(Array.isArray(manifest.approvedProducts), 'approvedProducts must be a list');

  if (manifest.mode === 'NO_PRODUCTS') {
    assert.equal(manifest.approvedProducts.length, 0,
      'A NO_PRODUCTS preview may not declare any products for publication');
    return { mode: manifest.mode, count: 0 };
  }

  assert.ok(manifest.approvedProducts.length > 0,
    'A reviewed-products transition needs at least one explicitly approved item');
  assert.equal(readiness.status, 'GO', 'Sourcing release decision remains NO-GO');
  assert.equal(readiness.approvedForSale, true, 'Sale approval cannot be inferred from sample research');
  assert.equal(readiness.storefrontPublicationAuthorized, true,
    'The founder has not authorised storefront publication');
  for (const [name, gate] of Object.entries(readiness.globalGates ?? {})) {
    verified(gate, `global / ${name}`);
  }
  const requiredGlobal = [
    'authenticatedWholesalePrices', 'ownLabelGermanyCourierQuote', 'dropshipMultiSkuPackaging',
    'shopifyIntegrationRecurringCost', 'dropshipMerchantReturnContract',
    'consumerWithdrawalWorkflow', 'germanyReturnAddressAndCosts',
    'commercialImageAndCopyRights', 'textileAndProductSafetyLabels',
    'finalLandingCostAndReturnEconomics', 'shopifyTestOrderAndPrivacy', 'founderWrittenRelease',
  ];
  for (const name of requiredGlobal) verified(readiness.globalGates?.[name], `global / ${name}`);
  assert.equal(visuals.previewMode, 'REVIEWED_ASSETS_ONLY',
    'Published products require independently approved, licensed imagery');
  assert.ok(Array.isArray(visuals.approvedAssets), 'The image approval manifest is missing');

  const imageRecords = new Map(visuals.approvedAssets.map((image) => [image.publicPath, image]));
  const handles = new Set();
  const supplierCodes = new Set();
  for (const product of manifest.approvedProducts) {
    const code = product?.supplierProductCode;
    const name = product?.handle ?? code ?? 'unknown product';
    assert.ok(typeof code === 'string' && code.length >= 5,
      'A publication record must identify its exact supplier product');
    assert.ok(typeof product.handle === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.handle),
      `A stable public handle is required: ${name}`);
    assert.ok(!handles.has(product.handle) && !supplierCodes.has(code),
      `Duplicate public handle or supplier SKU: ${name}`);
    handles.add(product.handle);
    supplierCodes.add(code);

    const item = readiness.items?.find((candidate) => candidate.supplierProductCode === code);
    assert.ok(item, `The publication SKU must exist in the reviewed first-drop register: ${code}`);
    assert.notEqual(item.reviewStage, 'HOLD', `A held product cannot be published: ${name}`);
    assert.equal(item.approvedForSale, true, `Item sale approval is missing: ${name}`);
    for (const gate of requiredItemGates) verified(item[gate], `${name} / ${gate}`);

    assert.ok(Number.isInteger(product.retailGrossEur) && [4, 9].includes(product.retailGrossEur % 10),
      `Only the approved whole-euro 4/9 price style is accepted: ${name}`);
    assert.equal(product.retailGrossEur, item.approvedRetailGrossEur,
      `A research target is not an approved final consumer price: ${name}`);
    evidenceReference(product.priceEvidence, `${name} / final retail price`);

    assert.ok(Array.isArray(product.variants) && product.variants.length > 0,
      `At least one verified size/stock variant is required: ${name}`);
    const variantIds = new Set();
    for (const variant of product.variants) {
      assert.ok(typeof variant.sku === 'string' && variant.sku.trim().length >= 4,
        `Supplier variant SKU required: ${name}`);
      assert.ok(!variantIds.has(variant.sku), `Duplicate variant SKU: ${name} / ${variant.sku}`);
      variantIds.add(variant.sku);
      assert.ok(typeof variant.size === 'string' && variant.size.trim().length > 0,
        `An actual size label is required: ${name}`);
      evidenceReference(variant.measurementEvidence, `${name} / ${variant.sku} / measurements`);
      evidenceReference(variant.stockEvidence, `${name} / ${variant.sku} / stock`);
    }

    assert.ok(Array.isArray(product.images) && product.images.length >= 2,
      `Approved product and detail photographs are required: ${name}`);
    assert.equal(new Set(product.images.map((image) => image.publicPath)).size, product.images.length,
      `Duplicate photograph: ${name}`);
    for (const image of product.images) {
      assert.ok(typeof image.altText === 'string' && image.altText.trim().length >= 12,
        `An accurate descriptive image alt text is required: ${name}`);
      const approval = imageRecords.get(image.publicPath);
      assert.ok(approval && approval.sampleReference === code,
        `The product image must match its verified supplier sample: ${name} / ${image.publicPath}`);
      recordRef(approval.approvalRecord, recordExists, `${name} / image rights`);
    }

    recordRef(product.approvalRecord, recordExists, `${name} / founder release`);
    assert.ok(typeof product.approvedBy === 'string' && product.approvedBy.trim().length >= 3,
      `Named founder release required: ${name}`);
    assert.match(product.approvedAt ?? '', /^\d{4}-\d{2}-\d{2}$/,
      `Dated founder release required: ${name}`);
  }
  return { mode: manifest.mode, count: manifest.approvedProducts.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = (name) => JSON.parse(fs.readFileSync(name, 'utf8'));
  const result = validateProductPublication(
    read('approvals/product-publication.json'),
    read('sourcing/first-drop-readiness.json'),
    read('approvals/visual-assets.json'),
    (record) => fs.existsSync(path.join(process.cwd(), record)),
  );
  console.log(`Product publication gate passed: ${result.mode}; ${result.count} products authorised in the manifest. No automatic Shopify or website publication.`);
}
