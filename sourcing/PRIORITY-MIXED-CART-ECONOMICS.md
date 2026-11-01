# EVERNE WOMAN — Two-item basket and split-parcel sensitivity

**Model date:** 30 October 2026  
**Status:** **NO-GO / RESEARCH ONLY**  
**All amounts are hypotheses, NOT supplier quotes or profit forecasts.** No prices, paid services, sample orders, cart functionality, Shopify data or checkout are changed.

## Why we tested two-article carts

FactoryPrice's own-label dropship program may require the merchant to supply a shipping label and pay a parcel handling charge. It has **not confirmed** that two different apparel SKUs can be picked and packed together under one label. Until this is answered, evaluating an outfit using the economics of one shipment would overstate a potentially crucial cost advantage.

This pass models only the **three** currently prioritized *sample-research* concepts. The two dresses remain on hold regardless of theoretical cart margin. All whole-euro prices ending in **4 or 9** are preserved.

## Hypothetical full-refund goods-loss outcome

Assumptions: outbound merchant label **€7.50 net per parcel**, **20%** full-order refunds (entire basket, with **zero recoverable returned goods value**), **€5 reverse shipping per returned parcel**, **€3 inspection per returned item**, **3 PLN** FactoryPrice handling and **€0.70 packaging per outgoing parcel**, **2.5% of gross + €0.25** payment fee, assumed **19% German VAT**. Customer outbound shipping is free *only in the model*, not a website promise.

| Model-only pair | Gross planned cart | 1 shared parcel | 2 separate parcels | 2 separately placed one-item orders | Shared-vs-split gain |
|---|---:|---:|---:|---:|---:|
| rib-body — Essential Rib Top + Second Skin Body | €73 | **€22.83** | €12.95 | €12.70 | **€9.88** |
| rib-pant — Essential Rib Top + Tailored Everyday Pant | €93 | **€26.86** | €16.98 | €16.73 | **€9.88** |
| body-pant — Second Skin Body + Tailored Everyday Pant | €98 | **€28.79** | €18.91 | €18.66 | **€9.88** |

Each cell is an **illustrative contribution per placed order before marketing and fixed overhead**, not profit. Returned goods are assumed fully lost. It is not a forecast of customer returns. Under a *separate illustrative €10 per item* screening buffer (two items = €20), all three **one-parcel** values clear that screen, and every **two-parcel** value misses it. This screen alone is **not** a basis to sell.

The roughly **€9.88** consolidation effect at a €7.50 outbound label consists of one saved label (€7.50), one saved 3-PLN handling charge (~€0.68), one saved €0.70 packaging charge, and 20% × one assumed €5 reverse label (€1.00). **It disappears if the supplier must split the items into two parcels.** Even if items ship separately under one combined payment, only the fixed €0.25 card fee is saved versus two individual orders in this model.

## Distinct partial-return stress case

An additional **alternative scenario** assumes 20% of orders refund **only their higher-priced item**, while the other item remains with the customer. The returned item is treated as unsellable. This scenario is **not added** to the full-refund percentages; they are separate stress tests, not simultaneous probabilities.

| Model-only pair | 1 parcel, partial return scenario | 2 parcels, partial return scenario |
|---|---:|---:|
| rib-body | €29.14 | €20.26 |
| rib-pant | €33.18 | €24.29 |
| body-pant | €35.94 | €27.06 |

These partial-return results are *not necessarily a lower bound*. In reality, either item can be returned, multiple returns/exchanges can occur, shipping costs can differ, and restocking/value recovery vary. Both model scenarios exclude genuine observed return rates.

## Calculation details and source audit

Using original data in `sourcing/capsule-order-economics.json`, denote gross combined selling price `P`, net summed wholesale goods cost `G`, number of outward parcels `n`, hypothetical net outgoing parcel label `L`, handling `H=3/4.3938`, packaging `K=0.70`, payment fee `F=0.025P + 0.25`, return probability `r`, reverse label assumption `R=5`, inspection per garment `I=3`, and total items `k=2`.

```text
outward fulfillment = n × (L + H + K)
kept order          = P/1.19 − G − F − outward fulfillment
full return, lost   = −G − F − outward fulfillment − n×R − k×I
partial one, lost   = kept order − (higher-priced item gross / 1.19) − R − I
scenario value      = (1−r)×kept order + r×returned outcome
```

These are **simplified net-value scenarios**. Payment fees are not refunded; a full-refund outcome nets no retained customer revenue. A one-item partial refund retains the other item's net sale and assumes one reverse label. The model **does not** represent precise VAT refund accounting or prove that an actual carrier will issue a single label for multiple garments.

`npm run check:priority-mixed-carts` recomputes the table from the original five-item supplier-cost model; checks all three pairs, 1 vs 2 packages, courier labels €5/€7.50/€10 and return rates 10%/20%/30%, distinguishes full and partial returns, and preserves the **NO-GO** release gate. It runs during both normal and offline storefront builds.

**Excluded and unresolved:** authenticated FactoryPrice wholesale costs, actual merchant-paid German courier labels, multi-SKU consolidation and split-shipping rules, real return rates, size-fit/quality, physical samples, licensing, correct tax treatment, Shopify integration fees, advertising and customer acquisition, staff, overhead, return fraud, partial refund shipping rules, chargebacks, discounts and shipping-fee policy.

## Decision and next supplier questions

1. Can two **different** Fashion SKUs be picked, invoiced and shipped together to Germany under **one** merchant-supplied courier label and **one** 3-PLN handling charge? Does this also hold for the specific rib top + body + trouser variants?
2. When items are unavailable or stored separately, **what exact split-shipment rules** and extra fees apply? Who pays for a second label?
3. Where do partial mixed-order returns go and can each item be re-stocked in the context of consumers' usual 14-day distance-sale withdrawal window?
4. What is the **authenticated net label rate for Germany**? Does the selected courier permit a merchant-supplied prepaid label from the Polish warehouse?
5. Can mixed-order/partial-return status, tracking and refund data be synchronized in Shopify **without new monthly fees**?

**Provisional direction:** The rib-top/trouser and bodysuit/trouser concepts are the more coherent outfit candidates, subject to measured fit and photograph permissions. The rib top + bodysuit pair is redundant as two black sleeveless foundations. Do **not** create live bundles, discounts, shipping promises or checkout until samples, logistics, returns, commercial costs and the separately authorized release pass.

**External actions:** no supplier outreach, order, expense, Shopify change, real cart/checkout activation, Vercel deployment or merge.
