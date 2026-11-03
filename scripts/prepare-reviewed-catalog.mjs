import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateProductPublication } from './validate-product-publication.mjs';

const categories = new Set(['tops', 'knitwear', 'trousers', 'dresses', 'skirts']);
const unfinished = /\b(?:pending|placeholder|tbd|unconfirmed|fixture|draft)\b/i;

function verifiedCopy(value, label, minimum = 8) {
  assert.ok(typeof value === 'string' && value.trim().length >= minimum,
    `${label}: verified customer-facing copy is missing`);
  assert.doesNotMatch(value, unfinished, `${label}: unfinished copy is not release-ready`);
  return value.trim();
}

function verifiedList(value, label) {
  assert.ok(Array.isArray(value) && value.length > 0, `${label}: at least one confirmed entry is required`);
  const entries = value.map((entry) => verifiedCopy(entry, label, 2));
  assert.equal(new Set(entries).size, entries.length, `${label}: duplicate entries`);
  return entries;
}

/** Offline handoff only. It never loads into the active website or activates commerce. */
export function prepareReviewedCatalog(manifest, readiness, visuals, recordExists) {
  const release = validateProductPublication(manifest, readiness, visuals, recordExists);
  if (release.mode === 'NO_PRODUCTS') return { status: 'BLOCKED_NO_PRODUCTS', products: [] };

  const products = manifest.approvedProducts.map((product) => {
    const item = readiness.items.find((candidate) => candidate.supplierProductCode === product.supplierProductCode);
    const copy = product.publicContent;
    assert.ok(copy && typeof copy === 'object', `${product.handle}: approved publicContent is required`);
    const title = verifiedCopy(copy.title, `${product.handle} / title`, 4);
    const category = copy.category;
    assert.ok(categories.has(category), `${product.handle}: unknown product category`);
    assert.equal(item.approvedPublicName, title, `${product.handle}: display name must match the reviewed supplier item`);
    assert.equal(item.approvedCategory, category, `${product.handle}: public category must match the founder-reviewed category`);

    const sizeLabels = [...new Set(product.variants.map((variant) => variant.size.trim()))];
    const photos = product.images.map((image) => {
      assert.match(image.publicPath, /^public\/products\/[a-z0-9/_-]+\.(?:avif|jpe?g|png|webp)$/,
        `${product.handle}: product photos must reside in the reviewed public/products/ area`);
      return { publicPath: image.publicPath.slice('public'.length), altText: image.altText.trim() };
    });

    return {
      handle: product.handle,
      title,
      category,
      description: verifiedCopy(copy.description, `${product.handle} / description`, 20),
      images: photos,
      facts: {
        retailGrossEur: product.retailGrossEur,
        sizeLabels,
        colours: verifiedList(copy.colours, `${product.handle} / colours`),
        fitNote: verifiedCopy(copy.fitNote, `${product.handle} / fit`, 12),
        composition: verifiedCopy(copy.composition, `${product.handle} / composition`),
        careInstructions: verifiedCopy(copy.careInstructions, `${product.handle} / care`),
        deliveryTerms: verifiedCopy(copy.deliveryTerms, `${product.handle} / delivery`, 12),
        returnsTerms: verifiedCopy(copy.returnsTerms, `${product.handle} / returns`, 12),
      },
    };
  });

  assert.equal(products.length, release.count, 'The handoff must cover every approved product');
  return { status: 'APPROVED_SOURCE_SNAPSHOT', products };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = (name) => JSON.parse(fs.readFileSync(name, 'utf8'));
  const snapshot = prepareReviewedCatalog(
    read('approvals/product-publication.json'),
    read('sourcing/first-drop-readiness.json'),
    read('approvals/visual-assets.json'),
    (record) => fs.existsSync(path.join(process.cwd(), record)),
  );

  if (process.argv.includes('--export')) {
    assert.equal(snapshot.status, 'APPROVED_SOURCE_SNAPSHOT', 'No reviewed product data can be exported');
    const destination = path.join(process.cwd(), 'review-output', 'approved-catalog.json');
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'w' });
    console.log(`Read-only local review snapshot written: ${snapshot.products.length} products; no site or Shopify publication.`);
  } else {
    console.log(`EVERNE product handoff: ${snapshot.status}; ${snapshot.products.length} products; no export or publication.`);
  }
}
