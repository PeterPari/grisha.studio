# Plan — Architecture Pages (full build)

Take the architecture projects from concept to **five finished, live work pages** in the Architecture gallery, using the best available source files, and tick the architecture item off `todo.md`.

Source of truth confirmed by reading the repo: `assets/js/works-data.js` (the `window.WORKS` array) drives every gallery card; `assets/js/gallery-render.js` renders cards from it via `window.WORKS_FILTER`; `work/<slug>.html` is the per-work render layer; `content/works/<slug>.md` is canonical content. Image pipeline + budgets come from `plan.md` and the README.

---

## 1. The five projects

| # | Title | Slug | Year | num | Gallery | Card thumbnail |
|---|-------|------|------|-----|---------|----------------|
| 06 | Shiny Tea Store | `shiny-tea-store` | 2024 | 23 | architecture | isometric drawing |
| 07 | Hidden Layers (Object Unimposing) | `hidden-layers` | 2024 | 22 | architecture | white-model photo |
| 08 | Harlem Pier — The Riverside Shed | `harlem-pier` | 2024 | 21 | architecture | final colour render |
| — | Ribs Modular Chair | `ribs-modular-chair` | 2024 | 20 | architecture | Enscape render |
| — | The Chasm Cafe | `chasm-cafe` | 2024 | 19 | architecture | exterior render |

**All five are dated 2024 (locked).** Since the year is identical across the set, `gallery-render.js` (sort: `year` desc, then `num` desc) orders them purely by `num`. The `num` values above are assigned **descending so the gallery reads in portfolio order** — Shiny Tea → Hidden Layers → Harlem Pier → Chair → Chasm Cafe. (Existing works end at 18, so 19–23 are free.)

---

## 2. Source selection — use the originals, not the portfolio PDF

The "Architecture Material" folder contains clean originals that are strictly better than cropping the baked portfolio PDF (no label clutter, full resolution, vector where it matters). Method depends on the asset type:

- **Vector line drawings** (`.ai` / single-page `.pdf`) → render with `pdftoppm -png -r 600` then trim. The `.ai` files are PDF-compatible and render perfectly (verified on the Shiny Tea isometric). Gives crisp lines at any size.
- **Embedded raster renders/photos** → pull at native resolution with `pdfimages -png`, then downscale. Re-rendering these would lose quality.
- **Standalone photos** (`IMGP*.JPG`) → resize/recompress directly.

### Per-project source manifest (source → output)

All outputs land in `assets/img/works/<slug>/`, originals copied to `media-source/works/<slug>/`.

**06 `shiny-tea-store`** — render each `.ai` at 600 dpi, trim to content, white matte:
| Source (`Portfolio editing/`) | Output |
|---|---|
| `Shiny Tea Isometric Completed Finally.ai` | `isometric-web.jpg` ← **primary + thumbnail** |
| `Shiny Tea Plan Completed Finalle.ai` | `plan-web.jpg` |
| `Shiny Tea Section Completed Finally.ai` | `section-web.jpg` |
| `Shiny Tea Elevation Completed Finally.ai` | `elevation-web.jpg` |
| `Shiny Tea Facade Perspective Finshed.ai` | `facade-perspective-web.jpg` |

**07 `hidden-layers`** — high-res white-model photos (resize/recompress; **check EXIF rotation** on `IMGP*` files) + optional line-drawing sequence:
| Source | Output |
|---|---|
| `Architecture Cardboard Study/IMGP1994.JPG` (front) | `front-view-web.jpg` ← **primary + thumbnail** |
| `Portfolio editing/IMGP2012.JPG` | `view-2-web.jpg` |
| `Portfolio editing/IMGP2018.JPG` | `view-3-web.jpg` |
| `Portfolio editing/IMGP2043.JPG` | `view-4-web.jpg` |
| `Portfolio editing/IMGP2057.JPG` | `view-5-web.jpg` |
| `Portfolio editing/Object Sequence ai.ai` (render) | `sequence-drawing-web.jpg` (optional) |
*(Final selection of the 4–5 sharpest, best-lit frames to be made when previewing; the IMGP set has ~10 candidates.)*

**08 `harlem-pier`** — extract the two big renders, render the vector drawings:
| Source (`Portfolio editing/`) | Method | Output |
|---|---|---|
| `FINAL RENDER 1.pdf` (embedded 5100×3300) | `pdfimages` + downscale | `render-1-web.jpg` ← **primary + thumbnail** |
| `FINISHED RENDER 2.pdf` (embedded 5100×3300) | `pdfimages` + downscale | `render-2-web.jpg` |
| `The Riverside Shed SW isometric open.pdf` | render 600 dpi | `isometric-open-web.jpg` |
| `The Riverside Shed SW isometric halfway.pdf` | render 600 dpi | `isometric-halfway-web.jpg` |
| `The Riverside Shed SW isometric closed.pdf` | render 600 dpi | `isometric-closed-web.jpg` |
| `The Riverside Shed section.pdf` | render 600 dpi | `section-web.jpg` |
| `The Riverside Shed elevation.pdf` | render 600 dpi | `elevation-web.jpg` |
| `The Riverside Shed site plan.pdf` | render 600 dpi | `site-plan-web.jpg` |

