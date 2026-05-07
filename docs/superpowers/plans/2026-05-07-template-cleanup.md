# Quick Accounting — Template Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip the unused Axtra-template content from this Next.js project, keeping only what powers the 6 active pages (home, about, service-v6, contact, faq, error).

**Architecture:** Closure-based deletion. Walk imports starting from kept pages to identify every reachable component and asset, then delete everything outside that closure. Each major step is its own commit so any single step can be reverted.

**Tech Stack:** Next.js 15, React 19, plain CSS (no SCSS — styles live in `src/styles/master.css`), Bootstrap, GSAP, Swiper. No test runner — verification is `next build` plus a manual browser smoke test of each kept page.

**Spec:** [docs/superpowers/specs/2026-05-07-template-cleanup-design.md](../specs/2026-05-07-template-cleanup-design.md)

---

## Pre-flight context

- **Working directory:** `/Users/karadinfotech/Desktop/quick-accounting`
- **Branch:** start on `main`, working commits go on `main`. (User asked for backup, no feature branch.)
- **Pages to keep:** `index.jsx`, `about.jsx`, `service-v6.jsx`, `contact.jsx`, `faq.jsx`, `error.jsx`, `_app.js`, `_document.js`, plus everything under `pages/api/`.
- **Components index:** `src/components/index.js` is a barrel file (~208 lines of `export {default as X} from "./..."`). Slimming it before deleting files keeps the build importable at every step.
- **Styles:** only `src/styles/master.css` exists. No SCSS partials to walk.
- **Assets:** `public/assets/{imgs,video,fonts,gsap-plugins}`. Fonts and gsap-plugins stay (small, loaded by path/CSS). Imgs and video get the closure treatment.

---

## Task 1: Create backup branch

**Files:** none (git operation only)

- [ ] **Step 1: Verify clean working tree**

Run: `git status`
Expected: `nothing to commit, working tree clean` and `On branch main`.

If not clean, stop and surface to the user. Do not proceed.

- [ ] **Step 2: Create backup branch pointing at current main**

Run:
```bash
git branch pre-cleanup-backup
git branch --list pre-cleanup-backup
```
Expected: the branch is listed.

This is a no-op for files. We stay on `main` and do all work there. The user can `git checkout pre-cleanup-backup` to restore everything.

- [ ] **Step 3: Confirm we're still on main**

Run: `git rev-parse --abbrev-ref HEAD`
Expected: `main`

---

## Task 2: Build the keep-closure programmatically

We need a deterministic list of which `src/components/**/*.jsx` files are reachable from the kept pages. Doing this by hand is error-prone, so we write a small Node script that walks imports.

**Files:**
- Create: `scripts/cleanup/find-closure.mjs`

- [ ] **Step 1: Create the closure-analysis script**

Create `scripts/cleanup/find-closure.mjs` with the following content:

```javascript
// Walks ES-module-style imports starting from a set of entry files and prints
// every file in the closure. Used to decide what to keep during template cleanup.
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

// Add every file under pages/api as an entry too (Next.js routes them automatically).
function listApiFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  const items = execSync(`find "${dir}" -type f`).toString().trim().split("\n").filter(Boolean);
  return items;
}
entryFiles.push(...listApiFiles(join(repoRoot, "src/pages/api")));

const exts = [".js", ".jsx", ".mjs", ".cjs", ".json"];

function resolveImport(fromFile, spec) {
  // Skip bare module imports (npm packages).
  if (!spec.startsWith(".") && !spec.startsWith("@/") && !spec.startsWith("/")) return null;

  let base;
  if (spec.startsWith("@/")) {
    base = join(srcRoot, spec.slice(2));
  } else if (spec.startsWith("/")) {
    base = join(repoRoot, spec.slice(1));
  } else {
    base = resolve(dirname(fromFile), spec);
  }

  // exact match
  if (existsSync(base) && statSync(base).isFile()) return base;
  // try extensions
  for (const ext of exts) {
    if (existsSync(base + ext)) return base + ext;
  }
  // try index.*
  for (const ext of exts) {
    const candidate = join(base, "index" + ext);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function extractImports(file) {
  const src = readFileSync(file, "utf8");
  const specs = new Set();
  // import ... from "x"
  for (const m of src.matchAll(/\bfrom\s+["']([^"']+)["']/g)) specs.add(m[1]);
  // import("x")
  for (const m of src.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)) specs.add(m[1]);
  // require("x")
  for (const m of src.matchAll(/\brequire\(\s*["']([^"']+)["']\s*\)/g)) specs.add(m[1]);
  return [...specs];
}

const visited = new Set();
const queue = [...entryFiles];
while (queue.length > 0) {
  const file = queue.shift();
  if (visited.has(file)) continue;
  if (!existsSync(file)) continue;
  visited.add(file);

  const ext = extname(file);
  if (![".js", ".jsx", ".mjs", ".cjs"].includes(ext)) continue;
  const specs = extractImports(file);
  for (const spec of specs) {
    const resolved = resolveImport(file, spec);
    if (resolved && resolved.startsWith(srcRoot)) queue.push(resolved);
  }
}

const closure = [...visited]
  .filter((f) => f.startsWith(srcRoot))
  .map((f) => f.slice(repoRoot.length + 1))
  .sort();

console.log("=== FILES IN CLOSURE ===");
for (const f of closure) console.log(f);
console.log(`\n=== TOTAL: ${closure.length} files ===`);
```

