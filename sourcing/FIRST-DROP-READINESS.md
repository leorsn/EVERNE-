# EVERNE WOMAN — First Drop Release Readiness

**Evidence date:** 30 October 2026  
**Decision:** **NO-GO for every SKU.** No supplier order, published Shopify womenswear item, spending authority or active checkout.  
**Working supplier:** FactoryPrice (Poland) — research only.  
**Single source of machine-readable readiness:** `sourcing/first-drop-readiness.json`.

## Five-concept candidate register

| Concept | Supplier code | Planned retail incl. assumed VAT | Public supplier net cost (NOT merchant quote) | Research stage |
|---|---|---:|---:|---|
| Essential Rib Top | RV-TP-A1363.01P | €34 | €5.89 | Sample research priority |
| Second Skin Body | RV-BO-A1441.81 | €39 | €7.20 | Sample research priority |
| Tailored Everyday Pant | IT-SP-FL7371.61 | €59 | €16.11 | Sample research priority |
| Easy Slip Dress | IR-SK-M116227.21 | €44 | €14.50 | HOLD |
| Soft Midi Dress | RV-SK-A1231.19 | €59 | €16.11 | HOLD |

The retailer prices are planning targets, not offers: they are integer euros ending in 4 or 9. Supplier costs are dated, publicly observed figures, **not confirmed contracts**. Stock snapshots are not reserved stock. Research status is not sample approval, and sample approval is not sale approval. Images and concept colours in the preview are not verified supplier product images or available colourways.

**Research priority:** Essential Rib Top, Second Skin Body, Tailored Everyday Pant. The trouser is the preferred silhouette anchor but needs precise hip/waist/inseam measurements and fastening inspection. The two black sleeveless foundations risk assortment overlap.

**On hold:** Easy Slip Dress, Soft Midi Dress. The slip dress has weak hypothetical return-adjusted economics and unverified fabric finish. The cotton midi candidate is listed as a summer item and its hem description needs fit evidence; neither is appropriate to sell merely because a supplier page has a price.

## Critical independent findings

1. **Dropship order minimum and fee.** FactoryPrice publicly describes no minimum quantity for its own-label dropship service and 3 PLN handling per dispatched parcel. EVERNE supplies and pays for the courier label. Do not mistake its standard outbound warehouse shipping table for a German consumer dropship label quote. Source: https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html
2. **Shopify automation.** The supplier mentions Shopify via BaseLinker or a dedicated app, but no authenticated quote or proof of zero ongoing app/subscription costs exists for EVERNE. **A free supplier account does not imply free automation.** Source: same supplier dropship page.
3. **Returns mismatch / highest operational blocker.** FactoryPrice's posted wholesale return terms say seven days, buyer-paid return freight, and no direct end-consumer claims handling. Its own-label dropship page says separate return terms will be published. In ordinary EU online consumer purchases, the customer generally has 14 days to withdraw, and retailer responsibilities for defects continue separately. The supplier's wholesale deadline **does not reduce** EVERNE's consumer duties. Sources: https://factoryprice.eu/de/terms/ruckgabebestimmungen-772.html and https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_de.htm and https://europa.eu/youreurope/business/selling-in-eu/consumer-contracts-guarantees/consumer-guarantees/index_de.htm
4. **Real goods.** No five-SKU fit, fibre/label, exact variant stock, image licence or physical quality review has been approved. No import or live inventory is authorised.

## Price feasibility before asking for a courier quotation

A new, **hypothetical** sensitivity report `sourcing/COURIER-LABEL-CEILINGS.md`
models 20% fully refunded orders with all returned goods lost, separate
reverse-freight/handling costs, free outbound shipping for customers, and
a €10 screening buffer **before** advertising and overhead. Under these
assumptions, the maximum single-order **net outbound courier-label costs**
are **€2.88** for the €34 rib top, **€4.81** for the €39 body, and **€8.85**
for the €59 trouser. The two held dresses are not promoted by this model.
These are **NOT supplier quotes** or actual profit margins, and changing
shipping fees or target retail prices requires separate approval. Use
`npm run check:courier-ceilings` to recompute and verify the assumptions.

## Two-item outfit carts: consolidated vs split parcels

