# EVERNE WOMAN — First drop sourcing gate

**Reviewed:** 30 October 2026  
**Status:** RESEARCH ONLY — no approved supplier SKU, inventory, sale or order.  
**Public site:** English editorial concept preview, no checkout, `noindex,nofollow`.  
**Price rule:** customer-facing planned retail amounts are whole euros ending in **4 or 9**.

## Decision: test a micro-batch before publishing real inventory

The live connected EVERNE Shopify catalog still consists of legacy garment-care
products (15 items: 8 active, 5 archived, 2 draft); **zero womenswear items**
have been imported. Do not change existing products or publish invented stock.

LEIVIP is a *candidate* for small-batch testing: its public materials show a
EUR 100 minimum order and Germany standard freight of EUR 14 for up to 5 kg.
Supplier product pages list indicative **net** prices but also request account
registration to view pricing and place orders. Actual quotations, stock,
shipping weight, image rights, payment requirements and return approval must
be checked in an authenticated wholesale account before spending money.

### Five concrete candidate listings

| EVERNE concept | Actual supplier item | Public net cost* | Planned gross retail | Sizes visible | Most important issue |
|---|---|---:|---:|---|---|
| Ribbed Turtleneck | [GLAMMY ribbed turtleneck](https://leivip.com/collections/glammy/products/ribbed-turtleneck-sleeve-knit-top-wholesale) (`GLSW1024-BLK-U`) | €14.90 | **€44** | One-size | Size range and sleeves need real fitting |
| Wrap Knit Cardigan | [LYCHEE button-front cardigan](https://leivip.com/products/classic-button-front-knit-cardigan-wholesale) (public SKU `LYCSW8812-PNK-U` is **pink**, coffee SKU unverified) | €16.90 | **€54** | One-size | **Not a wrap cardigan** — would require renaming concept and new photos |
| Wide Leg Trouser | [JAMILLA pleated wide-leg trousers](https://leivip.com/collections/clothes/products/pleated-wide-leg-tailored-trousers-wholesale-1) (`JAMVS195L-BLK`) | €16.90 | **€54** | One-size | One-size trousers, 96% polyester; check finish and opacity |
| Straight Leg Denim | [CIVICO 1 straight-cut jeans](https://leivip.com/collections/aw26-denim/products/classic-straight-cut-mid-rise-denim-jeans-wholesale) (product SKU `CIVMP1075L-1`) | €13.90 | **€59** | S, M, L, XL, XXL | M listed as out of stock at review; exact variants and fit unverified |
| The Black Mini | [CHERRY BLUE strap mini dress](https://leivip.com/products/minimalist-spaghetti-strap-layered-mini-dress-wholesale) (product SKU `CHE4945L-1`) | €18.90 | **€49** | S, M, L | Limited size range; opacity and stitching must pass sample inspection |

\* Listed product price from public pages on review date, **excluding VAT**;
not a locked procurement quote. Availability can change before placing an order.
Descriptions are supplier descriptions, not independently verified merchandise
claims. Product names on the public concept site are not actual SKU identities.

### Test purchase envelope — NOT an order

- One of each five candidate items = **€81.50** listed goods subtotal.
- Add one more black mini dress at €18.90 (if mixed quantities allowed) = **six
  samples for €100.40** net goods, just above stated EUR 100 minimum.
- Add published Germany shipping band **€14.00** (assumed six items under 5 kg)
  = **€114.40 excluding VAT**, discounts and other charges.
- First-order discount terms can change whether the minimum is met; **check
  threshold calculation** before relying on this basket. Cross-border B2B VAT
  treatment depends on verified buyer tax status and seller checkout details.
- A sample purchase requires express user approval. No order was placed.

**30 October sizing review / amendment:** The basket above is a *historical,
illustrative cost envelope*, not the currently recommended six samples: three
of the first five products are one-size. Prioritize the actual-sized
alternatives below before selecting any sample basket or promising delivery.

### Indicative gross-to-net contribution per shipped sale

These figures are **scenarios, not expected profit**. For each one-item order:

- Customer pays target price including assumed German 19% VAT.
- Deduct listed supplier unit cost ex VAT.
- Allocate six-unit sample-batch inbound shipping (€14 ÷ 6 = €2.33/unit).
- Assume EVERNE pays €4.90 outbound freight + €0.70 packaging.
- Assume card fee of 2.5% of gross sale + €0.25.
- Hold a provisional €2.50 reserve for return-related cost per sale.
- **Exclude** advertising, returns exceeding the reserve, re-shipping, labor,
  unsold inventory, storage, insurance, refunds and fixed costs.

| Concept | Gross retail | Contribution before ads/overhead |
|---|---:|---:|
| Ribbed Turtleneck | €44 | **€10.29** |
| Wrap Knit Cardigan (supplier model needs renaming) | €54 | **€16.44** |
| Wide Leg Trouser | €54 | **€16.44** |
| Straight Leg Denim | €59 | **€23.52** |
| The Black Mini | €49 | **€10.37** |

Run `npm run check:sourcing` to recalculate from
`sourcing/first-drop-candidates.json`. Any true profitability forecast must
replace assumptions with actual invoice, packaging, return rates and shipping
receipts. **Paid ads may make the €44 and €49 pieces unprofitable.**

## Alternatives and risks

### Real selectable size variants — second research pass (30 October 2026)

The previously displayed XS–XL *generic size guide* on LEIVIP cannot be treated
as the actual product size range. We checked each live variant list and found:

| EVERNE mapping | Wholesaler / real article | Public cost ex VAT* | Actual variants in selected color | Proposed price | Decision |
|---|---|---:|---|---:|---|
| Wide Leg Trouser | [LEIVIP high-waist tailored wide leg](https://leivip.com/products/high-waist-tailored-wide-leg-trousers-wholesale-1) | €23.90 | **Black S/M/L** | €59 | **Sample priority**; better size choice but price must change from €54 by approval |
| Tailored Everyday Pant | [LEIVIP belted straight-leg in lyocell](https://leivip.com/collections/clothes/products/belted-straight-leg-tailored-trousers) | €20.90 | **Black S/M only** | €59 | Hold until L and reliable supply available; 100% lyocell listed |
| Wrap Knit Cardigan | [FactoryPrice black short V-neck](https://factoryprice.eu/de/products/schwarzer-kurzer-cardigan-mit-v-ausschnitt-421417.html) | €14.50 | **Black S/M, L/XL** | €54 | Good potential substitute but **not a wrap**; re-name; supplier shipping and B2B returns unresolved |
| Wrap Knit Cardigan | [FactoryPrice ecru with contrast trim](https://factoryprice.eu/de/products/ecru-eleganter-cardigan-mit-kontrastierendem-besatz-421441.html) | €14.50 | **Ecru S/M, L/XL** | €54 | Alternative color/style; not a wrap; same approval gates |

\* Public price at research, not a confirmed merchant quotation. LEIVIP model
is 86% polyester/10% viscose/4% elastane. Both FactoryPrice cardigans are
listed as 50% viscose/40% polyamide/10% elastane and have actual centimeter
measurements in their product descriptions. Material claims still require
labels/sample checks. In addition, public inventory cannot replace verified
merchant stock data.

The LEIVIP S/M/L tailored-trouser replacement yields approximately **€13.52**
contribution per €59 full-price sale on the same six-unit, one-item-order
model above. It has a lower model margin than the unisize €54 original, but
is a more credible apparel pilot. No price was changed on the website.

The FactoryPrice alternatives **cannot** be assigned the same freight and
margin model: actual German supplier-to-EVERNE freight, dropship fee, return
flows and merchant checkout pricing are unverified. Their product pages show
consumer-facing badges mentioning 14-day free returns while the embedded **B2B
terms** say returns must be initiated within seven working days and sent at
retailer's expense. The commercial agreement needs written clarification.

Rejected or held: the former unisize wide-leg trousers, the earlier unisize
LYCHEE cardigan, a sized wool-look palazzo whose listed fibre composition is
`NULL`, an alternative lyocell culotte with only Olive/S seen in stock, and a
sized lace-hem turtleneck that does not suit the minimalist concept. The full
dated comparison is in `sourcing/sized-alternatives.json`.

**Selection rule:** for a launch apparel SKU, require at least two independently
orderable size variants; prefer S/M/L for bottoms and S/M plus L/XL or more
for knitwear. A generic size chart must not satisfy this rule. `npm run
check:sourcing` enforces price/approval/data checks, not the truth of third-party
stock availability.

- [Hertwill](https://hertwill.com/): an existing Shopify-oriented dropshipping
  option, potentially lower up-front inventory but **actual** womenswear
  prices/availability in the €34–€59 band require account verification.
- [FactoryPrice](https://factoryprice.eu/): wholesale/dropship option; its
  [B2B return policy](https://factoryprice.eu/en/terms/returns-policy-772.html)
  is not equivalent to EVERNE's consumer return obligations.
- [LaBalancia](https://www.labalancia.com/): potential made-in-Poland
  dropship option; B2B sale/return and packaging arrangements must be
  explicitly confirmed before retail use.
- A supplier accepting only short or conditional wholesale returns **does not
  cancel** EVERNE's consumer withdrawal duties. German/EU consumer returns,
  defects and labels must be planned separately from supplier terms.

## Non-negotiable acceptance gates

1. Confirm legal retailer account, five authenticated quotes, correct variant
   IDs, available stock, MOQ, shipping to Hamburg/Germany, applicable VAT and
   commercial use of supplier images in writing.
2. Buy **samples only after founder approval**; examine fabric, stitching,
   colorfastness, opacity and wash/care labels, photograph samples in original
   EVERNE style, and measure garments in centimeters. One-size is not a claim
   of universal fit.
3. Reject/replace any model lacking a reliable centimeter size chart, working
   return handling, material origin and manufacturer/operator safety details.
   Never claim premium quality on public pages solely from stock photos.
4. Obtain competent review of German/EU textiles labeling, consumer withdrawal
   information, consumer rights, GPSR and EPR/packaging compliance, including
   any own-brand/importer responsibilities.
5. Only after acceptance, map **actual** Shopify variants with real inventory,
   update public names and prices in the 4/9 style, connect cart/checkout,
   check shipping/returns and perform a full end-to-end test order in Safari.
6. Keep concept-only pages and legacy garment-care items unmodified until an
   explicit launch decision.

## Sources consulted

- LEIVIP product links in table, [shipping policy](https://leivip.com/pages/shipping),
  [supplier returns](https://leivip.com/pages/returns).
- [§ 355 BGB](https://www.gesetze-im-internet.de/bgb/__355.html) — consumer
  withdrawal framework; [§ 12 UStG](https://www.gesetze-im-internet.de/ustg_1980/__12.html)
  — regular German VAT rate. Legal requirements must be checked for the
  exact business model at launch.
