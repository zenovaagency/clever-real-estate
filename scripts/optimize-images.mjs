/**
 * One-off source-image compression for the static export (there is no image
 * server on GitHub Pages, so next/image serves these files as-is).
 *
 *   node scripts/optimize-images.mjs
 *
 * Resizes each photo to the largest width it is ever displayed at (×2 for
 * retina, capped) and re-encodes it with mozjpeg. Safe to re-run: images
 * already at or below their target width are only re-encoded if that helps.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const dir = join(import.meta.dirname, "..", "src", "assets", "images");

// Full-bleed / masthead photographs get more pixels than inset ones.
const widths = {
  "house-white.jpg": 1600,
  "house-minimal.jpg": 2000,
  "house-pool.jpg": 2000,
  "consult-couple.jpg": 2000,
  "villa-hero.jpg": 1500,
};
const DEFAULT_WIDTH = 1400;
const AGENT_WIDTH = 720;

for (const name of (await readdir(dir)).filter((f) => f.endsWith(".jpg"))) {
  const path = join(dir, name);
  const input = await readFile(path);
  const target = name.startsWith("agent-") ? AGENT_WIDTH : (widths[name] ?? DEFAULT_WIDTH);
  const output = await sharp(input)
    .resize({ width: target, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer();
  if (output.length < input.length) {
    await writeFile(path, output);
    console.log(`${name.padEnd(22)} ${(input.length / 1024).toFixed(0).padStart(5)} KB → ${(output.length / 1024).toFixed(0).padStart(4)} KB`);
  } else {
    console.log(`${name.padEnd(22)} kept (${(input.length / 1024).toFixed(0)} KB)`);
  }
}
