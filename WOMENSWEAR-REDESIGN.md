# EVERNE WOMAN — Editorial preview

Status: DESIGN PREVIEW ONLY / NO COMMERCE.

## Brand direction

- Style C: approximately 70% enduring essentials, 30% trend accents.
- Planned customer price range: EUR 30–60 including tax.
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