The zero-spend sensitivity review in `sourcing/PRIORITY-MIXED-CART-ECONOMICS.md`
and the reproducible `npm run check:priority-mixed-carts` test compare
**all three possible pairs** of the currently prioritized sample-research items.
At a **hypothetical €7.50 net outward label per parcel** and **20% full
basket refunds with all returned garments lost**, the modelled contribution
**before advertising and fixed overhead** is **€22.83 / €12.95** for rib top
+ body, **€26.86 / €16.98** for rib top + trouser, and **€28.79 / €18.91**
for body + trouser, where each pair of figures means **one shared parcel /
two split parcels**.

An assumed €10 screening buffer **per item** (€20 for a two-item basket)
is cleared in the one-parcel variant but missed for all three split-parcel
variants under these assumptions. The model also screens a distinct
20% one-item partial-return stress case; it is **not additive** to the
full-order refund case. Consolidation savings depend on **written supplier
confirmation of multi-SKU packing, genuine German courier labels, split
shipping and partial returns**. Figures are **NOT carrier quotations, actual
profits or authorization for live bundles**, discounts or free shipping.
The two dresses remain on HOLD and the full release decision stays NO-GO.

## Owner approval and data gates

There are **12 global checks** and **30 per-product evidence checks**. Each starts `PENDING`, and it may only become `VERIFIED` with an evidence reference, verification date and reviewer. The full machine-readable set is:

- **authenticatedWholesalePrices — PENDING:** Authenticate net prices and per-size availability without inferring stock reservation.
- **ownLabelGermanyCourierQuote — PENDING:** Obtain the actual merchant-paid parcel-label rate from Poland to Germany, not the standard supplier DHL warehouse tariff.
- **dropshipMultiSkuPackaging — PENDING:** Confirm whether different SKUs can share a single parcel and label.
- **shopifyIntegrationRecurringCost — PENDING:** Confirm whether the Shopify stock/order workflow works at EUR 0 additional recurring cost and how tracking syncs.
- **dropshipMerchantReturnContract — PENDING:** Obtain written merchant own-label dropshipping returns and defect handling terms; standard B2B seven-day text is insufficient.
- **consumerWithdrawalWorkflow — PENDING:** Approve a working consumer withdrawal/refund process covering the normal 14-day statutory window and exceptions.
- **germanyReturnAddressAndCosts — PENDING:** Confirm German consumer return destination, reverse shipping, goods inspection, merchant reimbursement and carrier costs.
- **commercialImageAndCopyRights — PENDING:** Obtain commercially usable product photographs and accurate original material/fit information.
- **textileAndProductSafetyLabels — PENDING:** Verify fibre and care labels and legally required responsible-operator/product-safety information.
- **finalLandingCostAndReturnEconomics — PENDING:** Recalculate true per-item and mixed-cart costs using actual merchant quotes and plausible returns.
- **shopifyTestOrderAndPrivacy — PENDING:** Verify order, tracking, merchant billing, privacy and refunds before enabling commerce.
- **founderWrittenRelease — PENDING:** Require explicit separate release decision after all evidence, never auto-launch from a script.

The first three concepts are **research priorities only**. The two dresses are **HOLD** and must not be substituted or published without a separate decision.

## Ordered zero-cost progress

1. Confirm the five SKU identities and prepare a single request for a written merchant quote, variants, German own-label label cost, parcel consolidation, a practical 14-day consumer return workflow, defects handling, photo rights, and Shopify integration fees. A drafted supplier enquiry exists; **it has not been sent** and no external contact is authorised by this report.
2. Evaluate the received answers, ideally with a **3-priority-SKU-first** review rather than committing to the two dresses. Do not treat a supplier's marketing claims as a signed agreement.
3. Once a budget and sample purchase are separately authorised, fit/wash/inspect physical products, record exact measurements/labels, and create licensed product photography.
4. Re-run one-item and multi-item economics with real net courier-label cost, packaging, payment and return handling; confirm at least one workable returns address and customer refund path.
5. Obtain legal and founder approval, then test Shopify inventory syncing, a sandbox order, the return process and Safari/WebKit. Only a **separate** owner launch decision can authorize publication and checkout.

## Automatic validation

`npm run check:first-drop:readiness` checks these evidence records against the existing five-product economics, prior merchandising decisions and fulfillment assumptions. `npm run check:sourcing`, the regular build, and the offline build now include the readiness guard. This protects against accidental retail approval or revised target prices, **not** against every possible real-world contractual or legal risk. A passing check with `NO_GO` means launch remains blocked.

**Additional cash committed:** €0. **Supplier outreach:** none. **Orders:** none. **Shopify/production state:** unchanged.
