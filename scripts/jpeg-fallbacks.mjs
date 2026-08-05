/**
 * Одноразовый скрипт: JPEG-фоллбэки для корп. прокси + пересборка hero в 1920px.
 * Запуск: node scripts/jpeg-fallbacks.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

// 1) Hero: lanczos-апскейл 1280 -> 1920 + лёгкая резкость, q86 jpg + q84 webp
const heroSrc = "public/images/hero/new-hero.webp";
const heroMeta = await sharp(heroSrc).metadata();
if ((heroMeta.width ?? 0) < 1920) {
  const heroBuf = await sharp(heroSrc)
    .resize({ width: 1920, kernel: "lanczos3" })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.3 })
    .toBuffer();
  await sharp(heroBuf).jpeg({ quality: 86, mozjpeg: true }).toFile("public/images/hero/new-hero.jpg");
  await sharp(heroBuf).webp({ quality: 84 }).toFile("public/images/hero/new-hero-1920.webp");
  fs.renameSync("public/images/hero/new-hero-1920.webp", "public/images/hero/new-hero.webp");
}
for (const f of ["public/images/hero/new-hero.webp", "public/images/hero/new-hero.jpg"]) {
  const m = await sharp(f).metadata();
  console.log(f, m.width + "x" + m.height, Math.round(fs.statSync(f).size / 1024) + "KB");
}

// 2) Бэкап raw-оригинала падел-фото, затем сжатый jpg из грейженного webp
fs.mkdirSync("media-raw/services", { recursive: true });
const rawPadel = "public/images/services/IMG_8857.jpg";
if (fs.existsSync(rawPadel) && fs.statSync(rawPadel).size > 1024 * 1024) {
  fs.copyFileSync(rawPadel, "media-raw/services/IMG_8857-original.jpg");
}
await sharp("public/images/services/IMG_8857.webp")
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile("public/images/services/IMG_8857_tmp.jpg");
fs.renameSync("public/images/services/IMG_8857_tmp.jpg", rawPadel);
console.log("IMG_8857.jpg", Math.round(fs.statSync(rawPadel).size / 1024) + "KB");

// 3) Недостающие jpg-сиблинги
const jobs = [
  ["public/images/facilities/indoor.webp", "public/images/facilities/indoor.jpg", 1600],
  ["public/images/facilities/hall.webp", "public/images/facilities/hall.jpg", 1600],
  ["public/images/facilities/outdoor.webp", "public/images/facilities/outdoor.jpg", 1600],
  ["public/images/facilities/aerial.webp", "public/images/facilities/aerial.jpg", 1920],
  ["public/images/gallery/01.webp", "public/images/gallery/01.jpg", 1200],
  ["public/images/gallery/03.webp", "public/images/gallery/03.jpg", 1200],
  ["public/images/gallery/04.webp", "public/images/gallery/04.jpg", 1200],
  ["public/images/gallery/06.webp", "public/images/gallery/06.jpg", 1200],
  ["public/images/hero/hero.webp", "public/images/hero/hero.jpg", 1920],
  ["public/images/hero/poster.webp", "public/images/hero/poster.jpg", 1920],
];
for (const [src, dest, maxW] of jobs) {
  if (!fs.existsSync(src)) {
    console.log("SKIP", src);
    continue;
  }
  const meta = await sharp(src).metadata();
  let p = sharp(src);
  if ((meta.width ?? 0) > maxW) p = p.resize({ width: maxW });
  await p.jpeg({ quality: 85, mozjpeg: true }).toFile(dest);
  console.log("OK", dest, Math.round(fs.statSync(dest).size / 1024) + "KB");
}

// 4) Проверка: каждый путь из конфигов существует, у webp есть jpg-сиблинг
const sources = [
  "src/lib/media.ts",
  "src/lib/team.ts",
  "src/lib/gallery.ts",
  "src/lib/news.ts",
  "src/components/services/massage-block.tsx",
];
const paths = new Set();
const re = /["'](\/(?:images|videos|logo)\/[^"']+)["']/g;
for (const s of sources) {
  const txt = fs.readFileSync(s, "utf8");
  for (const m of txt.matchAll(re)) paths.add(m[1]);
}
let bad = 0;
for (const p of [...paths].sort()) {
  const f = "public" + p;
  if (!fs.existsSync(f)) {
    console.log("MISSING FILE:", p);
    bad++;
    continue;
  }
  if (/\.webp$/i.test(p)) {
    const j = f.replace(/\.webp$/i, ".jpg");
    if (!fs.existsSync(j)) {
      console.log("NO JPG SIBLING:", p);
      bad++;
    }
  }
}
console.log(bad === 0 ? "ALL PATHS OK (" + paths.size + ")" : "PROBLEMS: " + bad);
