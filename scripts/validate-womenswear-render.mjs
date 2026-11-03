import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';

// The 20 product pages must stay visually consistent after the light redesign.
const editorialStyles = readFileSync(new URL('../src/everne-editorial.css', import.meta.url), 'utf8');
const lightEdition = editorialStyles.split('/* EVERNE / LIGHT EDITION')[1];
assert.ok(lightEdition, 'The light editorial theme must be present');
assert.match(lightEdition, /color-scheme:\s*light/, 'Use light native form controls');
assert.match(lightEdition, /--e-paper:\s*#fafafa/, 'Use a near-white canvas');
for (const selector of ['.e-header', '.e-shop-nav', '.e-hero-copy', '.e-wardrobe', '.e-collection-page', '.e-product-page', '.e-sidebar-desktop', '.e-related-item', '.e-footer']) {
  assert.ok(lightEdition.includes(selector), `The light theme must cover ${selector}`);
}
assert.match(lightEdition, /\.e-collection-list/, 'The light theme must support a compact text-led collection layout');
assert.match(lightEdition, /\.e-featured-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*repeat\(5,/, 'The home edit should use the five-column reference rhythm');
assert.match(lightEdition, /\.e-shop-shell \.e-collection-grid:not\(\.e-collection-list\)\s*\{\s*grid-template-columns:\s*repeat\(5,/, 'The desktop collection should use five edge-to-edge columns');
assert.match(lightEdition, /\.e-shop-shell-product \.e-product-page\s*\{[^}]*grid-template-columns:\s*minmax\(0, 50%\) minmax\(0, 50%\)/, 'The desktop product detail should use a split image and information layout');
assert.match(lightEdition, /\.e-shop-shell \.e-collection-grid:not\(\.e-collection-list\) \.e-collection-card-description\s*\{\s*display:\s*none;/, 'The merchandise grid should keep long copy on detail pages and in list view');

const vite = await createServer({
  appType: 'custom', configFile: false, logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { default: EvernePreview } = await vite.ssrLoadModule('/src/EvernePreview.tsx');
  const { default: ProductPhotoGallery } = await vite.ssrLoadModule('/src/ProductPhotoGallery.tsx');
  const { ProductSizeInformation, ProductFactsAccordion } = await vite.ssrLoadModule('/src/ProductReviewFacts.tsx');
  const { default: ProductCardImage } = await vite.ssrLoadModule('/src/ProductCardImage.tsx');
  const { productDrafts } = await vite.ssrLoadModule('/src/productDrafts.ts');

  const pendingGallery = renderToStaticMarkup(React.createElement(ProductPhotoGallery));
  assert.match(pendingGallery, /Photograph pending/);
  assert.equal((pendingGallery.match(/<img\b/g) ?? []).length, 0);
  // Synthetic in-memory imagery verifies future layout only; no test image is deployed.
  const reviewedGallery = renderToStaticMarkup(React.createElement(ProductPhotoGallery, {
    photos: [
      { publicPath: '/test-only/sample-front.jpg', altText: 'Sample garment front view for the presentation test' },
      { publicPath: '/test-only/sample-back.jpg', altText: 'Sample garment back view for the presentation test' },
    ],
  }));
  assert.equal((reviewedGallery.match(/<img\b/g) ?? []).length, 2);
  assert.match(reviewedGallery, /loading="lazy"/);
  assert.match(reviewedGallery, /Sample garment front view/);
  assert.doesNotMatch(reviewedGallery, /Photograph pending|add to cart|checkout/i);

  const pendingSizes = renderToStaticMarkup(React.createElement(ProductSizeInformation));
  const pendingFacts = renderToStaticMarkup(React.createElement(ProductFactsAccordion));
  assert.match(pendingSizes, /AWAITING FIT APPROVAL/);
  assert.match(pendingFacts, /Details under review/);
  assert.doesNotMatch(pendingSizes + pendingFacts, /<button\b|<input\b|€\d+/i);
  // Synthetic in-memory values: test markup only, never shipping or product claims.
  const fixtureFacts = {
    retailGrossEur: 49,
    sizeLabels: ['S', 'M'], colours: ['Black'],
    fitNote: 'Fixture: size notes confirmed for illustration only.',
    composition: 'Fixture: fabric label only.',
    careInstructions: 'Fixture: care label only.',
    deliveryTerms: 'Fixture: confirmed dispatch terms would appear here.',
    returnsTerms: 'Fixture: confirmed returns terms would appear here.',
  };
  const reviewedSizes = renderToStaticMarkup(React.createElement(ProductSizeInformation, { facts: fixtureFacts }));
  const reviewedFacts = renderToStaticMarkup(React.createElement(ProductFactsAccordion, { facts: fixtureFacts }));
  assert.match(reviewedSizes, /VERIFIED SIZES/);
  assert.match(reviewedSizes, /€49/);
  assert.match(reviewedFacts, /Material &amp; care/);
  assert.match(reviewedFacts, /Delivery &amp; returns/);
  assert.doesNotMatch(reviewedSizes + reviewedFacts, /<button\b|<form\b|<input\b|add to cart/i);

  const pendingCard = renderToStaticMarkup(React.createElement(ProductCardImage, { index: 1, total: 20 }));
  assert.match(pendingCard, /IMAGE PENDING/);
  assert.equal((pendingCard.match(/<img\b/g) ?? []).length, 0);
  const photoCard = renderToStaticMarkup(React.createElement(ProductCardImage, {
    index: 2, total: 20,
    photo: { publicPath: '/test-only/approved-card.jpg', altText: 'Test-only garment photograph, not a real EVERNE product' },
  }));
  assert.match(photoCard, /alt="Test-only garment photograph/);
  assert.match(photoCard, /loading="lazy"/);
  assert.doesNotMatch(photoCard, /IMAGE PENDING|buy now|add to cart/i);
  function renderPage(url) {
    const paths = [
      React.createElement(Route, { key: 'home', path: '/', element: React.createElement(EvernePreview, { page: 'home' }) }),
      React.createElement(Route, { key: 'care', path: '/care', element: React.createElement(EvernePreview, { page: 'care' }) }),
      React.createElement(Route, { key: 'standards', path: '/standards', element: React.createElement(EvernePreview, { page: 'standards' }) }),
      React.createElement(Route, { key: 'collection', path: '/collections/:category', element: React.createElement(EvernePreview, { page: 'collection' }) }),
      React.createElement(Route, { key: 'fallback', path: '*', element: React.createElement(EvernePreview, { page: 'home' }) }),
      React.createElement(Route, { key: 'product', path: '/products/:handle', element: React.createElement(EvernePreview, { page: 'product' }) }),
    ];
    return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [url] }, React.createElement(Routes, null, ...paths)));
  }

  function assertSafe(html, page) {
    assert.doesNotMatch(html, /<picture\b|<form\b|<input\b|<video\b/i, 'Preview must not contain order controls or video');
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
      assert.match(match[1], /^\/editorial-study\/[a-z0-9-]+\.jpg$/,
        'Only registered third-party editorial assets may appear');
    }
    assert.doesNotMatch(html, /href="[^"]*(?:\/cart|\/checkout)|>\s*(?:buy now|add to cart)\s*</i, `${page} must not link to sales`);
    assert.doesNotMatch(html, /€\d+|Price target|View all 20 concepts/i, `${page} must not expose unapproved products or prices`);
    assert.match(html, /no active sales|not yet available to order|No garments are available to order/i, `${page} must disclose the prelaunch status`);
    assert.match(html, /href="\/legal.html#imprint"/, `${page} must link to legal information`);
    assert.match(html, /href="\/standards"/, `${page} must link to supplier standards`);
    assert.match(html, /id="main"/, `${page} must have a skip-link target`);
  }

  const home = renderPage('/');
  assertSafe(home, '/');
  assert.match(home, /The first/);
  assert.match(home, /id="collection"/);
  assert.equal((home.match(/class="e-category"/g) ?? []).length, 5);
  assert.equal((home.match(/<img\b/g) ?? []).length, 6);
  assert.match(home, /not an EVERNE garment/i);
  assert.match(home, /Photographic styling references only/);
  assert.match(home, /href="\/care"/);
  assert.equal((home.match(/class="e-product-index-group"/g) ?? []).length, 0, 'Remove the long five-column product name list');
  assert.equal((home.match(/href="\/products\/[a-z0-9-]+"/g) ?? []).length, 5, 'Five editorial first-look links should lead directly to individual product studies');
  assert.equal((home.match(/class="e-featured-card"/g) ?? []).length, 5, 'Five opening studies should use the same product-card presentation');
  assert.equal((home.match(/class="e-featured-caption"/g) ?? []).length, 5, 'Each opening study should have its own compact product caption');
  assert.equal((home.match(/href="\/collections\/[a-z]+"/g) ?? []).length, 14, 'Header edit link, six category bar links, five image tiles and two collection CTAs');
  assert.match(home, /EXPLORE THE COLLECTION/, 'The opening edit should link to the complete twenty-piece index');
  assert.match(home, /aria-label="Shop by category"/);

  const all = renderPage('/collections/all');
  assertSafe(all, '/collections/all');
  assert.equal((all.match(/class="e-collection-card"/g) ?? []).length, 20, 'All pieces must show twenty product cards');
  assert.equal((all.match(/class="e-collection-card-status"/g) ?? []).length, 20, 'Every design card must disclose that it is not for sale');
  assert.equal((all.match(/class="e-collection-card-description"/g) ?? []).length, 20, 'Every design card must contain its unique editorial description');
  assert.equal((all.match(/class="e-collection-card-view"/g) ?? []).length, 20, 'Every design card should contain a clear navigation affordance');
  assert.equal((all.match(/class="e-collection-image-index"/g) ?? []).length, 20, 'The design index must label all twenty image placeholders');
  assert.match(all, /aria-label="Breadcrumb"/, 'The collection needs navigation back to EVERNE');
  assert.match(all, /id="everne-sort"/, 'The full collection must have a restrained sort control');
  assert.match(all, /Name A–Z/, 'The sort control must offer alphabetic ordering');
  assert.match(all, /class="e-view-switch" role="group" aria-label="Collection layout"/, 'The collection must offer accessible grid and list controls');
  assert.match(all, /aria-pressed="true">GRID<\/button>/, 'The initial layout must default to the photograph-first grid');
  assert.match(all, /aria-pressed="false">LIST<\/button>/, 'The list control must be a real stateful button');
  assert.equal((all.match(/class="e-collection-card-category"/g) ?? []).length, 20, 'The full edit must identify each item category');
  assert.equal((all.match(/class="e-collection-price-placeholder"/g) ?? []).length, 20, 'No unapproved prices should appear in the full edit');
  assert.equal((all.match(/class="e-sidebar-desktop"/g) ?? []).length, 1, 'The collection must expose desktop side navigation');
  assert.match(all, /class="e-sidebar-title">THE EDIT<\/span>/, 'The sidebar should not repeat the header WOMAN label');
  assert.equal((all.match(/class="e-sidebar-mobile"/g) ?? []).length, 1, 'The collection must have a compact mobile navigation drawer');
  assert.match(all, /class="e-shop-nav e-shop-nav-browse" aria-label="Shop by category"/, 'Collection navigation must be available on mobile');
  assert.equal((all.match(/<img\b/g) ?? []).length, 0, 'No unapproved product photography in the grid');
  assert.match(all, /aria-current="page" href="\/collections\/all"/);
  for (const category of ['tops', 'knitwear', 'trousers', 'dresses', 'skirts']) {
    const html = renderPage(`/collections/${category}`);
    assertSafe(html, `/collections/${category}`);
    const count = productDrafts.filter((product) => product.category === category).length;
    assert.equal((html.match(/class="e-collection-card"/g) ?? []).length, count,
      `${category} must display exactly its own products`);
    assert.equal((html.match(/class="e-collection-image-index"/g) ?? []).length, count,
      `${category} must preserve the correct design-index markers`);
    assert.equal((html.match(/href="\/products\/[a-z0-9-]+"/g) ?? []).length, count);
    assert.match(html, new RegExp(`aria-current="page" href="/collections/${category}"`));
    assert.match(html, /class="e-shop-nav e-shop-nav-browse" aria-label="Shop by category"/, `${category} needs direct mobile category navigation`);
    assert.equal((html.match(/<img\b/g) ?? []).length, 0);
  }
  const unknownCollection = renderPage('/collections/unknown');
  assertSafe(unknownCollection, '/collections/unknown');
  assert.match(unknownCollection, /Collection not found/);

  for (const product of productDrafts) {
    const url = `/products/${product.slug}`;
    const html = renderPage(url);
    assertSafe(html, url);
    assert.match(html, /Photograph pending/, `${product.name} must reserve image space without stock photos`);
    assert.ok(html.indexOf('class="e-product-heading"') < html.indexOf('class="e-product-gallery"'), `${product.name} must identify the garment before the photo placeholders on mobile`);
    assert.equal((html.match(/class="e-photo-slot-index"/g) ?? []).length, 3, `${product.name} must reserve three numbered photo positions`);
    assert.match(html, /Size information will appear only after garment measurements/, `${product.name} must explain the size-approval gate`);
    assert.match(html, /aria-label="Products in this category"/, `${product.name} must be reachable from the sidebar product navigation`);
    assert.match(html, /class="e-sidebar-section-label" aria-hidden="true">IN THIS CATEGORY<\/span>/,
      `${product.name} must distinguish category navigation from its product links`);
    assert.match(html, new RegExp(`aria-current="page" href="/products/${product.slug}"`), `${product.name} must be selected in the sidebar`);
    assert.match(html, /aria-label="Breadcrumb"/, `${product.name} needs a category breadcrumb`);
    assert.match(html, new RegExp(`href="/collections/${product.category}"`), `${product.name} needs a route back to its category`);
    assert.match(html, /class="e-shop-nav e-shop-nav-browse e-shop-nav-product" aria-label="Shop by category"/, `${product.name} needs direct mobile category navigation`);
    assert.match(html, new RegExp(`aria-current="location" href="/collections/${product.category}"`), `${product.name} must mark its category as the current location`);
    assert.match(html, /aria-label="Browse more pieces"/, `${product.name} needs previous and next navigation`);
    assert.equal((html.match(/class="e-related-item"/g) ?? []).length, 3, `${product.name} needs three related cross-category design links`);
    const siblings = productDrafts.filter((item) => item.category === product.category);
    const position = siblings.findIndex((item) => item.slug === product.slug);
    if (position > 0) {
      assert.match(html, new RegExp(`href="/products/${siblings[position - 1].slug}"`), `${product.name} needs its previous-category neighbour`);
    }
    if (position < siblings.length - 1) {
      assert.match(html, new RegExp(`href="/products/${siblings[position + 1].slug}"`), `${product.name} needs its next-category neighbour`);
    } else {
      assert.match(html, /ALL PIECES/, `${product.name} needs an exit to the full edit`);
    }
    assert.match(html, /NOT AVAILABLE TO ORDER/, `${product.name} must be expressly noncommercial`);
    assert.match(html, /class="e-product-disabled-cta" disabled=""/, `${product.name} must keep the prominent purchase-style area in a disabled state`);
    assert.match(html, /PRICE PENDING/, `${product.name} must not present an unapproved price`);
    assert.match(html, /No verified colour variants yet/, `${product.name} must not fabricate colour choices`);
    assert.match(html, /SIZE SELECTION/, `${product.name} must reserve size selection without inventing available sizes`);
    assert.match(html, /AWAITING FIT APPROVAL/, `${product.name} must explain why sizing is unavailable`);
    assert.doesNotMatch(html, /<button[^>]*>\s*(?:XS|S|M|L|XL)\s*<\/button>/, `${product.name} must not imply real size inventory`);
    assert.match(html, /Details under review/, `${product.name} must disclose pending specifications`);
    assert.match(html, /Composition &amp; care/, `${product.name} must not invent fabric composition`);
    assert.match(html, new RegExp(product.name), `${product.name} needs its own named detail page`);
    assert.equal((html.match(/<img\b/g) ?? []).length, 0, 'No editorial photo may masquerade as a product photograph');
  }

  const unknown = renderPage('/products/legacy-item');
  assertSafe(unknown, '/products/legacy-item');
  assert.match(unknown, /Page not found/);
  assert.doesNotMatch(unknown, /Essential Rib Top/);
  assert.match(home, /aria-current="page" href="\/"/,
    'Womenswear must expose the active navigation destination to assistive technology');

  const care = renderPage('/care');
  assertSafe(care, '/care');
  assert.match(care, /The care/);
  assert.match(care, /no products can be ordered here/);
  assert.equal((care.match(/<img\b/g) ?? []).length, 1);
  assert.match(care, /href="\/care"/, 'Care remains available in the restrained footer navigation');
  assert.match(care, /aria-current="page" href="\/care"/, 'Care must be discoverable and selected in the header');

  const standard = renderPage('/standards');
  assertSafe(standard, '/standards');
  assert.match(standard, /external suppliers/);
  assert.match(standard, /A product photograph must show the actual reviewed garment/);
  assert.equal((standard.match(/<img\b/g) ?? []).length, 1);
  assert.match(standard, /aria-current="page" href="\/standards"/);
  assert.equal((standard.match(/class="e-standard-row"/g) ?? []).length, 4);

  const withdrawnConcept = renderPage('/edit/essential-rib-top');
  assertSafe(withdrawnConcept, '/edit/essential-rib-top');
  assert.doesNotMatch(withdrawnConcept, /id="product-title"|€34/,
    'Retired concept routes may lead to the draft index, never directly to a detail page or price');
  assert.match(withdrawnConcept, /The first/);

  console.log('EVERNE React render passed: six wardrobe styling references, no commerce, checkout or unapproved prices.');
} finally {
  await vite.close();
}
