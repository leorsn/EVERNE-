import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rasterExtension = /\.(?:avif|gif|jpe?g|png|webp)$/i;

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) {
      throw new Error(`Visual release audit does not follow symlinks: ${entryPath}`);
    }
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
  });
}

function fileHash(absolute) {
  return createHash('sha256').update(fs.readFileSync(absolute)).digest('hex');
}

function inside(root, relative) {
  const absolute = path.resolve(root, relative);
  assert.ok(absolute.startsWith(root + path.sep), `Asset path escapes repository: ${relative}`);
  return absolute;
}

/**
 * Reviewable build gate: an approved entry is tied to exact file bytes and an
 * on-repository approval record. An approval entry alone never enables photos
 * in the current image-free preview; that transition requires a separate,
 * explicit change to the preview boundary checks.
 */
export function validateVisualApprovals(root, outputDirectory) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'approvals/visual-assets.json'), 'utf8'));
  assert.equal(manifest.version, 1, 'Unknown visual approval manifest format');
  assert.ok(['IMAGE_FREE', 'REVIEWED_ASSETS_ONLY'].includes(manifest.previewMode),
    'Visual preview mode must be explicit');
  assert.ok(Array.isArray(manifest.approvedAssets), 'approvedAssets must be an array');

  const approved = new Map();
  for (const record of manifest.approvedAssets) {
    assert.ok(record && typeof record === 'object', 'Invalid visual approval entry');
    const { publicPath, sha256, sampleReference, rightsReference, approvalRecord, approvedBy, approvedAt } = record;
    assert.ok(typeof publicPath === 'string' && /^public\/[a-zA-Z0-9_./-]+$/.test(publicPath) && rasterExtension.test(publicPath),
      'An approved visual must specify a raster path under public/');
    assert.ok(!publicPath.split('/').includes('..'), `Unacceptable asset path: ${publicPath}`);
    assert.ok(!approved.has(publicPath), `Duplicate visual approval: ${publicPath}`);
    assert.match(sha256 ?? '', /^[a-f0-9]{64}$/, `Missing SHA-256 for ${publicPath}`);
    for (const [field, value] of Object.entries({ sampleReference, rightsReference, approvedBy })) {
      assert.ok(typeof value === 'string' && value.trim().length >= 3,
        `A reviewed visual needs ${field}: ${publicPath}`);
    }
    assert.match(approvedAt ?? '', /^\d{4}-\d{2}-\d{2}$/, `Approval date required: ${publicPath}`);
    assert.ok(!Number.isNaN(Date.parse(approvedAt)), `Invalid approval date: ${publicPath}`);
    assert.ok(typeof approvalRecord === 'string' && /^approvals\/records\/[a-zA-Z0-9_.-]+\.md$/.test(approvalRecord),
      `Approval evidence path required: ${publicPath}`);
    assert.ok(fs.existsSync(inside(root, approvalRecord)), `Approval evidence missing: ${approvalRecord}`);
    approved.set(publicPath, record);
  }

  if (manifest.previewMode === 'IMAGE_FREE') {
    assert.equal(approved.size, 0, 'IMAGE_FREE preview cannot claim any approved photographs');
  }

  const publicFiles = walkFiles(path.join(root, 'public')).filter((file) => rasterExtension.test(file));
  const outputRoot = outputDirectory ? inside(root, outputDirectory) : undefined;
  const outputFiles = outputRoot ? walkFiles(outputRoot).filter((file) => rasterExtension.test(file)) : [];
  for (const [location, files, base] of [
    ['Vite public/', publicFiles, path.join(root, 'public')],
    ['Vite build output', outputFiles, outputRoot],
  ]) {
    for (const file of files) {
      const relative = path.relative(base, file).split(path.sep).join('/');
      const key = `public/${relative}`;
      const evidence = approved.get(key);
      assert.ok(evidence,
        `Unapproved photograph in ${location}: ${relative}. Keep it in research-assets/ until approved.`);
      assert.equal(fileHash(file), evidence.sha256, `Approved visual bytes changed: ${relative}`);
    }
  }
  for (const approvedPath of approved.keys()) {
    assert.ok(publicFiles.some((file) => path.relative(root, file).split(path.sep).join('/') === approvedPath),
      `Approved visual is missing from public/: ${approvedPath}`);
  }

  return { mode: manifest.previewMode, approved: approved.size, deployedImages: outputFiles.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.cwd();
  const result = validateVisualApprovals(root, process.argv[2]);
  console.log(`Visual approval gate passed: ${result.mode}, ${result.approved} approved assets, ${result.deployedImages} deployed raster files.`);
}
