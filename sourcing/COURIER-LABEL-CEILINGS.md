# EVERNE WOMAN — Germany own-label courier-price ceilings

**Model date:** 30 October 2026  
**Release decision:** **NO-GO / RESEARCH ONLY**  
**Scope:** Five FactoryPrice-linked planning concepts; first three are sampling research priorities, both dresses are on HOLD. **NOT supplier quotes.**

## Why this screen matters

The supplier's merchant-paid own-label courier rate from Poland to a customer in Germany is **not verified**. The published standard supplier warehouse-to-Germany DHL table cannot be substituted for it. A free supplier account does not establish a free Shopify connector. These models therefore test an outbound label cost rather than pretending to know one.

Under an **illustrative 20% complete-order refund rate**, with **all refunded garments unsellable** and **free outbound delivery to the consumer**, the hypothetical maximum **net outbound shipping-label price per single-item order** that preserves a **€10 contribution before advertising and overhead** is shown below. All figures are **NOT supplier quotes** or forecasts, and the €10 buffer is a screening assumption, not a verified profit target.

| EVERNE design concept | Planned gross retail | Public unit goods cost, net | Contribution at hypothetical €7.50 label and 20% returned goods loss | Highest net outbound label for illustrative €10 buffer | Research decision |
|---|---:|---:|---:|---:|---|
| Essential Rib Top | €34 | €5.89 | **€5.38** | **€2.88** | Sample research priority; commercial risk |
| Second Skin Body | €39 | €7.20 | **€7.31** | **€4.81** | Sample research priority; commercial risk |
| Tailored Everyday Pant | €59 | €16.11 | **€11.35** | **€8.85** | Sample research priority; best of the three under this scenario |
| Easy Slip Dress | €44 | €14.50 | **€3.25** | **€0.75** | HOLD: finish, season and weak economics |
| Soft Midi Dress | €59 | €16.11 | **€11.35** | **€8.85** | HOLD: summer garment/hem mismatch, independent of model economics |

**Business implication:** Free shipping on individual €34 and €39 products is fragile under this adverse illustrative return scenario. Even the €59 trouser has only a thin buffer at the unverified €7.50 net label price. Neither held dress is released merely because a number looks better. A real courier quote, actual return/recovery outcomes and possible mixed-item parcels must be confirmed first. Do not silently change the 4/9 price targets, add a shipping fee, raise a price or promise free shipping on the site.

## Reproducible assumptions and calculation

All values below are scenario inputs from `sourcing/capsule-order-economics.json`, **not confirmed merchant terms**.

- German gross customer retail is divided by **1.19** (assumed VAT) to calculate net customer revenue for a kept order.
- Published *indicative* FactoryPrice net unit goods costs are used, not invoices.
- Payment fee: **2.5% of gross retail + €0.25 per order**, treated as not refunded.
- Outgoing fulfillment per single-item parcel: hypothetical outbound label + **3 PLN / 4.3938 PLN per EUR** handling + **€0.70** packaging.
- Full-refund probability (hypothetical): **20%**. Refunded garments are valued at **€0**, as a conservative sensitivity, not an actual returns forecast.
- On a returned order: add assumed **€5** reverse label and **€3** inspection/handling. The earlier flat €2.50 returns reserve is **replaced**, **not added again**.
- A customer is not charged separately for outbound delivery in this scenario.
- The model treats the returned order as no retained sales revenue, assumes the merchant cannot recover shipping/payment costs and does not net VAT effects beyond the stated simplification. Recovered inventory in the alternative scenario is not immediate cash.

For a single-item order with gross planned price `P`, public net goods cost `G`, label `L`, return rate `r`, handling `H=3/4.3938`, packaging `K=0.70` and payment fee `F=0.025P+0.25`:

```text
kept contribution       = P / 1.19 - G - F - L - H - K
fully refunded (lost)   = -G - F - L - H - K - 5 - 3
modelled per-order value= (1-r) * kept + r * fully_refunded
maximum viable label L  = (1-r) * (P / 1.19) - G - F - H - K - r*(5+3) - 10
```

At `r=0.20` and `L=7.50`, the 20%-return figures above reproduce the existing model's baseline. The analysis also tests hypothetical labels of €5, €7.50 and €10 and return rates of 10%, 20% and 30% to detect arithmetic regressions. `npm run check:courier-ceilings` verifies these results against the existing model.

**Not included:** advertising/customer acquisition, fixed operating expenses, app/subscription fees, additional customer service, disposal, partial returns, package splitting, return fraud, replacements, chargebacks, exchange-rate spread, actual tax/accounting treatment, and unconfirmed supplier-contract costs. Consequently, **nothing here establishes net profit, real break-even or a viable sale.**

## Gate before any sales decision

1. Get a written supplier or carrier quote for the **actual own-label label price** to German consumers, packaging and the 3 PLN handling charge.
2. Verify if two different SKUs can be packed and returned together; do not assume one parcel for an outfit.
3. Obtain the merchant's own-label dropship return process and reconcile its ordinary **7-day B2B window** with EVERNE's customer-facing withdrawal responsibilities.
4. Clarify authentic wholesale costs, variant availability, labels, fit tests and photography rights.
5. Re-run the model with actual merchant costs, model return rates, and a separately agreed acquisition/overhead allowance. A scenario clearing €10 is **not** a sale-approval test.
6. Obtain a separate founder release and successful Shopify/Safari test. The current NO-GO remains in force.

**External actions:** no supplier contact, order, charge, Shopify import, checkout enablement, PR merge or production deployment authorized.
