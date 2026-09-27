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
