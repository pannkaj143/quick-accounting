# Quick Accounting — Local SEO Improvements Design

**Date:** 2026-05-07
**Status:** Draft (pending user approval of written spec)

## Context

After the template cleanup (see [2026-05-07-template-cleanup-design.md](2026-05-07-template-cleanup-design.md)), the site is a clean 6-page Next.js app for Quick Accounting Ltd. The pages still use the original Axtra template's `<Head>` blocks: every page has a placeholder title (e.g. `Service V6`, `Faq`) and a one-word meta description. There is no canonical URL, Open Graph, Twitter card, JSON-LD structured data, sitemap, or robots.txt. The footer's "London" location heading is paired with a Romford address (RM1 3LD), which sends mixed signals to search engines.

This spec defines a focused local-SEO upgrade targeting **Romford + East London + London** for small businesses and sole traders.

## Business facts (load-bearing — used in metadata)

| Field | Value |
|---|---|
| Legal name | Quick Accounting Ltd |
| Domain | https://www.quick-accounting.co.uk |
| Phone | 020 4542 0907 (E.164: +44 20 4542 0907) |
| Email | info@quick-accounting.co.uk |
| Address | Office 3, 5th Floor, Lambourne House, Western Road, Romford, England, RM1 3LD |
| Founded | 2017 |
| Hours | Mon–Fri 10:00–17:00, Sat 09:00–15:00, Sun closed |
| Services | Tax Planning, Bookkeeping Solutions, Payroll Management, Business Consulting, Financial Accounts |
| Target audience | Small businesses / Limited companies + Sole traders / Self-employed |
| Geo focus | Romford, East London, London (Greater London) |

`priceRange` will be omitted from structured data (not provided).

## Goal

Move from default-template SEO to a competent local-SEO baseline so Google/Bing have everything they need to rank Quick Accounting Ltd for local accounting queries — without restructuring the site or adding new pages.

## Scope

The 6 existing live pages: `/`, `/about`, `/service-v6`, `/contact`, `/faq`, `/error`.

Five workstreams:

1. **Centralized SEO helper** (1 new component)
2. **Per-page `<Head>` rewrites** (6 page edits)
3. **Site-wide `_document.js` tweaks**
4. **JSON-LD structured data on home page**
5. **`robots.txt` + `sitemap.xml`**
6. **Targeted visible-content edits** (≤10 short JSX text changes)

Each is its own commit so individual pieces can be reverted.

## 1. Centralized SEO helper

**File:** `src/components/common/SEO.jsx` (new)

A small functional component that wraps the per-page `<Head>` content. Avoids 6× repetition of OG/Twitter/canonical boilerplate.

**Props:**
- `title` (string, required) — full page title; will be used verbatim
- `description` (string, required) — 140–160 chars
- `path` (string, required) — page path starting with `/` (e.g. `/about`)
- `ogImage` (string, optional) — defaults to `/assets/imgs/logo/site-logo-white.png`
- `noindex` (boolean, optional) — only true for the error page

**Renders:**
- `<title>`
- `<meta name="description">`
- `<meta name="viewport">` (already present, kept here)
- `<link rel="icon">` (kept here)
- `<link rel="canonical" href={SITE_URL + path}>`
- `<meta name="robots" content="index, follow" | "noindex, nofollow">`
- Open Graph: `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale="en_GB"`
- Twitter: `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`

Site-wide constants (SITE_URL, default OG image, site_name) live as module-level consts in this file.

The helper does NOT render JSON-LD; structured data lives only on the home page (separate concern, see §4).

## 2. Per-page `<Head>` rewrites

For each page, replace the existing `<Head>` block with a single `<SEO ... />` call.

| Page | Title (≤60 chars) | Description (140–160 chars) |
|---|---|---|
| `/` | `Quick Accounting Ltd — Accountants in Romford & London` | `Accountants in Romford & East London serving small businesses, limited companies and sole traders. Tax, payroll, bookkeeping & accounts. Call 020 4542 0907.` |
| `/about` | `About Us — Quick Accounting Ltd, Romford Accountants` | `Quick Accounting Ltd has supported small businesses and sole traders across Romford, East London and Greater London with friendly, accurate accounting since 2017.` |
| `/service-v6` | `Accounting Services in London — Tax, Payroll, Bookkeeping` | `Tax planning, bookkeeping, payroll, business consulting and annual accounts for small businesses and the self-employed across Romford, East London and London.` |
| `/contact` | `Contact Quick Accounting Ltd — Romford & London Accountants` | `Speak to a Romford-based accountant. Call 020 4542 0907 or email info@quick-accounting.co.uk. We support small businesses and sole traders across London.` |
| `/faq` | `Accounting FAQs — Quick Accounting Ltd, Romford & London` | `Common questions about tax, bookkeeping, payroll and limited company accounts answered by Quick Accounting Ltd, accountants in Romford and East London.` |
| `/error` | `Page Not Found — Quick Accounting Ltd` | `The page you're looking for can't be found. Return to Quick Accounting Ltd, accountants in Romford & London, for tax, payroll and bookkeeping services.` |

The error page also gets `noindex={true}`.

All character counts have been kept under typical Google truncation thresholds (≈60 / 160).

## 3. Site-wide `_document.js`

