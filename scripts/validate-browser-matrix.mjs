import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

// Optional independent engine acceptance. Uses an already provisioned Playwright
// installation and browser; never installs packages, publishes or uploads data.
const require = createRequire(import.meta.url);
const playwright = require(process.env.EVERNE_PLAYWRIGHT_MODULE || 'playwright');
const engine = process.env.EVERNE_BROWSER_ENGINE || 'webkit';
assert.ok(['webkit', 'chromium'].includes(engine), 'Choose webkit or chromium');
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
  engine, browserVersion: browser.version(), platform: process.platform,
  playwrightVersion: require(path.join(path.dirname(require.resolve(
    process.env.EVERNE_PLAYWRIGHT_MODULE || 'playwright')), 'package.json')).version,
  testedAt: new Date().toISOString(),
  artifactSha256: createHash('sha256').update(html).digest('hex'),
  transport: 'file://, actual inlined production offline build',
  widths, conceptRouteLoads: 0, cases: [], exceptions: [], remoteRequests: [], failedAssets: [],
  nativeMacSafari: 'NOT EXECUTED', iPhoneSafari: 'NOT EXECUTED',
};
async function check(width, name, action) {
  try {
    await action();
    report.cases.push({ width, name, status: 'PASS' });
  } catch (error) {
    report.cases.push({ width, name, status: 'FAIL', error: error.message });
    console.error(`${width}px ${name}: ${error.message}`);
  }
}
async function focusIs(page, id) {
  await page.waitForFunction((expected) => document.activeElement?.id === expected,
    id, { timeout: 3000 });
}
async function layout(page) {
  const issues = await page.evaluate(() => {
    const problems = [];
    if (document.documentElement.scrollWidth > innerWidth + 1)
      problems.push(`document overflow ${document.documentElement.scrollWidth}/${innerWidth}`);
    // Headings and actual text lines must remain inside their content column.
    for (const heading of document.querySelectorAll('main h1, main h2, .w-concept-meta h3')) {
      const bounds = heading.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(heading);
      for (const rect of range.getClientRects()) {
        if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2)
          problems.push(`heading text clipped: ${heading.textContent}`);
      }
    }
    const visible = (el) => el.getClientRects().length > 0;
    for (const selector of ['.w-header', '.w-filters', '.w-style-options', '.w-detail-header']) {
      const container = document.querySelector(selector);
      if (!container) continue;
      const controls = [...container.querySelectorAll('a,button')].filter(visible);
      for (let a = 0; a < controls.length; a++) {
        const ra = controls[a].getBoundingClientRect();
        for (let b = a + 1; b < controls.length; b++) {
          const rb = controls[b].getBoundingClientRect();
          if (Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left) > 1 &&
              Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top) > 1)
            problems.push(`overlapping controls: ${controls[a].textContent}/${controls[b].textContent}`);
        }
      }
    }
    return problems;
  });
  assert.deepEqual(issues, []);
}
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 }, reducedMotion: 'reduce',
    });
    // No network access is needed or permitted for this offline acceptance.
    await context.route(/^https?:\/\//i, (route) => route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    page.on('pageerror', (error) => report.exceptions.push({ width, error: error.message }));
    page.on('request', (request) => {
      if (/^https?:\/\//i.test(request.url())) report.remoteRequests.push(request.url());
    });
    page.on('requestfailed', (request) => {
      if (request.url().startsWith('file:')) report.failedAssets.push(request.url());
    });
    const reset = async (route = '#/') => {
      await page.goto(home + route);
      await page.locator('main h1').waitFor();
    };
    await check(width, 'Homepage, text wrapping, layout and noindex', async () => {
      await reset();
      assert.equal(await page.locator('.w-concept-card').count(), 8);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
      await layout(page);
    });
    await check(width, 'Keyboard skip link and reduced motion', async () => {
      await reset();
      await page.keyboard.press('Tab');
      assert.equal(await page.locator('.w-skip-link').evaluate((el) => el === document.activeElement), true);
      await page.keyboard.press('Enter');
      await focusIs(page, 'main');
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    });
    if (width <= 850) {
      await check(width, 'Mobile menu: Escape, outside click, keyboard destination focus', async () => {
        await reset();
        const toggle = page.locator('.w-menu-toggle');
        await toggle.press('Enter');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert.equal(await toggle.evaluate((el) => el === document.activeElement), true);
        await toggle.click();
        await page.locator('#hero-title').click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await toggle.press('Enter');
        await page.locator('.w-nav a[href="#edit"]').press('Enter');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        await focusIs(page, 'edit-title');
      });
    }
    await check(width, 'All five categories: actual 5/5/4/3/3 counts', async () => {
      await reset();
      for (const [i, expected] of [5, 5, 4, 3, 3].entries()) {
        const button = page.locator('.w-filters button').nth(i + 1);
        await button.click();
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.w-concept-card').count(), expected);
        assert.match(await page.locator('.w-results-summary').textContent(), new RegExp(`Showing ${expected} of ${expected}`));
      }
    });
    await check(width, 'Expand 8→20→8 concepts', async () => {
      await reset();
      await page.locator('.w-show-all').click();
      assert.equal(await page.locator('.w-concept-card').count(), 20);
      assert.equal(await page.locator('.w-show-all').getAttribute('aria-expanded'), 'true');
      await page.locator('.w-show-all').click();
      assert.equal(await page.locator('.w-concept-card').count(), 8);
    });
    await check(width, '20 direct concept routes, related links, layout, planned prices', async () => {
      await reset('#/?view=all');
      const concepts = await page.locator('.w-concept-link').evaluateAll((links) => links.map((el) => ({
        href: el.getAttribute('href'), name: el.querySelector('h3').textContent,
      })));
      assert.equal(concepts.length, 20);
      assert.equal(new Set(concepts.map((item) => item.href)).size, 20);
      for (const concept of concepts) {
        await reset(concept.href);
        report.conceptRouteLoads++;
        assert.equal(await page.locator('#piece-title').textContent(), concept.name);
        assert.equal(await page.locator('.w-detail-related-card').count(), 3);
        assert.match(await page.locator('.w-detail-price strong').textContent(), /^€[3-5][49]$/);
        assert.match(await page.locator('.w-detail-status').textContent(), /not available to order/);
        await layout(page);
      }
    });
    await check(width, 'Detail focus, browser back/forward and category retention', async () => {
      await reset();
      await page.locator('.w-filters button').nth(3).click();
      await page.locator('.w-concept-link').first().press('Enter');
      await page.locator('#piece-title').waitFor();
      await focusIs(page, 'piece-title');
      // The back action must keep its accessible name on narrow screens.
      assert.match(await page.locator('.w-detail-back').getAttribute('aria-label') ||
        await page.locator('.w-detail-back').innerText(), /Back to collection/);
      await page.goBack();
      await page.locator('#edit-title').waitFor();
      assert.equal(await page.locator('.w-filters button').nth(3).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('.w-concept-card').count(), 4);
      await page.goForward();
      await page.locator('#piece-title').waitFor();
      await page.locator('.w-detail-back').click();
      await page.locator('#edit-title').waitFor();
      await focusIs(page, 'edit-title');
      assert.equal(await page.locator('.w-concept-card').count(), 4);
    });
    await check(width, 'Three styling directions and keyboard FAQ', async () => {
      await reset();
      for (const [i, title] of ['Easy, always.', 'Understated drama.', 'Rules? Your own.'].entries()) {
        const button = page.locator('.w-style-options button').nth(i);
        await button.press('Enter');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.w-style-selection h3').textContent(), title);
        assert.equal(await page.locator('.w-style-piece').count(), 3);
      }
      for (const button of await page.locator('.w-faq-item button').all()) {
        const panel = page.locator('#' + await button.getAttribute('aria-controls'));
        assert.equal(await panel.isVisible(), false);
        await button.press('Enter');
        assert.equal(await button.getAttribute('aria-expanded'), 'true');
        assert.equal(await panel.isVisible(), true);
        await button.press('Enter');
        assert.equal(await panel.isVisible(), false);
      }
    });
    await check(width, 'Local images decode with cover layout', async () => {
      await reset();
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate((el) => el.decode());
        assert.equal(await image.evaluate((el) => el.naturalWidth > 0 && el.naturalHeight > 0), true);
        assert.equal(await image.evaluate((el) => getComputedStyle(el).objectFit), 'cover');
      }
    });
    await check(width, 'Obsolete/unknown routes stay noncommercial', async () => {
      for (const route of ['#/products/legacy-item', '#/edit/missing-concept', '#/obsolete']) {
        await reset(route);
        assert.match(await page.locator('main h1').innerText(), /Something new/);
        assert.equal(await page.locator('form,input,[href*="/checkout"]').count(), 0);
      }
    });
    await check(width, 'Four legal targets, local return and no checkout', async () => {
      await reset();
      assert.match(await page.locator('.w-announcement').innerText(), /shopping not yet available/i);
      assert.equal(await page.locator('form,input,[href*="/checkout"]').count(), 0);
      for (const id of ['imprint', 'privacy', 'returns', 'shipping']) {
        await page.goto(pathToFileURL(path.join(folder, 'legal.html')).href + '#' + id);
        await page.locator('#' + id).waitFor();
        assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex,nofollow');
      }
      await page.locator('a.brand').click();
      await page.locator('#hero-title').waitFor();
    });
    await context.close();
  }
} finally {
  await browser.close();
  for (const [name, values] of [
    ['No JavaScript exceptions', report.exceptions],
    ['No remote HTTP(S) requests', report.remoteRequests],
    ['No failed local assets', report.failedAssets],
  ]) report.cases.push({ name, status: values.length ? 'FAIL' : 'PASS', details: values });
  report.passed = report.cases.filter((entry) => entry.status === 'PASS').length;
  report.failed = report.cases.filter((entry) => entry.status === 'FAIL').length;
  if (process.env.EVERNE_BROWSER_REPORT) {
    fs.writeFileSync(process.env.EVERNE_BROWSER_REPORT, JSON.stringify(report, null, 2) + '\n');
  }
  console.log(`${engine} ${report.browserVersion}: ${report.passed} PASS / ${report.failed} FAIL; seven widths, ${report.conceptRouteLoads} concept-route loads. Native macOS/iPhone Safari NOT EXECUTED.`);
  if (report.failed) process.exitCode = 1;
}