- [ ] **Step 2: Run the script and capture output**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
node scripts/cleanup/find-closure.mjs > /tmp/quick-accounting-closure.txt
wc -l /tmp/quick-accounting-closure.txt
head -30 /tmp/quick-accounting-closure.txt
```
Expected: A list of `src/...` files. Should include the kept pages plus a tractable number of components (probably 20-40 component files).

- [ ] **Step 3: Sanity-check the output**

The closure must include at minimum:
- All 8 kept page files (`index`, `about`, `service-v6`, `contact`, `faq`, `error`, `_app`, `_document`)
- `src/components/index.js`
- The Creative Agency component variants (Header, Hero, About, Service, CTA, Footer, Brand)
- `Faq1`, `FaqCTA`, `Switcher`
- `Contact1`, `ServiceV6Hero`
- `AboutHero`, `AboutStory`, `AboutCounter`, `AboutTestimonial`
- `CursorAnimation`, `ScrollTop`, `Preloader`, `ScrollSmootherComponents`

If any of those are missing, stop and investigate — the closure walker has a bug. Check that the import-extraction regex caught the import. Do not proceed to deletion until the closure is correct.

- [ ] **Step 4: Commit the script**

```bash
git add scripts/cleanup/find-closure.mjs
git commit -m "$(cat <<'EOF'
chore: add closure analysis script for template cleanup

Walks ES-module imports starting from kept entry pages and prints every
src/ file reachable. Used to decide what to delete in the cleanup.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Delete unused page files

The list of pages to keep is fixed (see Pre-flight context). Everything else under `src/pages/` (except `api/`) is template demo content.

**Files:**
- Delete: every file in `src/pages/` not in the keep list

- [ ] **Step 1: List current page files**

Run:
```bash
ls /Users/karadinfotech/Desktop/quick-accounting/src/pages
```
Expected: shows `_app.js, _document.js, about.jsx, api, career.jsx, category.jsx, contact.jsx, digital-marketing.jsx, error.jsx, faq.jsx, index.jsx, interective-link-dark.jsx, interective-link.jsx, portfolio-details.jsx, service-details.jsx, service-v6.jsx, service.jsx, showcase-carousel-dark.jsx, showcase-carousel.jsx, showcase-parallax-dark.jsx, showcase-parallax.jsx, team-details-dark.jsx, team-details.jsx, team.jsx, vertical-grid-dark.jsx, vertical-grid.jsx`.

- [ ] **Step 2: Delete unused pages**

Run from repo root:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
git rm \
  src/pages/career.jsx \
  src/pages/category.jsx \
  src/pages/digital-marketing.jsx \
  src/pages/interective-link-dark.jsx \
  src/pages/interective-link.jsx \
  src/pages/portfolio-details.jsx \
  src/pages/service-details.jsx \
  src/pages/service.jsx \
  src/pages/showcase-carousel-dark.jsx \
  src/pages/showcase-carousel.jsx \
  src/pages/showcase-parallax-dark.jsx \
  src/pages/showcase-parallax.jsx \
  src/pages/team-details-dark.jsx \
  src/pages/team-details.jsx \
  src/pages/team.jsx \
  src/pages/vertical-grid-dark.jsx \
  src/pages/vertical-grid.jsx
```

- [ ] **Step 3: Verify what remains**

Run: `ls src/pages`
Expected output (exact):
```
_app.js  _document.js  about.jsx  api  contact.jsx  error.jsx  faq.jsx  index.jsx  service-v6.jsx
```

If anything else is listed (other than the 7 kept files + `api` directory), investigate before continuing.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
chore: remove unused template page files

Drops the demo pages that are not linked from the site (career, team,
portfolio, showcase variants, vertical-grid, digital-marketing,
service-details, etc.). Kept: home, about, service-v6, contact, faq,
error, plus _app/_document and api/.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Slim `src/components/index.js` to closure-only exports

Before deleting component files, we trim the barrel file to export only components in the closure. This way the app keeps building at every step.

**Files:**
- Modify: `src/components/index.js`

- [ ] **Step 1: Re-run the closure script (now that pages have been pruned)**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
node scripts/cleanup/find-closure.mjs > /tmp/quick-accounting-closure.txt
grep "^src/components/" /tmp/quick-accounting-closure.txt
```
Expected: a list of every component file actually reachable from the kept pages.