Edits to `src/pages/_document.js`:
- `<Html lang="en-GB">` (was `en`)
- Add `<meta name="theme-color" content="#000000">` (or whatever the site's primary brand colour is — verify in master.css; default to `#000000` if unclear)
- Add Google Fonts `preconnect` to improve LCP:
  ```jsx
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  ```
- Keep the existing Kanit font stylesheet link

## 4. JSON-LD structured data (home page only)

Inject a single `<script type="application/ld+json">` inside the home page's `<Head>` (after the `<SEO />` block). Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": "https://www.quick-accounting.co.uk/#business",
  "name": "Quick Accounting Ltd",
  "image": "https://www.quick-accounting.co.uk/assets/imgs/logo/site-logo-white.png",
  "url": "https://www.quick-accounting.co.uk/",
  "telephone": "+442045420907",
  "email": "info@quick-accounting.co.uk",
  "foundingDate": "2017",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office 3, 5th Floor, Lambourne House, Western Road",
    "addressLocality": "Romford",
    "addressRegion": "England",
    "postalCode": "RM1 3LD",
    "addressCountry": "GB"
  },
  "areaServed": [
    { "@type": "City", "name": "London" },
    { "@type": "Place", "name": "East London" },
    { "@type": "Place", "name": "Romford" },
    { "@type": "AdministrativeArea", "name": "Greater London" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "15:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Accounting Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax Planning" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Payroll Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Consulting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Annual Financial Accounts" } }
    ]
  }
}
```

The JSON-LD is stored as a JS object in `src/data/businessSchema.json` and stringified at render time. This keeps the page JSX clean and lets you edit the schema without re-deploying code logic.

## 5. `robots.txt` and `sitemap.xml`

Both are static files in `public/`.

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.quick-accounting.co.uk/sitemap.xml
```

**`public/sitemap.xml`:** lists the 6 indexable URLs (`/error` is excluded — `noindex`). `<lastmod>` set to today's date (2026-05-07). `<priority>` and `<changefreq>` are optional and will be included with sensible defaults (priority 1.0 for home, 0.8 for service-v6, 0.7 for about/contact/faq).

Sitemap is hand-written and committed; no dynamic generation needed for 5 fixed URLs.

## 6. Targeted visible-content edits

Search engines weight visible body copy. These tightly-scoped JSX edits inject geo+service keywords into existing copy without altering layout. None of these are net-new sentences inserted out of nowhere — they're rewrites of existing wording.

| File | Existing | After |
|---|---|---|
| `src/components/footer/CreativeAgencyFooter.jsx` | `<h3>London</h3>` above the Romford address | `<h3>Romford / East London</h3>` |
| `src/components/service/CreativeAgencyService.jsx` | "Every UK business is required to complete accounts on an annual basis." (existing intro line) | Append: " Based in Romford, we support small businesses and sole traders across East London and Greater London with tax, payroll, bookkeeping and annual accounts." |
| `src/components/hero/AboutHero.jsx` | Existing about-page intro paragraph | Add one short clause naming Romford / East London (exact wording determined when reading the file — the rule is: ≤1 sentence added, must read naturally, must include "Romford" or "East London" once) |
| `src/components/faq/Faq1.jsx` | Generic page heading (e.g. "FAQ" or "Frequently Asked Questions") | "Frequently Asked Questions — Accountants in Romford & London" (or equivalent depending on what's actually there) |
| `src/components/hero/CreativeAgencyHero.jsx` | Home hero H1 + subtext | If the existing heading is generic, append a small sub-line referencing "Romford • East London • London" — preserve any existing decorative classes |
| Logo `<img>` alts | Likely empty or `""` | `"Quick Accounting Ltd — Accountants in Romford & London"` |

**Editing rule:** If a proposed change would visually break or feel awkward when actually reading the existing copy, fall back to a smaller change. The principle is "natural keyword inclusion" not "keyword stuffing." If a target file is structured such that the intended edit doesn't fit, skip it and document why in the commit message.

## Out of scope

- Per-service URL pages (user chose single-services-page scope)
- Blog / content marketing
- Submitting the site to Google Search Console / Bing Webmaster Tools (post-deploy, manual)
- Creating / managing a Google Business Profile (manual, not code)
- Schema `aggregateRating` / `review` (requires real reviews; faking these is policy violation)
- Performance / Core Web Vitals work (separate effort)
- Image format conversion (e.g. PNG→WebP) — separate optimisation pass
- Adding `/faq` to the navbar — separate cleanup follow-up

## Approach (commit sequence)

1. `pre-seo-backup` branch from current `main`
2. Add `SEO.jsx` helper + `businessSchema.json` data file (no behavioural change yet)
3. Update `_app.js` / pages to use `<SEO />` (per-page Head rewrites)
4. Update `_document.js` (lang, theme-color, font preconnect)
5. Wire JSON-LD structured data into the home page
6. Add `robots.txt` and `sitemap.xml` to `public/`
7. Visible-content tweaks (single commit covering the small JSX edits)
8. `next build` + dev-server HTTP smoke test (all 6 pages 200, view-source contains the new title/description/canonical/og:title for that URL)

## Risk controls

- Backup branch makes the whole pass reversible.
- Each commit is reversible independently.
- `next build` catches missing imports / typos.
- Manual post-deploy verifications (the user does these after pushing): (1) submit `sitemap.xml` to Google Search Console, (2) run [Rich Results Test](https://search.google.com/test/rich-results) on the live home page, (3) inspect `view-source:` of each page to confirm the canonical / OG / JSON-LD are present.

## Success criteria

- Every kept page has a unique, descriptive title (≤60 chars) and meta description (140–160 chars) with at least one geographic and one service keyword.
- Every kept page emits canonical, Open Graph, and Twitter card tags pointing at `https://www.quick-accounting.co.uk` + correct path.
- Home page emits a valid `AccountingService` JSON-LD block (validates clean against [validator.schema.org](https://validator.schema.org/)).
- `public/robots.txt` and `public/sitemap.xml` exist; sitemap contains 5 URLs (excluding `/error`).
- Footer "London" heading reads coherently with the Romford address.
- `next build` and dev-server smoke test pass. No regression in the 6 page renders.
