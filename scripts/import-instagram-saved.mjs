// Imports one Instagram saved collection into src/data/saved/<slug>.json and
// pulls a preview thumbnail per post into public/saved/<slug>/.
//
//   node scripts/import-instagram-saved.mjs <export-dir> "<Collection name>" [--no-thumbs]
//
// <export-dir> is the unzipped "Download your information" folder (JSON format),
// the one containing saved/saved_collections.json.
//
// Safe to re-run after a fresh export: hand-set fields (`bucket`, `hidden`) and
// already-downloaded thumbnails are kept, new saves are appended.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [exportDir, collectionName] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const skipThumbs = process.argv.includes('--no-thumbs');
if (!exportDir || !collectionName) {
  console.error('usage: node scripts/import-instagram-saved.mjs <export-dir> "<Collection name>" [--no-thumbs]');
  process.exit(1);
}

const slug = collectionName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dataFile = path.join('src/data/saved', `${slug}.json`);
const thumbDir = path.join('public/saved', slug);
const THUMB_WIDTH = 480;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15';

// Instagram writes UTF-8 bytes out as latin-1 code points; undo that.
const fixText = (s) => (s ? Buffer.from(s, 'latin1').toString('utf8') : '');
const field = (items, key) => items.find((f) => (f.label || f.title) === key);
const exists = (p) => access(p).then(() => true, () => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const collections = JSON.parse(await readFile(path.join(exportDir, 'saved/saved_collections.json'), 'utf8'));
const collection = collections.find((c) => field(c.label_values, 'Name')?.value === collectionName);
if (!collection) {
  console.error(`No collection named "${collectionName}" in the export.`);
  process.exit(1);
}

// Per-post save dates only exist in saved_posts.json, keyed here by URL.
const savedAt = new Map();
for (const p of JSON.parse(await readFile(path.join(exportDir, 'saved/saved_posts.json'), 'utf8'))) {
  const url = field(p.label_values, 'URL')?.value;
  if (url) savedAt.set(url, Number(p.timestamp));
}

const previous = new Map();
if (await exists(dataFile)) {
  for (const p of JSON.parse(await readFile(dataFile, 'utf8'))) previous.set(p.id, p);
}

const posts = [];
for (const m of field(collection.label_values, 'Media').dict) {
  const url = field(m.dict, 'URL')?.value;
  const match = url?.match(/instagram\.com\/(p|reel)\/([^/]+)/);
  if (!match) continue;
  const [, kind, id] = match;
  const owner = field(m.dict, 'Owner')?.dict?.[0]?.dict ?? [];
  const ts = savedAt.get(url);
  const old = previous.get(id) ?? {};
  posts.push({
    id,
    url,
    kind: kind === 'reel' ? 'reel' : 'post',
    username: fixText(field(owner, 'Username')?.value),
    name: fixText(field(owner, 'Name')?.value),
    savedAt: ts ? new Date(ts * 1000).toISOString().slice(0, 10) : null,
    bucket: old.bucket ?? null,
    thumb: old.thumb ?? false,
    ...(old.hidden ? { hidden: true } : {}),
  });
}
posts.sort((a, b) => (b.savedAt ?? '').localeCompare(a.savedAt ?? ''));

const save = () => writeFile(dataFile, JSON.stringify(posts, null, 2) + '\n');
await mkdir(path.dirname(dataFile), { recursive: true });
await mkdir(thumbDir, { recursive: true });
await save();
console.log(`${posts.length} posts in "${collectionName}" -> ${dataFile}`);

if (!skipThumbs) {
  let fetched = 0;
  let failed = 0;
  for (const post of posts) {
    const out = path.join(thumbDir, `${post.id}.webp`);
    if (await exists(out)) {
      post.thumb = true;
      continue;
    }
    try {
      const res = await fetch(`${post.url}embed/captioned/`, { headers: { 'User-Agent': UA } });
      if (!res.ok) throw new Error(`embed page ${res.status}`);
      const html = await res.text();
      const src = html.match(/class="EmbeddedMediaImage"[^>]*?src="([^"]+)"/)?.[1];
      if (!src) throw new Error('no preview image in embed page');
      const img = await fetch(src.replaceAll('&amp;', '&'), { headers: { 'User-Agent': UA } });
      if (!img.ok) throw new Error(`image ${img.status}`);
      await sharp(Buffer.from(await img.arrayBuffer()))
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(out);
      post.thumb = true;
      fetched++;
    } catch (err) {
      post.thumb = false;
      failed++;
      console.warn(`  skip ${post.id}: ${err.message}`);
    }
    if ((fetched + failed) % 20 === 0) await save();
    // One post every couple of seconds; this is a one-off, no need to hurry.
    await sleep(1800 + Math.random() * 1200);
  }
  await save();
  console.log(`thumbnails: ${fetched} fetched, ${failed} failed, ${posts.filter((p) => p.thumb).length} total on disk`);
}
