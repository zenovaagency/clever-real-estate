/**
 * Post-export fix for static hosting.
 *
 * The router prefetches segment data as `/sell/__next.sell.__PAGE__.txt`, but
 * `next build` with `output: "export"` writes it to `/sell/__next.sell/__PAGE__.txt`.
 * Static hosts (GitHub Pages) then answer the prefetch with a 404 and the
 * router falls back to a slower full fetch. This copies each nested segment
 * file to the flat, dotted name the client actually requests.
 */
import { copyFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "out");
let copied = 0;

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if (!(await stat(path)).isDirectory()) continue;
    if (name.startsWith("__next.")) await flatten(path, name, dir);
    else await walk(path);
  }
}

/** Copies `<parent>/__next.a/b/c.txt` to `<parent>/__next.a.b.c.txt`. */
async function flatten(dir, prefix, parent) {
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) {
      await flatten(path, `${prefix}.${name}`, parent);
    } else {
      await copyFile(path, join(parent, `${prefix}.${name}`));
      copied++;
    }
  }
}

await walk(root);
console.log(`fix-export-segments: copied ${copied} segment file(s)`);
