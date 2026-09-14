export type Money = { amount: string; currencyCode: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage?: { url: string; altText?: string | null } | null;
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      price: Money;
      sku?: string | null;
    }>;
  };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string };
    price: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: { nodes: CartLine[] };
};

type StorefrontError = {
  message?: string;
};

const SHOP_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'khps10-rs.myshopify.com';
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-07';

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STOREFRONT_TOKEN) {
    headers['X-Shopify-Storefront-Access-Token'] = STOREFRONT_TOKEN;
  }

  const response = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`Shopify request failed (${response.status}).`);

  const payload = await response.json() as { data?: T; errors?: StorefrontError[] };
  if (payload.errors?.length || !payload.data) {
    throw new Error(payload.errors?.[0]?.message || 'Shopify returned an invalid response.');
  }

  return payload.data;
}

const PRODUCT_FIELDS = `
  id handle title description availableForSale
  featuredImage { url altText }
  variants(first: 10) {
    nodes { id title availableForSale sku price { amount currencyCode } }
  }
`;

export async function getEdition01(): Promise<Product[]> {
  const data = await storefront<{ collection: { products: { nodes: Product[] } } | null }>(`
    query Edition01($handle: String!) {
      collection(handle: $handle) {
        products(first: 20) { nodes { ${PRODUCT_FIELDS} } }
      }
    }
  `, { handle: 'edition-01' });
  return data.collection?.products.nodes ?? [];
}

export async function createCart(variantId: string): Promise<Cart> {
  const data = await storefront<{ cartCreate: { cart: Cart | null; userErrors: Array<{ message: string }> } }>(`
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id checkoutUrl totalQuantity
          cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
          lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title } } } } }
        }
        userErrors { message }
      }
    }
  `, { lines: [{ merchandiseId: variantId, quantity: 1 }] });
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  if (!data.cartCreate.cart) throw new Error('Shopify did not create a cart.');
  return data.cartCreate.cart;
}

export async function addCartLine(cartId: string, variantId: string): Promise<Cart> {
  const data = await storefront<{ cartLinesAdd: { cart: Cart; userErrors: Array<{ message: string }> } }>(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id checkoutUrl totalQuantity
          cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
          lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title } } } } }
        }
        userErrors { message }
      }
    }
  `, { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] });
  if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await storefront<{ cartLinesUpdate: { cart: Cart; userErrors: Array<{ message: string }> } }>(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id checkoutUrl totalQuantity
          cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
          lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title } } } } }
        }
        userErrors { message }
      }
    }
  `, { cartId, lines: [{ id: lineId, quantity }] });
  if (data.cartLinesUpdate.userErrors.length) throw new Error(data.cartLinesUpdate.userErrors[0].message);
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await storefront<{ cartLinesRemove: { cart: Cart; userErrors: Array<{ message: string }> } }>(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id checkoutUrl totalQuantity
          cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
          lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title } } } } }
        }
        userErrors { message }
      }
    }
  `, { cartId, lineIds: [lineId] });
  if (data.cartLinesRemove.userErrors.length) throw new Error(data.cartLinesRemove.userErrors[0].message);
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefront<{ cart: Cart | null }>(`
    query Cart($id: ID!) {
      cart(id: $id) {
        id checkoutUrl totalQuantity
        cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
        lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } product { title } } } } }
      }
    }
  `, { id: cartId });
  return data.cart;
}

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: money.currencyCode }).format(Number(money.amount));
}
