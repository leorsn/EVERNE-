import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces, conceptSlug, fashionCategories } from '../src/womenswearCatalog.ts';

assert.equal(conceptPieces.length, 20, 'The first fashion edit must have 20 planning concepts');
assert.equal(fashionCategories.length, 5, 'The fashion edit must have five categories');

const slugs = new Set();
for (const piece of conceptPieces) {
  const slug = conceptSlug(piece.name);
  assert.ok(slug && !slugs.has(slug), `Invalid or duplicate concept route: ${slug}`);
  assert.ok(piece.targetPrice >= 30 && piece.targetPrice <= 60, `Price target outside 30–60 EUR: ${piece.name}`);
  assert.ok(fashionCategories.some((category) => category.id === piece.category), `Unknown category: ${piece.name}`);
  slugs.add(slug);
}

for (const category of fashionCategories) {
  const count = conceptPieces.filter((piece) => piece.category === category.id).length;
  assert.equal(category.count, count, `Incorrect category count for ${category.id}`);
}

const entry = fs.readFileSync('src/main.tsx', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(entry.includes('path="/edit/:slug"'), 'A route to the concept detail page is required');
assert.ok(entry.includes('WomenswearApp'), 'The entry must render the women’s fashion preview');
assert.ok(!entry.includes("import App from './App'"), 'The old store must not be loaded as the active app');
assert.ok(indexHtml.includes('noindex,nofollow'), 'The fashion preview must stay out of search indexes');

console.log(`EVERNE WOMAN validation passed: ${conceptPieces.length} concepts, ${fashionCategories.length} category counts, distinct routes, €30–60 targets, noindex and active app guard.`);
