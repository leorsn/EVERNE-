import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces, conceptSlug, fashionCategories, formatTargetPrice } from '../src/womenswearCatalog.ts';
import { collectionReturnLink, conceptLink, editViewSearch, parseEditView } from '../src/womenswearNavigation.ts';

assert.deepEqual(parseEditView(''), { category: 'all', showAll: false });
assert.deepEqual(parseEditView('?category=trousers'), { category: 'trousers', showAll: false });
assert.deepEqual(parseEditView('?view=all'), { category: 'all', showAll: true });
assert.deepEqual(parseEditView('?category=unknown&view=all'), { category: 'all', showAll: true });
assert.deepEqual(parseEditView('?category=tops&view=all'), { category: 'tops', showAll: false });
assert.equal(editViewSearch({ category: 'all', showAll: false }), '');
assert.equal(editViewSearch({ category: 'all', showAll: true }), '?view=all');
assert.equal(editViewSearch({ category: 'knitwear', showAll: false }), '?category=knitwear');
assert.equal(conceptLink('Essential Rib Top', { category: 'tops', showAll: false }), '/edit/essential-rib-top?category=tops');
assert.equal(collectionReturnLink('?category=tops'), '/?category=tops#edit');
assert.equal(collectionReturnLink('?view=all'), '/?view=all#edit');
assert.equal(collectionReturnLink('?category=no-such-category'), '/#edit');

assert.equal(conceptPieces.length, 20, 'The first fashion edit must have 20 planning concepts');
assert.equal(fashionCategories.length, 5, 'The fashion edit must have five categories');

const slugs = new Set();
for (const piece of conceptPieces) {
  const slug = conceptSlug(piece.name);
  assert.ok(slug && !slugs.has(slug), `Invalid or duplicate concept route: ${slug}`);
  assert.ok(piece.targetPrice >= 34 && piece.targetPrice <= 59, `Price target outside 34–59 EUR: ${piece.name}`);
  assert.ok(Number.isInteger(piece.targetPrice), `Price target must be a whole euro: ${piece.name}`);
  assert.ok([4, 9].includes(piece.targetPrice % 10), `Price target must end in 4 or 9: ${piece.name}`);
  assert.equal(formatTargetPrice(piece.targetPrice), `€${piece.targetPrice}`, `Price formatting must omit cents: ${piece.name}`);
  assert.ok(fashionCategories.some((category) => category.id === piece.category), `Unknown category: ${piece.name}`);
  slugs.add(slug);
}

for (const category of fashionCategories) {
  const count = conceptPieces.filter((piece) => piece.category === category.id).length;
  assert.equal(category.count, count, `Incorrect category count for ${category.id}`);
  const categoryPrices = conceptPieces.filter((piece) => piece.category === category.id).map((piece) => piece.targetPrice);
  assert.equal(category.priceRange, `€${Math.min(...categoryPrices)}–€${Math.max(...categoryPrices)}`, `Incorrect price range for ${category.id}`);
}

