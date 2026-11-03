# EVERNE — first-edit product detail copy study

Date: 2026-11-02

Scope: 20 text-only detail-page drafts derived from the internal `src/womenswearCatalog.ts` concept index. Public preview copy lives separately in `src/productDrafts.ts` so research prices and supplier/variant data do not enter the live JavaScript dependency graph.

Each design page includes a distinct creative description, visual design direction, styling note, and provisional fit direction. The photo gallery reserves three empty positions for future, independently approved images. No placeholder or lifestyle photograph is represented as an actual EVERNE garment.

**Status: copy/layout study only.** The names are concept labels, not purchased inventory or verified product identities. Statements describing a neckline, silhouette or texture are explicitly design intentions. They do not establish physical construction, material composition, sizes, colorways, legal textile labels, stock, origin, price, fit, delivery, or returns terms.

Before any page can be used for commerce, the actual supplier product and physical sample must be selected, verified photographs and rights checked, size and care information confirmed, and the owner's independent publication approval recorded. The `approvals/product-publication.json` mode stays `NO_PRODUCTS` and all pages are non-indexable with no transaction controls.

## Category-navigation revision

Owner feedback rejected the long 20-name index on the homepage. The design preview now uses a restrained six-destination WOMAN category bar (all pieces plus five garment categories), separate `/collections/:category` grid pages, and direct links from the five homepage styling-category tiles. Product cards reserve neutral image spaces without implying actual garment photography. All 20 individual copy drafts and the no-commerce restrictions remain unchanged. Responsive desktop, tablet and mobile category checks are included in the browser-smoke acceptance script.

## Monochrome direction

The owner next requested black and white in place of the warm brown and beige palette. All client stylesheet colour tokens are neutral greyscale; the header, category navigation, product grid and detail pages retain a dark base with white typography, while the collection-entry stripe uses white with black text. Existing independent editorial styling photographs are displayed in greyscale (the original licensed files remain untouched). No product approval or sales-state change is implied.

## Minimal storefront revision

Owner review found the intermediate monochrome layout too visually busy. The next iteration removes the white collection-entry band and redundant direction/care marketing panels, compresses the primary navigation, reduces the footer wordmark, strips repeated labels from category and product cards, and folds the draft detail-page notes into accessible native disclosure rows. The five existing category reference photographs and all 20 distinct product concept detail routes remain. Product images and verified commercial terms are still absent; `NO_PRODUCTS` and `noindex` remain enforced.

## Product-page sidebar navigation

The owner requested a visible side navigation for category and product detail pages. On larger screens the category bar is replaced by a restrained left navigation rail with all six category destinations. On an individual product page it also lists the other copy-only concepts in the same category and marks the active product. On narrow screens a native collapsed disclosure supplies the same navigation without squeezing the product images or text. All original 20 product-detail URLs, descriptions and photo reservations remain unchanged, and no unapproved product is presented as purchasable.

## Product browsing and fit-readiness refinement

The next iteration focuses on the buying journey without activating commerce: all 20 cards remain compact in a four-column desktop or two-column mobile grid; the full catalog shows subtle category labels; a small accessible sort selector switches between the editorial sequence and name A–Z. Photo reservations remain visibly neutral, with the two supporting positions labelled as pending views. On each individual product page an unobtrusive **size selection / awaiting fit approval** row reserves the future fitting step without advertising size variants or inventory. Product research claims, transaction controls, live prices, and image approval gates remain unchanged.

## Browsing continuity and mobile category navigation

The sorting preference is now remembered within the current browser tab so that returning from a product detail page does not unexpectedly reorder the collection. If browser storage is unavailable, as may occur in a local Safari `file://` preview, sorting works for the current page without persistence. The mobile category disclosure is keyed to the route context, so moving between categories or products resets the expanded drawer. The established route-focus and scroll-to-heading behaviour remains in place.
