import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// Chromium smoke of the actual portable editorial reference build. macOS/iPhone Safari
// remains a separate owner review. No external request or package install.
const executable = [process.env.EVERNE_TEST_BROWSER, 'google-chrome', 'google-chrome-stable',
  'chromium', 'chromium-browser'].filter(Boolean).find((name) =>
  spawnSync('which', [name], { stdio: 'ignore' }).status === 0);
assert.ok(executable, 'An installed Chrome/Chromium executable is required');
const folder = path.resolve('offline-review/everne-woman-safari-preview');
const preview = pathToFileURL(path.join(folder, 'index.html')).href;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'everne-imagefree-'));
const child = spawn(executable, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
  '--disable-extensions', '--disable-background-networking', '--no-first-run',
  '--no-default-browser-check', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pending = new Map();
const exceptions = [];
const requests = [];
let socket;
let sessionId;
let sequence = 0;
let checks = 0;

async function waitFor(condition, label, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try { if (await condition()) return; } catch {}
    await sleep(90);
  }
  throw new Error('Timed out: ' + label + ' / ' + exceptions.slice(-2).join(' | '));
}
function cdp(method, params = {}, session = sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('CDP timeout: ' + method)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) }));
  });
}
async function js(expression) {
  const output = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (output.exceptionDetails) throw new Error(output.exceptionDetails.exception?.description ?? output.exceptionDetails.text);
  return output.result?.value;
}
async function eq(expression, expected, label) {
  await waitFor(async () => await js(expression) === expected, label);
  checks++;
}
function ok(condition, label) { assert.ok(condition, label); checks++; }
async function navigate(url) {
  const response = await cdp('Page.navigate', { url });
  ok(!response.errorText, 'Navigation failed: ' + url);
  await waitFor(async () => await js('document.readyState') === 'complete', 'page load');
}

