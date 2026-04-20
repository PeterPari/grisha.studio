# grisha.studio

Personal portfolio site for Gregory Parizhsky — built with plain HTML/CSS/JS, deployed on Netlify.

---

## Authoring workflow

### Where work metadata lives

`content/works/<slug>.md` is the **canonical source** for every artwork. One file per work, named after the URL slug.

Each file uses YAML front matter for structured fields followed by a Markdown description body:

```
---
title: "Title"
slug: slug-here
num: 01           # display order
year: 2024
category: Art     # Art | Architecture
gallery: ceramic  # ceramic | wood | work-in-progress
materials: "Ceramic"
dimensions: '48" × 36" × 8"'
status: complete  # complete | work-in-progress
thumbnail: assets/img/works/<slug>/thumb.jpg
primary_image: assets/img/works/<slug>/primary-web.jpg
gallery_images:
  - assets/img/works/<slug>/image1-web.jpg
  - assets/img/works/<slug>/image2-web.jpg
---

Description text in Markdown.
```

**Edit facts here first** — title, year, materials, dimensions, description, and image references all live in these files.

### Keeping HTML pages in sync

`work/<slug>.html` is the **render layer**. After editing a content file, update the matching HTML page to reflect the changes:

- `<title>` and `<h1>` ← `title`
- `.detail-meta-row` spans ← `num`, `category`, `year`, `status`
- `.detail-material` ← `materials` · `dimensions`
- `.detail-body .statement` ← description body
- `<img src>` and `<a href>` on the lead figure ← `primary_image`
- Gallery `<img src>` elements ← `gallery_images` (in order)
- Gallery overview cards in `gallery/<gallery>.html` ← `thumbnail`

### Other content files

| File | Purpose |
| --- | --- |
| `content/notes/descriptions.md` | Source descriptions (superseded by `content/works/` front matter) |
| `content/notes/measurements.md` | Raw measurement notes |
| `content/portfolio/art-and-architecture-portfolio.md` | Print portfolio text |

### Images

- Browser images live under `assets/img/works/<slug>/`
- `-web.jpg` — full-size (longest edge 3200 px)
- `-thumb.jpg` — gallery card (longest edge 1200 px)
- Source originals in `media-source/works/<slug>/`

### Deployment

Push to `main` → Netlify builds and deploys automatically (see `netlify.toml`).
`site-dist/` holds the last manual build output; it is **not** what Netlify serves.
