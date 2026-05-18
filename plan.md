# Git Push Optimization Plan

## Root Cause Analysis

Git pushes are slow because the repo is tracking **~600MB+ of binary image files** that don't belong
in version control. Every `git push` must pack and transfer enormous amounts of binary data.

### Problem Breakdown

| Directory | Size | Issue |
|---|---|---|
| `media-source/` | 255 MB | Raw source originals (incl. a 112 MB `.tif`). Never needed in git. |
| `source-materials/` | 213 MB | InDesign/Illustrator portfolio design files. Never needed in git. |
| `new-photos/` | 74 MB | Staging area already processed into `assets/img`. Redundant in git. |
| `assets/img` originals | ~100 MB | Full-res originals living alongside web versions in the same folder. |
| `assets/img` web images | ~160 MB | "Web" images are still 1–4 MB each — poorly compressed for the web. |
| Orphaned/duplicate files | ~20 MB | `.jpeg` duplicates of `.jpg` files; images tracked but never referenced in HTML. |

**Total bloat: ~622 MB. Target after cleanup: ~20–25 MB.**

The pending push (`origin/main → HEAD`) already includes all of `media-source/` and `new-photos/`
as new files, plus many large uncompressed web images — this is why the current push is so painful.

---

## What Will Be Done

### Phase 1 — Gitignore source & staging directories

Add `media-source/`, `new-photos/`, and `source-materials/` to `.gitignore`.
Then untrack them with `git rm --cached -r` so git stops managing them entirely.
The files stay on disk; git just ignores them from now on.

**Savings: ~542 MB removed from future pushes.**

### Phase 2 — Delete originals from `assets/img`

Original full-res photos (no `-web` / `-thumb` suffix) crept into `assets/img/works/`.
They are not referenced by any HTML file. They will be deleted from disk and untracked.

Files targeted:
- `a-mycelium-mind/` — 4 originals (`.jpg`, ~15 MB total)
- `a-totemic-exploration-of-jazz/` — 3 originals (`.jpg`, ~10 MB)
- `aqueduct/` — 5 originals (`Aqueduct N *.jpeg`, ~10 MB)
- `ear-to-ear-a-listening-forest/` — 4 originals (`.jpeg`, ~22 MB)
- `hydrant/` — 5 originals (`Hydrant N *.jpeg`, ~11 MB)
- `icarus/` — 5 originals (`Icarus N *.jpeg`, ~11 MB)
- `smokestack/` — 4 originals (`Smokestack N *.jpeg`, ~10 MB)
- `tower-of-babel/` — 4 originals (`Tower of Babel N *.jpeg`, ~9 MB)
- `void/` — 5 originals (`Void N *.jpeg`, ~11 MB)
- `weathered-huts-of-the-soul/` — 5 originals (`.jpeg`, ~10 MB)
- `what-is-a-city/` — 4 originals (`.jpeg`, ~16 MB)
- `work-in-progress/` — 3 PNG originals (~6 MB)

**Savings: ~121 MB removed from the repo.**

### Phase 3 — Delete orphaned & duplicate files

Files tracked in git that are either duplicates or never referenced in any HTML page:

**Duplicate `.jpeg` web files** (`.jpg` equivalents exist and are what HTML references):
- `ear-to-ear-a-listening-forest/close-up-headphones-web.jpeg`
- `ear-to-ear-a-listening-forest/close-up-structure-pillar-web.jpeg`
- `ear-to-ear-a-listening-forest/close-up-sturcture-top-web.jpeg` (also has a typo)
- `ear-to-ear-a-listening-forest/front-view-thumb.jpeg`
- `ear-to-ear-a-listening-forest/front-view-web.jpeg`
- `what-is-a-city/close-up-bottom-left-web.jpeg`
- `what-is-a-city/close-up-looking-up-web.jpeg`
- `what-is-a-city/front-view-web.jpeg`
- `what-is-a-city/side-view-thumb.jpeg`
- `what-is-a-city/side-view-web.jpeg`

**Orphaned web/thumb files** (tracked but not referenced by any HTML):
- `a-mycelium-mind/front-view-thumb.jpg`
- `aqueduct/alternate-side-view-web.jpg`
- `weathered-huts-of-the-soul/heic-view-1-web.jpg`
- `weathered-huts-of-the-soul/heic-view-2-web.jpg`
- `weathered-huts-of-the-soul/heic-view-3-web.jpg`
- `weathered-huts-of-the-soul/single-tower-front-view-thumb.jpg`
- `what-is-a-city/front-view-thumb.jpg`
- `what-is-a-city/side-view-thumb.jpg`
- `wishing-well/front-view-2-thumb.jpg`
- `wishing-well/top-view-thumb.jpg`
- `wood-gong/close-up-2-web.jpg`
- `wood-gong/close-up-2-thumb.jpg`
- `wood-gong/close-up-thumb.jpg`

**Savings: ~20 MB removed.**

### Phase 4 — Recompress all web & thumbnail images

The "web" images served to browsers are still 1–4 MB each. A well-optimised web image at
1600 px wide should be 100–350 KB. Thumbnails should be under 80 KB.

Using macOS `sips` (built-in):
- **`-web.jpg` files** → resize to max 1600 px on longest side, JPEG quality 0.82
- **`-thumb.jpg` files** → resize to max 500 px on longest side, JPEG quality 0.80

**Estimated savings: ~150 MB → ~15 MB (90 %+ reduction).**

### Phase 5 — Update .gitignore

Comprehensive `.gitignore` update to prevent the problem from recurring:
- Ignore `media-source/`, `new-photos/`, `source-materials/`
- Ignore raw image formats that should never be committed (`.HEIC`, `.tif`, `.tiff`, `.ai`, `.indd`, `.psd`)
- Ignore `.DS_Store` at root and recursively

### Phase 6 — Commit

Single clean commit: `Optimize git repo — remove source files, recompress web images`

---

## Expected Results

| Metric | Before | After |
|---|---|---|
| Tracked binary files | 263 | ~85 |
| Total tracked asset size | ~600 MB | ~20 MB |
| Pending push size | ~300 MB | ~5 MB |
| Typical future push size | 10–50 MB | < 2 MB |

> **Note on history:** This plan cleans the *working tree and index* going forward. The old large
> blobs will remain in git history. If you want to also purge history (shrink `.git/` further),
> that requires `git filter-repo --strip-blobs-bigger-than 1M` and a force-push — a separate
> optional step after this cleanup is confirmed working.