const entry = fs.readFileSync('src/main.tsx', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(entry.includes('path="/edit/:slug"'), 'A route to the concept detail page is required');
assert.ok(entry.includes('WomenswearApp'), 'The entry must render the women’s fashion preview');
assert.ok(entry.includes('<RouteFocus />'), 'Client-side route changes must restore keyboard focus to page headings');
assert.ok(!entry.includes("import App from './App'"), 'The old store must not be loaded as the active app');
assert.ok(indexHtml.includes('noindex,nofollow'), 'The fashion preview must stay out of search indexes');
assert.ok(indexHtml.includes('<html lang="en">'), 'The fashion preview must explicitly use English');
assert.ok(indexHtml.includes('€34–€59'), 'Static page metadata must show the updated whole-euro planned price range');

const englishLegal = fs.readFileSync('public/legal.html', 'utf8');
assert.ok(englishLegal.includes('<html lang="en">'), 'An English legal information page is required');
assert.ok(englishLegal.includes('noindex,nofollow'), 'English prelaunch legal information must remain unindexed');
for (const anchor of ['imprint', 'privacy', 'returns', 'shipping']) {
  assert.ok(englishLegal.includes(`id="${anchor}"`), `Missing legal footer target: ${anchor}`);
}

const homepage = fs.readFileSync('src/WomenswearApp.tsx', 'utf8');
assert.ok(homepage.includes('legal.html#imprint'), 'The English footer must link to the English legal notice');
assert.ok(homepage.includes('Shopping not yet available'), 'The preview status must remain clear in English');
assert.ok(homepage.includes('Our size range is not confirmed yet.'), 'Size FAQ must clearly state sizes are not confirmed');
assert.ok(homepage.includes('exact garment measurements and fit guidance'), 'Size FAQ must promise product-specific measurements before launch');
assert.ok(!homepage.includes('mostly XS–XL'), 'Do not imply unverified XS–XL availability');
assert.ok(homepage.includes('aria-pressed={activeStyle === index}'), 'Style Notes must expose the selected mood to assistive technology');
assert.ok(homepage.includes('aria-pressed={category === item.id}'), 'Category filter buttons must announce their selected state');
assert.ok(homepage.includes('aria-live="polite"'), 'Filtered result counts must be announced without forcing focus');
assert.ok(homepage.includes('prefersReducedMotion ? \'auto\' : \'smooth\''), 'Reduced-motion users must not be forced into smooth scrolling');
assert.ok(homepage.includes("event.key === 'Escape'"), 'Mobile navigation must close on Escape');
assert.ok(homepage.includes('menuToggleRef.current?.focus()'), 'Closing the mobile menu with Escape must restore keyboard focus');
assert.ok(homepage.includes("aria-controls={'woman-faq-answer-' + index}"), 'FAQ controls need a persistent panel relationship');
assert.ok(homepage.includes("hidden={openQuestion !== index}"), 'Closed FAQ content must remain associated but hidden');
assert.ok(!homepage.includes('Autumn / Winter 26'), 'Unconfirmed supplier garments must not be marketed as an approved seasonal collection');
assert.ok(homepage.includes('Styling inspiration only.'), 'The styling section must not imply confirmed products');
assert.ok(homepage.includes('parseEditView(location.search)'), 'The selected edit must be restored from the URL');
assert.ok(homepage.includes('id="edit-title" tabIndex={-1}'), 'The returned edit heading must allow programmatic keyboard focus');
assert.ok(homepage.includes('conceptLink(piece.name, editView)'), 'Concept links must retain their originating filter');
assert.ok(homepage.includes("location.hash !== '#edit'"), 'The collection return hash must be restored on home mount');
assert.ok(homepage.includes('€34–€59'), 'Homepage must show the updated whole-euro planned price range');
assert.ok(englishLegal.includes('€34 and €59'), 'Legal prelaunch notice must show the updated planned price range');

const conceptDetail = fs.readFileSync('src/ConceptDetailPage.tsx', 'utf8');
assert.ok(conceptDetail.includes('collectionReturnLink(location.search)'), 'Detail links must restore collection filters on return');
assert.ok(conceptDetail.includes('conceptLink(item.name, originatingView)'), 'Related concepts must retain the originating selection');
assert.ok(conceptDetail.includes('id="piece-title" tabIndex={-1}'), 'Concept headings must support route-change focus');

const routeFocus = fs.readFileSync('src/RouteFocus.tsx', 'utf8');
assert.ok(routeFocus.includes('previousPath.current !== location.pathname'), 'Focus should move only when the active page changes');
assert.ok(routeFocus.includes("location.hash === '#edit'"), 'Returning from a concept should focus the edit heading');
assert.ok(routeFocus.includes('focus({ preventScroll: true })'), 'Focus must not undo the restored collection scroll position');

const pendingPage = fs.readFileSync('src/CollectionPendingPage.tsx', 'utf8');
assert.ok(pendingPage.includes('href="#pending-main"'), 'Pending pages need a keyboard skip link');
assert.ok(pendingPage.includes('tabIndex={-1}'), 'Pending heading must accept route-change focus');

const womenswearCss = fs.readFileSync('src/womenswear.css', 'utf8');
assert.ok(!womenswearCss.includes('fonts.googleapis.com') && !womenswearCss.includes('@import url('),
  'Editorial preview should not request third-party web fonts');
assert.ok(womenswearCss.includes('--sans: -apple-system, BlinkMacSystemFont'),
  'Preview must have a complete system font stack for a resilient, fast render');
assert.ok(womenswearCss.includes('.w-style-piece-grid { grid-template-columns: repeat(2,minmax(0,1fr));'),
  'Narrow mobile screens need two readable style columns instead of three cramped columns');
assert.ok(womenswearCss.includes('.w-category-title { font-size: clamp(24px,6vw,34px); flex-wrap: wrap;'),
  'Category titles must wrap without clipping when paired with an arrow on mobile');

console.log(`EVERNE WOMAN validation passed: ${conceptPieces.length} concepts, ${fashionCategories.length} category counts, distinct routes, whole-euro 4/9 targets (€34–€59), English pages, noindex and active app guard.`);
