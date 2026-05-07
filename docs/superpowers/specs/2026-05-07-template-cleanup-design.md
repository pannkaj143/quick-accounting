# Quick Accounting — Template Cleanup Design

**Date:** 2026-05-07
**Status:** Approved (pending written-spec review)

## Context

The project was scaffolded from the Axtra Next.js template. Only a small fraction of the template's pages, components, styles, and assets are used by the live site. The rest (placeholder pages, demo variants, template imagery, demo videos) bloats the repo, slows builds, and confuses navigation of the codebase.

This spec defines a careful, reversible cleanup that strips the project down to what actually powers the site.

## Goal

Remove all template content that is not transitively reachable from the kept pages, while leaving the live site visually and functionally unchanged.

## Pages to keep

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.jsx` | Home (linked from nav) |
| `/about` | `src/pages/about.jsx` | Linked from nav |
| `/service-v6` | `src/pages/service-v6.jsx` | Services (linked from nav) |
| `/contact` | `src/pages/contact.jsx` | Linked from nav |
| `/faq` | `src/pages/faq.jsx` | Kept on user request; nav linkage TBD with user |
| `/error` (404) | `src/pages/error.jsx` | Error page |
| n/a | `src/pages/_app.js`, `src/pages/_document.js` | Next.js framework files |
| `/api/*` | `src/pages/api/` | Contact form endpoint |

All other page files in `src/pages/` will be deleted.

## Components in the keep-closure

Direct imports from kept pages (verified by reading each page):

- **Common:** `CursorAnimation`, `ScrollTop`, `Preloader`, `ScrollSmootherComponents`, `Switcher` (faq only)
- **Creative Agency variant (used across pages):** `CreativeAgencyHeader`, `CreativeAgencyHero`, `CreativeAgencyAbout`, `CreativeAgencyService`, `CreativeAgencyCTA`, `CreativeAgencyFooter`, `CreativeAgencyBrand`
- **About:** `AboutHero`, `AboutStory`, `AboutCounter`, `AboutTestimonial`
- **Contact:** `Contact1`
- **Service:** `ServiceV6Hero`
- **FAQ:** `Faq1`, `FaqCTA`

The closure may grow once transitive imports inside these components are walked (e.g. a kept component might import a small helper from `common/` or `nav/`). Implementation will walk imports breadth-first and keep everything reachable.

All components NOT in the closure are deletion candidates — including most of `award/`, `benifit/`, `blog/`, `career/`, `category/`, `gallery/`, `job/`, `portfolio/`, `price/`, `roll/`, `solution/`, `workflow/`, `work/`, `development/`, `feature/`, `singleImage/`, plus non-Creative-Agency variants inside multi-variant folders (`footer/`, `header/`, `hero/`, `about/`, `service/`, `cta/`, `team/`, `testimonial/`, `counter/`, `story/`, `brand/`, `faq/`, etc.).

## Styles in the keep-closure

Walk SCSS imports starting from kept entry points (whatever the kept pages and `_app.js` import). Any `.scss` partial not transitively imported is deleted.

## Assets in the keep-closure

For every kept `.jsx`, `.js`, `.scss`, `.css`, `.json` file, extract every string that looks like an asset path under `/assets/`. Any file under `public/assets/imgs` or `public/assets/video` whose path is never referenced is deleted. Fonts and gsap-plugins are kept as-is (they are loaded by path/CSS and are small).

## Approach

Closure-based deletion in commits, in this order:

1. **Backup branch.** Create `pre-cleanup-backup` from current `main`. No content change.
2. **Build the closure.** Programmatically (or carefully by hand) walk:
   - Component imports from kept pages → kept components, recursively
   - SCSS imports from kept entry points → kept styles, recursively
   - Asset path strings inside any kept file → kept assets
3. **Delete unused pages.** Remove every file in `src/pages/` not in the keep list. Commit.
4. **Delete unused components.** Remove component files not in the closure. Update `src/components/index.js` to remove their exports. Commit.
5. **Delete unused SCSS partials.** Commit.
6. **Delete unused assets.** Commit.
7. **Verify.** `npm run build` must succeed. Run `npm run dev` and visually check each kept page (home, about, service-v6, contact, faq, 404) for visual regressions and 404s in the network tab.

Each step is a separate commit, so any single step can be individually reverted if something breaks.

## Risk controls

- **Backup branch** makes everything fully reversible.
- **Closure walk is conservative:** a file is only deleted if NO kept file references it.
- **Build verification** after deletions catches any missing imports.
- **Per-step commits** allow surgical revert.
- **Visual smoke test** of each kept page catches missing-image regressions.

## Out of scope

- Replacing remaining placeholder template images with the user's real branded images
- Refactoring or simplifying kept components
- Restructuring SCSS architecture
- Cleaning unused npm dependencies in `package.json`
- Adding/removing nav menu items (FAQ nav linkage to be discussed separately)

These are good follow-ups but outside this cleanup pass.

## Success criteria

- `npm run build` succeeds.
- All 6 kept pages render in the browser without console errors and without 404s in the network tab.
- `src/pages/`, `src/components/`, `src/styles/`, and `public/assets/` contain only files reachable from the kept pages.
- Repository size noticeably reduced (target: well under half the current ~21 MB `public/` weight, since most images and all videos appear unreferenced by the kept pages).
