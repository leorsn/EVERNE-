import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces, conceptSlug } from '../src/womenswearCatalog.ts';

// This is an internal Shopify Admin reconciliation, not a Storefront API feed.
// A published product must pass the independent release gates first.
const manifest = JSON.parse(fs.readFileSync('ops/shopify-womenswear-drafts.json', 'utf8'));
const publication = JSON.parse(fs.readFileSync('approvals/product-publication.json', 'utf8'));

assert.equal(manifest.version, 1);
assert.equal(manifest.mode, 'DRAFT_ONLY');
assert.equal(manifest.commerceEnabled, false);
assert.equal(manifest.supplierAndPrivateLabelVerified, false);
assert.equal(publication.mode, 'NO_PRODUCTS', 'Unapproved Shopify drafts may not enable storefront publication');
assert.deepEqual(publication.approvedProducts, []);
assert.equal(manifest.products.length, 20, 'The private Shopify manifest must map all 20 concepts');
assert.equal(conceptPieces.length, 20);

const gids = new Set();
for (let index = 0; index < conceptPieces.length; index += 1) {
  const concept = conceptPieces[index];
  const record = manifest.products[index];
  assert.equal(record.position, index + 1);
  assert.equal(record.title, concept.name);
  assert.equal(record.slug, conceptSlug(concept.name));
  assert.equal(record.category, concept.category);
  assert.equal(record.referencePriceEur, concept.targetPrice);
  assert.match(record.shopifyProductId, /^gid:\/\/shopify\/Product\/[0-9]+$/);
  assert.ok(!gids.has(record.shopifyProductId), `Shopify product reused for two concepts: ${record.title}`);
  gids.add(record.shopifyProductId);
  assert.equal(record.shopifyStatus, 'DRAFT', `Unapproved product must remain a draft: ${record.title}`);
  assert.equal(record.inventoryQuantity, 0, `Unverified product must not indicate stock: ${record.title}`);
  for (const gate of ['finalPriceApproved', 'supplierApproved', 'ownLabelApproved', 'imagesApproved']) {
    assert.equal(record[gate], false, `Release evidence is missing: ${record.title} / ${gate}`);
  }
}

console.log('EVERNE Shopify draft handoff: 20 unique Admin products mapped to 20 concepts; all DRAFT, stock 0, launch NO-GO.');
