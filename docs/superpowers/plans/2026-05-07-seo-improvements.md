# Quick Accounting — Local SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Quick Accounting Ltd from default-template SEO to a proper local-SEO baseline targeting Romford + East London + London for small business + sole trader accounting services.

**Architecture:** Centralise per-page SEO into one small `<SEO />` helper to avoid 6× boilerplate, then add structured data (`AccountingService` JSON-LD on the home page), static `robots.txt` + `sitemap.xml`, and a small batch of natural copy edits to inject geo+service keywords into existing visible text.

**Tech Stack:** Next.js 15 (Pages Router), React 19, plain CSS. No test runner — verification is `next build` + a node-fetch HTTP smoke test that asserts the new title/canonical/JSON-LD appear in each page's HTML.

**Spec:** [docs/superpowers/specs/2026-05-07-seo-improvements-design.md](../specs/2026-05-07-seo-improvements-design.md)

---

## Pre-flight context

- **Working directory:** `/Users/karadinfotech/Desktop/quick-accounting`
- **Branch:** start on `main`. Backup branch is the safety net.
- **Domain:** `https://www.quick-accounting.co.uk` (no trailing slash on the constant; pages append their path).
- **Pages affected:** `index.jsx`, `about.jsx`, `service-v6.jsx`, `contact.jsx`, `faq.jsx`, `error.jsx`.
- **Component edits:** `CreativeAgencyHero.jsx`, `AboutHero.jsx`, `Faq1.jsx`, `CreativeAgencyService.jsx`, `CreativeAgencyFooter.jsx`.
- **No test runner.** Verification per task is `npm run build` and, where the change is observable in HTML, a node-fetch script that asserts expected strings.

---

## Task 1: Create backup branch

**Files:** none

- [ ] **Step 1: Verify clean tree on main**

Run: `git status`
Expected: `nothing to commit, working tree clean` and `On branch main`. If not, surface to user and stop.

- [ ] **Step 2: Create backup branch**

Run:
```bash
git branch pre-seo-backup
git branch --list pre-seo-backup
```
Expected: `pre-seo-backup` listed.

- [ ] **Step 3: Confirm still on main**

Run: `git rev-parse --abbrev-ref HEAD`
Expected: `main`

---

## Task 2: Add the `<SEO />` helper and business-schema data file

These are additive — no behavioural change yet. We commit them so subsequent commits can incrementally migrate each page.

**Files:**
- Create: `src/components/common/SEO.jsx`
- Create: `src/data/businessSchema.json`
- Modify: `src/components/index.js` (re-export the new helper)

- [ ] **Step 1: Create the SEO helper**

Create `src/components/common/SEO.jsx`:

```jsx
import Head from "next/head";

const SITE_URL = "https://www.quick-accounting.co.uk";
const SITE_NAME = "Quick Accounting Ltd";
const DEFAULT_OG_IMAGE = "/assets/imgs/logo/site-logo-white.png";

export default function SEO({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/x-icon" href="/assets/imgs/logo/favicon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  );
}
```

- [ ] **Step 2: Create the business-schema JSON**

Create `src/data/businessSchema.json`:

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

- [ ] **Step 3: Add `SEO` to the components barrel**

Open `src/components/index.js`. After the existing `// Common` block, add this single line:

```javascript
export { default as SEO } from "./common/SEO";
```

The result of the Common section should look like:

```javascript
// Common
export { default as CursorAnimation } from "./common/CursorAnimation";
export { default as Switcher } from "./common/Switcher";
export { default as ScrollTop } from "./common/ScrollTop";
export { default as Preloader } from "./preloader/Preloader";
export { default as ScrollSmootherComponents } from "./common/ScrollSmootherComponents";
export { default as SEO } from "./common/SEO";
```

- [ ] **Step 4: Build to verify nothing broke**

Run: `npm run build`
Expected: succeeds. (No pages use `SEO` yet — this just confirms the helper compiles.)

- [ ] **Step 5: Commit**

