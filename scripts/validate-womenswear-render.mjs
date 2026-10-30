import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';

// Render the same Vite-transformed React components used by the storefront.
// This complements source checks: a renamed styling piece, broken route, or
// accidental purchase control must not silently pass a successful bundle.
const vite = await createServer({
  appType: 'custom',
  configFile: false,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const [{ default: WomenswearApp }, { default: ConceptDetailPage }, catalog] = await Promise.all([
    vite.ssrLoadModule('/src/WomenswearApp.tsx'),
    vite.ssrLoadModule('/src/ConceptDetailPage.tsx'),
    vite.ssrLoadModule('/src/womenswearCatalog.ts'),
  ]);

  function renderPage(url) {
    const home = React.createElement(Route, { path: '/', element: React.createElement(WomenswearApp) });
    const detail = React.createElement(Route, { path: '/edit/:slug', element: React.createElement(ConceptDetailPage) });
    const routes = React.createElement(Routes, null, home, detail);
    return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: [url] }, routes));
  }

  function conceptCount(html) {
    return (html.match(/class="w-concept-card"/g) ?? []).length;
  }

  function assertNoCommerce(html, url) {
    assert.doesNotMatch(html, /<form\b|<input\b|href="[^"]*(?:\/cart|\/checkout)/i,
      `${url} must remain a non-transactional editorial preview`);
    assert.doesNotMatch(html, />\s*(?:buy now|add to cart|proceed to checkout)\s*</i,
      `${url} must not contain active purchase controls`);
    assert.match(html, /(?:Shopping not yet available|not available to order|No active sales|orders are not yet available)/,
      `${url} must disclose the preview-only status`);
  }

  const landing = renderPage('/');
  assert.equal(conceptCount(landing), 8, 'The initial edit must display eight planning concepts');
  assert.match(landing, /View all 20 concepts/, 'The edit must offer a way to expand to all 20 concepts');
  assert.match(landing, /aria-expanded="false" aria-controls="w-concepts"/, 'The collapsed edit toggle must expose its state');
  assertNoCommerce(landing, '/');

  const expanded = renderPage('/?view=all');
  assert.equal(conceptCount(expanded), catalog.conceptPieces.length, 'The expanded edit must display all 20 concepts');
  assert.match(expanded, /Show fewer concepts/, 'The expanded edit must be reversible');
  assert.match(expanded, /aria-expanded="true" aria-controls="w-concepts"/, 'The expanded edit must expose its state');
  assertNoCommerce(expanded, '/?view=all');

  for (const category of catalog.fashionCategories) {
    const url = `/?category=${category.id}`;
    const html = renderPage(url);
    assert.equal(conceptCount(html), category.count, `${category.title} must display the correct filtered concepts`);
    assert.match(html, new RegExp(`href="/edit/[^"?]+\\?category=${category.id}"`),
      `${category.title} concept links must retain the category selection`);
    assertNoCommerce(html, url);
  }

  for (const piece of catalog.conceptPieces) {
    const slug = catalog.conceptSlug(piece.name);
    const url = `/edit/${slug}?category=${piece.category}`;
    const html = renderPage(url);
    assert.ok(html.includes(piece.name), `${piece.name} must render without a missing styling reference`);
    assert.match(html, /Not a photograph of an available garment/, `${piece.name} must identify its conceptual artwork`);
    assert.match(html, /In curation — not available to order/, `${piece.name} must not imply stock availability`);
    assert.match(html, new RegExp(`href="/\\?category=${piece.category}#edit"`),
      `${piece.name} must offer a return to the originating collection filter`);
    assert.equal((html.match(/class="w-detail-related-card"/g) ?? []).length, 3,
      `${piece.name} must render three working related-concept links`);
    assertNoCommerce(html, url);
  }

  const expandedDetail = renderPage('/edit/essential-rib-top?view=all');
  assert.match(expandedDetail, /href="\/\?view=all#edit"/,
    'A concept opened from the full 20-piece edit must restore the expanded collection');
  assert.match(expandedDetail, /href="\/edit\/[^"?]+\?view=all"/,
    'Related concepts must retain the expanded collection origin');

  const missing = renderPage('/edit/not-a-real-concept');
  assert.match(missing, /Something new/, 'Invalid concept URLs must present a safe pending page');
  assertNoCommerce(missing, '/edit/not-a-real-concept');

  console.log(`EVERNE WOMAN React render validation passed: homepage, expanded edit, ${catalog.fashionCategories.length} filters, ${catalog.conceptPieces.length} detail routes and unknown-route fallback; no purchase controls.`);
} finally {
  await vite.close();
}
