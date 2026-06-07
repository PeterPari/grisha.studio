# Build Plan — Add the upcoming "Rhode Island Show" announcement to Exhibitions

**For:** Claude Code, executing in the repo root `/Users/peterp/Projects/grisha.studio`.
**Goal:** Add an **upcoming-show announcement** for a June 2026 exhibition in Rhode Island. This is intentionally **different** from the past exhibitions: it is an ad/announcement, **not** a documented show — so **no installation photos, no works-shown grid, no poster**. It is a distinct banner at the top of `exhibitions.html` linking to a minimal placeholder detail page that can be fleshed out later. Follow steps verbatim.

---

## Locked facts & decisions

| Field | Value |
|---|---|
| Slug | `rhode-island-show` |
| Title | Rhode Island Show (placeholder name) |
| Type | Upcoming Exhibition |
| Date (display) | June 2026 |
| Date (machine) | `2026-06` |
| Venue | To be announced (Rhode Island) |
| Treatment | **Announcement banner** at top of `exhibitions.html` (no image) + minimal placeholder detail page |
| Images | **None** — by design |
| Past-shows list | Banner sits **above** the historical list; the Rhode Island show is **not** added as a normal thumbnail row |

Everything is placeholder; the user will supply real title, exact dates, venue, and works later.

---

## Step 1 — Create the placeholder detail page

Create `exhibitions/rhode-island-show.html` with **exactly** this content. It reuses the existing `exhibition-detail.css` classes (`exh-header`, `exh-meta-*`, `exh-desc`) and deliberately omits the gallery and works-shown sections. No new CSS file is needed for this page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rhode Island Show — Gregory Parizhsky</title>
    <meta name="description" content="Rhode Island Show — an upcoming exhibition featuring work by Gregory (Greg) Parizhsky, June 2026. Details to be announced.">
    <meta name="keywords" content="Gregory Parizhsky, Greg Parizhsky, Parizhsky, Rhode Island Show, upcoming exhibition, sculpture">
    <meta name="author" content="Gregory Parizhsky">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://grisha.studio/exhibitions/rhode-island-show.html">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gregory Parizhsky">
    <meta property="og:title" content="Rhode Island Show — Gregory Parizhsky">
    <meta property="og:description" content="An upcoming exhibition featuring work by Gregory Parizhsky, June 2026. Details to be announced.">
    <meta property="og:url" content="https://grisha.studio/exhibitions/rhode-island-show.html">
    <meta property="og:image" content="https://grisha.studio/assets/img/site/profile-photo.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Rhode Island Show — Gregory Parizhsky">
    <meta name="twitter:description" content="An upcoming exhibition featuring work by Gregory Parizhsky, June 2026. Details to be announced.">
    <meta name="twitter:image" content="https://grisha.studio/assets/img/site/profile-photo.jpg">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/base.css">
    <link rel="stylesheet" href="../assets/css/exhibition-detail.css">
    <link rel="stylesheet" href="../assets/css/site-loader.css">
    <script src="../assets/js/site-loader.js" defer></script>

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/favicon.png">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ExhibitionEvent",
      "name": "Rhode Island Show",
      "url": "https://grisha.studio/exhibitions/rhode-island-show.html",
      "startDate": "2026-06",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "To be announced",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "RI"
        }
      },
      "performer": {
        "@type": "Person",
        "name": "Gregory Parizhsky",
        "alternateName": ["Greg Parizhsky", "Parizhsky"],
        "url": "https://grisha.studio/"
      }
    }
    </script>
</head>
<body>
    <div id="loader" class="site-loader" aria-hidden="true"><p class="loader-mark">G · P</p></div>

    <div id="progress"></div>
    <div class="ambient"></div>

    <a class="skip-link" href="#main">Skip to content</a>

    <nav id="nav" aria-label="Primary">
        <a href="../index.html" class="nav-mark">G · P</a>
        <ul class="nav-list">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../gallery/ceramic.html">Works</a></li>
            <li><a href="../exhibitions.html" aria-current="page">Exhibitions</a></li>
            <li><a href="../index.html#about">About</a></li>
            <li><a href="../index.html#contact">Contact</a></li>
        </ul>
    </nav>

    <div id="main" class="back-wrap">
        <a href="../exhibitions.html" class="back-link">Exhibitions</a>
    </div>

    <header class="exh-header reveal">
        <div class="exh-header-left">
            <div class="exh-meta-row">
                <span class="exh-type">Upcoming Exhibition</span>
                <span>—</span>
                <span>June 2026</span>
            </div>
            <h1 class="exh-h1">Rhode Island Show</h1>
        </div>
        <div class="exh-header-right reveal" style="--d:60ms">
            <div class="exh-meta-block">
                <div class="exh-meta-item">
                    <span class="exh-meta-key">Date</span>
                    <span class="exh-meta-val">June 2026</span>
                </div>
                <div class="exh-meta-item">
                    <span class="exh-meta-key">Venue</span>
                    <span class="exh-meta-val">To be announced · Rhode Island</span>
                </div>
            </div>
        </div>
    </header>

    <section class="exh-desc reveal" style="--d:40ms" aria-label="Announcement">
        <div class="exh-desc-label">Announcement</div>
        <div class="exh-desc-body">
            <p>An exhibition of work by Gregory Parizhsky is coming to Rhode Island in June 2026.</p>
            <p>Full details — exact dates, venue, and the works on view — will be announced here soon. Follow along on <a href="https://www.instagram.com/grisha.studio/" target="_blank" rel="noopener noreferrer">Instagram</a> for updates.</p>
        </div>
    </section>

    <footer>
        <div class="footer-left"><span>Gregory Parizhsky</span><a href="https://www.instagram.com/grisha.studio/" class="footer-ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a></div>
        <span class="footer-meta"><a class="footer-credit" href="https://tech-savvies.com/">Made by Tech-Savvvies</a><span>&copy; 2026</span></span>
    </footer>

    <script>
        const prog = document.getElementById('progress');
        const nav = document.getElementById('nav');
        window.addEventListener('scroll', () => {
            const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            prog.style.transform = `scaleX(${pct})`;
            nav.classList.toggle('scrolled', window.scrollY > 48);
        }, { passive: true });
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
        }, { threshold: 0.07, rootMargin: '0px 0px -52px 0px' });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