```bash
git add src/components/common/SEO.jsx src/data/businessSchema.json src/components/index.js
git commit -m "$(cat <<'EOF'
feat: add SEO helper component and business schema data

Adds <SEO /> wrapper that renders per-page title, description, canonical,
robots, Open Graph and Twitter card tags from a small props interface.
Also adds the AccountingService JSON-LD payload as static JSON for use
on the home page in a later commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update `_document.js` (lang, theme-color, font preconnect)

**Files:**
- Modify: `src/pages/_document.js`

- [ ] **Step 1: Replace `_document.js` contents**

Open `src/pages/_document.js`. Current contents:

```jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Replace with:

```jsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/_document.js
git commit -m "$(cat <<'EOF'
chore: set lang=en-GB, add theme-color and font preconnect

Sets the document language to UK English so search engines and
assistive tech apply en-GB conventions, adds a theme-color hint, and
preconnects to fonts.googleapis.com / fonts.gstatic.com for faster LCP.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Migrate all 6 pages to the `<SEO />` helper

Replace each page's existing `<Head>` block with a single `<SEO />` call. We do all 6 pages in one commit because the change pattern is identical.

**Files:**
- Modify: `src/pages/index.jsx`
- Modify: `src/pages/about.jsx`
- Modify: `src/pages/service-v6.jsx`
- Modify: `src/pages/contact.jsx`
- Modify: `src/pages/faq.jsx`
- Modify: `src/pages/error.jsx`

For each page, the change is in two places:
1. The `import { … } from "@/components"` block — add `SEO` to the import list.
2. Inside the JSX, replace the `<Head>...</Head>` block (and its `import Head from "next/head";` line if not used elsewhere) with a single `<SEO ... />` call.

- [ ] **Step 1: `src/pages/index.jsx`**

In `src/pages/index.jsx`:

(a) Remove the line `import Head from "next/head";` near the top of the file.

(b) Add `SEO` to the existing `import { … } from "@/components"` list — alphabetical position with the other common helpers is fine.

(c) In the JSX, find:

```jsx
<Head>
  <title>Quick Accounting Ltd</title>
  <meta name="description" content="Quick Accounting" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link
    rel="icon"
    type="image/x-icon"
    href="assets/imgs/logo/favicon.png"
  />
</Head>
```

Replace with:

```jsx
<SEO
  title="Quick Accounting Ltd — Accountants in Romford & London"
  description="Accountants in Romford & East London serving small businesses, limited companies and sole traders. Tax, payroll, bookkeeping & accounts. Call 020 4542 0907."
  path="/"
/>
```

- [ ] **Step 2: `src/pages/about.jsx`**

Same procedure. Replace the existing `<Head>` block with:

```jsx
<SEO
  title="About Us — Quick Accounting Ltd, Romford Accountants"
  description="Quick Accounting Ltd has supported small businesses and sole traders across Romford, East London and Greater London with friendly, accurate accounting since 2017."
  path="/about"
/>
```

Add `SEO` to the `@/components` import; remove the `import Head from "next/head";` line if unused.

- [ ] **Step 3: `src/pages/service-v6.jsx`**

Replace `<Head>` block with:

```jsx
<SEO
  title="Accounting Services in London — Tax, Payroll, Bookkeeping"
  description="Tax planning, bookkeeping, payroll, business consulting and annual accounts for small businesses and the self-employed across Romford, East London and London."
  path="/service-v6"
/>
```

Add `SEO` to imports; remove the `Head` import if unused.

- [ ] **Step 4: `src/pages/contact.jsx`**

Replace `<Head>` block with:

```jsx
<SEO
  title="Contact Quick Accounting Ltd — Romford & London Accountants"
  description="Speak to a Romford-based accountant. Call 020 4542 0907 or email info@quick-accounting.co.uk. We support small businesses and sole traders across London."
  path="/contact"
/>
```

Add `SEO` to imports; remove the `Head` import if unused.

- [ ] **Step 5: `src/pages/faq.jsx`**

Replace `<Head>` block with:

```jsx
<SEO
  title="Accounting FAQs — Quick Accounting Ltd, Romford & London"
  description="Common questions about tax, bookkeeping, payroll and limited company accounts answered by Quick Accounting Ltd, accountants in Romford and East London."
  path="/faq"
/>
```

Add `SEO` to imports; remove the `Head` import if unused.

- [ ] **Step 6: `src/pages/error.jsx`**

Replace `<Head>` block with:

```jsx
<SEO
  title="Page Not Found — Quick Accounting Ltd"
  description="The page you're looking for can't be found. Return to Quick Accounting Ltd, accountants in Romford & London, for tax, payroll and bookkeeping services."
  path="/error"
  noindex