**Chair `ribs-modular-chair`** — Enscape render accepted **with its watermark** (locked decision), used as the hero:
| Source (`Chair Project/`) | Method | Output |
|---|---|---|
| `Enscape_2024-07-22-18-22-47 (1).jpeg` (960 KB, watermarked) | resize/recompress | `render-web.jpg` ← **primary + thumbnail** |
| `Ribs Modular Chair (2).pdf` (A2 board) | render 300 dpi | `board-web.jpg` |
| `Chair ISO.jpg` (36 KB, small) | resize | `iso-web.jpg` |
| `Chairs CAD prog ISO Layout1 (1).pdf` | render 600 dpi | `cad-iso-web.jpg` |
*(The "Trial version – non-commercial" watermark stays in the render per your call. If a clean Enscape re-export appears later it can be swapped in without other changes.)*

**Chasm Cafe `chasm-cafe`** — extract the embedded renders from the large-format board:
| Source (`Chasm Cafe/Gregory_Parizhsky_105cmx105cm_1of1.pdf`) | Output |
|---|---|
| embedded img 1570×1620 (exterior) | `exterior-web.jpg` ← **primary + thumbnail** |
| embedded img 2566×1144 (wide exterior) | `exterior-wide-web.jpg` |
| embedded img 1880×732 (interior) | `interior-web.jpg` |
| embedded img 1309×1846 (process/plan) | `process-web.jpg` |
*(`Midterm Crit.pdf` to be checked for any additional usable views.)*

---

## 3. Image processing pipeline (applied to every output)

Per `plan.md` budgets. For each chosen image produce a `-web` and a `-thumb`:
- **`-web.jpg`** — drawings: longest edge **2000 px** (line legibility); photos/renders: **1600 px**; JPEG quality ≈ 0.82; target 100–350 KB.
- **`-thumb.jpg`** — longest edge **500 px**, quality ≈ 0.80, < 80 KB.
- **Drawings**: trim surrounding whitespace, then re-pad with a small uniform margin on a pure-white canvas so the set is visually consistent.
- **Photos**: apply EXIF auto-orient before resizing (the `IMGP*` files may carry rotation).
- Tooling: ImageMagick (`convert`/`magick`) for trim/resize/quality; `pdftoppm` for vector render; `pdfimages -png` for embedded raster. (`sips` is the macOS fallback named in `plan.md`.)
- Copy untouched originals into `media-source/works/<slug>/` (git-ignored, per the existing `.gitignore` strategy).

---

## 4. Build steps — per project (×5)

For each slug:

**4a. Content file** `content/works/<slug>.md` — YAML front matter + body. Body text for **06/07/08** is lifted **verbatim** from `content/portfolio/art-and-architecture-portfolio.md`. **Chair and Chasm Cafe statements are deferred** (your call): build their pages now with a short placeholder line (e.g. *"Statement coming soon."*) so the layout is complete, and drop in the real text later by editing just the content file + the page's `.statement` block. Front matter pattern:
```yaml
---
title: "Shiny Tea Store"
slug: shiny-tea-store
num: 19
year: 2023
category: Architecture
gallery: architecture
materials: "Architectural drawings · Columbia GSAPP"   # repurposed: medium/scale, no physical dims
dimensions: null
status: complete
thumbnail: assets/img/works/shiny-tea-store/isometric-web.jpg
primary_image: assets/img/works/shiny-tea-store/isometric-web.jpg
gallery_images:
  - assets/img/works/shiny-tea-store/isometric-web.jpg
  - assets/img/works/shiny-tea-store/plan-web.jpg
  - assets/img/works/shiny-tea-store/section-web.jpg
  - assets/img/works/shiny-tea-store/elevation-web.jpg
  - assets/img/works/shiny-tea-store/facade-perspective-web.jpg
---
```
Metadata note: architecture works have no materials/dimensions like sculptures. Repurpose `materials` as a medium/scale line and set `dimensions: null` (the work page and card both tolerate null dimensions — confirmed in `gallery-render.js` via `dimPart`).

**4b. Work page** `work/<slug>.html` — copy `work/aqueduct.html` as the template and substitute:
- `<title>`, OG/Twitter/canonical/JSON-LD `name`+`url`+`image`, `<h1 class="detail-h1">` ← title
- `.detail-meta-row`: `num` (e.g. `06`), `—`, `Architecture`, `·`, `year`
- `.detail-material` ← the repurposed materials line (drop the `× dimensions` span)
- back-link (`#main .back-link`) → `../gallery/architecture.html` labelled "Architecture"
- `.detail-body .statement` ← body paragraphs from the content file
- `.detail-gallery .gallery-grid` → one `.g-img` block per `gallery_images` entry (zoom-link + `<img>`), updating `gallery-count` to the count
- `.work-nav` prev/next → chain the five architecture pages in order
- JSON-LD `artMedium`: "Architecture" instead of "Sculpture"

