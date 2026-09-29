# EVERNE — Legal Compliance Gate (Germany / EU, 2026)

Status: **PRE-LAUNCH / COMMERCE MUST REMAIN DISABLED**

Last reviewed: 29 September 2026

This document is an operational legal-compliance gate for the EVERNE B2C storefront. It is not a substitute for a lawyer's final review of the completed business details and live checkout.

## Non-negotiable launch rule

Do **not** set both `VITE_ENABLE_PURCHASES=true` and `VITE_LAUNCH_APPROVED=true` until every item marked BLOCKER below is resolved and a real end-to-end Shopify test order has passed.

## 1. Anbieterkennzeichnung / Impressum — BLOCKER

Required before public commerce:

- final legal/operator name
- legal form, if applicable
- serviceable physical business address (not merely a PO box)
- business telephone number for consumer pre-contract information
- business email address
- commercial register and registration number, if registered
- VAT ID and/or economic identification number, if one exists
- competent supervisory authority only if the activity requires authorisation

Current state: name is known; final serviceable address, business phone, business email and final entity details are not yet supplied.

Legal basis to re-check at launch: § 5 DDG; Art. 246a § 1 EGBGB.

## 2. Prices — BLOCKER

Before orders open, determine the actual VAT status of the operator.

Every consumer-facing price must be a total price. The storefront/checkout must state whether VAT is included or, if the operator lawfully uses a regime under which VAT is not separately charged/shown, use wording consistent with that status. Shipping/other unavoidable additional costs must be disclosed before the order is submitted.

For products sold by weight, volume, length or area, check whether a unit price is required. The current Edition 01 tools are generally piece goods, so a unit price is not expected merely because dimensions are described.

Legal basis: §§ 3, 4, 6 PAngV.

## 3. Product information / consumer information — BLOCKER

Each product page and the final checkout must truthfully communicate, as applicable:

- essential product characteristics
- final price and additional shipping costs
- delivery conditions and realistic delivery time
- accepted payment methods
- complaint process
- statutory conformity/warranty information in the form required by current 2026 consumer-information law
- any genuine commercial guarantee, clearly separated from statutory rights
- any repairability / spare-part / repair-restriction information that is required for the product category and supplied by the manufacturer

Do not promise materials, dimensions, power, compatibility, safety, origin or performance unless verified for the actual item that will be shipped.

Legal basis: § 312d BGB; Art. 246a § 1 EGBGB; UWG.

## 4. Shopify checkout / button solution — BLOCKER

Before activation verify the live German checkout, not screenshots or assumptions.

Required:

- delivery restrictions visible no later than start of ordering process
- accepted payment methods visible no later than start of ordering process
- immediately before order submission, legally required product/price/contract information is prominent
- final order button uses wording that unambiguously creates a payment obligation (e.g. legally equivalent to "zahlungspflichtig bestellen")
- total price and all additional costs are visible before submission
- customer can correct input errors before submission
- contract confirmation and required information are sent on a durable medium

Legal basis: §§ 312i, 312j, 312f BGB.

## 5. Withdrawal right — BLOCKER

For ordinary consumer goods sold at distance, plan around the statutory 14-day withdrawal right unless a specific statutory exception genuinely applies.

Before activation:

- publish the current statutory model withdrawal instructions, correctly completed with final operator/contact/return details
- publish the statutory model withdrawal form
- decide and clearly disclose who bears direct return shipping costs
- define the return address
- ensure the order confirmation provides the required withdrawal information on a durable medium

Legal basis: §§ 312g, 355, 357 BGB; Art. 246a EGBGB.

## 6. Electronic withdrawal function — BLOCKER (2026)

The storefront must not open orders without a functioning electronic withdrawal route meeting § 356a BGB.

Required behavior while the withdrawal period is running:

1. visibly and easily accessible control labelled `Vertrag widerrufen` (or an equally unambiguous equivalent)
2. consumer can provide/confirm:
   - name
   - contract/order identification
   - electronic contact method for confirmation
3. separate confirmation action labelled `Widerruf bestätigen` (or equally unambiguous equivalent)
4. immediate confirmation on a durable medium containing at least the withdrawal content plus date/time of receipt
5. server-side/auditable record sufficient to prove receipt and confirmation

A disabled visual button, `mailto:` link, client-only form, or form that does not send an immediate durable-medium confirmation is **not** sufficient for launch.

## 7. Product safety / GPSR — BLOCKER PER PRODUCT

No product may become purchasable until the actual supply-chain safety information is known and retained.

For each online product offer, display clearly and visibly at minimum where applicable:

- manufacturer name / registered trade name or trademark
- manufacturer's postal address
- manufacturer's electronic address
- if manufacturer is outside the EU: EU responsible person's name, postal address and electronic address
- information that identifies the product (image/type/model/SKU or other identifier)
- required warnings and safety information in language understandable to the German target consumer

Operational file to retain internally for each SKU:

- actual supplier
- actual manufacturer
- EU responsible person if needed
- model/batch/identifier information
- safety/warning documents
- invoices / sourcing evidence
- sample/QC result
- mapping between physical item and storefront imagery/claims