/>
```

Add `SEO` to imports; remove the `Head` import if unused.

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: succeeds. The build summary should still list 8 routes including all 6 pages.

- [ ] **Step 8: HTTP smoke test for the new metadata**

Start dev server in the background:
```bash
npm run dev > /tmp/qa-seo-dev.log 2>&1 &
```

Wait until the log contains `Ready in`:
```bash
until grep -q "Ready in" /tmp/qa-seo-dev.log 2>/dev/null; do sleep 0.5; done
```

Determine the port (Next picks 3000, 3001, 3002, … if previous ports are taken):
```bash
PORT=$(grep -oE "localhost:[0-9]+" /tmp/qa-seo-dev.log | head -1 | cut -d: -f2)
echo "PORT=$PORT"
```

Run a node script that fetches each page and asserts the new title and canonical:

```bash
node -e '
const PORT = process.env.PORT;
const cases = [
  { path: "/",            title: "Accountants in Romford & London", canonical: "https://www.quick-accounting.co.uk/" },
  { path: "/about",       title: "About Us — Quick Accounting Ltd", canonical: "https://www.quick-accounting.co.uk/about" },
  { path: "/service-v6",  title: "Accounting Services in London",  canonical: "https://www.quick-accounting.co.uk/service-v6" },
  { path: "/contact",     title: "Contact Quick Accounting Ltd",   canonical: "https://www.quick-accounting.co.uk/contact" },
  { path: "/faq",         title: "Accounting FAQs",                canonical: "https://www.quick-accounting.co.uk/faq" },
  { path: "/error",       title: "Page Not Found",                 canonical: "https://www.quick-accounting.co.uk/error" },
];
(async () => {
  let fail = 0;
  for (const c of cases) {
    const r = await fetch(`http://localhost:${PORT}${c.path}`);
    const html = await r.text();
    const titleOk = html.includes(c.title);
    const canonOk = html.includes(`href="${c.canonical}"`);
    const ogOk = html.includes(`property="og:url" content="${c.canonical}"`);
    const ok = titleOk && canonOk && ogOk;
    if (!ok) fail++;
    console.log(c.path.padEnd(14),
      "title=" + (titleOk ? "✓" : "✗"),
      "canonical=" + (canonOk ? "✓" : "✗"),
      "og:url=" + (ogOk ? "✓" : "✗"));
  }
  process.exit(fail);
})();
'
```

Expected: every row prints `✓ ✓ ✓` and the script exits 0.

- [ ] **Step 9: Stop dev server**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; true
```

- [ ] **Step 10: Commit**

```bash
git add src/pages
git commit -m "$(cat <<'EOF'
feat: rewrite per-page <Head> using SEO helper

Replaces template-default titles ("Service V6", "Faq") and one-word
descriptions on all 6 pages with keyword-rich, location-aware metadata.
Adds canonical URL, robots, Open Graph and Twitter card tags via the
shared SEO component. Error page is noindex.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Inject `AccountingService` JSON-LD on the home page

**Files:**
- Modify: `src/pages/index.jsx`

The structured data lives only on `/`. We render a `<script type="application/ld+json">` adjacent to the `<SEO />` component. Because `<SEO />` renders its own `<Head>` internally, the script needs to be wrapped in `<Head>` here so Next.js places it in the document head.

- [ ] **Step 1: Add JSON-LD to home**

In `src/pages/index.jsx`:

(a) Add this import at the top with the other imports:

```javascript
import Head from "next/head";
import businessSchema from "@/data/businessSchema.json";
```

(b) In the JSX, immediately AFTER the `<SEO ... />` element (still inside the same outer `<div>`), add:

```jsx
<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
  />
</Head>
```

The result around that area should look like:

```jsx
<div>
  <SEO
    title="Quick Accounting Ltd — Accountants in Romford & London"
    description="Accountants in Romford & East London serving small businesses, limited companies and sole traders. Tax, payroll, bookkeeping & accounts. Call 020 4542 0907."
    path="/"
  />
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  </Head>
  <main>
    ...
  </main>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Smoke test the JSON-LD**

Start dev server in the background and wait until ready:

