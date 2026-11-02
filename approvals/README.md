# Visual approvals — release control

No garment, sample, supplier, campaign or product photographs have been approved for the current EVERNE preview. `visual-assets.json` therefore contains an **empty** list and `previewMode: IMAGE_FREE`.

Raster images are kept in `research-assets/`, outside Vite's publicly served directory. The automated build checks both `public/` and the compiled `dist/` output, including images introduced by an import. A future image is permitted **only after a human review**, with an explicit entry documenting:

- The final `public/` file path and its exact SHA-256 fingerprint.
- The reviewed sample/product reference and image usage rights reference.
- The approval record under `approvals/records/`, the actual approver and approval date.

The on-repository record should document who reviewed the physical sample, the final photographs, rights/usage permissions, and whether the picture truly represents the listed item. Do not put confidential supplier contracts or personal documents in the public web directory. An approval record must reflect a real approval; do not create a fabricated sign-off merely to make a build pass.

Moving from `IMAGE_FREE` to `REVIEWED_ASSETS_ONLY` also requires deliberately revising the *separate* active-preview image prohibition and human release review. Image approval **never** authorizes sales: sourcing readiness, legal information and the production publishing gate remain independent `NO_GO` checks.
