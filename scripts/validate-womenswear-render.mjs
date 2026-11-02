import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';

const vite = await createServer({
  appType: 'custom', configFile: false, logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { default: EvernePreview } = await vite.ssrLoadModule('/src/EvernePreview.tsx');
  const { productDrafts } = await vite.ssrLoadModule('/src/productDrafts.ts');
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
  assert.match(home, /NOT AN EVERNE GARMENT/);
  assert.match(home, /PHOTOGRAPHIC STYLE REFERENCES ONLY/);
  assert.match(home, /href="\/care"/);
  assert.equal((home.match(/class="e-product-index-group"/g) ?? []).length, 0, 'Remove the long five-column product name list');
  assert.equal((home.match(/href="\/products\/[a-z0-9-]+"/g) ?? []).length, 0, 'Product cards live inside categories');
  assert.equal((home.match(/href="\/collections\/[a-z]+"/g) ?? []).length, 13, 'Six category bar links, five image tiles and two collection CTAs');
  assert.match(home, /aria-label="Shop by category"/);

  const all = renderPage('/collections/all');
  assertSafe(all, '/collections/all');
  assert.equal((all.match(/class="e-collection-card"/g) ?? []).length, 20, 'All pieces must show twenty product cards');
  assert.equal((all.match(/<img\b/g) ?? []).length, 0, 'No unapproved product photography in the grid');
  assert.match(all, /aria-current="page" href="\/collections\/all"/);
  for (const category of ['tops', 'knitwear', 'trousers', 'dresses', 'skirts']) {
    const html = renderPage(`/collections/${category}`);
    assertSafe(html, `/collections/${category}`);
    const count = productDrafts.filter((product) => product.category === category).length;
    assert.equal((html.match(/class="e-collection-card"/g) ?? []).length, count,
      `${category} must display exactly its own products`);
    assert.equal((html.match(/href="\/products\/[a-z0-9-]+"/g) ?? []).length, count);
    assert.match(html, new RegExp(`aria-current="page" href="/collections/${category}"`));
    assert.equal((html.match(/<img\b/g) ?? []).length, 0);
  }
  const unknownCollection = renderPage('/collections/unknown');
  assertSafe(unknownCollection, '/collections/unknown');
  assert.match(unknownCollection, /Collection not found/);

  for (const product of productDrafts) {
    const url = `/products/${product.slug}`;
    const html = renderPage(url);
    assertSafe(html, url);
    assert.match(html, /IMAGE<br\/>PENDING/, `${product.name} must reserve image space without stock photos`);
    assert.match(html, /NOT AVAILABLE TO ORDER/, `${product.name} must be expressly noncommercial`);
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
  assert.match(care, /aria-current="page" href="\/care"/);

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
