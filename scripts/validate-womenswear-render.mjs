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
  function renderPage(url) {
    const paths = [
      React.createElement(Route, { key: 'home', path: '/', element: React.createElement(EvernePreview, { page: 'home' }) }),
      React.createElement(Route, { key: 'care', path: '/care', element: React.createElement(EvernePreview, { page: 'care' }) }),
      React.createElement(Route, { key: 'standards', path: '/standards', element: React.createElement(EvernePreview, { page: 'standards' }) }),
      React.createElement(Route, { key: 'fallback', path: '*', element: React.createElement(EvernePreview, { page: 'home' }) }),
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
  assert.match(home, /aria-current="page" href="\/#collection"/,
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
  assert.doesNotMatch(withdrawnConcept, /Essential Rib Top|€34/);
  assert.match(withdrawnConcept, /The first/);

  console.log('EVERNE React render passed: six wardrobe styling references, no commerce, checkout or unapproved prices.');
} finally {
  await vite.close();
}