try {
  const portFile = path.join(profile, 'DevToolsActivePort');
  await waitFor(() => fs.existsSync(portFile), 'Chrome CDP port', 20000);
  const [port, browserPath] = fs.readFileSync(portFile, 'utf8').trim().split(/\r?\n/);
  socket = new WebSocket(`ws://127.0.0.1:${port}${browserPath}`);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', (event) => {
    const packet = JSON.parse(event.data);
    if (packet.id) {
      const call = pending.get(packet.id);
      if (!call) return;
      clearTimeout(call.timer); pending.delete(packet.id);
      if (packet.error) call.reject(new Error(packet.error.message));
      else call.resolve(packet.result ?? {});
    } else if (packet.sessionId === sessionId) {
      if (packet.method === 'Runtime.exceptionThrown') exceptions.push(packet.params?.exceptionDetails?.text ?? 'Runtime error');
      if (packet.method === 'Network.requestWillBeSent') {
        const url = packet.params?.request?.url ?? '';
        if (/^https?:\/\//i.test(url)) requests.push(url);
      }
    }
  });

  const target = await cdp('Target.createTarget', { url: 'about:blank' }, null);
  sessionId = (await cdp('Target.attachToTarget', { targetId: target.targetId, flatten: true }, null)).sessionId;
  for (const name of ['Page', 'Runtime', 'Network']) await cdp(name + '.enable');
  await cdp('Page.bringToFront');

  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 2, mobile: true });
    await navigate(preview + '#/');
    await eq('document.querySelectorAll(".e-category").length', 5, `${width}px: five category labels`);
    await eq('document.querySelectorAll(".e-wardrobe-endnote,.e-collection-entry,.e-approach,.e-care-teaser").length', 0,
      `${width}px: no redundant editorial panels on the shop homepage`);
    await eq('document.querySelectorAll(".e-shop-nav-links a").length', 6, `${width}px: six category bar links`);
    await eq('document.querySelectorAll(".e-product-index-group").length', 0, `${width}px: no long product list`);
    await eq('document.images.length', 6, `${width}px: six garment styling references`);
    await eq('document.querySelectorAll("form,input,[href*=checkout]").length', 0, `${width}px: no commerce controls`);
    await eq('document.querySelectorAll(".e-header nav [aria-current=page]").length', 1,
      `${width}px: active navigation announced accessibly`);
    await eq('document.querySelector("meta[name=robots]")?.content', 'noindex,nofollow', 'noindex retained');
    const layout = await js(`(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      tooWide: Array.from(document.querySelectorAll('main h1,main h2,.e-category')).some(el => {
        const rect = el.getBoundingClientRect(); return rect.right > innerWidth + 2 || rect.left < -2;
      }) }))()`);
    ok(layout.scroll <= layout.width + 2,
      `${width}px horizontal overflow: ${JSON.stringify(layout)}`);
    ok(!layout.tooWide, `${width}px headline clipping: ${JSON.stringify(layout)}`);
    const smallTargets = await js(`Array.from(document.querySelectorAll('.e-wordmark,.e-header nav a,.e-text-link,.e-footer-bottom nav a'))
      .filter(el => el.getBoundingClientRect().height < 43.5)
      .map(el => ({ label: el.textContent.trim(), height: Math.round(el.getBoundingClientRect().height) }))`);
    ok(smallTargets.length === 0, `${width}px undersized tap targets: ${JSON.stringify(smallTargets)}`);
  }

  await navigate(preview + '#/care');
  await eq('document.querySelector("main h1")?.textContent?.includes("The care")', true, 'CARE renders');
  await eq('document.images.length', 1, 'CARE has one licensed visual reference');
  await navigate(preview + '#/standards');
  await eq('document.body.innerText.includes("external suppliers")', true, 'Supplier disclosure renders');
  await eq('document.querySelectorAll(".e-standard-row").length', 4, 'Selection standards render');
  for (const width of [320, 768, 1440]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 2, mobile: true });
    for (const [category, count] of [['all', 20], ['tops', 5], ['knitwear', 5], ['trousers', 4], ['dresses', 3], ['skirts', 3]]) {
      await navigate(preview + '#/collections/' + category);
      await eq('document.querySelectorAll(".e-collection-card").length', count, `${width}px ${category}: matching product cards`);
      await eq('document.images.length', 0, `${width}px ${category}: no unapproved product photographs`);
      await eq('document.querySelectorAll("form,input,[href*=checkout]").length', 0, `${width}px ${category}: no buying controls`);
      await eq('document.querySelectorAll(".e-sidebar-desktop .e-sidebar-categories [aria-current=page]").length', 1,
        `${width}px ${category}: active sidebar category announced`);
      await eq('document.querySelectorAll(".e-shop-nav-links").length', 0,
        `${width}px ${category}: no duplicated category bar next to the sidebar`);
      const widthCheck = await js('document.documentElement.scrollWidth <= innerWidth + 2');
      ok(widthCheck, `${width}px ${category}: horizontal overflow`);
    }
  }
  await navigate(preview + '#/edit/essential-rib-top');
  await eq('document.querySelector("main h1")?.textContent?.includes("The first")', true, 'Old concept route withdrawn');
  await eq('document.querySelectorAll(".e-product-page").length', 0, 'Withdrawn edit route does not render a product page');
  await navigate(preview + '#/products/essential-rib-top');
  await eq('document.querySelector("main h1")?.textContent?.includes("Essential Rib Top")', true, 'First draft product renders');
  await eq('document.querySelectorAll(".e-product-accordion").length', 3, 'Product notes sit in three restrained disclosure rows');
  await eq('document.querySelectorAll(".e-sidebar-desktop .e-sidebar-products [aria-current=page]").length', 1,
    'Current product is marked in the side navigation');
  await eq('document.images.length', 0, 'Draft product contains no unapproved photography');
  await eq('document.querySelectorAll("form,input,[href*=checkout]").length', 0, 'Draft has no buying controls');
  await eq('document.body.innerText.includes("NOT AVAILABLE TO ORDER")', true, 'Draft availability is explicit');
  await eq('document.querySelector("meta[name=robots]")?.content', 'noindex,nofollow', 'Draft keeps noindex');
  await navigate(preview + '#/products/denim-midi-skirt');
  await eq('document.querySelector("main h1")?.textContent?.includes("Denim Midi Skirt")', true, 'Twentieth draft product renders');
  await navigate(preview + '#/products/legacy-item');
  await eq('document.querySelector("main h1")?.textContent?.includes("Page not found")', true, 'Unknown product draft is not listed');

  // The two static legal pages have their own styles and routing. A storefront
  // layout pass alone would miss long German headings and tiny tap targets.
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 2, mobile: true });
    for (const page of ['legal.html', 'rechtliches.html']) {
      await navigate(pathToFileURL(path.join(folder, page)).href);
      await eq('document.querySelector("meta[name=robots]")?.content', 'noindex,nofollow', `${page}: noindex`);
      await eq('document.querySelector("a.brand")?.getAttribute("href")', './index.html', `${page}: local return link`);
      await eq('document.querySelectorAll(".toc a").length', 7, `${page}: all legal anchors`);
      await eq('document.querySelector(".skip")?.getAttribute("href")', '#legal-main', `${page}: skip link`);
      const legalLayout = await js(`(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth,
        clipped: Array.from(document.querySelectorAll('h1,h2,h3')).filter(node => {
          const box = node.getBoundingClientRect(); return box.right > innerWidth + 2 || box.left < -2;
        }).map(node => node.textContent.trim()),
        smallTargets: Array.from(document.querySelectorAll('.top a,.toc a')).filter(node =>
          node.getBoundingClientRect().height < 43.5).map(node => node.textContent.trim()) }))()`);
      ok(legalLayout.scroll <= legalLayout.width + 2, `${width}px ${page} horizontal overflow: ${JSON.stringify(legalLayout)}`);
      ok(legalLayout.clipped.length === 0, `${width}px ${page} clipped heading: ${JSON.stringify(legalLayout)}`);
      ok(legalLayout.smallTargets.length === 0, `${width}px ${page} small link: ${JSON.stringify(legalLayout)}`);
    }
  }
  ok(exceptions.length === 0, 'Runtime errors: ' + exceptions.join(' | '));
  ok(requests.length === 0, 'Remote requests: ' + requests.join(' | '));

  console.log(`EVERNE editorial-study offline Chromium PASSED: ${checks} checks across seven viewport widths, with local licensed references, no commerce, runtime errors or remote network requests.`);
  console.log('Real macOS/iPhone Safari testing remains UNGETESTET.');
} finally {
  for (const call of pending.values()) clearTimeout(call.timer);
  pending.clear();
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  child.kill('SIGTERM');
  await Promise.race([new Promise((resolve) => child.once('exit', resolve)), sleep(1800)]);
  if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
  // The isolated, exact test profile is disposable.
  for (let attempt = 0; attempt < 8; attempt++) {
    try { fs.rmSync(profile, { recursive: true, force: true }); break; }
    catch (error) {
      if (attempt === 7) console.error('Temporary Chrome profile cleanup warning:', String(error));
      else await sleep(130);
    }
  }
}
