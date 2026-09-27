type SeoInput = {
  title: string;
  description: string;
  image?: string;
  path?: string;
  type?: 'website' | 'product';
  indexable?: boolean;
};

type ProductStructuredDataInput = {
  name: string;
  description: string;
  sku: string;
  price: string;
  images: string[];
  path: string;
  available: boolean;
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element!.setAttribute(key, value));
}

function ensureCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

function removeProductStructuredData() {
  document.head.querySelector('script[data-everne-product-schema]')?.remove();
}

export function applySeo({ title, description, image, path = '/', type = 'website', indexable = true }: SeoInput) {
  const url = new URL(path, window.location.origin).toString();
  document.title = title;

  ensureMeta('meta[name="description"]', { name: 'description', content: description });
  ensureMeta('meta[name="robots"]', { name: 'robots', content: indexable ? 'index,follow' : 'noindex,nofollow' });
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type });
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' });
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

  if (image) {
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  }

  ensureCanonical(url);
}

export function applyProductStructuredData({
  name,
  description,
  sku,
  price,
  images,
  path,
  available,
}: ProductStructuredDataInput) {
  removeProductStructuredData();

  const numericPrice = price
    .replace(/[^0-9,.-]/g, '')
    .replace(',', '.');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    image: images,
    brand: {
      '@type': 'Brand',
      name: 'EVERNE',
    },
    offers: {
      '@type': 'Offer',
      url: new URL(path, window.location.origin).toString(),
      priceCurrency: 'EUR',
      price: numericPrice,
      availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.dataset.everneProductSchema = 'true';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function clearProductStructuredData() {
  removeProductStructuredData();
}
