import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces, conceptSlug, fashionCategories, formatTargetPrice } from '../src/womenswearCatalog.ts';
import { publicSeoUrl } from '../src/seo.ts';

const read = (path) => fs.readFileSync(path, 'utf8');

// Maintain the internal planning data without exposing concepts to visitors.
assert.equal(conceptPieces.length, 20);
assert.equal(fashionCategories.length, 5);
const slugs = new Set();
for (const piece of conceptPieces) {
  const slug = conceptSlug(piece.name);
  assert.ok(slug && !slugs.has(slug));
  assert.ok(fashionCategories.some((item) => item.id === piece.category));
  assert.ok(Number.isInteger(piece.targetPrice));
  assert.ok(piece.targetPrice >= 34 && piece.targetPrice <= 59);
  assert.ok([4, 9].includes(piece.targetPrice % 10));
  assert.equal(formatTargetPrice(piece.targetPrice), `€${piece.targetPrice}`);
  slugs.add(slug);
}
for (const category of fashionCategories) {
  const pieces = conceptPieces.filter((piece) => piece.category === category.id);
  assert.equal(category.count, pieces.length);
  assert.equal(category.priceRange, `€${Math.min(...pieces.map((piece) => piece.targetPrice))}–€${Math.max(...pieces.map((piece) => piece.targetPrice))}`);
}

assert.equal(publicSeoUrl('/', { protocol: 'file:', origin: 'null' }), null);
assert.equal(publicSeoUrl('/', { protocol: 'https:', origin: 'https://everne.example' }), 'https://everne.example/');

const entry = read('src/main.tsx');
const landing = read('src/EvernePreview.tsx');
const styles = read('src/everne-editorial.css');
const index = read('index.html');
const legal = read('public/legal.html');

assert.match(entry, /<EvernePreview page="home"/);
assert.match(entry, /path="\/care"/);
assert.match(entry, /path="\/standards"/);
assert.doesNotMatch(entry, /ConceptDetailPage|WomenswearApp|CarePage|src\/App|path="\/edit/);
assert.match(entry, /<RouteFocus \/>/);
assert.match(entry, /HashRouter/);
assert.match(index, /noindex,nofollow/);
assert.match(index, /<html lang="en">/);
assert.doesNotMatch(index, /€34|€59|20 planned/);
assert.match(index, /Womenswear in Preparation/);
assert.ok(fs.existsSync('research-assets/editorial/CREDITS.md'), 'Internal editorial photo attribution must be retained');
assert.ok(fs.existsSync('research-assets/products/garment-brush/catalog.webp'), 'Internal care photo reference must be retained');
assert.ok(!fs.existsSync('public/editorial') && !fs.existsSync('public/products'),
  'Unapproved photography cannot remain in public/');

for (const section of ['WOMENSWEAR', 'THE STANDARD', 'CARE', 'THE COLLECTION', 'OUR APPROACH']) {
  assert.ok(landing.includes(section), `Missing editorial navigation or chapter: ${section}`);
}
assert.match(landing, /NO APPROVED PRODUCT PHOTOGRAPHY YET/);
assert.match(landing, /No garments are available to order/);
assert.match(landing, /external suppliers/);
assert.match(landing, /No active sales/);
assert.match(landing, /legal.html#imprint/);
assert.match(landing, /legal.html#privacy/);
assert.match(landing, /legal.html#shipping/);
assert.doesNotMatch(landing, /<img\b|<picture\b|backgroundImage|editorialImage\(/i,
  'Public sections must not display unapproved campaign or product photography');
assert.doesNotMatch(landing, /<form\b|<input\b|Add to cart|Buy now|href=["'][^"']*checkout/i,
  'No interactive commerce, price or subscription placeholders while products are unapproved');
assert.doesNotMatch(landing, /formatTargetPrice|conceptPieces|\.targetPrice/,
  'Planning data must not appear on the customer-facing website');

for (const color of ['#191919', '#38332f', '#777268', '#d8d1c7', '#f1efeb']) {
  assert.ok(styles.includes(color), `Palette token missing: ${color}`);
}
assert.match(styles, /@media \(max-width: 650px\)/);
assert.match(styles, /prefers-reduced-motion/);
assert.doesNotMatch(styles, /@import|url\(\s*['"]?https?:/i);

assert.match(legal, /<html lang="en">/);
assert.match(legal, /noindex,nofollow/);
for (const anchor of ['imprint', 'privacy', 'returns', 'shipping']) {
  assert.ok(legal.includes(`id="${anchor}"`));
}

console.log('EVERNE image-free editorial validation passed: private concept plan retained, public imagery and prices absent, responsive palette and non-commerce routes checked.');
