# EVERNE WOMAN — Three-product Shopify draft handoff

**Prepared:** 2 November 2026  
**Source:** `feat/everne-woman-editorial-preview` (2026-10-30 sourcing research)  
**Status:** RESEARCH ONLY — NOT IMPORTED, NOT PUBLISHED, NOT APPROVED FOR SALE.

The machine-readable source of this handoff is [`sourcing/everne-three-sku-draft-manifest.json`](../sourcing/everne-three-sku-draft-manifest.json). It includes the specific supplier listing links, original product codes, exact supplier-listed size/EAN pairs and launch blockers. Supplier EANs are identifying evidence, **not verified Shopify barcode assignments**.

## Draft mapping

| EVERNE concept | Proposed retail | FactoryPrice code | Size variants | Public supplier net unit cost |
| --- | ---: | --- | --- | ---: |
| Essential Rib Top | €34 | `RV-TP-A1363.01P` | S/M, L/XL | €5.89 |
| Second Skin Body | €39 | `RV-BO-A1441.81` | S/M, L/XL | €7.20 |
| Tailored Everyday Pant | €59 | `IT-SP-FL7371.61` | S, M, L, XL | €16.11 |

Supplier prices are public 30 October snapshots **before unknown invoiced tax, courier labels, integration, return cost and fees**; none is an authenticated merchant quote. The first two public listing pages were reachable again on 2 November; the trouser page was not independently accessible in that recheck. Do **not** claim current stock from these historic counts.

## Guarded Shopify sequence

1. Reconnect the existing store `khps10-rs.myshopify.com`. Search existing products by supplier code, EAN and proposed handles before any import. Never replace or archive the care catalog automatically.
2. Confirm if a new womenswear collection is intended. Do not reuse `edition-01` (the existing care collection) just because the preview calls the range Collection 01.
3. Confirm merchant-specific product price, VAT invoice treatment (Kleinunternehmer and EU acquisition), true label charge, packing/handling fee, integration subscription, supplier stock and returns workflow.
4. Only **after explicit approval for draft import**, create products as `DRAFT`, unavailable on Online Store, with **zero available inventory**, overselling disabled, and no supplier stock-photo reuse. Do not assign or fabricate fulfillment-service or tax settings.
5. Obtain samples, real centimetre measurement tables, label/compliance records, visual approval and image permission; prepare accurate English descriptions and own photo gallery.
6. After real availability, shipping/refund policy, checkout and end-to-end Safari test evidence, seek a **separate founder GO** before publishing.

## Important accounting boundary

The previous cost scenario divided retail prices by 1.19 and deducted supplier *net* costs. Leonid indicated he operates as a Kleinunternehmer. That scenario must not be presented as EVERNE net profit; purchases can contain **non-deductible input VAT**, and Polish B2B purchases can trigger special acquisition/ID implications. Neither the input-tax rate nor its invoice treatment is inferred here. For the later margin model, take the actual **all-in cash cost per sellable unit** from supplier invoices, verified courier labels, payment fees, returns and other charges.

Relevant official guidance: [§ 19 UStG](https://www.gesetze-im-internet.de/ustg_1980/__19.html), [IHK Hannover Kleinunternehmer](https://www.ihk.de/hannover/hauptnavigation/recht/steuerrecht/umsatzsteuer/kleinunternehmer-im-ust-5213920).

## Non-negotiable launch gates

- Supplier identity, exact SKU/variant, invoice, actual stock and parcel service verified.
- Manufacturer and textile labels, care/material information and safe-product traceability verified.
- Customer refunds/returns can be handled independent of the wholesaler's short B2B return window.
- Own product photography or explicit licence secured.
- No sale activation from this handoff alone; separate owner decision is mandatory.
