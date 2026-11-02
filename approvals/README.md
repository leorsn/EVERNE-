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

Use `PRODUCT-RELEASE-RECORD-TEMPLATE.md` as a checklist when real samples and rights arrive. The template is not itself a release record and does not satisfy any gate.
