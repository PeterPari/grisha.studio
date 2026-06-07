# Build Plan — Add the upcoming "America, Unfinished?!" (WaterFire, Providence RI) announcement to Exhibitions

**For:** Claude Code, executing in the repo root `/Users/peterp/Projects/grisha.studio`.
**Goal:** Add an **upcoming-show announcement** for the Rhode Island exhibition Gregory Parizhsky is part of. Real details are now confirmed (source: WaterFire Arts Center event page). It remains an **ad/announcement**, not a documented show — the show opens July 2, 2026, so there are **no installation photos yet**. It is a distinct banner at the top of `exhibitions.html` linking to a placeholder detail page that can be upgraded once the show is up. Follow steps verbatim.

> **Supersedes the earlier placeholder.** The show was provisionally called "Rhode Island Show" / "June 2026." Confirmed details below replace that: real title, **July 2 – August 30, 2026**, WaterFire Arts Center. The page **slug changes to `america-unfinished`**.

---

## Locked facts & decisions

| Field | Value |
|---|---|
| Slug | `america-unfinished` |
| Title | America, Unfinished?! |
| Type | Upcoming Group Exhibition |
| Dates (display) | July 2 – August 30, 2026 |
| Dates (machine) | start `2026-07-02`, end `2026-08-30` |
| Opening night | July 2, 2026 · 5:00–9:00 PM |
| Venue | WaterFire Arts Center, Main Hall — 475 Valley Street, Providence, RI 02908 |
| Organizer | WaterFire Providence |
| Official event page | https://waterfire.org/events/america-unfinished/ |
| Treatment | **Announcement banner** at top of `exhibitions.html` (no image) + placeholder detail page |
| Installation images | **None** — show is upcoming |
| Past-shows list | Banner sits **above** the historical list; not added as a normal thumbnail row |

Still to confirm later: exactly which of Greg's works will be on view, and the full artist roster.

---

## Step 1 — Create the detail page

