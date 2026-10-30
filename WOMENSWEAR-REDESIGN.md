# EVERNE WOMAN — Editorial preview

Status: DESIGN PREVIEW ONLY / NO COMMERCE.

## Brand direction

- Style C: approximately 70% enduring essentials, 30% trend accents.
- Planned customer price range: EUR 34–59 including tax; every concept price is a
  whole euro ending in 4 or 9 (former .90 prices rounded down).
- First curation: 20 concepts in five categories: tops, knitwear,
  trousers and denim, dresses, skirts.
- English-first copy, quiet editorial typography, ivory, ink, stone and wine.
- A three-mood interactive Style Notes section showcases combinations of
  existing planning concepts, without suggesting inventory or real product photography.

## Architecture and safety

- Previous garment-care React code and Shopify functions remain in the repository,
  but are not imported by the fashion preview entry point.
- The redesign renders WomenswearApp.tsx and womenswear.css.
- Each of the 20 concepts has a non-transactional design-study page at
  `/edit/<slug>`; direct links are rewritten to the React app by Vercel.
- Collection category selections and the expanded 20-piece view are preserved
  in shareable URL queries. Concept-detail and related-item links retain the
  originating edit view; returning to the collection restores its filter and
  `#edit` position, including after a direct detail-page load.
- Client-side page transitions move keyboard focus to the new page heading,
  or to the edit heading when returning from a concept, without overriding
  its scroll position. Pending/legacy routes also expose a skip-to-main link.
- Small editorial text on solid backgrounds has been darkened and enlarged
  where appropriate, with 20 reproducible contrast checks at 4.5:1 or above.
  Image overlays, true Safari rendering and full accessibility conformance
  remain open for visual/device acceptance.
- Three credited Unsplash editorial references now load as quality-78 WebP
  derivatives (the JPEG originals remain intact), reducing combined image
  bytes by roughly two thirds without changing the represented garments.
  Signature and size-reduction tests run in `check:womenswear`.
- Narrow phone screens now retain the third related concept as a compact
  full-width card rather than silently hiding it. Main menu and filter
  controls have at least 44px tall touch targets in the CSS; Safari visual
  confirmation is still required.
- The mobile menu closes after selecting either header shortcut or tapping
  outside the header, in addition to Escape and the main menu links.
- The complete edit can now be both expanded and collapsed with a single
  accessible control; its selection remains shareable in the existing URL.
- `SAFARI-ACCEPTANCE.md` defines 20 owner-facing real Safari/iPhone
  checks with explicit **UNGETESTET** status and severity thresholds.
  This guide is now the ninth file inside the portable ZIP and includes
  trusted-LAN iPhone test instructions instead of assuming AirDrop/Files
  provides a complete JavaScript browser runtime.
- The PR workflow also runs `npm run check:browser:offline` against
  the **actual built offline HTML** in headless Chromium using Node 22's
  native DevTools WebSocket; no new npm/browser service subscription.
  It interacts with all 20 detail routes, the five filters (actual counts
  5/5/4/3/3), mobile 320/390 px viewports, mobile menu, FAQ, styling
  selection, filtered back-navigation and the local legal page, and fails
  on browser JS exceptions, live checkout or remote requests.
  GitHub Actions run `41129444820` **PASSED** on the first corrected
  test iteration. This is **Chromium**, not WebKit/Safari device QA.
- The GitHub PR workflow now runs `npm run build:offline` and
  `npm run check:offline:package`, checking byte-for-byte ZIP integrity,
  local editorial assets and legal links, build inline CSS/JS and the
  exact owner QA document. CI acceptance **does not** establish Safari
  rendering or iPhone interaction acceptance.
- A no-extra-cost local Mac launcher `bash scripts/review-safari-mac.sh`
  uses the committed `package-lock.json` (`npm ci`), runs the complete
  `build:offline` integrity checks, prints the ZIP SHA-256 and opens the
  resulting `file://` preview in Safari. npm installation needs network
  access; the assembled preview does not require Shopify or supplier APIs.
  It is Mac-only and does not claim a real Safari visual pass.
- The CI ZIP is deliberately **not uploaded** to GitHub as an artifact or
  release (to avoid unapproved publication/storage). The owner's current
  private ZIP must be rebuilt locally from the specific source branch.
- `npm run build:offline` creates a separate zipped Safari review under
  `offline-review/` with inlined application JS/CSS, local editorial images,
  local legal pages and hash-based concept routes. The actual Vercel build
  still uses normal routes. The offline package is for owner review only,
  has no checkout and is not a substitute for live Safari acceptance.
- Local `file://` previews omit canonical and Open Graph page URLs rather than
  attempting to resolve them against the browser's opaque `null` origin;
  ordinary `http(s)` deployments continue to emit their canonical URLs.
- Offline in-page hash links are handled once across every route. Home, detail
  and pending-page skip links scroll to a keyboard-focusable main landmark;
  detail-to-collection route handling continues to use the existing router.
- `npm run check:womenswear:render` additionally renders the actual React
  homepage, eight- and twenty-concept views, five filtered categories, all
  twenty detail pages and the unknown-route fallback. It checks truthful
  non-commerce output and return links, without claiming Safari visual QA.
