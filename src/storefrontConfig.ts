export const PRODUCT_ORDER: string[] = [
  'EV-CS-BL',
  'EV-CC-01',
  'EV-FS-01',
  'EV-SCB-01',
  'EV-DLB-01',
  'EV-FR-01',
  'EV-WH-01',
  'EV-GB-01',
  'EV-ECB-01',
];

export const CORE_SKUS: string[] = PRODUCT_ORDER.slice(0, 5);

const commerceRequested = import.meta.env.VITE_ENABLE_PURCHASES === 'true';
const launchApproved = import.meta.env.VITE_LAUNCH_APPROVED === 'true';

/**
 * Commerce only becomes active when both explicit launch gates are enabled.
 * This prevents an accidental single-variable production activation.
 */
export const PURCHASES_ENABLED = commerceRequested && launchApproved;

export const STOREFRONT_STATUS = PURCHASES_ENABLED ? 'live' : 'preview';

type CatalogProductLike = {
  availableForSale: boolean;
  variants: {
    nodes: Array<{
      sku?: string | null;
      availableForSale: boolean;
    }>;
  };
};

export type CatalogIntegrity = {
  missingSkus: string[];
  duplicateSkus: string[];
  unavailableSkus: string[];
  valid: boolean;
};

/**
 * Verifies that every required Edition 01 SKU exists exactly once and is saleable.
 * This is intentionally independent of product handles because Shopify handles may
 * differ from the editorial storefront route (for example after an archived handle
 * already consumed the preferred slug).
 */
export function validateCatalog(products: CatalogProductLike[]): CatalogIntegrity {
  const skuCounts = new Map<string, number>();
  const saleable = new Map<string, boolean>();

  for (const product of products) {
    for (const variant of product.variants.nodes) {
      if (!variant.sku || !PRODUCT_ORDER.includes(variant.sku)) continue;
      skuCounts.set(variant.sku, (skuCounts.get(variant.sku) ?? 0) + 1);
      saleable.set(variant.sku, product.availableForSale && variant.availableForSale);
    }
  }

  const missingSkus = PRODUCT_ORDER.filter((sku) => !skuCounts.has(sku));
  const duplicateSkus = PRODUCT_ORDER.filter((sku) => (skuCounts.get(sku) ?? 0) > 1);
  const unavailableSkus = PRODUCT_ORDER.filter((sku) => skuCounts.has(sku) && !saleable.get(sku));

  return {
    missingSkus,
    duplicateSkus,
    unavailableSkus,
    valid: missingSkus.length === 0 && duplicateSkus.length === 0 && unavailableSkus.length === 0,
  };
}
