# EVERNE — Customer trust and purchase journey

**Status:** Design implementation in preview; not an approved store launch.  
**Date:** 1 November 2026  
**Budget:** €0 new services, promotions or purchases authorized.

## Objective and position

Build an accessible premium-feeling womenswear boutique in which the product, seller and service terms are easier to understand than the visual brand story is to admire. This is an **accessible-premium curation**, not a claim that pieces are manufactured by EVERNE or are luxury-grade without proof.

Customers should be able to answer five questions without guesswork:

1. What does EVERNE offer and what is its aesthetic?
2. Which garment might suit me and what does it really look like?
3. How will I determine fit, material and price?
4. Who will fulfil an order and what happens if I need help or return it?
5. Is the payment process and total cost clear?

The current fashion experience is **prelaunch only**. All 20 concepts and €34–€59 prices are planning targets. No retail SKU or live checkout is authorized.

## Page architecture

| Touchpoint | Role | Implemented preview | Required after supplier evidence |
| --- | --- | --- | --- |
| Header | Find the edit, brand, care and trust content quickly | `The Edit`, `Our World`, `Style Notes`, `Our Standard`, `Everne Care` | Direct sale-category links, search and cart when actual inventory exists |
| Hero | Explain the category and make the next action obvious | Product-category description and direct link to the 20-piece edit | Actual featured product and a working `Shop the collection` CTA |
| Confidence rail | Set expectations before exploration | Planning count, review-first policy, no checkout | Replace with only verified delivery, returns and customer-service facts |
| Product list | Browse by familiar categories and price | Five selectable categories, 20 distinct labelled concept entries | Real licensed garment photos, names, final prices, colour/size variants and availability |
| Detail | Support a buying decision | Planned price, unavailable status, missing facts and link to quality criteria | Real fit, model dimensions, fibre composition, care, image zoom, stock, shipping estimate and returns near CTA |
| `Our Standard` | Explain what is selected and not yet proven | External supplier disclosure; sample, fit, total cost and return gates | Update with evidence-backed, specific brand standards only |
| `EVERNE CARE` | Separate original care assortment | Independent non-transactional preview | Supplier-verified secondary catalog and truthful cross-sells |
| Checkout | Complete a purchase without unnecessary hurdles | **Absent by design** | Shopify checkout, explicit total, guest experience, validated payment, consumer disclosures and end-to-end test |

## Product-detail information contract

Before a product can display a purchase control, one identified supplier SKU and each displayed variant must have traceable evidence for:

- Real images with commercial usage rights, including worn front/back, fabric close-up and reference for length/scale.
- Descriptive item name and actual price, not planning target.
- Fibre composition, care label, cut, specific garment measurements, size mapping and model measurements where known.
- Inventory/availability by each variant and a supported fallback when unavailable.
- Final shipping destinations, transparent shipping fee or reliable estimate and realistic dispatch/transit time.
- Merchant contact, return address, consumer withdrawal route, return cost policy and defect handling.
- Legally required producer/responsible-person, safety and textile information.
- Tested customer journey: select size → cart → Shopify checkout → receipt → tracking → refund/return.

Keep the paid CTA **off** for any product that fails a gate; never fill unknown fields with convenient defaults.

## Ethical persuasion principles

- Prefer a compelling wardrobe combination and real garment evidence over slogans alone.
- Provide shipping and returns information before checkout, not only after payment begins.
- Publish a founder and operator story only with verified details; make support reachable.
- Collect and display authentic reviews only after genuine purchases and consent; do not invent ratings, countdowns, scarcity or stock.
- Do not silently switch editorial / AI styling imagery into purported photographs of merchandise.
- Design for readable contrast, 44px-or-better mobile controls, keyboard navigation and reduced motion.
- Never present a conversion estimate as measured without user data.

## Measurement after consent and launch

Use a lawful, configured measurement tool only after privacy review. Minimum events (without storing names, addresses or payment details):

1. `collection_view` and selected category.
2. `product_view` per genuine product.
3. `size_guide_open` and `size_selected`.
4. `add_to_cart` and `checkout_started`.
5. `purchase_completed`, cancellations and returns from the authoritative commerce platform.

Report the *whole funnel* and segment by device. A good-looking hero is not a substitute for completed paid orders and satisfactory returns. Organic visitors and paid visitors should be analysed separately if paid campaigns are ever authorized.

## Evidence and release conditions

See `docs/everne-product-evidence-audit.md`, `docs/everne-human-usability-test.md`, `sourcing/first-drop-readiness.json` and `LEGAL-LAUNCH-CHECKLIST.md`. Any completed browser/build test proves only that the preview functions; it **does not** approve supplier stock, legal text or checkout activation.

**Research basis:** Baymard Institute (apparel sizing, product detail and shipping/returns UX), Nielsen Norman Group (luxury UX, credibility and small-sample formative testing). Those findings guide the interface; they do not establish EVERNE conversion rates.
