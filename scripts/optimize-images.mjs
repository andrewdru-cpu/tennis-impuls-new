/**
 * Оптимизация изображений в public/images/
 *
 * npm run optimize:images          — JPEG → WebP (если .webp ещё нет)
 * npm run optimize:images -- --webp  — пересжать тяжёлые .webp (>400 KB)
 *
 * Рекомендуемые настройки:
 *  Hero / facilities / kids: maxWidth 1920, quality 82
 *  Services / gallery:      maxWidth 1600, quality 80–82
 *  Team portraits:          maxWidth 900,  quality 82
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const recompressWebp = process.argv.includes("--webp");

/** @type {{ pattern: RegExp; maxWidth: number; quality: number }[]} */
const JPEG_RULES = [
  { pattern: /services\/IMG_8857\.jpe?g$/i, maxWidth: 1920, quality: 82 },
  { pattern: /kids\/kids-training-1\.jpe?g$/i, maxWidth: 1920, quality: 82 },
  { pattern: /kids\/kids-training-2\.jpe?g$/i, maxWidth: 1280, quality: 82 },
];

/** @type {{ pattern: RegExp; maxWidth: number; quality: number; minKB?: number }[]} */
const WEBP_RULES = [
  { pattern: /facilities\/outdoor\.webp$/i, maxWidth: 1600, quality: 80, minKB: 400 },
  { pattern: /hero\/hero\.webp$/i, maxWidth: 1920, quality: 80, minKB: 400 },
  { pattern: /facilities\/hall\.webp$/i, maxWidth: 1600, quality: 80, minKB: 300 },
  { pattern: /gallery\/03\.webp$/i, maxWidth: 1200, quality: 80, minKB: 200 },
  { pattern: /team\/coach-4\.webp$/i, maxWidth: 900, quality: 82, minKB: 180 },
];

function walk(dir, acc = [], extRe) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc, extRe);
    else if (extRe.test(entry.name)) acc.push(full);
  }
  return acc;
}

function jpegRule(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  return (
    JPEG_RULES.find((r) => r.pattern.test(rel)) ?? {
      maxWidth: 1920,
      quality: 82,
    }
  );
}

function webpRule(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  return WEBP_RULES.find((r) => r.pattern.test(rel));
}

async function toWebpBuffer(input, maxWidth, quality) {
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input);
  if ((meta.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  return pipeline
    .webp({ quality, effort: 6, smartSubsample: true })
    .toBuffer();
}

async function convertJpeg(file) {
  const out = file.replace(/\.jpe?g$/i, ".webp");
  if (fs.existsSync(out)) return null;

  const rule = jpegRule(file);
  const buffer = await toWebpBuffer(file, rule.maxWidth, rule.quality);
  fs.writeFileSync(out, buffer);

  return {
    rel: path.relative(ROOT, out).replace(/\\/g, "/"),
    before: fs.statSync(file).size,
    after: buffer.length,
  };
}

async function recompressWebpFile(file) {
  const rule = webpRule(file);
  if (!rule) return null;

  const before = fs.statSync(file).size;
  if (before / 1024 < (rule.minKB ?? 400)) return null;

  const buffer = await toWebpBuffer(file, rule.maxWidth, rule.quality);
  if (buffer.length >= before * 0.95) return null;

  const backup = file + ".bak";
  fs.copyFileSync(file, backup);
  try {
    fs.writeFileSync(file, buffer);
    fs.unlinkSync(backup);
  } catch {
    if (fs.existsSync(backup)) {
      fs.copyFileSync(backup, file);
      fs.unlinkSync(backup);
    }
    throw new Error(`Could not write ${file} (file may be locked)`);
  }

  return {
    rel: path.relative(ROOT, file).replace(/\\/g, "/"),
    before,
    after: buffer.length,
  };
}

const results = [];

if (recompressWebp) {
  for (const file of walk(ROOT, [], /\.webp$/i)) {
    try {
      const r = await recompressWebpFile(file);
      if (r) results.push(r);
    } catch (e) {
      console.warn(String(e.message ?? e));
    }
  }
} else {
  for (const file of walk(ROOT, [], /\.jpe?g$/i)) {
    const r = await convertJpeg(file);
    if (r) results.push(r);
  }
}

if (results.length === 0) {
  console.log(
    recompressWebp
      ? "No WebP files needed recompression (or files are locked)."
      : "All JPEG files already have WebP counterparts."
  );
} else {
  console.log(recompressWebp ? "Recompressed:" : "Converted:");
  for (const r of results) {
    const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
    console.log(
      `  ${r.rel}: ${(r.before / 1024).toFixed(1)} KB → ${(r.after / 1024).toFixed(1)} KB (−${pct}%)`
    );
  }
}