```bash
npm run dev > /tmp/qa-seo-dev.log 2>&1 &
until grep -q "Ready in" /tmp/qa-seo-dev.log 2>/dev/null; do sleep 0.5; done
PORT=$(grep -oE "localhost:[0-9]+" /tmp/qa-seo-dev.log | head -1 | cut -d: -f2)
```

Verify the home page contains a parseable JSON-LD block with the expected `@type`:

```bash
node -e '
const PORT = process.env.PORT;
(async () => {
  const html = await (await fetch(`http://localhost:${PORT}/`)).text();
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) { console.error("No JSON-LD <script> found"); process.exit(1); }
  let data;
  try { data = JSON.parse(m[1]); } catch (e) { console.error("JSON parse failed:", e.message); process.exit(1); }
  const ok = data["@type"] === "AccountingService"
    && data.name === "Quick Accounting Ltd"
    && data.address && data.address.postalCode === "RM1 3LD"
    && Array.isArray(data.areaServed) && data.areaServed.some(a => a.name === "London")
    && data.openingHoursSpecification && data.openingHoursSpecification.length === 2;
  console.log(ok ? "OK: AccountingService JSON-LD valid on /" : "FAIL: schema content incorrect");
  process.exit(ok ? 0 : 1);
})();
'
```

Expected: `OK: AccountingService JSON-LD valid on /` and exit 0.

- [ ] **Step 4: Stop dev server**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; true
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.jsx
git commit -m "$(cat <<'EOF'
feat: add AccountingService JSON-LD on home page

Embeds the structured-data payload from src/data/businessSchema.json.
Search engines and Google's Knowledge Panel use this to surface name,
address, phone, opening hours, area served and offered services.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Add `robots.txt` and `sitemap.xml`

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.quick-accounting.co.uk/sitemap.xml
```

- [ ] **Step 2: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.quick-accounting.co.uk/</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.quick-accounting.co.uk/about</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.quick-accounting.co.uk/service-v6</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.quick-accounting.co.uk/contact</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.quick-accounting.co.uk/faq</loc>
    <lastmod>2026-05-07</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

(`/error` is intentionally omitted because it is `noindex`.)

- [ ] **Step 3: Smoke test**

Start dev server and check the two files are served:

```bash
npm run dev > /tmp/qa-seo-dev.log 2>&1 &
until grep -q "Ready in" /tmp/qa-seo-dev.log 2>/dev/null; do sleep 0.5; done
PORT=$(grep -oE "localhost:[0-9]+" /tmp/qa-seo-dev.log | head -1 | cut -d: -f2)

node -e '
const PORT = process.env.PORT;
(async () => {
  const robots = await (await fetch(`http://localhost:${PORT}/robots.txt`)).text();
  const sitemap = await (await fetch(`http://localhost:${PORT}/sitemap.xml`)).text();
  const robotsOk = robots.includes("Sitemap: https://www.quick-accounting.co.uk/sitemap.xml")
                && robots.includes("Disallow: /api/");
  const sitemapOk = sitemap.includes("<loc>https://www.quick-accounting.co.uk/</loc>")
                 && sitemap.includes("<loc>https://www.quick-accounting.co.uk/service-v6</loc>")
                 && !sitemap.includes("/error");
  console.log("robots.txt", robotsOk ? "OK" : "FAIL");
  console.log("sitemap.xml", sitemapOk ? "OK" : "FAIL");
  process.exit(robotsOk && sitemapOk ? 0 : 1);
})();
'

pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; true
```

Expected: both `OK`, exit 0.

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt public/sitemap.xml
git commit -m "$(cat <<'EOF'
feat: add robots.txt and sitemap.xml

Static sitemap of the 5 indexable URLs (home, about, service-v6,
contact, faq). robots.txt allows everything except /api/ and points
crawlers at the sitemap.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Targeted visible-content edits

These are small, natural rewrites to existing copy that inject geo+service keywords. Each edit stays inside the existing JSX node — no layout changes.

**Files:**
- Modify: `src/components/footer/CreativeAgencyFooter.jsx`
- Modify: `src/components/service/CreativeAgencyService.jsx`
- Modify: `src/components/hero/CreativeAgencyHero.jsx`
- Modify: `src/components/hero/AboutHero.jsx`
- Modify: `src/components/faq/Faq1.jsx`

- [ ] **Step 1: Footer location heading**

In `src/components/footer/CreativeAgencyFooter.jsx` find:

```jsx
<h3>London</h3>
```

Replace with:

```jsx
<h3>Romford / East London</h3>
```

- [ ] **Step 2: Service section intro**

In `src/components/service/CreativeAgencyService.jsx` find the line containing:

```
Every UK business is required to complete accounts on an annual basis.
```

Replace the surrounding paragraph text so it becomes:

```
Every UK business is required to complete accounts on an annual basis. Based in Romford, we support small businesses and sole traders across East London and Greater London with tax planning, bookkeeping, payroll and annual accounts.
```

(Preserve any wrapping `<p>` / `<span>` tags exactly as they are; only the text content changes.)

- [ ] **Step 3: Home hero supporting paragraph**

In `src/components/hero/CreativeAgencyHero.jsx` find:

```jsx
<p className="animate_content">
  {" "}
  Based in London, we offer friendly and personalized services
  tailored to your needs, including Business Accounts,
  Corporate/Personal Tax, Bookkeeping, Management Accounts,
  Construction Industry Scheem, Payroll, and VAT.
</p>
```

Replace with:

```jsx
<p className="animate_content">
  {" "}
  Based in Romford and serving East London and Greater London, we
  offer friendly, personalised accounting for small businesses and
  sole traders — Business Accounts, Corporate &amp; Personal Tax,
  Bookkeeping, Management Accounts, Construction Industry Scheme,
  Payroll, and VAT.
</p>
```

(Also fixes the typo "Scheem" → "Scheme".)

- [ ] **Step 4: About hero supporting paragraph**

In `src/components/hero/AboutHero.jsx` find:

```jsx
<p>
  {
    "We work closely with our clients and act for a broad range of business and personal clients."
  }
</p>
```

Replace with:

```jsx
<p>
  {
    "Based in Romford, we work closely with small businesses and sole traders across East London and Greater London, supporting a broad range of business and personal clients."
  }
</p>
```

- [ ] **Step 5: FAQ heading subtext**

In `src/components/faq/Faq1.jsx` find:

```jsx
<h2 className="sec-title-2 animation__char_come">FAQ</h2>
<p className="">
  Frequently asked question (FAQ) <br /> by prospective clients
</p>
```

Replace with:

```jsx
<h2 className="sec-title-2 animation__char_come">FAQ</h2>
<p className="">
  Frequently asked questions about accounting, tax and bookkeeping <br /> for businesses in Romford and London
</p>
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 7: Smoke test that the new copy is in the rendered HTML**

```bash
npm run dev > /tmp/qa-seo-dev.log 2>&1 &
until grep -q "Ready in" /tmp/qa-seo-dev.log 2>/dev/null; do sleep 0.5; done
PORT=$(grep -oE "localhost:[0-9]+" /tmp/qa-seo-dev.log | head -1 | cut -d: -f2)

node -e '
const PORT = process.env.PORT;
const checks = [
  { path: "/",       fragment: "Based in Romford and serving East London" },
  { path: "/",       fragment: "Romford / East London" },
  { path: "/",       fragment: "Construction Industry Scheme" },
  { path: "/about",  fragment: "Based in Romford, we work closely with small businesses" },
  { path: "/faq",    fragment: "Frequently asked questions about accounting, tax and bookkeeping" },
];
(async () => {
  let fail = 0;
  for (const c of checks) {
    const html = await (await fetch(`http://localhost:${PORT}${c.path}`)).text();
    const ok = html.includes(c.fragment);
    if (!ok) fail++;
    console.log(c.path.padEnd(10), ok ? "✓" : "✗", c.fragment.slice(0, 50));
  }
  process.exit(fail);
})();
'

pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; true
```

Expected: every row prints `✓`, script exits 0.

- [ ] **Step 8: Commit**

```bash
git add src/components
git commit -m "$(cat <<'EOF'
feat: tighten on-page copy for local SEO

Naturally injects Romford / East London / London and the core service
keywords into the home hero, services intro, about hero, FAQ heading,
and footer location heading. No layout changes; corrects a "Scheem"
typo on the home hero.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Final verification

**Files:** none

