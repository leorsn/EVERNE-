# EVERNE WOMAN — Zero-additional-cost fulfillment pilot

**Evidence date:** 30 October 2026  
**Shopify store:** EVERNE (Basic, EUR, Germany; confirmed read-only via the connected Shopify app)  
**Launch state:** **NO-GO / research-only**. No fashion products approved, no checkout, no real supplier integration, no supplier order and no real customer processing.  
**Additional budget:** EUR 0. **Shopify Basic is an existing paid plan, not a free Shopify plan.**

## What can be done within the existing Basic plan

1. **Shopify Flow** is a free Shopify app on Basic. Its **Send internal email** action can alert a fixed internal mailbox when appropriate Shopify order conditions are met. However, the **Send HTTP Request** Flow action requires at least Grow, Advanced or Plus; it is **not an included Basic-plan outbound webhook automation tool**. A direct supplier API integration would require a separate, authorized technical approach and verified operational costs. Do not assume it is free or active.
2. We can prepare an **internal operator checklist** before enabling the future flow. It can record *synthetic* SKU validation, quantity, paid/unfulfilled status, supplier research match and whether the order would need one or two packages.
3. FactoryPrice's newer own-label dropship page describes merchant-provided shipping labels, EUR-internal scenario modelling of a **3 PLN handling fee per parcel**, a free supplier account and a claimed Shopify XML/API route. **But** a separate official FactoryPrice wholesale FAQ says direct-to-end-customer dispatch is not currently offered. Different site branches or document ages might explain this conflict; **the merchant-specific service must be confirmed in writing**. Do not treat either source as a signed operational agreement.
4. A real Shopify ↔ FactoryPrice inventory/order connector, paid label purchase, supplier-order submission, customer shipping email, fulfillment status mutation and returns processing are **NOT** implemented or authorized by this zero-cost pilot.

Sources:
- Shopify Flow plans and HTTP feature restriction: https://help.shopify.com/en/manual/shopify-flow
- Shopify Flow internal email action: https://help.shopify.com/en/manual/shopify-flow/reference/actions/send-email
- FactoryPrice dropship self-label claims: https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html
- Contradictory official wholesale FAQ: https://hurtownia.factoryprice.eu/faq/

## Implemented: PII-free mock fulfillment review

Files:
- `ops/manual-handoff.mjs` — a pure, side-effect-free order-preview validator
- `scripts/validate-manual-handoff.mjs` — automated positive and negative guards
- `scripts/run-manual-handoff-demo.mjs` — reproducible no-customer-data illustration

Commands (local repository, Node installed):

```bash
npm run check:ops:dry-run
npm run demo:ops:dry-run
```

Both the normal and offline storefront build run the check through the existing `check:sourcing` command. The module is **not imported by the storefront**, which retains its separate no-commerce dependency gate.

The example uses `MOCK-` identifiers only, exactly one or two synthetic order lines, public researched FactoryPrice EANs and the **unchanged** planning targets €34 / €39 / €59. It rejects extra fields such as customer names, addresses, phone numbers, emails and real Shopify order identifiers. It never creates shipping labels or orders, requests a payment, sends email, talks to Shopify/FactoryPrice or marks anything fulfilled.

Every result returns **`HOLD_NO_GO`** with specific blockers. Relevant cases:
- item is not approved for sale
- payment is not captured or order is already fulfilled
- product code/variant EAN is not matched to the selected research SKU
- planned price differs, duplicated variant or held dress selected
- multi-SKU one-parcel handling is unconfirmed
- merchant returns, label cost or the conflicting supplier service are unresolved

A valid synthetic paid/unfulfilled basket is **still held** because a successful data match does not supply inventory, signed returns terms, a carrier quote, a right to fulfill an order or a legal sale approval.

## Later manual operating mode (not enabled)

Once actual source SKUs, image rights, business terms, legal documents, refunds and separate founder approvals pass:

1. Shopify Basic + optional free Flow internal notification can alert an **internal team mailbox only**. A real workflow must be enabled explicitly and verified in a non-production test.
2. An authorized human confirms payment, customer consent/legal basis, SKU/variant, current stock, item weight, carrier quote and source quality.
3. The operator verifies whether a combined two-item order can travel in **one parcel**. If the supplier requires two, the economics use **two labels and two handling fees**, not a single label assumption.
4. A merchant-supplied carrier label and customer address **may only be sent through an approved, secure supplier channel after contracts and privacy terms pass**, not through this GitHub repository, screenshots, mock test fixtures or internal broad-distribution emails.
5. Tracking, partial returns, damaged items and consumer refunds must have their own verified procedures; Shopify fulfillment must not be marked complete before a genuine carrier acceptance event.
6. Only after operating evidence and a separate release decision consider replacing manual handling with a direct Shopify API endpoint. Do not bypass the current Basic-plan Flow HTTP restriction, incur fees or create app credentials without explicit authorization.

## Unresolved decisions that block live operations

- Confirm in writing which conflicting FactoryPrice statements apply to EVERNE's **exact German customer fulfillment account**.
- Verify whether the claimed XML/API connection permits a no-fee Shopify integration and provides variant inventory/fulfillment tracking.
- Obtain an authenticated **Poland-to-Germany merchant-paid courier label** rate and permitted carrier, not a warehouse sample freight rate.
- Confirm combined two-item parcel packing, handling fees for split shipments, and the process for partial order returns.
- Confirm written dropship returns terms and a usable EU consumer withdrawal/defect/refund flow.
- Inspect paid samples only after separately approving their purchase; verify labels, sizes, licensed images and physical quality.
- Keep `sourcing/first-drop-readiness.json` **NO_GO**; none of the above is approval to publish a product or activate a checkout.

**Security/property statement:** This is an internal preparedness simulation, not a functioning Shopify-to-FactoryPrice bridge. An automatic or real order handoff would currently be unsafe and operationally unverified.
