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

`src/main.tsx` serves the womenswear editorial preview (`src/WomenswearApp.tsx`). It presents 20 proposed concepts across five clothing categories, with target prices of €34–€59. The original garment-care collection has a separate preview route, `/care` (`src/CarePage.tsx`), with four locally hosted catalog cards. There is no live product checkout, bag, stock promise or supplier claim on these screens.

The editorial photographs are style references, not photographs of offered products. The preview is intentionally noindexed until supplier, sizing, fulfillment, legal and launch gates are cleared.

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

Pushes to `feat/everne-woman-editorial-preview` create isolated Vercel preview deployments; production continues to follow the configured production branch. Do not promote a preview or push to `main` without a deliberate launch decision.

The repository retains a historical GitHub Pages workflow in `.github/workflows/deploy-pages.yml`; Vercel is now the intended preview host.

Before publishing a change run `npm run build`, which includes source, render, preview isolation and sourcing readiness checks.

## Current limitations

- Final product photography still needs to be attached to the Shopify products.
- Edition 01 products must be ACTIVE and published to the appropriate storefront publication before purchase functionality becomes live.
- Supplier/inventory truth must be confirmed before product activation.
- Newsletter signup is intentionally not live until subscriber storage and consent handling are connected.

## Security rule

Never commit Shopify Admin API keys, private Storefront tokens, payment credentials, supplier credentials or customer data to this repository.
