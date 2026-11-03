# EVERNE — BuckyDrop branded dropshipping pilot (research / NO-GO)

**Evidence date:** 3 November 2026  
**Decision:** **NO-GO for live sale and automatic supplier charging.** This file is a research-to-test handoff, not an approved vendor or a production integration.  
**Constraints:** no new subscription or purchase without founder approval; Shopify drafts and the 20-item editorial preview remain untouched; own sewn EVERNE label; direct-to-consumer Germany; automatically paid Shopify orders using supplier wallet funds; 14-day consumer withdrawal operations.

## Why BuckyDrop is an *unverified* candidate

- Its public **Free** plan has **¥0/month**, an introductory **30-order fulfillment quota**, 100 existing source mappings, 100 scraped/pushed products and 1,000 automatic product-info updates. Do not mistake the 30-order quota for free physical product, free postage or free handling. Pro is advertised at **¥199/month/store**, and scaling cannot be assumed free.
- Standard 1688/Taobao sourcing is advertised at **¥0 sourcing-service fee**. The listed ordinary parcel fulfillment fee is **¥9.90/parcel**, and international logistics lists a **further ¥9.90/parcel service fee** in addition to actual freight. International shipping, Chinese domestic freight, optional inspections, sewn labels, tags, customs, taxes and returns remain unknown and may add costs.
- BuckyDrop describes automatic Shopify order syncing, product procurement and parcel submission, **conditional on a previously funded account balance**. The published process instructs the merchant to top up funds manually. Neither automatic wallet replenishment from Shopify receipts nor a guaranteed zero-touch cash cycle has been established. The merchant remains responsible for liquidity and monitoring failures.
- **Safety finding (3 Nov):** BuckyDrop's current official beginner guide says **automatic order submission, parcel submission and auto-fulfillment are enabled by default** in its described onboarding flow. Before mapping any EVERNE source SKU or synchronizing a live order, a founder-authorized merchant must inspect **Settings → Order Settings** and **Settings → Logistics Settings** and verify any automation can be turned off/isolated. Merely installing an app is not approval to procure goods, and no card/wallet may be funded as part of a read-only trial. The Shopify connector returned **“Authentication required”** on the attempted read-only app-inspection query, so its current installed-app list has not been reverified during this check.
- It advertises **label sewing** for clothing and other branding services. That is *service capability*, **not** evidence of zero-minimum sewn EVERNE label inventory, per-item pricing or compatibility with each selected garment. Replacing a hanging tag alone would not meet EVERNE's sewn-brand-label requirement.
- No authenticated Germany lane quote, carrier delivery estimate, exact German consumer return destination, compliant textile label, approved private-label artwork, licensed merchant photography, or matched 1688 product variant was verified.

**Primary vendor references:**

