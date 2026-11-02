# EVERNE Headless Storefront

EVERNE's headless storefront repository, currently featuring the **Dark Atelier** womenswear concept preview and the original garment-care catalog.

## Architecture

- React + TypeScript + Vite
- Shopify Headless / Storefront API
- Shopify remains the commerce source of truth for product data, variants, availability, cart and checkout
- The custom EVERNE frontend remains the visible storefront
- Vercel deployment with Git-linked previews; Shopify remains the planned commerce layer

## Branches

- `main` — production baseline; do not publish unapproved product concepts
- `feat/everne-woman-editorial-preview` — current Vercel preview, with deliberately disabled sales

## Shopify

Store domain:

`khps10-rs.myshopify.com`

Collection handle:

`edition-01`

Expected Edition 01 SKUs:

- `EV-RS-01` — The Renewal Set
- `EV-GB-01` — Garment Brush
- `EV-CC-01` — Cashmere Comb
- `EV-CW-06` — Cedar Wardrobe Set

## Local setup

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The current storefront uses Shopify Storefront API operations that support tokenless access for product/collection and cart flows. The only required runtime settings are:

```env
VITE_SHOPIFY_STORE_DOMAIN=khps10-rs.myshopify.com
VITE_SHOPIFY_API_VERSION=2026-07
```

No Shopify Admin token, private Storefront token, or payment credential belongs in the browser bundle.

## Current public-facing preview

`src/main.tsx` currently serves the protected, noindexed design study in `src/EvernePreview.tsx`. Five planned womenswear categories appear without SKU detail, pricing, product cards or order flow. `/care` and `/standards` are editorial information pages, not catalogues. Old commerce modules are preserved in the repository but are not reachable from the active entry graph.

Four Pexels images under `public/editorial-study/` are licensed third-party visual references. The photographed clothes and fabrics are **not EVERNE merchandise** and do not constitute approved product photography. Exact hashes, original source links and license evidence are registered in `approvals/visual-assets.json` and `approvals/records/editorial-study-2026-11-02.md`. The production shop and publication gates remain closed.

The existing Shopify-enabled care storefront in `src/App.tsx` is preserved but is not the active preview route.

## Shopify-enabled legacy storefront

Edition 01 currently has a static preview catalogue in `src/previewCatalog.ts` so the storefront can accurately display the approved product names, SKUs and prices while Shopify products are still draft/unpublished.

The storefront queries Shopify collection `edition-01` at runtime.

- If a matching Shopify SKU is published and available, the product becomes purchasable and `Add +` creates/updates a Shopify cart.
- If the product is not published or unavailable, the page remains in truthful private-preview mode and purchasing is disabled.
- Checkout is never fabricated. It uses Shopify's returned `checkoutUrl` from a real Storefront API cart.

## Cart

The Shopify cart ID is stored in browser localStorage under:

`everne.shopify.cart-id`

This restores the bag across reloads when the cart remains valid.

## Vercel deployment

Vercel project: `everne-storefront` (Hobby plan), connected to this GitHub repository. `vercel.json` builds with Vite, serves `dist/`, and rewrites concept and `/care` detail URLs for client-side routing.

The active draft branch `feat/everne-imagefree-editorial` creates isolated, protected Vercel preview deployments. Production continues to follow its configured production branch. Do not promote this study or push to `main` without deliberate launch approval and review of image/model rights.

The repository retains a historical GitHub Pages workflow in `.github/workflows/deploy-pages.yml`; Vercel is now the intended preview host.

Before publishing a change run `npm run build`, which includes source, render, preview isolation and sourcing readiness checks.

## Current limitations

- Final product photography still needs to be attached to the Shopify products.
- Edition 01 products must be ACTIVE and published to the appropriate storefront publication before purchase functionality becomes live.
- Supplier/inventory truth must be confirmed before product activation.
- Newsletter signup is intentionally not live until subscriber storage and consent handling are connected.

## Security rule

Never commit Shopify Admin API keys, private Storefront tokens, payment credentials, supplier credentials or customer data to this repository.

# Customer trust and UX acceptance

The current EVERNE WOMAN site is an editorial preview, not a transactional
store. Its customer-first navigation, selection standards and deliberate
non-commerce boundaries are documented in:

- `docs/everne-customer-trust-blueprint.md` — intended home → category → detail
  → verified checkout experience.
- `docs/everne-product-evidence-audit.md` — supplier facts, missing product
  evidence and the five-research-item NO-GO.
- `docs/everne-human-usability-test.md` — independent real-user test script and
  empty scorecard (**no participants tested yet**).

The deployed `/standards` page explains the curation and outstanding checks to
visitors. `npm run check:trust` fails if the preview starts claiming verified
stock, completed legal contacts or a completed human study without evidence.
