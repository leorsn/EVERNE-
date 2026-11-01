import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// The earlier Shopify garment-care app remains preserved in this repository.
// Review every dependency reachable from the active women's preview entry so
// no future refactor silently pulls old checkout, customer or product code in.
const projectRoot = process.cwd();
const sourceRoot = path.join(projectRoot, 'src');
const expectedModules = new Set([
  'src/main.tsx',
  'src/WomenswearApp.tsx',
  'src/ConceptDetailPage.tsx',
  'src/CarePage.tsx',
  'src/StandardsPage.tsx',
  'src/CollectionPendingPage.tsx',
  'src/RouteFocus.tsx',
  'src/womenswearNavigation.ts',
  'src/womenswearCatalog.ts',
  'src/seo.ts',
]);
const expectedStyles = new Set(['src/womenswear.css']);
const allowedPackages = new Set(['react', 'react-dom/client', 'react-router-dom']);
const visited = new Set();
const styles = new Set();

function projectPath(fullPath) {
  return path.relative(projectRoot, fullPath).split(path.sep).join('/');
}

function resolveLocal(origin, specifier) {
  const base = path.resolve(path.dirname(origin), specifier);
  assert.ok(base.startsWith(sourceRoot + path.sep), `A preview import escapes src/: ${specifier}`);
  const candidates = [base, base + '.ts', base + '.tsx', path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
  const found = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  assert.ok(found, `Missing local preview module: ${specifier} from ${projectPath(origin)}`);
  return found;
}

function walk(file) {
  const relative = projectPath(file);
  if (visited.has(relative)) return;
  visited.add(relative);

  const source = fs.readFileSync(file, 'utf8');
  const references = [];

  // All active modules use semicolon-terminated ES imports. Requiring each
  // import declaration to match avoids depending on the unstable TypeScript 7
  // parser API or adding an external parser to the protected preview build.
  const declarationCount = (source.match(/^\s*import\b/gm) ?? []).length;
  const declarations = [
    ...source.matchAll(/^\s*import\s+(?:type\s+)?(?:[^;]*?\s+from\s*)?['"]([^'"\n]+)['"]\s*;/gm),
    ...source.matchAll(/^\s*export\s+(?:type\s+)?[^;]*?\s+from\s*['"]([^'"\n]+)['"]\s*;/gm),
  ];
  assert.ok(declarations.length >= declarationCount,
    `${relative} has an import declaration not covered by the preview boundary audit`);
  assert.doesNotMatch(source, /\bimport\s*\(|\brequire\s*\(/,
    `${relative} must not load unreviewed dynamic modules`);
  assert.doesNotMatch(source, /\bfetch\s*\(|\.fetch\s*\(|\.sendBeacon\s*\(|\bnew\s+(?:XMLHttpRequest|WebSocket)\b/,
    `${relative} must not initiate network requests`);
  if (relative !== 'src/seo.ts') {
    assert.doesNotMatch(source, /\bapplyProductStructuredData\s*\(/,
      `${relative} must not activate product offer structured data`);
  }

  for (const declaration of declarations) {
    const specifier = declaration[1];
    if (specifier.startsWith('.')) {
      references.push(specifier);
    } else {
      assert.ok(allowedPackages.has(specifier), `Unreviewed external package in preview: ${specifier}`);
    }
  }

  for (const specifier of references) {
    const dependency = resolveLocal(file, specifier);
    const dependencyName = projectPath(dependency);
    if (dependencyName.endsWith('.css')) {
      styles.add(dependencyName);
    } else {
      walk(dependency);
    }
  }
}

walk(path.join(sourceRoot, 'main.tsx'));
assert.deepEqual([...visited].sort(), [...expectedModules].sort(),
  'Preview source dependency graph changed: review and explicitly approve every newly reachable module');
assert.deepEqual([...styles].sort(), [...expectedStyles].sort(),
  'Preview stylesheet dependencies changed: review new CSS before accepting it');

for (const style of styles) {
  const css = fs.readFileSync(style, 'utf8');
  assert.doesNotMatch(css, /@import\b|url\(\s*['"]?https?:\/\//i,
    `${style} must not fetch remote stylesheets or assets from the preview`);
}

const index = fs.readFileSync('index.html', 'utf8');
assert.doesNotMatch(index, /<(?:script|link)\b[^>]*(?:src|href)=["']https?:\/\//i,
  'The preview entry HTML must not load remote scripts or stylesheets');
assert.match(index, /name="robots" content="noindex,nofollow"/,
  'The preview entry must remain non-indexable');

for (const file of visited) {
  assert.ok(!fs.readFileSync(file, 'utf8').match(/VITE_(?:SHOPIFY|STRIPE|SUPABASE|PAYMENT|CHECKOUT)_/),
    `Live commerce/backend configuration must not be accessible from the active preview: ${file}`);
}

console.log(`EVERNE WOMAN entry boundary passed: ${visited.size} explicitly reviewed source modules, ${styles.size} stylesheet, no old Shopify/cart/payment modules or active network calls.`);
