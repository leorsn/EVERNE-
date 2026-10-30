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

### Tops and denim — third research pass (30 October 2026)

Actual color/size order lines were checked again, not the generic XS–XL guide.
Six researched listings are captured with SKU, actual sizes, publicly visible
inventory snapshot, fibre claims and blockers in
`sourcing/tops-denim-alternatives.json`.

| EVERNE concept | Supplier listing and observed sizes in target color | Listed supplier cost ex VAT* | Gross retail | Indicative contribution** | Decision |
|---|---|---:|---:|---:|---|
| Soft Line Longsleeve | [CHERRY BLUE crew-neck viscose, Black S/M + M/L](https://leivip.com/collections/tops-bodys/products/basic-long-sleeve-viscose-top) | €17.90 | **€39** | **€3.21** | **Hold — poor margin** |
| Essential Rib Top | [CHERRY BLUE short-sleeve viscose, White S/M + M/L](https://leivip.com/collections/tops-bodys/products/basic-short-sleeve-viscose-t-shirt) | €15.90 | **€34** | **€1.14** | **Hold — not ribbed, poor margin** |
| Soft Line Longsleeve, alternate neckline | [CHERRY BLUE V-neck viscose, Black S/M + M/L](https://leivip.com/collections/tops-bodys/products/v-neck-long-sleeve-viscose-top) | €17.90 | **€39** | **€3.21** | **Hold — alternate neckline, poor margin** |
| Straight Leg Denim | [CHERRY BLUE washed straight-leg, Grey XS/S/M/L](https://leivip.com/collections/aw26-denim/products/classic-washed-straight-leg-denim-jeans-wholesale) | €24.90 | **€59** | **€12.52** | **First denim sample candidate**, subject to grey colorway and samples |
| Relaxed Denim | [CIVICO 1 modern wide-leg, Denim S/M/L](https://leivip.com/collections/aw26-denim/products/modern-wide-leg-denim-jeans-wholesale) | €15.90 | **€54** | **€17.44** | **Hold — only 3 L units visible** |
| Straight Leg Denim, alternative | [CHERRY BLUE classic straight, Dark Denim XS/S/M/L](https://leivip.com/collections/aw26-denim/products/classic-straight-leg-denim-jeans-wholesale-5) | €16.90 | **€59** | **€20.52** | **Hold — published fibre total is 97%, not 100%** |

\* Public prices are not authenticated purchase quotations. Some suppliers'
size inventories are low, and observations conflict across different crawl
times; re-check immediately before deciding on a basket. For the washed jeans,
**Grey** has the full visible size range, while the conventional **Denim**
colorway has S and M marked out of stock. The earlier CIVICO 1 straight-cut
mid-rise product also still shows an unavailable M despite search snippets
with older quantities.

\** Exactly the six-unit LEIVIP contribution model described above, including
the **assumed 19% German VAT** treatment. Contributions are *not profits*, do
not include marketing or overhead, and use sample-batch freight allocation
which may understate recurring commercial logistics. A €3.21/€1.14 buffer
cannot support a credible paid-acquisition plan. No retail price increase was
approved or applied; keeping prices at €34/€39 requires finding more efficient
supplier listings or a different fulfillment model.

**Next operational selection:**

1. Before ordering, confirm the grey 100%-cotton straight-leg jeans' authenticated
   XS/S/M/L availability, price, measurements and photo permissions. This is the
   **best research-only denim sample candidate**, not an approved launch item.
2. Seek cheaper true ribbed/cotton or viscose everyday tops with at least two
   real sizes. The screened CHERRY BLUE tops have workable size choices but do
   **not** meet a sensible launch contribution at current fixed prices.
3. Request an updated fibre specification for the dark-denim CHERRY BLUE jeans:
   public listing declares **63% cotton + 33% viscose + 1% elastane = 97%**.
   Until corrected and sample label checked, treat this colorway as blocked.
4. Require replenishment evidence for the CIVICO wide-leg's size L before
   marketing a consistent S/M/L range.

**Third-pass status, now superseded by the fourth pass below:** the
size-led Everyday Tank, authentic Essential Rib Top, and Second Skin Body
had no credible matching candidate. LEIVIP's scoop-neck tank and ribbed
knits proved to be **one-size only**; the baroque-print sheer bodysuit was
not a truthful match for the proposed minimal black body.

No products were purchased, imported into Shopify, renamed on the live site,
or offered as orderable. This work only enriches the research gate.

### Essential cotton basics — fourth research pass (30 October 2026)

**Result:** All three previously uncovered essentials now have a *supplier
listing worth sampling* at the existing retail-price points **€34 / €39**.
These are **not accepted garments or a supplier contract**. Unlike the former
LEIVIP top alternatives, FactoryPrice's public net unit prices leave a larger
theoretical buffer. At this point the exact German delivery and own-label
dropshipping terms had not been reconciled; see the fifth pass below for
**newly verified public freight tariffs**, still not an order-specific quote.

| Concept | Best current candidate (actual black variant) | Public supplier unit net* | Concept retail gross | Public stock snapshot | Status |
|---|---|---:|---:|---|---|
| **Essential Rib Top** | [RUE PARIS ribbed cotton tank](https://factoryprice.eu/de/products/schwarzes-damen-tanktop-basic-im-streifen-rue-paris-419503.html), `RV-TP-A1363.01P` | **€5.89** | **€34** | S/M **35**, L/XL **31** | Preferred sample candidate; verify ribbing, fabric and fit |
| **Second Skin Body** | [RUE PARIS plain cotton body](https://factoryprice.eu/de/products/schwarzes-damen-basic-body-ohne-armel-rue-paris-419790.html), `RV-BO-A1441.81` | **€7.20** | **€39** | S/M **13**, L/XL **14** | Preferred sample candidate; verify gusset, fastener and returns |
| **Everyday Tank** | [RUE PARIS sleeveless cotton tank](https://factoryprice.eu/de/products/schwarzes-damen-basic-top-ohne-armel-rue-paris-419774.html), `RV-TP-A1466.74` | **€8.06** | **€34** | S/M **29**, L/XL **36** | Preferred sample candidate; compare appearance to the ribbed top |
| Second Skin Body — backup | [BERRAK black viscose body](https://factoryprice.eu/de/products/schwarzes-basic-body-aus-viskose-387525.html), `BR-BO-2055` | **€8.06** | **€39** | S **44**, M **24**, L **17**, XL **3** | Backup only: XL replenishment needed |
| Essential Rib Top — backup | [RUE PARIS fitted ribbed tank](https://factoryprice.eu/de/products/schwarzes-figurbetontes-top-mit-streifen-rue-paris-419840.html), `RV-TP-A1439.97` | **€8.06** | **€34** | S/M **1**, L/XL **1** | **Hold** — too little stock in both sizes |

\* These are public **net** listing prices and **volatile public quantity
snapshots**, observed on the research date. Supplier requires login for actual
merchant pricing. The first and third top models are distinct fabric designs
despite both being sleeveless. Both preferred black tanks and the cotton body
list **90% cotton / 10% elastane**; the BERRAK backup lists **95% viscose /
5% elastane**. Supplier centimeter measurements and exact selectable variant
identifiers are recorded in `sourcing/essential-basics-alternatives.json`.

**Fourth-pass financial screen — contribution ceiling, *not profit*.** Assume
gross retail includes German 19% VAT, outbound shipping €4.90 net, packaging
€0.70 net, processing 2.5% of gross plus €0.25, and a provisional €2.50
net return-cost reserve. After deducting the listed unit cost, but **before
any FactoryPrice inbound freight, dropshipping charges, paid acquisition,
staff work and overhead**, the modeled remaining amounts are:

| Sample concept | Retail gross | Maximum modeled amount **before inbound/ads** |
|---|---:|---:|
| Essential Rib Top, preferred | €34 | **€13.48** |
| Second Skin Body, preferred | €39 | **€16.25** |
| Everyday Tank, preferred | €34 | **€11.31** |
| Second Skin Body, BERRAK backup | €39 | **€15.39** |
| Essential Rib Top, low-stock backup | €34 | **€11.31** |

**FactoryPrice-specific unresolved commercial gates:** receive a real
Germany delivery/dropship quote for the exact units and shipment model;
confirm price after trade login, MOQ and availability; establish whether
image rights permit ecommerce resale presentation; and agree in writing how
returns and customer defects are handled. Do **not** reuse LEIVIP's separate
€14/6-item freight assumption. FactoryPrice's product-page wholesale terms
currently state **7 working days**, unused goods in original packaging and
buyer-funded B2B return shipping; promotional *14-day free returns* badges
are therefore not safe evidence of the wholesale return policy. EVERNE's own
customer-facing obligations remain separate. None of these products is
launch-approved or stocked.

**Suggested next controlled action:** obtain a trade quote and return/shipping
terms for the three preferred model SKUs, then seek founder approval for a
small **sample-only** basket. Price labels and storefront remain unchanged.

### Germany delivery and dropshipping — fifth pass (30 October 2026)

FactoryPrice publishes more specific terms than initially found. Its **current
German-language shipping tariff** lists Germany DHL **32 PLN net per parcel
up to 10 kg**, about **€7.28** using the ECB's reference of **1 EUR = 4.3938
PLN on 29 October 2026**; DPD is listed at **35 PLN net**. The chart states
around **two business days** for the Germany carrier route. The final amount
appears at supplier checkout and depends on shipment weight, packing and
carrier; it has not been quoted for EVERNE. The earlier cached 45 PLN listing
is not used for the calculation. Sources: [official Germany freight
table](https://factoryprice.eu/de/terms/versandkosten-610.html), [ECB
reference](https://www.ecb.europa.eu/stats/shared/pdf/eurofxref.pdf).

Crucially, **two fulfillment methods must not be mixed**:

1. **Small stocked batch:** buy a limited batch delivered to EVERNE; we then
   pack and ship each customer order ourselves. The supplier's published
   Germany parcel tariff is a plausible starting point for *inbound* freight.
   A **hypothetical** six-piece basket of one S/M and one L/XL for each of the
   three preferred basics is **€42.30 listed net goods** plus approximately
   **€7.28** supplier DHL parcel = **€49.58** before applicable VAT, actual
   currency/payment cost and other charges. That assumes one parcel below
   10 kg and **is not ordered or authorized**. Unlike LEIVIP's earlier
   illustrative basket, the supplier claims no minimum order for this model.
2. **Direct dropshipping with EVERNE-branded sender:** the [supplier's
   program](https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html)
   claims a free B2B account, orders from one unit, XML/API stock feeds,
   Shopify compatibility (through BaseLinker or a dedicated application),
   dispatch using a **shipping label uploaded and paid for by the merchant**,
   plus **3 PLN net handling per parcel** (~€0.68 at the above ECB rate).
   The true cost of an EVERNE-supplied German customer label, integration
   subscription, merchant packaging and any returns service is **not quoted**.
   Do not automatically charge the published *standard wholesale parcel*
   rate or the previous assumed €4.90 outbound freight here: either can
   double-count or misstate costs in this different dispatch arrangement.

**Decision thresholds rather than invented dropship profit.** To retain an
*illustrative* **€10 contribution buffer per single-item order before paid
acquisition and fixed overhead**, after public net product cost, assumed
German 19% VAT gross-to-net, payment fee 2.5% + €0.25, €2.50 return reserve,
€0.70 packaging contingency and estimated 3 PLN dropship handling, the
**maximum affordable third-party courier label** would be:

| Product at unchanged concept price | Maximum net German customer-label expense* |
|---|---:|
| Essential Rib Top, **€34** | **€7.70** |
| Second Skin Body, **€39** | **€10.47** |
| Everyday Tank, **€34** | **€5.53** |

\* A *screening bound*, not a verified carrier offer or net profit. Returns,
damages and ads could easily exceed the provisional reserves. Tax treatment
and the actual billing channel must be verified. The supplier's wholesale
general [returns policy](https://factoryprice.eu/de/terms/ruckgabebestimmungen-772.html)
states **seven days from delivery**, buyer-paid return freight and unused
resalable goods, whereas some product pages say **seven working days**.
Plan for the shorter **seven-calendar-day** limit until confirmed in writing.
The supplier also disclaims customer complaint handling, so EVERNE must
design its own lawful customer service and withdrawal process. A separate
specific dropshipping-return agreement is not yet available.

**First-drop sample order of priority (not a purchase):**

1. **Essential Rib Top (€34):** strongest public in-size stock and favorable
   listed goods cost. Verify actual rib/opacity, comfort and wash performance.
2. **Second Skin Body (€39):** visually distinct companion with workable
   economics, but gusset/closure and hygiene/returns raise the acceptance bar.
3. **Everyday Tank (€34):** good stock, but overlaps the other black sleeveless
   basic and is hardest to profitably dropship alone if German shipping is
   expensive. Hold as optional cross-sell until a true shipping quote arrives.

**Current go/no-go: NO-GO for any paid launch.** Public catalogue availability,
stock feeds and freight schedules are not supplier acceptance, real image
licenses or proof that returns and fulfillment work. Full raw freight,
exchange-rate and validation assumptions are saved in
`sourcing/fulfillment-gates.json`. No Shopify publication or spend was made.

### First capsule beyond black basics — sixth research pass (30 October 2026)

To avoid a visually repetitive first drop, eight additional FactoryPrice
garments were inspected directly on their public product pages. **These are
possible physical samples, not approved inventory**; stock counts are a
30 October snapshot and can change before anyone can actually buy.

| Concept and fixed retail price | Supplier model, listed net price | Public black size stock on 30 Oct | Merchandising judgment |
|---|---|---|---|
| **Tailored Everyday Pant €59** | [High-waisted black suit trouser](https://factoryprice.eu/de/products/schwarze-anzughosen-mit-hohem-bund-415870.html), €16.11 | **S 14, M 12, L 11, XL 11** | **Sample option.** 65% viscose / 30% nylon / 5% elastane; straight-leg tailored form with belt detail. Four separate sizes make this a more promising first-drop bottom than the LEIVIP mixed-supplier route. Actual hip fit, construction and fabric require inspection. |
| **Wide Leg Trouser €54** | [Elegant wide black viscose trouser](https://factoryprice.eu/de/products/schwarze-elegante-hosen-mit-taschen-420890.html), €11.28 | M/L **25**, L/XL **16**, XL/2XL **25** | **Hold: size-label mismatch.** Supplier warns its M/L fits like a typical S/M. No consumer-facing size conversion or product-code assumption without measured fit tests and written confirmation. |
| **Soft Midi Dress €59** | [RUE PARIS cotton basic dress](https://factoryprice.eu/de/products/schwarzes-sommerkleid-basic-aus-baumwolle-rue-paris-418426.html), €16.11 | S/M **56**, L/XL **52** | **Sample option.** 90% cotton / 10% elastane, straight cut, 111–114 cm. Supplier calls it a summer dress: verify autumn relevance and whether its length is truly midi on intended models. |
| **Easy Slip Dress €44** | [Acetate-blend satin-look midi](https://factoryprice.eu/de/products/schwarzes-kleid-mit-dunnen-tragern-und-glanz-421453.html), €14.50 | S/M **8**, M/L **8**, L/XL **8** | **Sample option.** 60% acetate / 40% polyester, adjustable straps and 122–124 cm length. Strong occasion silhouette on paper, but gloss, fabric quality and coverage must be inspected. |
| **Wide Leg Trouser €54** | [Wide-leg black cord trouser](https://factoryprice.eu/de/products/schwarze-cordhosen-mit-weitem-bein-420859.html), €9.67 | S/M **8**, L/XL **9** | **Hold for textile/design review.** 100% polyester and tie waistband might not fit the premium tailored direction. |
| **Wrap Knit Cardigan €54** | [Short V-neck cardigan](https://factoryprice.eu/de/products/schwarzer-kurzer-cardigan-mit-v-ausschnitt-421417.html), €14.50 | S/M **11**, L/XL **10** | **Hold: name mismatch.** 50% viscose / 40% polyamide / 10% elastane; supplier does not describe a wrap. Would require founder-approved concept rename. |
| **The Black Mini €49** | [Fitted ribbed knit mini](https://factoryprice.eu/de/products/schwarzes-strickkleid-in-mini-lange-420675.html), €14.50 | S/M **0**, L/XL **14** | **Hold: size unavailable.** Fall-appropriate, but no credible two-size offer while S/M is out of stock. |
| **The Black Mini €49** | [Cotton collared shirt mini](https://factoryprice.eu/de/products/schwarzes-jeanskleid-im-hemd-schnitt-420734.html), €19.32 | S/M **2**, M/L **2** | **Hold: stock and silhouette.** 100% cotton, but not a minimalist fitted mini. An apparent measurement typo needs confirmation. |

**Five-piece editorial capsule proposal — approval still required:**

1. Essential Rib Top (€34) and Second Skin Body (€39) — the two distinctly
   different foundations with previously documented public black size stock.
2. Tailored Everyday Pant (€59) — consider the [four-size FactoryPrice black
   suit trouser](https://factoryprice.eu/de/products/schwarze-anzughosen-mit-hohem-bund-415870.html)
   after inspecting S/M/L/XL fit, belt finish, straight-leg silhouette and
   true dropship shipping charges. All five provisional pieces now use the
   same supplier, **but combined parcels are not confirmed**.
3. Easy Slip Dress (€44) — occasion hero only if satin-like material looks
   premium under real lighting and on-body tests.
4. Soft Midi Dress (€59) — alternative everyday dress only if its length,
   summer-weight fabric and November relevance survive sample review.

This edit spans three top/bottom/dress categories instead of launching three
near-identical black sleeveless basics. The Everyday Tank remains an optional
later cross-sell. It is an *editing recommendation*, not a determination that
these garments are premium or commercially viable.

**Economic screening for FactoryPrice (not profit):** the supplier's public
net goods costs are excluded from the premium retail prices, but its own-label
dropship courier labels have **no confirmed price**. With the *same* payment,
German VAT, returns, handling and packaging assumptions as the fifth pass,
to retain €10 per one-item order before paid marketing/fixed costs, the
illustrative maximum **net** purchased courier label is about **€17.86** for
the €59 cotton dress **and** the €59 tailored trouser, **€7.24** for the €44
slip dress, **€20.23** for the €54 cord trouser and **€15.40** for the €54
V-neck cardigan. These are *thresholds
for rejecting bad quotes*, not shipping estimates; the larger numbers do not
prove sell-through, return rates or perceived value. The validation script
recalculates them and catches 4/9-price and size/stock mistakes.

**Decision:** seek written supplier confirmation and style approval first;
then, if the founder authorizes actual spend, choose samples in a strictly
limited basket. No supplier was contacted, sample ordered, inventory imported,
photo licensed, retail price changed or Shopify collection published during
this pass. Full source IDs, public size snapshots, garment lengths and
acceptance questions are in `sourcing/capsule-hero-alternatives.json`.

### Seventh pass — supplier consolidation and cart stress test (30 October 2026)

The earlier mixed-supplier edit had a practical blocker: [LEIVIP](https://leivip.com/pages/why-leivip)
publishes a **€100 minimum combined goods order**, so its one separately sourced
trouser is not an independently orderable single-customer dropship model. Its
[published international delivery tariff](https://leivip.com/de/pages/versand)
is a separate inbound leg. The proposal now uses FactoryPrice for **all five
research candidates**, avoiding the *known* need to source individual trousers
from a second supplier. This does **not** prove FactoryPrice can pack multiple
different styles into one customer parcel.

FactoryPrice's [own-label dropship program](https://factoryprice.eu/pl/cms/hurtownia-dropshipping-odziezy-damskiej-nadajemy-na-twojej-etykiecie-783.html)
publishes an extra **PLN 3 net handling charge per parcel** and requires the
merchant to supply a purchased courier label; there is **no verified German
customer-shipment label price**. The explicit what-if model is stored in
`sourcing/capsule-order-economics.json` and includes German gross-to-net VAT,
public supplier goods prices, payment fees, a provisional per-item returns
reserve, parcel handling and packaging. It assumes *merchant-paid outbound
shipping*, with labels of **€5, €7.50 or €10 net per parcel** as hypothetical
inputs only. These are not freight offers or accounting profit forecasts.

At a **hypothetical €7.50 net label**, the five one-item orders produce the
following indicative contribution **before advertising, overhead, customer
support, integration fees and actual return experience**:

| Single-item cart | Retail gross | Indicative contribution | €10 screening buffer |
|---|---:|---:|---|
| Essential Rib Top | €34 | **€10.20** | Clears, narrowly |
| Second Skin Body | €39 | **€12.97** | Clears |
| Tailored Everyday Pant | €59 | **€20.36** | Clears |
| Easy Slip Dress | €44 | **€9.74** | **Below** — hold or revise route after real quote, do not change retail price without approval |
| Soft Midi Dress | €59 | **€20.36** | Clears subject to seasonal/design fit |

For a Top + Trouser basket, one hypothetical €7.50 label gives **€39.69**
contribution; if the supplier splits it into two parcels at €7.50 each, that
falls to **€30.81**. Consolidation therefore matters, but even these positive
numbers are **not actual profit**. Real customer courier charges, mixed-SKU
parcel capability, returns, integration subscription fees and supplier terms
are all unresolved. **GO/NO-GO: NO-GO** for sample buying, stock publishing,
selling or launching until those gates are independently verified and the
founder approves the expense.

### Eighth pass — return-rate sensitivity (30 October 2026)

The earlier **€2.50 per-unit return reserve is not a verified return-cost
estimate**. A separate stress test now asks what happens if **10%, 20% or 30%**
of single-item orders are fully refunded. For this test only:

- Merchant-paid outbound label remains the illustrative **€7.50 net**, plus
  FactoryPrice's listed 3 PLN handling and our hypothetical €0.70 packaging.
- A return incurs an additional hypothetical **€5 net reverse label** and **€3
  inspection/handling**; card fees are assumed not to be refunded.
- Two end states are evaluated: the returned garment is intact and its listed
  supplier goods value is recoverable in inventory, or the garment cannot be
  resold and its **full goods cost is lost**. Neither recovery case is a real
  supplier return approval. Recovered goods value is *inventory*, not cash.
- This calculation **replaces** the earlier flat €2.50 return reserve; it
  explicitly excludes advertising, labor, overhead, partial returns, value
  loss on resale, liability and actual merchant taxes/refund accounting.

At a hypothetical **20% full-order return rate**, the calculated *expected*
contribution per placed single-item order before advertising and overhead is:

| Candidate | Goods fully resellable after return | Goods lost on return | €10 buffer in goods-loss case |
|---|---:|---:|---|
| Essential Rib Top €34 | €6.56 | **€5.38** | **Missed** |
| Second Skin Body €39 | €8.75 | **€7.31** | **Missed** |
| Tailored Everyday Pant €59 | €14.57 | **€11.35** | Cleared narrowly |
| Easy Slip Dress €44 | €6.15 | **€3.25** | **Missed** |
| Soft Midi Dress €59 | €14.57 | **€11.35** | Cleared narrowly |

**Commercial implication:** do not treat the five proposed SKUs as equally
launch-ready merely because the nominal one-order contribution is positive.
The €34 top, €39 bodysuit and particularly €44 slip dress require verified
low-return fit/size guidance, lower actual shipping costs, a defensible
delivery-charge policy or a stronger multi-item basket before committing to
paid advertising. The €59 bottom and dress are less fragile *under this exact
stress test*, but neither has passed quality, seasonal or fulfillment gates.
No customer return observations or merchant quotes exist yet; the scenarios
must not be represented as predictions or guarantees. The three stress rates,
two goods-recovery cases and calculations are reproducible through
`npm run check:sourcing` using `sourcing/capsule-order-economics.json`.

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