- [BuckyDrop service pricing](https://www.buckydrop.com/en/services/pricing/)
- [BuckyDrop beginner guide — automation and wallet](https://www.buckydrop.com/en/beginner-guide/)
- [BuckyDrop label-sewing service](https://blog.buckydrop.com/buckydrop-warehouse-service-label-sewing/)
- [BuckyDrop branded dropshipping](https://www.buckydrop.com/en/start-branded-dropshipping/)
- [BuckyDrop manual top-up and settings](https://blog.buckydrop.com/buckydrop-guide-for-self-sourcing-users-with-private-suppliers-efficient-order-fulfillment-and-global-tracking/)

## First three acceptance candidates — precise cost guardrails

All figures below are **EUR planning thresholds**, not supplier prices or quoted profit. EVERNE's customer prices are planning prices. Calculation assumes a **30% contribution after all variable costs**, a hypothetical **2.5% of sale + €0.25 payment fee** and a **€0.50/order service allowance**, plus an illustrative **€6/order expected returns allowance**. No paid ads, fixed overhead or income tax is deducted; actual processor fee, refund costs and tax treatment must replace these placeholders. The founder previously stated Kleinunternehmer status; do not deduct output VAT mechanically, but ensure any **nonrecoverable import VAT, duty or clearing fees** are inside the all-in landed-cost number. Single-item order assumed.

Formula: **max total supplier/landed/brand/ship cost = 70% × listed retail price − (2.5% × retail price + €0.25) − €0.50 − expected returns allowance.** The actual amount paid to BuckyDrop must include product, Chinese local shipping, both handling/logistics service fees as applicable, label creation and sewing, international freight, currency/transaction costs, import charges and other order-linked fees.

| Existing Shopify DRAFT concept | Planned retail | Target all-in upper bound with €6 returns reserve | Stricter upper bound with €10 returns reserve | Supplier match |
|---|---:|---:|---:|---|
| Tailored Everyday Pant | €59 | **€33.08** | €29.08 | Not identified / NO-GO |
| Straight Leg Denim | €59 | **€33.08** | €29.08 | Not identified / NO-GO |
| Ribbed Turtleneck | €44 | **€22.95** | €18.95 | Not identified / NO-GO |

**Stop rule:** Any true all-in quote above the stricter threshold triggers review; any quote above the main €6-reserve threshold fails the modeled 30%-contribution objective. Both thresholds are **assumption-dependent**: actual returns on fashion items can exceed either reserve. Never present the 30% modeled contribution as achieved profit.

## Twenty-item catalog: sourcing-status reconciliation

These are the **20 conceptual product pages / Shopify drafts**, **not** 20 live purchasable manufacturer SKUs. No sourcing evidence exists that lets us mark any of these live.

| Priority | Concept | Category | Retail | Current sourcing state |
|---|---|---|---:|---|
| P2 | Essential Rib Top | Tops | €34 | No verified variant or sewn label |
| P2 | Second Skin Body | Tops | €39 | No verified variant or sewn label |
| P2 | Soft Line Longsleeve | Tops | €39 | No verified variant or sewn label |
| P2 | Everyday Tank | Tops | €34 | No verified variant or sewn label |
| P2 | Fine Knit Top | Tops | €39 | No verified variant or sewn label |
| P2 | Relaxed Crew Knit | Knitwear | €49 | No verified variant or sewn label |
| P2 | Wrap Knit Cardigan | Knitwear | €54 | No verified variant or sewn label |
| **P1** | **Ribbed Turtleneck** | **Knitwear** | **€44** | **Pilot candidate / no supplier SKU** |
| P2 | Soft V-Neck | Knitwear | €49 | No verified variant or sewn label |
| P2 | Off-Shoulder Knit | Knitwear | €59 | No verified variant or sewn label |
| P2 | Wide Leg Trouser | Trousers | €54 | No verified variant or sewn label |
| **P1** | **Straight Leg Denim** | **Trousers** | **€59** | **Pilot candidate / no supplier SKU** |
| **P1** | **Tailored Everyday Pant** | **Trousers** | **€59** | **Pilot candidate / no supplier SKU** |
| P2 | Relaxed Denim | Trousers | €54 | No verified variant or sewn label |
| P2 | The Black Mini | Dresses | €49 | No verified variant or sewn label |
| P2 | Soft Midi Dress | Dresses | €59 | No verified variant or sewn label |
| P2 | Easy Slip Dress | Dresses | €44 | No verified variant or sewn label |
| P2 | Fluid Midi Skirt | Skirts | €44 | No verified variant or sewn label |
| P2 | Tailored Mini Skirt | Skirts | €39 | No verified variant or sewn label |
| P2 | Denim Midi Skirt | Skirts | €54 | No verified variant or sewn label |

## Required acceptance sequence (no spending or activation now)

1. **Free-account sandbox:** founder explicitly authorizes signup/integration; inspect actual account fees, order quota and whether automatic procurement can be **disabled** while testing. No storefront product is published and no real customer order is synchronized.
2. **Exact 1688/Taobao match:** for each P1 concept record seller link, item ID, size/color SKU, product price, stock, real composition, supplier photos and rights. A similar silhouette is insufficient.
3. **Sewn EVERNE mark:** obtain item-specific quote, exact logo position and dimension, label/brand supply quantity, ownership, textile-content-label preservation and actual minimum label print/purchase quantity. Reject hangtag-only offers.
4. **Germany parcel economics:** produce carrier quote for **one real item with packaging dimensions and weight**, EUR exchange-cost estimate, import-VAT/duty/clearance treatment, promised delivery range, tracking and lost-parcel handling. Confirm whether tariff/VAT is paid by merchant or could unexpectedly be collected from customer (reject unexpected customer import bills).
5. **Returns contract:** German consumer return address and carrier pricing, 14-day withdrawal refunds, defects, lost shipments, items handled in China vs Germany, and whether garments can be resold. Record source of every contractual term.
6. **Compliance:** commercial photographs, accurate size chart, fibre composition on a permanent textile label, product traceability, own-brand/manufacturer responsibility, and responsible-operator details under applicable EU rules. Recheck with actual item and importer profile.
7. **Wallet test:** only after separately approved funding, use a **synthetic or sandbox order first**; verify Shopify order sync without irreversible supplier procurement, budget caps, wallet insufficient-funds behavior, label-service preselection and correct tracking sync. No unattended live billing without explicit permission.
8. **First paid sample:** separate founder approval for all price components before placing it; inspect sewn mark, fabric, sizing, label and parcel documents. Record photos and evidence; reject mismatch.
9. **Release:** do not change `ops/shopify-womenswear-drafts.json` status or `approvals/product-publication.json` until evidence satisfies every relevant gate and the founder explicitly signs off.

**Compliance references:** [EU fibre-label rules](https://europa.eu/youreurope/business/product-rules-compliance/textiles-and-footwear/textile-label/index_en.htm), [EU GPSR](https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng), [EU 14-day withdrawal](https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_de.htm).

**Next real blocker:** authenticated BuckyDrop candidate SKUs and account-specific logistics/brand quotes cannot be inferred from a marketing page. Do not claim any of the 20 concepts are sourced, sewn-branded, deliverable or profitable until those quotes and evidence are obtained.
