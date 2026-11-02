# EVERNE / Image-free editorial preview

This design branch replaces the publicly rendered concept catalogue with a restrained, typography-first site. There are no approved garment or care-product photographs. No placeholder, AI-generated, supplier or stock images are loaded in the active routes.

## Visitor-facing routes

- `/`: EVERNE WOMAN introductory landing page; five *planned* category names only, no concepts or target prices.
- `/care`: image-free introduction to EVERNE CARE, without an unapproved product catalogue.
- `/standards`: selection process, outstanding approvals, and the external supplier model.
- Historic `/edit/...` and `/products/...` URLs now show the image-free introduction rather than concept/product details.

The original twenty concepts and internal sourcing models remain in the repository for research; they are not imported into the active frontend bundle. The old visual references have been moved from Vite's publicly deployed `public/` folder to the source-only `research-assets/` folder. They are neither bundled nor exposed at their former public image URLs in new deployments.

## Release boundary

- `noindex,nofollow` remains in `index.html` and SEO updates.
- No add-to-cart, checkout, order forms, signups, Shopify calls or network-loaded brand assets.
- Existing product and supplier readiness remains `NO_GO`; this branch authorizes only a protected preview, not a launch.
- `approvals/visual-assets.json` starts in `IMAGE_FREE` mode with an empty approved-asset list. Both the public source directory and final compiled output are scanned for raster assets; a stray photo fails the build even if no page references it. The gate also checks exact image checksums and separate documented approval evidence when a later, explicitly reviewed phase begins. The active preview boundary still independently prohibits photographs.
- `approvals/product-publication.json` separately starts in `NO_PRODUCTS` mode. Its release validator requires authenticated supplier/sample, size, pricing, image-rights, logistics and founder evidence from the existing first-drop register before a product can be described as publication-ready. No product data is imported into the active website by this register.
- Publishing commerce will require sample approval, legally verified business information, product-specific images, measurements, pricing, delivery and returns, plus a deliberate release review.

## Design direction

Colors: Charcoal `#191919`; Espresso `#38332F`; Stone `#777268`; Warm Ivory `#D8D1C7`; Off-White `#F1EFEB`. Typeface uses a resilient system sans for navigation and Georgia for editorial display type. The composition uses generous margins, editorial rule lines and a text-only index with no ornamental cards, badge grids, fake metrics or artificial visuals.

`npm run build` checks the active module graph as well as the no-image/no-commerce constraints and all existing supplier/launch gates.

`npm run build:offline` prepares a five-file, image-free, self-contained Safari review ZIP. The twenty real-device checks are documented in `SAFARI-ACCEPTANCE.md`; none are deemed passed by a build alone.