- [ ] **Step 2: Read the current barrel**

Read `src/components/index.js` in full. It is ~208 lines of `export {default as X} from "./folder/X"` statements grouped by template-page comment headers.

- [ ] **Step 3: Rewrite the barrel to export only closure components**

Open `src/components/index.js` and rewrite it so it contains ONLY exports for component files present in the closure list from Step 1. Use this exact structure (fill in the actual closure contents):

```javascript
// Barrel of all components used by the live site.
// Updated as part of template cleanup (see docs/superpowers/specs/2026-05-07-template-cleanup-design.md).

// Common
export { default as CursorAnimation } from "./common/CursorAnimation";
export { default as Switcher } from "./common/Switcher";
export { default as ScrollTop } from "./common/ScrollTop";
export { default as Preloader } from "./preloader/Preloader";
export { default as ScrollSmootherComponents } from "./common/ScrollSmootherComponents";

// Creative Agency (home + shared chrome)
export { default as CreativeAgencyHeader } from "./header/CreativeAgencyHeader";
export { default as CreativeAgencyHero } from "./hero/CreativeAgencyHero";
export { default as CreativeAgencyAbout } from "./about/CreativeAgencyAbout";
export { default as CreativeAgencyService } from "./service/CreativeAgencyService";
export { default as CreativeAgencyCTA } from "./cta/CreativeAgencyCTA";
export { default as CreativeAgencyFooter } from "./footer/CreativeAgencyFooter";
export { default as CreativeAgencyBrand } from "./brand/CreativeAgencyBrand";

// About page
export { default as AboutHero } from "./hero/AboutHero";
export { default as AboutStory } from "./story/AboutStory";
export { default as AboutCounter } from "./counter/AboutCounter";
export { default as AboutTestimonial } from "./testimonial/AboutTestimonial";

// Contact page
export { default as Contact1 } from "./contact/Contact1";

// Service page
export { default as ServiceV6Hero } from "./hero/ServiceV6Hero";

// FAQ page
export { default as Faq1 } from "./faq/Faq1";
export { default as FaqCTA } from "./cta/FaqCTA";
```

**Important:** if the closure script in Step 1 reveals that a kept component itself imports another component via the barrel (e.g. `Faq1.jsx` imports `something` from `@/components`), the barrel must continue to export `something`. Cross-reference Step 1's component list with the barrel exports above. If anything is in the closure but missing from the barrel rewrite, ADD it. The goal is `closure ⊆ barrel exports`.

- [ ] **Step 4: Verify the build still compiles**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
npm run build
```
Expected: build succeeds with no `Module not found` or `is not exported from '@/components'` errors.

If it fails with "X is not exported from '@/components'": that component IS used somewhere, add it back to the barrel. Re-run.

- [ ] **Step 5: Commit**

```bash
git add src/components/index.js
git commit -m "$(cat <<'EOF'
chore: slim components barrel to live-site exports

Reduces src/components/index.js to only the components reachable from
the kept pages. Build still passes; component files themselves are
removed in a later commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Delete unused component files

Now that the barrel exports only closure components and the unused pages are gone, every component file outside the closure is unreachable.

**Files:**
- Delete: every file under `src/components/` not in the closure (except `index.js`)

- [ ] **Step 1: Generate the list of component files to delete**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
node scripts/cleanup/find-closure.mjs > /tmp/quick-accounting-closure.txt

# All component files currently on disk
find src/components -type f \( -name "*.jsx" -o -name "*.js" \) | sort > /tmp/all-components.txt

# Components in closure (always keep src/components/index.js)
grep "^src/components/" /tmp/quick-accounting-closure.txt | sort > /tmp/keep-components.txt

# Files to delete = all minus keep
comm -23 /tmp/all-components.txt /tmp/keep-components.txt > /tmp/delete-components.txt