Legal basis: Regulation (EU) 2023/988, especially Art. 19.

## 8. Electrical products — BLOCKER FOR POWERED SKUs

The powered products must receive a separate compliance review before launch (e.g. Steam Brush, powered Fabric Reviver, Electric Cleaning Brush depending on final assortment).

Do not rely solely on supplier marketplace text. Obtain and verify the applicable manufacturer/compliance documentation and markings for the exact product model and market. Check product-specific EU requirements, including as applicable CE conformity, electrical safety, EMC, RoHS, WEEE/battery obligations and German producer-registration duties.

Until verified, keep powered SKUs unavailable even if Shopify inventory exists.

## 9. Packaging / extended producer responsibility — BLOCKER

Determine who is legally the producer for the actual packaging and fulfilment arrangement. Complete required registration/system participation before placing relevant packaging on the German market.

Because the German packaging regime changed in 2026, use the then-current VerpackDG / EU packaging rules, not an old static VerpackG checklist copied from a template.

For any packaging EVERNE first places on the German market, confirm registration, system participation and reporting obligations before fulfilment begins.

## 10. Privacy / cookies — BLOCKER BEFORE TRACKING

Current state is deliberately low-risk: no intentional analytics, ad pixels, remarketing or social tracking.

Before sales open, the privacy notice must be reconciled against the actual production systems:

- hosting provider
- Shopify storefront/checkout
- payment providers
- fraud prevention
- transactional email
- fulfilment/shipping providers
- customer support tools
- withdrawal-function provider/storage
- any newsletter provider
- data recipients and processing roles
- transfer mechanisms for third-country processing
- actual retention periods / legal retention obligations

Non-essential access to or storage on user devices requires prior valid consent. Essential storage should be documented and limited to what is technically necessary.

Legal basis: GDPR, especially Arts. 5, 6, 13; § 25 TDDDG.

## 11. Marketing / newsletter — BLOCKER BEFORE ACTIVATION

Do not add Meta Pixel, TikTok Pixel, GA, ad retargeting, or similar technologies before consent management and privacy documentation are ready.

Do not activate promotional email/newsletter collection until the consent, evidence and unsubscribe process is implemented and legally reviewed. Transactional order communication must remain separated from marketing consent.

## 12. Consumer dispute resolution

The EU Online Dispute Resolution platform was discontinued on 20 July 2025. Do **not** insert the obsolete ODR-platform link found in older shop templates.

Before launch determine whether EVERNE is required or chooses to participate in a consumer dispute-resolution procedure and publish the information required by § 36 VSBG where applicable. After an unresolved consumer dispute, comply with § 37 VSBG.

## 13. Shipping / returns — BLOCKER

Before activation publish and test:

- final delivery countries/regions
- shipping rates or a method that makes them calculable before order submission
- realistic delivery times based on actual fulfilment
- return address
- return procedure
- direct return-cost allocation
- process for damaged/incorrect/defective goods

Do not present supplier lead times as customer delivery times without accounting for handling and carrier time.

## 14. AGB — BLOCKER

The AGB must match the **actual** live transaction flow. Before launch fill/verify:

- contract partner
- exact contract-formation logic (when an order becomes accepted)
- available payment methods
- delivery area and times
- price/VAT wording
- statutory defect rights
- any genuine additional guarantee
- contract language
- contract-text storage/access
- liability clause
- dispute-resolution statement

Avoid copied clauses that contradict Shopify's actual order/payment confirmation sequence.

## 15. Current EVERNE hard blockers

At 29 September 2026, the following prevent legal commerce activation:

- [ ] final serviceable business address
- [ ] final EVERNE business email
- [ ] business telephone number
- [ ] final operator/legal form
- [ ] VAT/tax display status for consumer prices
- [ ] final supplier/fulfilment model
- [ ] manufacturer + GPSR responsible-person data for each launch SKU
- [ ] powered-product compliance evidence for each powered SKU retained in assortment
- [ ] packaging/EPR registration responsibilities resolved
- [ ] final shipping countries/rates/delivery times
- [ ] final return address and return-cost policy
- [ ] payment methods confirmed
- [ ] privacy notice reconciled with actual production vendors
- [ ] electronic withdrawal function built, tested and confirmation delivered on durable medium
- [ ] current model withdrawal instructions/form completed with final details
- [ ] VSBG participation status determined
- [ ] product/price/legal information verified in real Shopify checkout
- [ ] successful test order on mobile
- [ ] successful test order on desktop
- [ ] successful withdrawal-function test and timestamped confirmation test
- [ ] final legal review of completed, non-placeholder texts

## 16. Technical safeguards that should remain

- two independent purchase gates
- pre-launch pages noindex/nofollow
- cart disabled when commerce gate is closed
- no marketing/analytics tags before consent layer
- SKU integrity checks
- CI checks against the current assortment rather than legacy SKUs

## Final release condition

Only after every BLOCKER is resolved should the production environment enable both purchase gates. Immediately after activation, perform a live-browser legal QA of Home, every launch product, cart, Shopify checkout, order confirmation, legal pages, withdrawal flow and mobile layout.