import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// Runs on an installed Chromium browser with Node 22 built-ins. Not Safari QA.
// No npm package, external browser service, Shopify call or artifact upload.
const browser = [process.env.EVERNE_TEST_BROWSER, 'google-chrome', 'google-chrome-stable',
  'chromium', 'chromium-browser'].filter(Boolean).find((name) =>
  spawnSync('which', [name], { stdio: 'ignore' }).status === 0);
assert.ok(browser, 'An installed Chrome/Chromium executable is required');
assert.equal(typeof WebSocket, 'function', 'Node 22 global WebSocket is required');
const folder = path.resolve('offline-review/everne-woman-safari-preview');
assert.ok(fs.existsSync(path.join(folder, 'index.html')), 'Build the offline ZIP first');
const preview = pathToFileURL(path.join(folder, 'index.html')).href;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'everne-chrome-'));
const child = spawn(browser, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
  '--disable-extensions', '--disable-background-networking', '--no-first-run',
  '--no-default-browser-check', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank',
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
let sessionId;
let sequence = 0;
let assertions = 0;
const pending = new Map();
const exceptions = [];
const requests = [];
async function waitFor(check, description, ms = 15000) {
  const started = Date.now();
  while (Date.now() - started < ms) {
    try { if (await check()) return; } catch {}
    await sleep(90);
  }
  throw new Error('Timed out: ' + description +
    '; recent JS errors: ' + exceptions.slice(-2).join(' | '));
}
function cdp(method, params = {}, session) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id); reject(new Error('Chrome DevTools timeout: ' + method));
    }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params,
      ...(session ? { sessionId: session } : {}) }));
  });
}
async function js(expression) {
  const r = await cdp('Runtime.evaluate',
    { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) {
    throw new Error('Chrome JS exception: ' +
      (r.exceptionDetails.exception?.description ?? r.exceptionDetails.text));
  }
  return r.result?.value;
}
async function eq(expression, expected, name) {
  await waitFor(async () => await js(expression) === expected, name);
  assertions++;
}
function yes(value, name) { assert.ok(value, name); assertions++; }
async function navigate(url) {
  const r = await cdp('Page.navigate', { url }, sessionId);
  yes(!r.errorText, 'Navigation: ' + url + ' ' + String(r.errorText));
  await waitFor(async () => await js('document.readyState') === 'complete',
    'page fully loaded');
}
try {
  const portFile = path.join(profile, 'DevToolsActivePort');
  await waitFor(() => fs.existsSync(portFile), 'Chrome DevTools endpoint', 20000);
  const [port, browserPath] = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
  socket = new WebSocket('ws://127.0.0.1:' + port + browserPath);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', (msg) => {
    const event = JSON.parse(msg.data);
    if (event.id) {
      const call = pending.get(event.id);
      if (!call) return;
      clearTimeout(call.timer); pending.delete(event.id);
      if (event.error) call.reject(new Error(event.error.message));
      else call.resolve(event.result ?? {});
    } else if (event.sessionId === sessionId) {
      if (event.method === 'Runtime.exceptionThrown')
        exceptions.push(event.params?.exceptionDetails?.exception?.description ??
          event.params?.exceptionDetails?.text ?? 'Uncaught exception');
      if (event.method === 'Network.requestWillBeSent') {
        const url = event.params?.request?.url ?? '';
        if (/^https?:\/\//i.test(url)) requests.push(url);
      }
    }
  });
  const { targetId } = await cdp('Target.createTarget', { url: 'about:blank' });
  const attached = await cdp('Target.attachToTarget', { targetId, flatten: true });
  sessionId = attached.sessionId;
  await cdp('Page.enable', {}, sessionId);
  await cdp('Runtime.enable', {}, sessionId);
  await cdp('Network.enable', {}, sessionId);
  await cdp('Emulation.setDeviceMetricsOverride',
    { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);

  await navigate(preview + '#/');
  await eq("document.querySelectorAll('.w-concept-card').length", 8,
    'Eight homepage concept cards');
  yes(await js("document.body.innerText.toLowerCase().includes('shopping not yet available')"),
    'Homepage must be clearly noncommercial');
  yes(!(await js("Boolean(document.querySelector('form,input,[href*=\"/checkout\"]'))")),
    'No forms or checkout links in preview');

  for (const width of [320, 390]) {
    await cdp('Emulation.setDeviceMetricsOverride',
      { width, height: 844, deviceScaleFactor: 2, mobile: true }, sessionId);
    await sleep(100);
    const actual = await js('document.documentElement.scrollWidth');
    yes(actual <= width + 3,
      'No horizontal overflow at ' + width + 'px; measured ' + actual);
  }

  await js("document.querySelector('.w-menu-toggle').click()");
  await eq("document.querySelector('.w-nav').classList.contains('is-open')",
    true, 'Mobile navigation opens');
  await js("document.querySelector('.w-nav a[href=\"#edit\"]').click()");
  await eq("document.querySelector('.w-nav').classList.contains('is-open')",
    false, 'Selecting a navigation section closes mobile menu');
  await js("document.querySelectorAll('.w-style-options button')[1].click()");
  await eq("document.querySelectorAll('.w-style-options button')[1].getAttribute('aria-pressed')",
    'true', 'Style Notes switch');
  await js("document.querySelector('.w-faq-item button').click()");
  await eq("document.querySelector('.w-faq-item button').getAttribute('aria-expanded')",
    'true', 'FAQ accordion');

  await js("document.querySelector('.w-show-all').click()");
  await eq("document.querySelectorAll('.w-concept-card').length", 20,
    'Expand 20 design concepts');
  const concepts = await js("Array.from(document.querySelectorAll('.w-concept-card'), e => ({href: e.querySelector('a').getAttribute('href'), name: e.querySelector('.w-concept-meta h3').textContent}))");
  yes(concepts.length === 20 && new Set(concepts.map((c) => c.href)).size === 20,
    'Every concept has a distinct deep link');
  for (const item of concepts) {
    yes(item.href.startsWith('#/edit/'), 'Concept link is local hash route');
    await js('window.location.hash = ' + JSON.stringify(item.href.slice(1)));
    await eq("document.querySelector('#piece-title')?.textContent",
      item.name, 'Concept detail: ' + item.name);
    yes(await js("document.body.innerText.includes('In curation — not available to order')"),
      'No purchasable item at ' + item.name);
  }

  await js("window.location.hash = '#/'");
  await eq("document.querySelectorAll('.w-concept-card').length", 8,
    'Home restored to initial eight concepts');
  for (let i = 1; i <= 5; i++) {
    await js("document.querySelectorAll('.w-filters button')[" + i + "].click()");
    await eq("document.querySelectorAll('.w-filters button')[" + i +
      "].getAttribute('aria-pressed')", 'true', 'Category ' + i);
    await eq("document.querySelectorAll('.w-concept-card').length", 4,
      'Four concepts for category ' + i);
  }
  await js("document.querySelectorAll('.w-filters button')[3].click()");
  await eq("document.querySelectorAll('.w-filters button')[3].getAttribute('aria-pressed')",
    'true', 'Trouser category selected');
  await js("document.querySelector('.w-concept-link').click()");
  await waitFor(async () => (await js("document.querySelector('#piece-title')?.textContent"))?.length > 0,
    'Filtered concept detail');
  await js("document.querySelector('.w-detail-back').click()");
  await eq("document.querySelectorAll('.w-filters button')[3].getAttribute('aria-pressed')",
    'true', 'Back-to-collection retains selected filter');
  await eq("document.querySelectorAll('.w-concept-card').length", 4,
    'Back-to-collection retains filtered cards');

  await js("window.location.hash = '#/products/legacy-item'");
  await waitFor(async () => (await js("document.querySelector('main h1')?.innerText"))?.includes('Something new'),
    'Legacy route uses truthful pending page');
  assertions++;
  await navigate(pathToFileURL(path.join(folder, 'legal.html')).href);
  await waitFor(async () => await js("Boolean(document.querySelector('#privacy,#imprint'))"),
    'Offline legal page loads');
  await eq("document.querySelector('a.brand')?.getAttribute('href')",
    './index.html', 'Legal return link is relative');
  await eq("document.querySelector('meta[name=robots]')?.content",
    'noindex,nofollow', 'Legal page remains noindex');
  yes(exceptions.length === 0, 'Uncaught browser errors: ' + exceptions.slice(0, 2).join(' | '));
  yes(requests.length === 0, 'Unexpected remote requests: ' + requests.slice(0, 2).join(' | '));
  console.log('EVERNE Chromium offline browser smoke PASSED: ' + assertions +
    ' assertions; 20 routes, five filters, mobile navigation, legal, no purchase or network requests.');
  console.log('NOT a macOS/iPhone Safari or WebKit visual acceptance.');
} finally {
  for (const p of pending.values()) clearTimeout(p.timer);
  pending.clear();
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  child.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => child.once('exit', resolve)), sleep(1800)]);
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
  for (let attempt = 0; attempt < 10; attempt++) {
    try { fs.rmSync(profile, { recursive: true, force: true }); break; }
    catch (error) {
      if (attempt === 9) console.error('Chrome cleanup warning:', String(error));
      else await sleep(150);
    }
  }
}