echo "=== Will keep ==="; cat /tmp/keep-components.txt
echo
echo "=== Will delete ==="; cat /tmp/delete-components.txt
echo
echo "Keep: $(wc -l < /tmp/keep-components.txt)  Delete: $(wc -l < /tmp/delete-components.txt)"
```
Expected: `keep` list contains roughly 20-30 files including `index.js`. `delete` list contains the bulk of the components folder.

- [ ] **Step 2: Eyeball the delete list for surprises**

Read `/tmp/delete-components.txt` mentally and confirm:
- No file under `common/` is being deleted that is referenced from a kept component (e.g. headers/footers may import shared common helpers)
- No file ending in `index.js` is being deleted (only `src/components/index.js` should exist as an index)

If anything looks wrong, investigate by grepping `src/` for the file's basename. Stop and surface to the user before deleting.

- [ ] **Step 3: Delete the files**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
xargs git rm < /tmp/delete-components.txt
```

- [ ] **Step 4: Remove now-empty component folders**

Run:
```bash
find src/components -type d -empty -delete
ls src/components
```
Expected: only folders containing kept files remain (e.g. `common`, `header`, `hero`, `about`, `service`, `cta`, `footer`, `brand`, `story`, `counter`, `testimonial`, `contact`, `faq`, `preloader`).

- [ ] **Step 5: Verify build passes**

Run:
```bash
npm run build
```
Expected: build succeeds.

If a build error reports a missing module from a kept component (e.g. `Faq1.jsx` imports `'../some/Helper'` which we just deleted), that helper IS in use; restore it from `pre-cleanup-backup`:

```bash
git checkout pre-cleanup-backup -- src/components/path/to/Helper.jsx
```

Re-run the closure script — it should now include the helper. Loop until build passes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: remove unused template component files

Deletes the component files for template variants (Digital Marketing,
Design Studio, Modern Agency, Startup Agency, etc.) that are not
reachable from any kept page. The Creative Agency variants and
About/Contact/Service/FAQ-specific components remain.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Delete unreferenced assets in `public/assets/imgs` and `public/assets/video`

Walk every kept source file and collect any path string that points under `/assets/`. Anything in those two folders not referenced is template imagery.

**Files:**
- Create: `scripts/cleanup/find-asset-refs.mjs`
- Delete: unreferenced `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.mp4`, `.webm` files under `public/assets/imgs/` and `public/assets/video/`

- [ ] **Step 1: Create the asset-reference scanner**

Create `scripts/cleanup/find-asset-refs.mjs`:

```javascript
// Scans all kept source files for asset paths under /assets/ and prints
// every referenced asset. Anything in public/assets/{imgs,video} not in
// this list is unused.
//
// Usage: node scripts/cleanup/find-asset-refs.mjs

import { readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const repoRoot = resolve(fileURLToPath(import.meta.url), "../../..");

// Files to scan: everything under src/, plus public/assets/*.css if any.
const scanRoots = ["src", "public/assets/fonts", "public/assets/gsap-plugins"];
const files = scanRoots
  .flatMap((root) => {
    try {
      return execSync(`find "${join(repoRoot, root)}" -type f`).toString().trim().split("\n").filter(Boolean);
    } catch {
      return [];
    }
  });

// Match anything that looks like a path under /assets/ ending with a
// known asset extension. Capture the path segment.
const assetRegex = /(?:assets\/[A-Za-z0-9_\-./]+?\.(?:jpe?g|png|gif|webp|svg|mp4|webm|woff2?|ttf|otf|eot|css|js))/gi;

const referenced = new Set();
for (const file of files) {
  let src;
  try { src = readFileSync(file, "utf8"); } catch { continue; }
  for (const m of src.matchAll(assetRegex)) {
    // Normalize: strip leading slashes / "public" prefix if any.
    let p = m[0].replace(/^\/+/, "");
    if (!p.startsWith("public/")) p = "public/" + p;
    referenced.add(p);
  }
}

const sorted = [...referenced].sort();
console.log("=== REFERENCED ASSETS ===");
for (const p of sorted) console.log(p);
console.log(`\n=== TOTAL: ${sorted.length} ===`);
```

- [ ] **Step 2: Run it and review the output**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
node scripts/cleanup/find-asset-refs.mjs > /tmp/quick-accounting-assets-referenced.txt
wc -l /tmp/quick-accounting-assets-referenced.txt
head -40 /tmp/quick-accounting-assets-referenced.txt
```
Expected: a list of referenced asset paths. Should include `public/assets/imgs/logo/...`, `public/assets/imgs/about/...`, etc., plus the gsap-plugins JS files referenced via `<script>` tags.

- [ ] **Step 3: Compute the deletion list for imgs + video only**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
find public/assets/imgs public/assets/video -type f | sort > /tmp/all-assets.txt
sort /tmp/quick-accounting-assets-referenced.txt > /tmp/keep-assets-sorted.txt
comm -23 /tmp/all-assets.txt /tmp/keep-assets-sorted.txt > /tmp/delete-assets.txt
wc -l /tmp/all-assets.txt /tmp/keep-assets-sorted.txt /tmp/delete-assets.txt
echo "--- first 40 to delete ---"
head -40 /tmp/delete-assets.txt
```
Expected: most of `imgs/` (template demo imagery) and likely all of `video/` will be in the delete list.