- [ ] **Step 1: Clean build**

```bash
rm -rf .next
npm run build
```
Expected: completes with no errors. All 8 routes (`/`, `/_app`, `/404`, `/about`, `/api/hello`, `/contact`, `/error`, `/faq`, `/service-v6`) appear in the build output.

- [ ] **Step 2: End-to-end SEO smoke test**

Start dev server:

```bash
npm run dev > /tmp/qa-seo-dev.log 2>&1 &
until grep -q "Ready in" /tmp/qa-seo-dev.log 2>/dev/null; do sleep 0.5; done
PORT=$(grep -oE "localhost:[0-9]+" /tmp/qa-seo-dev.log | head -1 | cut -d: -f2)
```

Run the consolidated check:

```bash
node -e '
const PORT = process.env.PORT;
const pages = [
  { path: "/",            mustHave: ["Accountants in Romford & London", "https://www.quick-accounting.co.uk/", "AccountingService", "Romford / East London"] },
  { path: "/about",       mustHave: ["About Us — Quick Accounting Ltd", "https://www.quick-accounting.co.uk/about", "Based in Romford, we work closely"] },
  { path: "/service-v6",  mustHave: ["Accounting Services in London", "https://www.quick-accounting.co.uk/service-v6"] },
  { path: "/contact",     mustHave: ["Contact Quick Accounting Ltd", "https://www.quick-accounting.co.uk/contact"] },
  { path: "/faq",         mustHave: ["Accounting FAQs", "https://www.quick-accounting.co.uk/faq", "Frequently asked questions about accounting"] },
  { path: "/error",       mustHave: ["Page Not Found", "noindex, nofollow"] },
];
(async () => {
  let fail = 0;
  for (const p of pages) {
    const html = await (await fetch(`http://localhost:${PORT}${p.path}`)).text();
    const missing = p.mustHave.filter(s => !html.includes(s));
    if (missing.length) { fail++; console.log("✗", p.path, "missing:", missing); }
    else console.log("✓", p.path);
  }
  // Also check robots.txt and sitemap.xml
  const robots = await (await fetch(`http://localhost:${PORT}/robots.txt`)).text();
  if (!robots.includes("Sitemap:")) { fail++; console.log("✗ /robots.txt"); } else console.log("✓ /robots.txt");
  const sitemap = await (await fetch(`http://localhost:${PORT}/sitemap.xml`)).text();
  if (!sitemap.includes("<loc>https://www.quick-accounting.co.uk/</loc>")) { fail++; console.log("✗ /sitemap.xml"); } else console.log("✓ /sitemap.xml");
  process.exit(fail);
})();
'
```

Expected: every line prints `✓`, script exits 0.

- [ ] **Step 3: Stop dev server**

```bash
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; true
```

- [ ] **Step 4: Sanity-check the JSON-LD against schema.org (manual, post-deploy)**

This step happens after the user deploys. It is not part of the local plan execution but is listed here so the user can run it when ready:

1. Open https://search.google.com/test/rich-results
2. Enter the deployed URL `https://www.quick-accounting.co.uk/`
3. Confirm the parser detects `LocalBusiness` / `AccountingService` and reports zero errors.

(If errors appear, they will name the specific JSON-LD field; update `src/data/businessSchema.json` and re-deploy.)

---

## Done

After Task 8 passes, the cleanup is complete. Cleanup summary will be:

- 7 commits on `main` (one per task except Task 1 which is a branch creation, and Task 8 which is verification only — so 6 content commits).
- `pre-seo-backup` safety branch holds pre-change state.
- Each kept page has unique title, description, canonical, OG, Twitter, and robots metadata.
- Home page emits valid `AccountingService` JSON-LD.
- `robots.txt` + `sitemap.xml` present at site root.
- Footer / hero / about / service / FAQ copy contains natural Romford+London+services keyword coverage.
- `next build` and full HTTP smoke test pass.

**Manual follow-ups for the user (post-deploy, outside this plan):**
- Submit `https://www.quick-accounting.co.uk/sitemap.xml` to Google Search Console.
- Run the Rich Results Test on the live home page.
- Set up / claim the Google Business Profile listing for the Romford address (huge local-SEO lever).
- Consider replacing the placeholder template imagery with branded photos that include descriptive `alt` text.
