import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

// Optional independent Chromium/WebKit acceptance using an already installed
// Playwright browser. It never downloads browsers or makes a network request.
const require = createRequire(import.meta.url);
const moduleName = process.env.EVERNE_PLAYWRIGHT_MODULE || 'playwright';
const playwright = require(moduleName);
const engine = process.env.EVERNE_BROWSER_ENGINE || 'webkit';
assert.ok(['webkit', 'chromium'].includes(engine));
const folder = path.resolve('offline-review/everne-woman-safari-preview');
const html = fs.readFileSync(path.join(folder, 'index.html'));
const home = pathToFileURL(path.join(folder, 'index.html')).href;
const widths = [320, 375, 390, 430, 768, 1024, 1440];
const browser = await playwright[engine].launch({
  headless: true,
  ...(process.env.EVERNE_BROWSER_EXECUTABLE
    ? { executablePath: process.env.EVERNE_BROWSER_EXECUTABLE } : {}),
});
const report = {
  engine, browserVersion: browser.version(), testedAt: new Date().toISOString(),
  artifactSha256: createHash('sha256').update(html).digest('hex'),
  widths, cases: [], exceptions: [], remoteRequests: [],
  nativeMacSafari: 'NOT EXECUTED', iPhoneSafari: 'NOT EXECUTED',
};

async function check(width, name, work) {
  try { await work(); report.cases.push({ width, name, result: 'PASS' }); }
  catch (error) {
    report.cases.push({ width, name, result: 'FAIL', error: error.message });
    console.error(`${width}px ${name}: ${error.message}`);
  }
}

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await context.route(/^https?:\/\//i, (route) => route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(6000);
    page.on('pageerror', (error) => report.exceptions.push({ width, error: error.message }));
    page.on('request', (request) => {
      if (/^https?:\/\//i.test(request.url())) report.remoteRequests.push(request.url());
    });
    const reset = async (hash = '#/') => {
      await page.goto(home + hash);
      await page.locator('main h1').waitFor();
    };

    await check(width, 'Editorial homepage and heading layout', async () => {
      await reset();
      assert.equal(await page.locator('.e-category').count(), 5);
      assert.equal(await page.locator('img').count(), 6);
      assert.equal(await page.locator('picture,video').count(), 0);
      assert.equal(await page.locator('form,input,[href*="checkout"]').count(), 0);
      assert.equal(await page.locator('.e-header nav [aria-current="page"]').count(), 1);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow');
      const issues = await page.evaluate(() => {
        const problems = [];
        if (document.documentElement.scrollWidth > innerWidth + 2)
          problems.push('Horizontal overflow');
        for (const node of document.querySelectorAll('main h1,main h2,.e-category')) {
          const rect = node.getBoundingClientRect();
          if (rect.left < -2 || rect.right > innerWidth + 2)
            problems.push(`Clipped heading: ${node.textContent}`);
        }
        for (const node of document.querySelectorAll('.e-wordmark,.e-header nav a,.e-text-link,.e-footer-bottom nav a')) {
          if (node.getBoundingClientRect().height < 43.5)
            problems.push(`Undersized tap target: ${node.textContent?.trim()}`);
        }
        return problems;
      });
      assert.deepEqual(issues, []);
    });

    await check(width, 'Navigation and accessible focus', async () => {
      await reset();
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.e-skip').evaluate((node) => node === document.activeElement), true);
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.activeElement?.id === 'main');
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
      await page.locator('.e-nav-right a[href="#/care"]').click();
      await page.locator('#care-title').waitFor();
      assert.equal(await page.locator('img').count(), 1);
      await page.locator('.e-nav-right a[href="#/standards"]').click();
      await page.locator('#standard-title').waitFor();
      assert.match(await page.locator('main').innerText(), /external suppliers/);
      await page.locator('.e-nav-left a[href="#/#collection"]').click();
      await page.locator('#collection-title').waitFor();
    });

    await check(width, 'Product concept pages remain gated and discontinued routes stay hidden', async () => {
      await reset('#/edit/essential-rib-top');
      assert.match(await page.locator('main h1').innerText(), /The first/);
      assert.equal(await page.locator('.e-product-page').count(), 0);
      await reset('#/products/legacy-item');
      assert.match(await page.locator('main h1').innerText(), /Page not found/);
      await reset('#/products/essential-rib-top');
      assert.match(await page.locator('main h1').innerText(), /Essential Rib Top/);
      assert.equal(await page.locator('img').count(), 0);
      assert.equal(await page.locator('form,input,[href*="checkout"]').count(), 0);
      assert.match(await page.locator('main').innerText(), /NOT AVAILABLE TO ORDER/);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), 'Draft detail must not overflow horizontally');
    });

    await check(width, 'Legal drafts: layout, anchors and tap targets', async () => {
      for (const name of ['legal.html', 'rechtliches.html']) {
        await page.goto(pathToFileURL(path.join(folder, name)).href);
        assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex,nofollow');
        assert.equal(await page.locator('.skip').getAttribute('href'), '#legal-main');
        assert.equal(await page.locator('.toc a').count(), 7);
        const problems = await page.evaluate(() => {
          const errors = [];
          if (document.documentElement.scrollWidth > innerWidth + 2) errors.push('Horizontal overflow');
          for (const el of document.querySelectorAll('h1,h2,h3')) {
            const rect = el.getBoundingClientRect();
            if (rect.left < -2 || rect.right > innerWidth + 2) errors.push(`Clipped heading: ${el.textContent}`);
          }
          for (const el of document.querySelectorAll('.top a,.toc a')) {
            if (el.getBoundingClientRect().height < 43.5) errors.push(`Undersized link: ${el.textContent}`);
          }
          return errors;
        });
        assert.deepEqual(problems, [], `${name} at ${width}px`);
      }
    });
    await context.close();
  }
  assert.deepEqual(report.exceptions, [], 'Uncaught errors in the tested browser');
  assert.deepEqual(report.remoteRequests, [], 'Offline preview must not contact remote services');
  assert.equal(report.cases.filter((item) => item.result === 'FAIL').length, 0, 'Browser matrix must pass every case');
  console.log(JSON.stringify(report, null, 2));
  console.log('EVERNE editorial-study browser matrix PASSED; native Mac/iPhone Safari sign-off remains pending.');
} finally {
  await browser.close();
}