- [ ] **Step 4: Sanity check — do not delete more than 95% of imgs unless expected**

Run:
```bash
all=$(wc -l < /tmp/all-assets.txt)
del=$(wc -l < /tmp/delete-assets.txt)
echo "Deleting $del of $all"
```

If the kept list is unexpectedly tiny (e.g. fewer than 5 assets kept), the regex may have missed dynamic references — investigate before deleting. Look for places where assets are referenced via template strings or JSON config (e.g. `data/*.json`).

- [ ] **Step 5: Spot-check that scripts/cleanup correctly preserves a known used image**

Verify the home page hero/logo image is in the keep list:
```bash
grep -i "logo" /tmp/keep-assets-sorted.txt | head
grep -i "favicon" /tmp/keep-assets-sorted.txt
```
Expected: logo and favicon paths appear.

- [ ] **Step 6: Delete the unused assets**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
xargs git rm < /tmp/delete-assets.txt
find public/assets/imgs public/assets/video -type d -empty -delete
```

- [ ] **Step 7: Verify build still passes**

Run:
```bash
npm run build
```
Expected: succeeds. Next.js's `next/image` does not error on missing files at build time, so a missing asset will only show up at runtime — that's why we do a dev server check next, not just a build.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: remove unreferenced template images and videos

Drops every image under public/assets/imgs and video under
public/assets/video that is not referenced from any kept source file.
Fonts and gsap-plugins are unchanged.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Final verification — build + browser smoke test

This is the gate that confirms the cleanup didn't break anything visible.

**Files:** none

- [ ] **Step 1: Clean build from scratch**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
rm -rf .next
npm run build
```
Expected: completes with no errors. Some warnings (e.g. about `<img>` instead of `<Image>`) are pre-existing template style and OK to ignore.

- [ ] **Step 2: Start dev server in background**

Run:
```bash
cd /Users/karadinfotech/Desktop/quick-accounting
npm run dev
```
(Use a background process so you can poll the URL.)

Wait until the server reports `Ready` (or `started server on...`). Default port: 3000.

- [ ] **Step 3: Open each kept page and verify**

For each of the 6 routes — `/`, `/about`, `/service-v6`, `/contact`, `/faq`, and any non-existent path to trigger 404 — load the page in the browser and confirm:

- The page renders (no white screen, no obvious crash)
- DevTools Console has no new errors introduced by the cleanup
- DevTools Network tab shows no 404s for image or video assets

If a 404 appears for a specific asset path, that asset was reachable through a code path the closure scanner missed. Restore it from the backup branch:
```bash
git checkout pre-cleanup-backup -- public/assets/path/to/file.jpg
```
Then commit the restore as a fixup and continue.

- [ ] **Step 4: Stop the dev server**

Kill the background process.

- [ ] **Step 5: Final commit if any restore-fixups happened**

If Step 3 surfaced any missing assets that had to be restored, commit them:
```bash
git add public/assets
git commit -m "$(cat <<'EOF'
fix: restore assets missed by closure scanner

Closure walker missed these because they are referenced via dynamic
paths or JSON data; restoring from pre-cleanup-backup.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no restores were needed, this step is a no-op.

- [ ] **Step 6: Report repo size delta**

Run:
```bash
du -sh public src
```
And compare to the pre-cleanup baseline (~21M public, src TBD). Expected: substantial drop in `public/` size and a smaller `src/` footprint.

Surface the before/after to the user as the final sign-off.

---

## Done

After Task 7 passes, the cleanup is complete:

- Code reachable from the 6 live pages is preserved
- Unused pages, components, and template assets are deleted in 5 distinct commits
- `pre-cleanup-backup` branch holds the original state for full recovery if anything later turns out to be missed
- Two helper scripts (`find-closure.mjs`, `find-asset-refs.mjs`) remain in `scripts/cleanup/` and can be re-run any time to audit for dead code

**Out of scope (deliberately deferred):**
- Replacing remaining placeholder template imagery with the user's real branded images
- Refactoring kept components, restructuring CSS, simplifying GSAP setup
- Pruning unused dependencies in `package.json`
- Adding `/faq` to the navbar (open question to user — handled separately)
