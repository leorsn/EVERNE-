# EVERNE WOMAN — Editorial preview

Status: DESIGN PREVIEW ONLY / NO COMMERCE.

## Brand direction

- Style C: approximately 70% enduring essentials, 30% trend accents.
- Planned customer price range: EUR 30–60 including tax.
- First curation: 20 concepts in five categories: tops, knitwear,
  trousers and denim, dresses, skirts.
- German-first copy, quiet editorial typography, ivory, ink, stone and wine.

## Architecture and safety

- Previous garment-care React code and Shopify functions remain in the repository,
  but are not imported by the fashion preview entry point.
- The redesign renders WomenswearApp.tsx and womenswear.css.
- Product routes show a truthful collection-pending page.
- Product names and prices in womenswearCatalog.ts are planning concepts,
  not offers, published Shopify items, or verified stock.
- The new frontend does not call Shopify or expose purchase actions. Old
  launch gates remain unchanged and cannot activate this preview.
- noindex,nofollow stays active until a genuine launch is approved.
- Existing legal pages contain prelaunch placeholders and require review.

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
