import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

const html = fs.readFileSync('next.html', 'utf8');
const entry = fs.readFileSync('src/trend-main.tsx', 'utf8');
const css = fs.readFileSync('src/trend-store.css', 'utf8');
assert.match(html, /noindex,nofollow/);
assert.match(html, /<html lang="en">/);
assert.match(entry, /HashRouter/);
assert.match(entry, /<RouteFocus \/>/);
assert.match(entry, /path="\/discover\/jewellery-bag"/);
assert.doesNotMatch(entry, /Shopify|Stripe|checkout/i);
assert.doesNotMatch(css, /@import|url\(\s*['"]?https?:/i);
assert.match(css, /@media \(max-width: 700px\)/);

const vite = await createServer({
  appType: 'custom', configFile: false, logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { default: TrendStorePreview } = await vite.ssrLoadModule('/src/TrendStorePreview.tsx');
  const { reviewedTrendProducts } = await vite.ssrLoadModule('/src/trendProducts.ts');
  const { trendCandidates } = await vite.ssrLoadModule('/src/trendCandidates.ts');
  assert.deepEqual(reviewedTrendProducts, [], 'Do not stage products from trend research as sale listings');
  assert.equal(trendCandidates.length, 1);
  assert.equal(trendCandidates[0].slug, 'jewellery-bag');

  for (const page of ['home', 'discover', 'candidate', 'standard', 'about', 'not-found']) {
    const rendered = renderToStaticMarkup(React.createElement(MemoryRouter, null,
      React.createElement(TrendStorePreview, { page })));
    assert.match(rendered, /EVERNE/);
    assert.match(rendered, /href="\/discover"/);
    assert.match(rendered, /href="\/standard"/);
    assert.match(rendered, /href="\/about"/);
    assert.match(rendered, /href="\/legal.html#imprint"/);
    assert.match(rendered, /href="\/legal.html#privacy"/);
    assert.match(rendered, /id="main"/);
    assert.equal((rendered.match(/<h1\b/g) ?? []).length, 1, `${page} must have one primary heading`);
    assert.doesNotMatch(rendered, /<img\b|<form\b|<input\b|<button\b/i,
      `${page} may not expose photographs, collection forms or checkout`);
    assert.doesNotMatch(rendered, /€\d+|add to cart|buy now|free shipping/i,
      `${page} may not make unapproved sale offers`);
    assert.doesNotMatch(rendered, /Tops & Bodysuits|Straight Leg Denim|WOMAN|Shop by category/i,
      `${page} must not represent the retired womenswear concepts as the new assortment`);
  }
  const discover = renderToStaticMarkup(React.createElement(MemoryRouter, null,
    React.createElement(TrendStorePreview, { page: 'discover' })));
  assert.match(discover, /FIRST DROP \/ IN PROGRESS/);
  assert.match(discover, /NO PRODUCTS PUBLISHED/);
  assert.match(discover, /Jewellery bag/);
  assert.match(discover, /NOT FOR SALE/);
  assert.doesNotMatch(discover, /class="t-product-card"/);
  const candidate = renderToStaticMarkup(React.createElement(MemoryRouter, null,
    React.createElement(TrendStorePreview, { page: 'candidate' })));
  assert.match(candidate, /RESEARCH CONCEPT/);
  assert.match(candidate, /fully automatic supplier payment/);
  assert.match(candidate, /Not yet verified/);
  const standard = renderToStaticMarkup(React.createElement(MemoryRouter, null,
    React.createElement(TrendStorePreview, { page: 'standard' })));
  assert.match(standard, /Popularity does not establish safety or quality/);
  console.log('EVERNE trend preview passed: six pages, one research-only candidate, zero approved products, no photos, prices or checkout.');
} finally {
  await vite.close();
}
