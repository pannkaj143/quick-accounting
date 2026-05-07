// Scans all kept source files for asset paths under /assets/ and prints
// every referenced asset. Anything in public/assets/{imgs,video} not in
// this list is unused.
//
// Usage: node scripts/cleanup/find-asset-refs.mjs

import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const repoRoot = resolve(fileURLToPath(import.meta.url), "../../..");

// Files to scan: everything under src/, plus assets/fonts and assets/gsap-plugins
// (these can reference each other via CSS @font-face / script paths).
const scanRoots = ["src", "public/assets/fonts", "public/assets/gsap-plugins"];
const files = scanRoots.flatMap((root) => {
  try {
    return execSync(`find "${join(repoRoot, root)}" -type f`)
      .toString()
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
});

// Match anything that looks like a path under /assets/ ending with a known
// asset extension. Capture the path segment.
const assetRegex =
  /(?:assets\/[A-Za-z0-9_\-./]+?\.(?:jpe?g|png|gif|webp|svg|mp4|webm|woff2?|ttf|otf|eot|css|js))/gi;

const referenced = new Set();
for (const file of files) {
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const m of src.matchAll(assetRegex)) {
    let p = m[0].replace(/^\/+/, "");
    if (!p.startsWith("public/")) p = "public/" + p;
    referenced.add(p);
  }
}

const sorted = [...referenced].sort();
console.log("=== REFERENCED ASSETS ===");
for (const p of sorted) console.log(p);
console.log(`\n=== TOTAL: ${sorted.length} ===`);
