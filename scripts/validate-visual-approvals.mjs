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
 * on-repository approval record. In EDITORIAL_STUDY, third-party references
 * have a separate evidence register and cannot count as approved products.
 */
export function validateVisualApprovals(root, outputDirectory) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'approvals/visual-assets.json'), 'utf8'));
  assert.equal(manifest.version, 1, 'Unknown visual approval manifest format');
  assert.ok(['IMAGE_FREE', 'EDITORIAL_STUDY', 'REVIEWED_ASSETS_ONLY'].includes(manifest.previewMode),
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

  const studies = new Map();
  assert.ok(Array.isArray(manifest.studyAssets ?? []), 'studyAssets must be an array');
  for (const record of manifest.studyAssets ?? []) {
    const { publicPath, sha256, sourcePage, rightsReference, evidenceRecord, usage, reviewedAt } = record;
    assert.match(publicPath ?? '', /^public\/editorial-study\/[a-zA-Z0-9_-]+\.jpe?g$/,
      'A design-study image must be confined to public/editorial-study/');
    assert.ok(!studies.has(publicPath) && !approved.has(publicPath), 'Duplicate visual asset');
    assert.match(sha256 ?? '', /^[a-f0-9]{64}$/, 'Every study photo needs a byte-specific hash');
    assert.match(sourcePage ?? '', /^https:\/\/www\.pexels\.com\/photo\/[a-z0-9-]+\/$/,
      'A study photo needs its original Pexels image page');
    assert.equal(rightsReference, 'https://www.pexels.com/license/', 'Study license must be recorded');
    assert.equal(usage, 'NON_PRODUCT_REFERENCE', 'Study photos must never authorize product use');
    assert.match(reviewedAt ?? '', /^\d{4}-\d{2}-\d{2}$/, 'Study rights review date required');
    assert.match(evidenceRecord ?? '', /^approvals\/records\/[a-zA-Z0-9_.-]+\.md$/,
      'Study rights evidence path required');
    assert.ok(fs.existsSync(inside(root, evidenceRecord)), 'Missing editorial evidence: ' + evidenceRecord);
    studies.set(publicPath, record);
  }
  // Internally generated campaign imagery is distinct from third-party style
  // references and from reviewed product photographs. It remains noncommercial.
  const campaignConcepts = new Map();
  assert.ok(Array.isArray(manifest.campaignConceptAssets ?? []), 'campaignConceptAssets must be an array');
  for (const record of manifest.campaignConceptAssets ?? []) {
    const { publicPath, sha256, origin, evidenceRecord, usage, disclosure, reviewedAt } = record;
    assert.match(publicPath ?? '', /^public\/campaign-concepts\/[a-z0-9-]+\.jpe?g$/,
      'A generated campaign must be confined to public/campaign-concepts/');
    assert.ok(!campaignConcepts.has(publicPath) && !approved.has(publicPath) && !studies.has(publicPath),
      'Duplicate generated campaign asset');
    assert.match(sha256 ?? '', /^[a-f0-9]{64}$/, 'A generated campaign needs a byte-specific hash');
    assert.equal(origin, 'OPENAI_IMAGE_GENERATION', 'Generated image provenance must be explicit');
    assert.equal(usage, 'NON_PRODUCT_CAMPAIGN_CONCEPT', 'Generated imagery cannot approve garments or sales');
    assert.equal(disclosure, 'DIGITAL CAMPAIGN CONCEPT · NOT EVERNE CLOTHING', 'Generated campaigns require an honest disclosure');
    assert.match(reviewedAt ?? '', /^\d{4}-\d{2}-\d{2}$/, 'Campaign concept registration date required');
    assert.match(evidenceRecord ?? '', /^approvals\/records\/[a-zA-Z0-9_.-]+\.md$/,
      'Generated campaign evidence path required');
    assert.ok(fs.existsSync(inside(root, evidenceRecord)), 'Missing campaign evidence: ' + evidenceRecord);
    campaignConcepts.set(publicPath, record);
  }
  if (manifest.previewMode === 'IMAGE_FREE') {
    assert.equal(approved.size, 0, 'IMAGE_FREE preview cannot claim any approved photographs');
    assert.equal(studies.size, 0, 'IMAGE_FREE preview cannot contain editorial studies');
    assert.equal(campaignConcepts.size, 0, 'IMAGE_FREE preview cannot contain generated campaigns');
  } else if (manifest.previewMode === 'EDITORIAL_STUDY') {
    assert.equal(approved.size, 0, 'Editorial study photos are not approved EVERNE product photography');
    assert.ok(studies.size > 0, 'EDITORIAL_STUDY requires documented reference images');
  } else {
    assert.equal(studies.size, 0, 'Reviewed product imagery must be separately authorized');
    assert.equal(campaignConcepts.size, 0, 'Generated campaign concepts do not count as approved product images');
  }
  const registered = new Map([...approved, ...studies, ...campaignConcepts]);

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
      const evidence = registered.get(key);
      assert.ok(evidence,
        `Unapproved photograph in ${location}: ${relative}. Keep it in research-assets/ until approved.`);
      assert.equal(fileHash(file), evidence.sha256, `Approved visual bytes changed: ${relative}`);
    }
  }
  for (const approvedPath of registered.keys()) {
    assert.ok(publicFiles.some((file) => path.relative(root, file).split(path.sep).join('/') === approvedPath),
      `Approved visual is missing from public/: ${approvedPath}`);
  }

  return { mode: manifest.previewMode, approved: approved.size, studies: studies.size, campaignConcepts: campaignConcepts.size, deployedImages: outputFiles.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = process.cwd();
  const result = validateVisualApprovals(root, process.argv[2]);
  console.log(`Visual approval gate passed: ${result.mode}, ${result.approved} approved assets, ${result.deployedImages} deployed raster files.`);
}