- `npm run check:preview-boundary` walks the active TypeScript/TSX dependency
  graph from `src/main.tsx`. It fails closed if unreviewed source modules,
  external libraries, old commerce/backend configuration or direct network
  calls enter the live preview. Both builds run this gate before bundling.
- Historical `/products/*` routes show a truthful collection-pending page.
- Product names and prices in womenswearCatalog.ts are planning concepts,
  not offers, published Shopify items, or verified stock.
- The new frontend does not call Shopify or expose purchase actions. Old
  launch gates remain unchanged and cannot activate this preview.
- noindex,nofollow stays active until a genuine launch is approved.
- The English `/legal.html` page is linked in the fashion preview, with the original German `/rechtliches.html` preserved for reference. Both contain prelaunch placeholders and require review.
- The build validates concept counts, route slugs, target price range, and
  noindex separately from the preserved garment-care configuration.

## Supplier assessment (30 October 2026)

No supplier or SKU has been approved for sale. Official pages reviewed:

- Hertwill: Shopify import and EU/US fulfillment, free tier for up to five
  products, 24.99 EUR/month for up to 100 products. Returns may be possible
  within 30 days of the *order date*, with exceptions by brand. Verify that
  actual apparel styles, wholesale prices, and German shipping terms fit
  EVERNE before choosing it. https://hertwill.com/pricing and
  https://hertwill.com/resources/faq
- FactoryPrice: dedicated women's fashion and dropshipping feeds, but B2B
  ordinary returns are limited to seven days from receipt. This does not
  automatically cover a customer's separate withdrawal period or defects.
  https://factoryprice.eu/en/terms/returns-policy-772.html
- Matterhorn: large EU womenswear assortment and Shopify integration, but
  standard B2B returns are excluded in its published terms. Do not use as a
  default supplier without a viable, separately funded consumer return flow.
  https://help.matterhorn-wholesale.com/CMS2/article/regulations/

Use a **five-product sourcing pilot** before importing the intended 20 items:
confirm samples, supplier costs, actual Germany shipping/returns, image rights,
size charts, manufacturer and safety contacts, and textile composition.

**Next-step implementation:** `FIRST-DROP-SOURCING.md` and
`sourcing/first-drop-candidates.json` now contain a dated, five-listing LEIVIP
research shortlist with a cost model and explicit non-approval gates. Run
`npm run check:sourcing` for its reproducible contribution estimates. There are
no new Shopify products, actual orders or launch approvals.

**Sizing follow-up:** `sourcing/sized-alternatives.json` now compares real
orderable size variants (not generic XS–XL size charts), including a LEIVIP
S/M/L tailored trouser and FactoryPrice S/M+L/XL cardigan alternatives.
Public catalogue, planned prices and checkout stay unchanged until samples and
supplier terms are confirmed.

## Required before launch

1. Reconnect and verify the intended Shopify store and publication.
2. Approve real supplier SKUs, sizes, materials, photography rights, GPSR
   information, landed costs and return handling for every product.
3. Replace concept entries with real published Shopify products/variants.
4. Implement size and color selectors from real options, inventory checks,
   cart and checkout behind explicit dual launch gates.
5. Verify Germany delivery fees/times, taxes, payments, legal disclosures,
   textile labelling, packaging obligations and return arrangements.
6. Complete desktop/mobile, Safari/WebKit and end-to-end test orders.

Never turn on purchases merely because the visual preview is ready.

## Independent WebKit acceptance — V35

Actual Playwright 1.62.1 / WebKit 26.5 (Linux WPE, headless) loaded the built
offline preview at 320, 375, 390, 430, 768, 1024 and 1440 px: **78 PASS / 0 FAIL**,
including all 20 concept pages at every width (140 route loads). Raw results
before and after the fixes are in `docs/acceptance/v35-webkit-{before,after}.json`.
The initial run reproduced two mobile accessibility defects: focus remained on
a hidden navigation link after section selection, and the compact detail-page
return link lost its descriptive accessible name. Both are corrected without
changing the editorial layout. Chromium CI now guards these cases, browser
history and all seven viewport widths.

`npm run check:browser:matrix` reuses an **already provisioned** Playwright module
and compatible browser, without downloading anything. Set
`EVERNE_PLAYWRIGHT_MODULE` to its module path when it is not installed locally;
`EVERNE_BROWSER_ENGINE` selects `webkit` (default) or `chromium` and
`EVERNE_BROWSER_EXECUTABLE` optionally selects an existing executable.
`EVERNE_BROWSER_REPORT` optionally writes the complete JSON report.
The runner is opt-in and does not add a dependency or a paid CI service.

No HTTP(S) request, local asset failure or uncaught JavaScript exception was
observed in either WebKit matrix. This is engine acceptance of the actual
offline build, **not native macOS Safari, iPhone Safari, VoiceOver or a legal
release review**. S01–S20 remain untested on Apple devices. The existing Mac
launcher is syntax-checked and safely rejects Linux; actual Mac execution is
still pending. **SAFARI ACCEPTANCE PENDING / COMMERCE NO-GO.**
