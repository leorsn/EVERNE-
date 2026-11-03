# Visual approvals — release control

No garment, sample, supplier, campaign or product photographs have been approved for the current EVERNE preview. `visual-assets.json` therefore contains an **empty** list and `previewMode: IMAGE_FREE`.

Raster images are kept in `research-assets/`, outside Vite's publicly served directory. The automated build checks both `public/` and the compiled `dist/` output, including images introduced by an import. A future image is permitted **only after a human review**, with an explicit entry documenting:

- The final `public/` file path and its exact SHA-256 fingerprint.
- The reviewed sample/product reference and image usage rights reference.
- The approval record under `approvals/records/`, the actual approver and approval date.

The on-repository record should document who reviewed the physical sample, the final photographs, rights/usage permissions, and whether the picture truly represents the listed item. Do not put confidential supplier contracts or personal documents in the public web directory. An approval record must reflect a real approval; do not create a fabricated sign-off merely to make a build pass.

Moving from `IMAGE_FREE` to `REVIEWED_ASSETS_ONLY` also requires deliberately revising the *separate* active-preview image prohibition and human release review. Image approval **never** authorizes sales: sourcing readiness, legal information and the production publishing gate remain independent `NO_GO` checks.

## Product publication is a separate decision

`product-publication.json` starts in `NO_PRODUCTS` mode with an empty list. It cannot turn the five planning concepts into saleable products. `npm run check:product-publication` enforces that any **future** product record must correspond to an approved supplier SKU in `sourcing/first-drop-readiness.json`, with all global and item-level evidence gates verified, and a separate documented founder release.

A future product publication record must specify an approved final retail price (rather than a research target), real variant SKUs and size/measurement/stock evidence, at least two licensed approved photos tied to that same supplier product, and an owner approval record under `approvals/records/`. The script **never** publishes to Shopify or the production website. Turning on products also requires an intentional update to the existing independent `NO_GO` launch tests and active frontend boundary, followed by human review.

The product-detail layout now has a reusable `ProductPhotoGallery` component capable of displaying real photographs with descriptive alt text and a responsive primary/detail grid. It is deliberately called **without any photos** in the active preview. The component itself does not grant image rights or source product data: only a separately reviewed release may connect the approved photograph records to it. The in-memory test photos are not deployed.

`ProductReviewFacts` similarly provides a future display for measured size labels, approved whole-euro price, composition, care, and confirmed delivery and return terms. It currently receives **no product facts**. Size labels are informational, not stock promises or order controls. Any future integration must derive these exact details from approved product evidence and applicable consumer information, with an explicit release decision. Its synthetic render-test values are never bundled into the active storefront.

`ProductCardImage` prepares the same approved-photo handoff in collection grids: real product photos can fill the card in a future reviewed release, while the active 20 copy-only cards remain image-free and clearly marked as pending. The synthetic test asset path is not bundled or deployed.

Before connecting real supplier data to those components, run `npm run check:catalog-handoff`. The read-only `scripts/prepare-reviewed-catalog.mjs` reuses the independent sale and image approval gates, then cross-checks the public product name and category against the approved supplier row. It requires verified customer copy for the exact fabric, care, fit, delivery and returns details and creates no output while `NO_PRODUCTS` is active. After a genuine independent release, `node scripts/prepare-reviewed-catalog.mjs --export` can write a **local-only** `review-output/approved-catalog.json` for a human UI integration review. The export contains no supplier SKUs, customer data, automatic store import, checkout activation or production deployment. It is not a publication action.

Use `PRODUCT-RELEASE-RECORD-TEMPLATE.md` as a checklist when real samples and rights arrive. The template is not itself a release record and does not satisfy any gate.
