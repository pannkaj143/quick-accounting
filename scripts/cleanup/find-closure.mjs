// Walks ES-module-style imports starting from a set of entry files and prints
// every file in the closure. Used to decide what to keep during template cleanup.
//
// Special handling for "barrel" files (e.g. src/components/index.js) that
// re-export many siblings: instead of following every re-export, only follow
// the ones whose exported name was actually named-imported by a consumer.
//
// Algorithm: fixed-point iteration. Maintain Map<file, Set<name>|"all">.
// On each pass, expand any file whose wanted-set has grown since last pass.
// Stop when no change.
//
// Usage: node scripts/cleanup/find-closure.mjs

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const repoRoot = resolve(fileURLToPath(import.meta.url), "../../..");
const srcRoot = join(repoRoot, "src");

const entryFiles = [
  "src/pages/_app.js",
  "src/pages/_document.js",
  "src/pages/index.jsx",
  "src/pages/about.jsx",
  "src/pages/service-v6.jsx",
  "src/pages/contact.jsx",
  "src/pages/faq.jsx",
  "src/pages/error.jsx",
].map((p) => join(repoRoot, p));

function listApiFiles(dir) {
  if (!existsSync(dir)) return [];
  return execSync(`find "${dir}" -type f`).toString().trim().split("\n").filter(Boolean);
}
entryFiles.push(...listApiFiles(join(repoRoot, "src/pages/api")));

const exts = [".js", ".jsx", ".mjs", ".cjs", ".json"];

function resolveImport(fromFile, spec) {
  if (!spec.startsWith(".") && !spec.startsWith("@/") && !spec.startsWith("/")) return null;

  let base;
  if (spec.startsWith("@/")) {
    base = join(srcRoot, spec.slice(2));
  } else if (spec.startsWith("/")) {
    base = join(repoRoot, spec.slice(1));
  } else {
    base = resolve(dirname(fromFile), spec);
  }

  if (existsSync(base) && statSync(base).isFile()) return base;
  for (const ext of exts) if (existsSync(base + ext)) return base + ext;
  for (const ext of exts) {
    const candidate = join(base, "index" + ext);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function extractImports(file) {
  const src = readFileSync(file, "utf8");
  const stripped = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:\\])\/\/.*$/gm, "$1");

  const out = [];

  const reNamed = /import\s+(?:([A-Za-z_$][\w$]*)\s*,\s*)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
  for (const m of stripped.matchAll(reNamed)) {
    const names = m[2]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.split(/\s+as\s+/)[0].trim());
    out.push({ spec: m[3], names });
  }

  const reDefault = /import\s+([A-Za-z_$][\w$]*)\s+from\s*["']([^"']+)["']/g;
  for (const m of stripped.matchAll(reDefault)) {
    if (m[0].includes("{")) continue;
    out.push({ spec: m[2], names: "all" });
  }

  const reStar = /import\s+\*\s+as\s+[A-Za-z_$][\w$]*\s+from\s*["']([^"']+)["']/g;
  for (const m of stripped.matchAll(reStar)) out.push({ spec: m[1], names: "all" });

  const reBare = /import\s*["']([^"']+)["']/g;
  for (const m of stripped.matchAll(reBare)) out.push({ spec: m[1], names: "all" });

  for (const m of stripped.matchAll(/\brequire\(\s*["']([^"']+)["']\s*\)/g))
    out.push({ spec: m[1], names: "all" });
  for (const m of stripped.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g))
    out.push({ spec: m[1], names: "all" });

  return out;
}

function parseBarrelExports(file) {
  const src = readFileSync(file, "utf8");
  const map = new Map();
  const reReexportDefault =
    /export\s*\{\s*default\s+as\s+([A-Za-z_$][\w$]*)\s*\}\s*from\s*["']([^"']+)["']/g;
  for (const m of src.matchAll(reReexportDefault)) map.set(m[1], m[2]);
  const reReexportNamed = /export\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
  for (const m of src.matchAll(reReexportNamed)) {
    const spec = m[2];
    for (const piece of m[1].split(",")) {
      const parts = piece.trim().split(/\s+as\s+/);
      if (parts.length === 0 || !parts[0]) continue;
      const exportedAs = (parts[1] || parts[0]).trim();
      if (exportedAs === "default") continue;
      if (!map.has(exportedAs)) map.set(exportedAs, spec);
    }
  }
  return map;
}

function isBarrelFile(file) {
  const src = readFileSync(file, "utf8");
  const lines = src
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith("/*") && !l.startsWith("*"));
  if (lines.length === 0) return false;
  const reExportFrom = lines.filter((l) => /^export\s.*\sfrom\s+["']/.test(l)).length;
  return reExportFrom / lines.length >= 0.8;
}

// wanted: Map<file, Set<string> | "all">
const wanted = new Map();
function want(file, names) {
  const cur = wanted.get(file);
  if (cur === "all") return false; // already maximal
  if (names === "all") {
    wanted.set(file, "all");
    return true;
  }
  if (!cur) {
    wanted.set(file, new Set(names));
    return names.length > 0 || true; // first time we see this file
  }
  let grew = false;
  for (const n of names) if (!cur.has(n)) { cur.add(n); grew = true; }
  return grew;
}

for (const f of entryFiles) want(f, "all");

let changed = true;
while (changed) {
  changed = false;
  for (const [file, names] of [...wanted]) {
    if (!existsSync(file)) continue;
    if (!file.startsWith(srcRoot)) continue;
    const ext = extname(file);
    if (![".js", ".jsx", ".mjs", ".cjs"].includes(ext)) continue;

    if (isBarrelFile(file)) {
      const barrelMap = parseBarrelExports(file);
      const wantedNames = names === "all" ? [...barrelMap.keys()] : [...names];
      for (const name of wantedNames) {
        const spec = barrelMap.get(name);
        if (!spec) continue;
        const resolved = resolveImport(file, spec);
        if (resolved && resolved.startsWith(srcRoot)) {
          if (want(resolved, "all")) changed = true;
        }
      }
      // Also follow the barrel's own (non-re-export) imports if any
      for (const imp of extractImports(file)) {
        const resolved = resolveImport(file, imp.spec);
        if (resolved && resolved.startsWith(srcRoot)) {
          if (want(resolved, imp.names)) changed = true;
        }
      }
      continue;
    }

    // Regular file: follow every import, with the importer's named list
    for (const imp of extractImports(file)) {
      const resolved = resolveImport(file, imp.spec);
      if (resolved && resolved.startsWith(srcRoot)) {
        if (want(resolved, imp.names)) changed = true;
      }
    }
  }
}

const closure = [...wanted.keys()]
  .filter((f) => f.startsWith(srcRoot))
  .map((f) => f.slice(repoRoot.length + 1))
  .sort();

console.log("=== FILES IN CLOSURE ===");
for (const f of closure) console.log(f);
console.log(`\n=== TOTAL: ${closure.length} files ===`);
