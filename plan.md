# Plan — Site Revisions

Phased plan. Edits in [index.html](index.html) unless noted. Work pages in [work/](work/), assets in [assets/](assets/).

---

## Phase 1 — Identity & Typography

Goal: drop nickname. Plain black single-line name. Keep green accents elsewhere.

- [index.html:6](index.html#L6) `<title>`: `Gregory Parizhsky — Personal Artist Portfolio`.
- [index.html:660-661](index.html#L660-L661) hero name block: collapse two `<span>`s into one single-line `<h1 class="hero-name">Gregory Parizhsky</h1>`.
- [index.html:217-240](index.html#L217-L240) `.hero-name` CSS:
  - `color: var(--text)` (was `--accent`).
  - Swap `font-family` from `--serif` italic feel to `--sans`, weight 400/500.
  - Reduce `font-size` clamp so single line fits viewport (e.g. `clamp(56px, 9vw, 128px)`).
  - `white-space: nowrap`, `letter-spacing: -0.02em`.
  - Delete `.hero-studio` rule + markup (no longer used).
- Footer [index.html:784](index.html#L784): `Gregory Parizhsky` (drop quotes/Grisha).
- Loader mark [index.html:635](index.html#L635) and nav-mark [index.html:645](index.html#L645): keep `G · P` (still correct initials).
- Green accents stay: nav-mark, hero-year tint, section accents, card hover bar, contact link — all unchanged.

Acceptance: name renders one line, black, sans-serif. No "Grisha" anywhere in DOM/text.

---

## Phase 2 — Photo Processing (full color always)

Goal: kill grayscale + hover color-shift. Images always full color.

- [index.html:396-407](index.html#L396-L407) `.card-img img`: remove `filter: saturate(0.1) sepia(0.28) brightness(1.08)`. Keep `transition: transform` only.
- [index.html:404-407](index.html#L404-L407) `.card:hover .card-img img`: drop `filter` change. Keep `transform: scale(1.055)` (subtle zoom is fine; ask user if they want it removed too).
- [index.html:431-434](index.html#L431-L434) `.card.static:hover` filter override: delete (no longer needed).
- [index.html:492-499](index.html#L492-L499) `.about-portrait img`: remove `filter`.
- Repeat sweep across [work/*.html](work/) — same `filter: saturate/sepia` rules likely present. Grep + remove.
- Check [assets/work-lightbox.css](assets/work-lightbox.css) for filters.

Acceptance: every `<img>` renders at native color; no `filter` referencing saturate/sepia/grayscale remains.

---

## Phase 3 — Header Restructure

Goal: replace giant "2026" w/ featured sculpture photo. Drop tagline.

- [index.html:656](index.html#L656) `.hero-year` div: replace with `<img class="hero-feature" src="./assets/<chosen>/front-view-thumb.*" alt="">`.
  - Ask user which sculpture to feature; default suggestion: `a-totemic-exploration-of-jazz/front-view-thumb.jpg`.
- [index.html:190-205](index.html#L190-L205) `.hero-year` CSS: replace w/ `.hero-feature` rule:
  - Positioned right side, vertically centered, `width: clamp(280px, 38vw, 560px)`, `aspect-ratio` natural, `object-fit: cover`, subtle drop-shadow optional, no opacity dim.
  - `z-index: 0`, sits behind `.hero-content` (already z-1).
- [index.html:659](index.html#L659) `.hero-eyebrow` ("Sculptor, Hamilton College '26"): delete element + CSS rule [index.html:207-216](index.html#L207-L216).
- [index.html:662](index.html#L662) `.hero-tagline` "Ceramic · Wood · Mixed Media": keep — repurposed in Phase 4 as clickable nav.
- Mobile: hide or restack `.hero-feature` under name at <960px.

Acceptance: hero shows real artwork instead of "2026" watermark; no Hamilton tagline.

---

## Phase 4 — Clickable Material Categories

Goal: Ceramic / Wood / Mixed Media become discoverable links to gallery pages.

- New gallery pages: `gallery/ceramic.html`, `gallery/wood.html`, `gallery/mixed-media.html`.
  - Template per page: nav + heading ("Ceramic Work" etc.) + grid reusing `.card` markup from current `#work` section. Pull ceramic cards into ceramic.html, wood cards into wood.html. Mixed Media starts empty w/ "Coming soon" placeholder unless user provides pieces.
- [index.html:662](index.html#L662) `.hero-tagline`: convert plain text into `<nav class="hero-categories">` with three `<a>` links → `gallery/*.html`.
- Affordance cues (so users *know* they're clickable):
  - Underline (`text-decoration: underline; text-underline-offset: 6px`) in accent green.
  - Trailing arrow glyph `→` on each.
  - `cursor: pointer`, hover state: color shift to `--accent` + arrow translateX.
  - Small mono label above: `BROWSE BY MATERIAL ↓`.
- Optionally `target="_blank"` if user wants "separate windows" literally; default to same-tab navigation and confirm.

Acceptance: three labels are visibly link-styled, hover-reactive, route to gallery pages.

---

## Phase 5 — Homepage Cleanup (remove gallery section)

Goal: homepage = hero (bio-like name+feature) + about + contact only. No `#work` grid.

- [index.html:672-742](index.html#L672-L742) entire `<section id="work">`: delete.
- [index.html:647](index.html#L647) nav list: remove `<li>Work</li>` OR repoint to `gallery/` index. Recommend: replace w/ dropdown or single `Galleries` link → keep simple, link to `gallery/ceramic.html` as default, or build `gallery/index.html` hub.
- Verify in-page anchor links elsewhere don't reference `#work`.
- Reveal observer + CSS rules tied only to work cards: leave (harmless) or prune.

Acceptance: homepage scroll = Hero → About → Contact. Galleries reachable via hero category links + nav.

---

## Phase 6 — QA Sweep

- Grep repo for `Grisha`, `2026` (as hero text), `Hamilton College`, `saturate(0.1)` — confirm zero stragglers (footer year `© 2026` allowed).
- Open each work page + new gallery pages, confirm images full color.
- Mobile @ 375px, 768px, 1280px: hero feature image, name single line (allow scale-down), category links tappable.
- Lighthouse pass on homepage; verify featured image has width/height + `loading="eager"` (above fold).

---

## Open Questions for User

1. Which sculpture photo for the hero feature?
2. Mixed Media gallery — any pieces yet, or placeholder?
3. Galleries open in new tab (`target="_blank"`) or same tab? "separate windows" is ambiguous.
4. Keep `Work` nav link (repointed to galleries hub) or remove entirely?