**4c. Register in data** `assets/js/works-data.js` — append five objects:
```js
{ title:"Shiny Tea Store", slug:"shiny-tea-store", num:19, year:2023,
  gallery:"architecture", materials:"Architectural drawings · Columbia GSAPP",
  dimensions:null, status:"complete",
  thumbnail:"assets/img/works/shiny-tea-store/isometric-web.jpg",
  imgClass:"drawing" },   // imgClass only on the drawing-thumbnail work (06)
```
Set `imgClass:"drawing"` only on **06 Shiny Tea Store** (its card thumbnail is a line drawing); leave `null` for 07, 08, Chair, and Chasm (photo/render thumbnails — the Chair now uses the Enscape render, not a drawing).

**4d. Convert the gallery page** `gallery/architecture.html` — replace the hard-coded "Coming soon" section with the data-driven pattern from `wood.html`:
- In `<head>`, add (matching wood.html order): `<script src="../assets/js/works-data.js"></script>`, then `<script>window.WORKS_FILTER = { gallery: 'architecture' };</script>`, then the deferred `gallery-tabs.js` and `gallery-render.js`.
- Replace the `.gallery-section` body with: a `.gallery-section-head` containing `<span class="gallery-count" id="gallery-count"></span>` and the `<div class="gallery-grid" id="gallery-grid"></div>` empty container. Remove the placeholder paragraph.

**4e. Drawing card treatment (CSS)** — the one drawing thumbnail (06) is white-on-white and shouldn't be cropped like a photo. Add to `assets/css/gallery.css`:
```css
.card-img img.drawing { object-fit: contain; background: #fff; }
```
This pairs with the `imgClass:"drawing"` flag (`gallery-render.js` already emits `class="<imgClass>"` on the card `<img>`). Card rims/aspect stay consistent with the rest of the grid. (Inside each work page, the full drawing set still displays normally in the gallery grid.)

**4f. Homepage hero (optional, recommend yes for 1)** `index.html` — the `.hero-feature` cycles six work images. Optionally add the strongest architecture visual (Harlem Pier `render-1-web.jpg`) as one more `<img>` so architecture surfaces on the landing page. Skip line drawings here (they won't read at hero scale).

**4g. SEO files** —
- `sitemap.xml`: add five `<url>` entries for `work/<slug>.html` (priority 0.6, today's `lastmod`); bump the architecture gallery `lastmod`.
- `llms.txt`: add the five works if it enumerates pages (verify format first).

---

## 5. Build, verify, ship

1. **Build** — run `scripts/build-site.sh` to regenerate `site-dist/` (it copies `assets`, `gallery`, `work`, strips `content/`/`media-source/`/`.md`).
2. **Visual check** — serve locally and screenshot: the Architecture gallery (five cards render, count = `05 works`, drawing cards use contain/white, no broken images) and each of the five work pages (lead image, statement, gallery grid, lightbox zoom, prev/next chain). Fix any path/case mismatches.
3. **Asset audit** — confirm every `-web` is 100–350 KB and every `-thumb` < 80 KB; confirm no watermarked Chair render slipped in; confirm `IMGP*` photos are correctly oriented.
4. **Data audit** — `WORKS` entries parse, slugs match filenames, sort order looks right (newest first), null dimensions render cleanly on card + detail.
5. **Commit** — single commit, e.g. `Add five architecture work pages + populate Architecture gallery`. Originals stay out of git via `.gitignore`; only `assets/img/works/<slug>/*-web.jpg` + `-thumb.jpg`, the new HTML/MD/JS, and SEO files are tracked. Push → Netlify auto-deploys (`netlify.toml`).

## 6. Close out `todo.md`

Update the architecture line. Current:
```
- [ ] Architecture projects in: the model the white one, shiny tea modeling, and the chair design proposal
```
→ mark `[x]` (all three named projects — the white model = Hidden Layers, shiny tea = Shiny Tea Store, chair proposal = Ribs Modular Chair — plus Harlem Pier and Chasm Cafe are now live). Add a sub-note listing the five slugs for traceability.

---

## 7. Decisions (locked)

1. **Scope** — all **five** projects. ✓
2. **Years** — all **2024**; order set by `num` (§1). ✓
3. **Statements** — Chair + Chasm Cafe ship with a placeholder line, real text added later (§4a). 06/07/08 use existing portfolio text. ✓
4. **Chair hero** — the **watermarked Enscape render** is accepted and used as hero/thumbnail (§2). ✓
5. **Titles/slugs** — the five in §1 are confirmed (`shiny-tea-store`, `hidden-layers`, `harlem-pier`, `ribs-modular-chair`, `chasm-cafe`). ✓

Plan is fully specified and ready to execute on your go-ahead. **Not executing yet.**

Only later input needed: the two real statement paragraphs (Chair + Chasm Cafe), droppable in after the pages are live.
