import fs from 'node:fs';

const requiredSkus = [
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

const files = [
  'src/previewCatalog.ts',
  'src/careSetProduct.ts',
  'src/manualCareProducts.ts',
  'src/storefrontConfig.ts',
  'src/ProductDetailPage.tsx',
  'src/App.tsx',
  'public/rechtliches.html',
  'vercel.json',
];

const missingFiles = files.filter((file) => !fs.existsSync(file));
if (missingFiles.length) {
  console.error(`Missing required storefront files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

const catalogSource = [
  fs.readFileSync('src/previewCatalog.ts', 'utf8'),
  fs.readFileSync('src/careSetProduct.ts', 'utf8'),
  fs.readFileSync('src/manualCareProducts.ts', 'utf8'),
].join('\n');

const configSource = fs.readFileSync('src/storefrontConfig.ts', 'utf8');
const vercelSource = fs.readFileSync('vercel.json', 'utf8');

const failures = [];

for (const sku of requiredSkus) {
  if (!catalogSource.includes(sku)) failures.push(`Catalog source is missing required SKU ${sku}`);
  if (!configSource.includes(`'${sku}'`)) failures.push(`PRODUCT_ORDER is missing required SKU ${sku}`);
}

const configOrderMatches = [...configSource.matchAll(/'((?:EV)-[^']+)'/g)]
  .map((match) => match[1])
  .filter((sku) => requiredSkus.includes(sku));

if (configOrderMatches.length !== requiredSkus.length) {
  failures.push(`PRODUCT_ORDER must contain exactly ${requiredSkus.length} Edition 01 SKUs; found ${configOrderMatches.length}`);
}

if (new Set(configOrderMatches).size !== configOrderMatches.length) {
  failures.push('PRODUCT_ORDER contains duplicate Edition 01 SKUs');
}

if (!configSource.includes("VITE_ENABLE_PURCHASES === 'true'")) {
  failures.push('Primary commerce launch gate is missing');
}

if (!configSource.includes("VITE_LAUNCH_APPROVED === 'true'")) {
  failures.push('Secondary launch approval gate is missing');
}

if (!vercelSource.includes('"source": "/products/:path*"')) {
  failures.push('Vercel product deep-link rewrite is missing');
}

if (!vercelSource.includes('"source": "/rechtliches"') || !vercelSource.includes('"X-Robots-Tag"')) {
  failures.push('Pre-launch legal route must have an X-Robots-Tag noindex header');
}

if (!vercelSource.includes('"value": "noindex, nofollow"')) {
  failures.push('Legal X-Robots-Tag must remain noindex, nofollow before launch');
}

if (failures.length) {
  console.error('\nEVERNE storefront validation failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(`EVERNE storefront validation passed: ${requiredSkus.length} required SKUs, launch gates, legal noindex, and routing checks are present.`);