</body>
</html>
```

---

## Step 2 — Add the announcement banner to `exhibitions.html`

This page keeps its CSS in an inline `<style>` block. Two edits:

**2a. Add banner CSS.** In `exhibitions.html`, find the closing `</style>` tag in `<head>` and insert the following **immediately before** it:

```css
        /* Upcoming-show announcement banner */
        .exh-announce {
            display: block;
            position: relative;
            z-index: 1;
            width: min(100%, 1180px);
            margin-top: 56px;
            padding: 40px 44px;
            border: 1px solid var(--accent);
            text-decoration: none;
            color: inherit;
        }
        .exh-announce-tag {
            display: inline-block;
            font-family: var(--mono);
            font-size: 10px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--accent);
            border: 1px solid var(--accent);
            border-radius: 999px;
            padding: 5px 12px;
            margin-bottom: 22px;
        }
        .exh-announce-title {
            font-family: var(--serif);
            font-size: clamp(34px, 5vw, 60px);
            font-weight: 400;
            letter-spacing: -0.03em;
            line-height: 0.96;
            margin: 0;
            color: var(--text);
            transition: color 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exh-announce-meta {
            margin-top: 14px;
            font-family: var(--mono);
            font-size: 12px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--muted);
        }
        .exh-announce-cue {
            display: inline-block;
            margin-top: 26px;
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: var(--accent);
            transition: letter-spacing 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .exh-announce:hover .exh-announce-title { color: var(--accent); }
        .exh-announce:hover .exh-announce-cue { letter-spacing: 0.28em; }
        .exh-announce:focus-visible { outline: none; box-shadow: inset 0 0 0 1px var(--accent); }
        @media (max-width: 600px) { .exh-announce { padding: 32px 24px; } }
```

**2b. Add the banner markup.** Find this line:

```html
        <h1 class="page-title">Exhibitions</h1>
```

Insert the following **immediately after** it (so the banner appears between the page title and the historical exhibition list):

```html

        <a class="exh-announce" href="./exhibitions/rhode-island-show.html">
            <span class="exh-announce-tag">Upcoming</span>
            <h2 class="exh-announce-title">Rhode Island Show</h2>
            <p class="exh-announce-meta">June 2026 · Rhode Island · Details to come</p>
            <span class="exh-announce-cue">Read announcement →</span>
        </a>
```

Do **not** add a normal `<article class="exhibition-item">` row for this show — it stays a banner, separate from the documented past shows below.

---

## Step 3 — SEO files

In `sitemap.xml`, add a `<url>` block near the existing `exhibitions.html` entry, and bump that entry's `lastmod` to `2026-06-06`:

```xml
  <url>
    <loc>https://grisha.studio/exhibitions/rhode-island-show.html</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
```

(`changefreq` is `weekly` here since this is a live announcement that will change as details firm up.) Then check `llms.txt`: if it lists exhibition pages, add a "Rhode Island Show (upcoming)" line in the same format; otherwise leave it.

---

## Step 4 — Build, verify, commit

1. **Build:** `bash scripts/build-site.sh` (copies `exhibitions/` and `exhibitions.html` into `site-dist/`).
2. **Serve & check** (`python3 -m http.server` from repo root):
   - `/exhibitions.html` — the "Upcoming / Rhode Island Show / June 2026" banner appears directly under the page title, with an accent border, above the Fire on the Hill and Advanced Ceramics rows. Hover changes the title to the accent color and widens the cue spacing. Clicking opens the detail page.
   - `/exhibitions/rhode-island-show.html` — header with "Upcoming Exhibition — June 2026", title, Date/Venue meta (venue = "To be announced · Rhode Island"), and the Announcement section. **No** gallery, **no** works-shown, **no** broken images. Back link returns to Exhibitions.
   - No console 404s.
3. **Commit:** `git add -A && git commit -m "Add upcoming Rhode Island Show announcement to Exhibitions"` then push (Netlify auto-deploys).

---

## Acceptance criteria

- [ ] `exhibitions/rhode-island-show.html` exists: header + Announcement only, zero images, zero gallery/works sections.
- [ ] `exhibitions.html` shows the accent-bordered "Upcoming" banner above the historical list, linking to the detail page.
- [ ] The show is **not** present as a standard thumbnail row.
- [ ] `sitemap.xml` includes the new URL; site builds clean; commit pushed.

---

## Follow-up (when real details arrive)

When the show's title, dates, venue, and works are confirmed, this can be upgraded to a full documented exhibition using the **Fire on the Hill plan as the template**:
- Replace placeholder copy in the detail page (title, dates, venue, About text).
- Add an installation/poster gallery and a "Works Shown" grid (copy those sections from `exhibitions/fire-on-the-hill.html`).
- Once the show has taken place, optionally retire the top banner and add a normal thumbnail `<article>` row to the historical list instead.
