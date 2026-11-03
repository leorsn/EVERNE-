# EVERNE — First cross-category candidate handoff

**Selected working concept:** Jewellery bag (`jewellery-bag`)  
**Commercial status:** **NO-GO / RESEARCH ONLY**  
**Additional budget:** €0; no charges, supplier orders, Shopify import or TikTok Shop listing permitted.

The private Vercel concept preview can show this working idea but does not describe
an actual supplier item or make a sales offer. The machine-readable intake is
[`sourcing/trend-first-drop.json`](trend-first-drop.json). The client-facing
catalog stays at **zero approved products**.

## Fill in this order

1. **Identify the exact product.** Record its public supplier URL, vendor name,
   product code, real variants, dimensions and materials. Do not transfer details
   from a merely similar bag.
2. **Confirm fulfillment without spending.** Capture documented shipping to
   Germany, returns/defects arrangements, automatic order forwarding and
   **automatic supplier payment**. A sync integration alone is not payment
   automation. Obtain written pricing showing **€0 additional recurring cost**.
3. **Verify merchandise and media.** Inspect actual product and safety claims.
   Record original commercial photo rights and place only approved images under
   `public/products/`. An AI concept visual does not count as product proof.
4. **Calculate true contribution.** Record customer price (whole euros ending
   in 4 or 9), fully landed cost, per-order platform/payment fees and a returns
   reserve. A screening contribution below 30% of gross price before fixed
   overhead is a hold, not a launch. Any tax treatment must be independently
   verified rather than assumed from previous fashion models.
5. **Choose and test one actual channel.** `website` or `tiktok_shop`. Record
   channel-specific permissions and a genuinely verified order/fulfillment
   workflow. No invented test order or simulated supplier payment may be
   represented as an operational acceptance.
6. **Require founder release.** Complete the independent evidence records and
   obtain an explicit dated founder approval. Even a fully completed intake
   creates **only a manual handoff**, not automatic publication.

Evidence items have `verified`, `reference`, and `reviewedAt` fields. The
reference must point to a genuine independently inspectable item; a `true`
boolean alone is not approval. This mechanical validator cannot replace actual
contract, safety, tax, image-rights, platform or fulfillment verification.

Run `npm run check:trend-readiness` to obtain a list of missing gates.
Its expected result at the present stage is **NO_GO**, which means the safety
checks are working and the product is not ready to sell.

**Unresolved at handoff:** actual supplier link/SKU; automatic payment proof;
zero-cost integration; genuine supplier images and rights; channel approval;
real landed margin; founder release.