Create `exhibitions/america-unfinished.html` with **exactly** this content. It reuses existing `exhibition-detail.css` classes (`exh-header`, `exh-meta-*`, `exh-desc`) and omits the gallery and works-shown sections. No new CSS file needed.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>America, Unfinished?! — Gregory Parizhsky</title>
    <meta name="description" content="America, Unfinished?! — an upcoming group exhibition at the WaterFire Arts Center, Providence, RI, July 2 – August 30, 2026, featuring work by Gregory (Greg) Parizhsky.">
    <meta name="keywords" content="Gregory Parizhsky, Greg Parizhsky, Parizhsky, America Unfinished, WaterFire Arts Center, Providence, Rhode Island, upcoming exhibition, sculpture">
    <meta name="author" content="Gregory Parizhsky">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://grisha.studio/exhibitions/america-unfinished.html">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Gregory Parizhsky">
    <meta property="og:title" content="America, Unfinished?! — Gregory Parizhsky">
    <meta property="og:description" content="Upcoming group exhibition at the WaterFire Arts Center, Providence, RI, July 2 – August 30, 2026.">
    <meta property="og:url" content="https://grisha.studio/exhibitions/america-unfinished.html">
    <meta property="og:image" content="https://grisha.studio/assets/img/site/profile-photo.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="America, Unfinished?! — Gregory Parizhsky">
    <meta name="twitter:description" content="Upcoming group exhibition at the WaterFire Arts Center, Providence, RI, July 2 – August 30, 2026.">
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
      "name": "America, Unfinished?!",
      "url": "https://grisha.studio/exhibitions/america-unfinished.html",
      "startDate": "2026-07-02",
      "endDate": "2026-08-30",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "WaterFire Arts Center",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "475 Valley Street",
          "addressLocality": "Providence",
          "addressRegion": "RI",
          "postalCode": "02908"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "WaterFire Providence",
        "url": "https://waterfire.org/"
      },
      "performer": {
        "@type": "Person",
        "name": "Gregory Parizhsky",
        "alternateName": ["Greg Parizhsky", "Parizhsky"],
        "url": "https://grisha.studio/"
      },
      "subjectOf": {
        "@type": "WebPage",
        "url": "https://waterfire.org/events/america-unfinished/"
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
                <span class="exh-type">Upcoming Group Exhibition</span>
                <span>—</span>
                <span>Summer 2026</span>
            </div>
            <h1 class="exh-h1">America, Unfinished?!</h1>
        </div>
        <div class="exh-header-right reveal" style="--d:60ms">
            <div class="exh-meta-block">
                <div class="exh-meta-item">
                    <span class="exh-meta-key">Dates</span>
                    <span class="exh-meta-val">July 2 – August 30, 2026</span>
                </div>
                <div class="exh-meta-item">
                    <span class="exh-meta-key">Opening</span>
                    <span class="exh-meta-val">July 2, 2026 · 5–9 PM</span>
                </div>
                <div class="exh-meta-item">
                    <span class="exh-meta-key">Venue</span>
                    <span class="exh-meta-val">WaterFire Arts Center, 475 Valley Street, Providence, RI</span>
                </div>
            </div>
        </div>
    </header>

    <section class="exh-desc reveal" style="--d:40ms" aria-label="Announcement">
        <div class="exh-desc-label">Announcement</div>
        <div class="exh-desc-body">
            <p><em>America, Unfinished?!</em> is a large-scale contemporary art exhibition at the WaterFire Arts Center in Providence, Rhode Island, on view July 2 – August 30, 2026. Staged across the Center's 15,000-square-foot Main Hall, it brings together artists from across the country to explore the complexities, contradictions, and possibilities of the American experience — themes of identity, democracy, belonging, memory, and justice — through immersive installations and large-scale work.</p>
            <p>Gregory Parizhsky's sculpture will be featured among the exhibiting artists. Opening night is July 2, 2026, from 5 to 9 PM.</p>
            <p>Full details and the complete artist list are on the <a href="https://waterfire.org/events/america-unfinished/" target="_blank" rel="noopener noreferrer">WaterFire Arts Center event page</a>. Follow along on <a href="https://www.instagram.com/grisha.studio/" target="_blank" rel="noopener noreferrer">Instagram</a> for updates.</p>
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

**2a. Add banner CSS.** Find the closing `</style>` tag in `<head>` and insert this **immediately before** it:

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

Insert this **immediately after** it:

```html

        <a class="exh-announce" href="./exhibitions/america-unfinished.html">
            <span class="exh-announce-tag">Upcoming</span>
            <h2 class="exh-announce-title">America, Unfinished?!</h2>
            <p class="exh-announce-meta">July 2 – Aug 30, 2026 · WaterFire Arts Center · Providence, RI</p>
            <span class="exh-announce-cue">Read announcement →</span>
        </a>
```

Do **not** add a normal `<article class="exhibition-item">` row for this show — it stays a banner, above the documented past shows.

---

## Step 3 — SEO files

In `sitemap.xml`, add a `<url>` block near the existing `exhibitions.html` entry and bump that entry's `lastmod` to `2026-06-06`:

```xml
  <url>
    <loc>https://grisha.studio/exhibitions/america-unfinished.html</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
```

Then check `llms.txt`: if it lists exhibition pages, add an "America, Unfinished?! (upcoming, WaterFire Arts Center, Providence RI)" line in the same format; otherwise leave it.

---

## Step 4 — Build, verify, commit

1. **Build:** `bash scripts/build-site.sh`.
2. **Serve & check** (`python3 -m http.server` from repo root):
   - `/exhibitions.html` — the "Upcoming / America, Unfinished?! / July 2 – Aug 30, 2026" banner appears under the page title, accent-bordered, above the Fire on the Hill and Advanced Ceramics rows; hover animates; clicking opens the detail page.
   - `/exhibitions/america-unfinished.html` — header ("Upcoming Group Exhibition — Summer 2026"), Dates/Opening/Venue meta, and the Announcement text with working links to the WaterFire event page and Instagram. **No** gallery, **no** works-shown, **no** broken images.
   - No console 404s.
3. **Commit:** `git add -A && git commit -m "Add upcoming America, Unfinished?! (WaterFire, Providence) announcement"` then push.

---

## Acceptance criteria

- [ ] `exhibitions/america-unfinished.html` exists: header + Announcement only, zero images, zero gallery/works sections, real dates/venue/links.
- [ ] `exhibitions.html` shows the accent-bordered "Upcoming" banner (real title + dates + venue) above the historical list, linking to the detail page.
- [ ] The show is **not** present as a standard thumbnail row.
- [ ] `sitemap.xml` includes the new URL; site builds clean; commit pushed.

---

## Optional enhancement — use the official event image

The event has an official promo image: `https://waterfire.org/wp-content/uploads/2026/05/America-Unfinished-Website-scaled.jpg` (2560×1440). If the user wants the announcement to carry it (it would make the banner more ad-like), do this **only with the user's go-ahead** (it's WaterFire's image — use for promoting the same event, with credit):

1. Download to `assets/img/exhibitions/america-unfinished/poster-web.jpg` (resize to 1600 px longest edge, `sips -Z 1600 -s formatOptions 82`) and a `poster-thumb.jpg` (500 px).
2. On the detail page, add an `.exh-hero` section after `</header>` (reuse the `.exh-hero` CSS from the Fire on the Hill plan, or add it to `exhibition-detail.css`) showing `poster-web.jpg`, with a caption line *"Image courtesy of WaterFire Providence."*
3. Optionally set the page's `og:image`/`twitter:image` to the local `poster-web.jpg`.

Default plan keeps it **text-only**, per the original "ad/announcement, no pictures" direction.

## Follow-up (once the show is up / has run)

Upgrade to a full documented exhibition using the **Fire on the Hill plan as the template**: add real installation photos in a gallery, a "Works Shown" grid of Greg's pieces in the show, and finalize the About copy with the confirmed artist list. Once the show has taken place, optionally retire the top banner and add a normal thumbnail `<article>` row to the historical list.
