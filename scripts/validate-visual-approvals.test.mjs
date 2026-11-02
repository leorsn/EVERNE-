import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { validateVisualApprovals } from './validate-visual-approvals.mjs';

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'everne-visual-gate-'));
  fs.mkdirSync(path.join(root, 'approvals', 'records'), { recursive: true });
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
  const manifestPath = path.join(root, 'approvals', 'visual-assets.json');
  const setManifest = (manifest) => fs.writeFileSync(manifestPath, JSON.stringify(manifest));
  setManifest({ version: 1, previewMode: 'IMAGE_FREE', approvedAssets: [] });
  try { run({ root, setManifest }); } finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test('image-free source and build pass without raster assets', () => fixture(({ root }) => {
  assert.equal(validateVisualApprovals(root, 'dist').deployedImages, 0);
}));

test('unapproved public photos fail even when no component uses them', () => fixture(({ root }) => {
  fs.writeFileSync(path.join(root, 'public', 'hidden.jpg'), 'not an approved photo');
  assert.throws(() => validateVisualApprovals(root), /Unapproved photograph/);
}));

test('images emitted from source imports also fail the output gate', () => fixture(({ root }) => {
  fs.writeFileSync(path.join(root, 'dist', 'stray.webp'), 'unreviewed');
  assert.throws(() => validateVisualApprovals(root, 'dist'), /Unapproved photograph/);
}));

test('manifest entries cannot bypass IMAGE_FREE status', () => fixture(({ root, setManifest }) => {
  setManifest({ version: 1, previewMode: 'IMAGE_FREE', approvedAssets: [{}] });
  assert.throws(() => validateVisualApprovals(root), /approved visual|raster path/);
}));

test('documented reviewed image passes by exact SHA, changes fail', () => fixture(({ root, setManifest }) => {
  const photo = path.join(root, 'public', 'verified.jpg');
  fs.writeFileSync(photo, 'approved sample-photo test fixture');
  fs.writeFileSync(path.join(root, 'dist', 'verified.jpg'), 'approved sample-photo test fixture');
  fs.writeFileSync(path.join(root, 'approvals', 'records', 'test.md'), '# Approval evidence fixture');
  const sha256 = createHash('sha256').update(fs.readFileSync(photo)).digest('hex');
  setManifest({
    version: 1,
    previewMode: 'REVIEWED_ASSETS_ONLY',
    approvedAssets: [{ publicPath: 'public/verified.jpg', sha256, sampleReference: 'sample-verified', rightsReference: 'rights-verified', approvalRecord: 'approvals/records/test.md', approvedBy: 'Test reviewer', approvedAt: '2026-11-02' }],
  });
  assert.equal(validateVisualApprovals(root, 'dist').deployedImages, 1);
  fs.writeFileSync(photo, 'changed without approval');
  assert.throws(() => validateVisualApprovals(root, 'dist'), /bytes changed/);
}));
