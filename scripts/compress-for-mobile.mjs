/**
 * Сжатие тяжёлых JPG/WebP для mobile (без /_next/image).
 * Запуск: node scripts/compress-for-mobile.mjs
 *
 * Правила:
 *  - hero: max 1920, jpg q82–85, цель <400KB
 *  - services/facilities/gallery/kids: max 1600, q80–82
 *  - team: max 900, webp q80 (лица), jpg q82
 *  - только файлы >500KB (или явный список гигантов)
 *  - не трогаем файлы, если сжатие не даёт ≥5% выигрыша
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const MIN_KB = 500;

/** @param {string} rel */
function ruleFor(rel) {
  if (/^hero\//i.test(rel)) return { maxWidth: 1920, quality: 82 };
  if (/^team\//i.test(rel)) return { maxWidth: 900, quality: 80 };
  if (/^gallery\//i.test(rel)) return { maxWidth: 1200, quality: 80 };
  if (/^kids\//i.test(rel)) return { maxWidth: 1600, quality: 82 };
  return { maxWidth: 1600, quality: 82 };
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(jpe?g|webp)$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

async function compressFile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const before = fs.statSync(file).size;
  if (before / 1024 < MIN_KB) return null;

  const { maxWidth, quality } = ruleFor(rel);
  const meta = await sharp(file, { failOn: "none" }).metadata();
  let pipeline = sharp(file, { failOn: "none" }).rotate();
  if ((meta.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const isWebp = /\.webp$/i.test(file);
  const buffer = isWebp
    ? await pipeline.webp({ quality, effort: 6, smartSubsample: true }).toBuffer()
    : await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();

  if (buffer.length >= before * 0.95) return null;

  // Windows: rename поверх занятого файла часто EPERM — пишем напрямую
  try {
    fs.writeFileSync(file, buffer);
  } catch {
    const tmp = `${file}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, buffer);
    try {
      fs.unlinkSync(file);
    } catch {
      /* ignore */
    }
    fs.renameSync(tmp, file);
  }

  return {
    rel,
    before,
    after: buffer.length,
    width: meta.width,
  };
}

// Неиспользуемый дубликат ~2.5MB — не коммитить/не держать в public
const orphan = path.join(ROOT, "kids", "20230528_115740(0).jpg");
if (fs.existsSync(orphan)) {
  fs.unlinkSync(orphan);
  console.log("Removed unused raw:", path.relative(process.cwd(), orphan));
}

const results = [];
for (const file of walk(ROOT)) {
  try {
    const r = await compressFile(file);
    if (r) results.push(r);
  } catch (e) {
    console.warn("FAIL", path.relative(ROOT, file), e.message ?? e);
  }
}

if (results.length === 0) {
  console.log("Nothing to compress (>500KB already lean).");
} else {
  console.log("Compressed:");
  for (const r of results.sort((a, b) => b.before - a.before)) {
    const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
    console.log(
      `  ${r.rel}: ${(r.before / 1024).toFixed(1)} → ${(r.after / 1024).toFixed(1)} KB (−${pct}%)`
    );
  }
}

// Hero итог
for (const name of ["new-hero.jpg", "new-hero.webp"]) {
  const f = path.join(ROOT, "hero", name);
  if (!fs.existsSync(f)) continue;
  const m = await sharp(f).metadata();
  console.log(
    `hero ${name}: ${m.width}x${m.height}, ${Math.round(fs.statSync(f).size / 1024)} KB`
  );
}
