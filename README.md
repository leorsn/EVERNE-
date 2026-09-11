# EVERNE Headless Storefront

Production repository for the EVERNE Edition 01 storefront.

## Architecture

- React + TypeScript + Vite
- Shopify Headless / Storefront API
- Shopify remains the commerce source of truth for product data, variants, availability, cart and checkout
- The custom EVERNE frontend remains the visible storefront

## Branches

- `main` — protected release baseline
- `dev/headless-foundation` — active storefront development

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

Set the public Storefront API token in `.env.local`:

```env
VITE_SHOPIFY_STORE_DOMAIN=khps10-rs.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=<public storefront token>
```

The token used here is a Shopify **public Storefront token**, never an Admin API or private token.

## Preview vs Live mode

Edition 01 currently has a static preview catalogue in `src/previewCatalog.ts` so the storefront can accurately display the approved product names, SKUs and prices while Shopify products are still draft/unpublished.

The storefront queries Shopify collection `edition-01` at runtime.

- If a matching Shopify SKU is published and available, the product becomes purchasable and `Add +` creates/updates a Shopify cart.
- If the product is not published or unavailable, the page remains in truthful private-preview mode and purchasing is disabled.
- Checkout is never fabricated. It uses Shopify's returned `checkoutUrl` from a real Storefront API cart.

## Cart

The Shopify cart ID is stored in browser localStorage under:

`everne.shopify.cart-id`

This restores the bag across reloads when the cart remains valid.

## Deployment

Vercel or another Vite-compatible static host can deploy this repository.

Configure these environment variables in the host:

- `VITE_SHOPIFY_STORE_DOMAIN`
- `VITE_SHOPIFY_STOREFRONT_TOKEN`

Then use:

- Build command: `npm run build`
- Output directory: `dist`

## Current limitations

- Final product photography still needs to be attached to the Shopify products.
- Edition 01 products must be ACTIVE and published to the Headless sales channel before purchase functionality becomes live.
- Supplier/inventory truth must be confirmed before product activation.
- Newsletter form is currently visual-only and intentionally does not pretend to submit data.

## Security rule

Never commit Shopify Admin API keys, private Storefront tokens, payment credentials, supplier credentials or customer data to this repository.
