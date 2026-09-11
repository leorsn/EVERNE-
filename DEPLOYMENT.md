# EVERNE Deployment

## Target architecture

EVERNE runs as a custom React storefront. Shopify remains the commerce backend for products, cart, checkout and orders.

## Required environment variables

- `VITE_SHOPIFY_STORE_DOMAIN=khps10-rs.myshopify.com`
- `VITE_SHOPIFY_STOREFRONT_TOKEN=<public storefront token>`
- `VITE_SHOPIFY_API_VERSION=2026-07`

The Storefront token is public by design. Never add Shopify Admin API credentials to this frontend.

## Recommended deployment

Deploy `dev/headless-foundation` as a preview deployment first. Add the environment variables in the hosting dashboard. Use the production domain only after the live Shopify publication, product availability, shipping, tax and checkout settings are verified.

## Preview vs live

If Shopify returns no published Edition 01 products, the confirmed assortment remains visible editorially but purchase actions stay unavailable. Once the products are active and published to the EVERNE Headless storefront, the same UI uses live variants, cart and Shopify checkout.

## Release gate

Do not switch EVERNE to a production domain until all of the following are verified:

1. Edition 01 products are active and published to the correct Headless storefront.
2. Product media and final descriptions are approved.
3. Inventory policy reflects the supplier model truthfully.
4. Shipping zones and rates are configured.
5. Taxes are configured for the intended markets.
6. Shopify Payments or the intended payment provider is active.
7. Legal pages and merchant disclosures are present.
8. Cart → checkout → test order is completed successfully.
