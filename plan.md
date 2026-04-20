# Repository Reorganization Plan

## Premise

This plan assumes the reorganization has already been decided.

The open question is no longer what the repo should become. The open question is how to make the edits in an order that keeps the site working and keeps each pass small enough to review.

That changes the kind of plan this needs to be.

This is not a discovery plan.
This is an execution plan.

## End State

By the time this work is done, the repo should read like this:

- `index.html`, `gallery/`, and `work/` remain the public pages.
- `assets/` contains browser-facing files only.
- `content/` contains site text and structured content.
- `source-materials/` contains print portfolio files, design working files, and reference files that are not part of the live site.
- `media-source/` contains original or raw media that should not ship directly.
- `scripts/` contains build and validation helpers.
- `netlify.toml` stays simple and points at a real build script instead of carrying the logic inline.

Target layout:

```text
/
  index.html
  favicon.svg
  favicon.png
  gallery/
  work/
  assets/
    css/
    js/
    img/
      site/
      works/
        <slug>/
  content/
    portfolio/
    works/
    notes/
  source-materials/
    portfolio/
  media-source/
    site/
    works/
      <slug>/
  scripts/
  netlify.toml
  README.md
```

## Execution Rules

These are the rules that make the plan safe.

1. Keep public URLs unchanged through the whole reorganization.
2. Each phase should change one kind of thing only.
3. Any phase that moves files must also update every affected reference in the same phase.
4. Do not combine path moves with visual refactors unless that phase is explicitly about CSS consolidation.
5. The repo should still build and the site should still load after every phase.

## Why The Work Is Split This Way

The order matters.

If you move files that are not browser-facing first, you clean up the repo without touching the live site.
If you lock the build boundary next, later moves become safer because the deploy logic is explicit.
If you normalize asset paths before extracting CSS, you avoid refactoring styles while the file system is still moving under you.
If you wait to define canonical work content until paths and shared styles have settled, you avoid rebuilding the content model twice.

That is the logic behind the phases below.

## Phase 1: Split Public Files From Working Files

### Size

Small.

### What changes in this phase

Create the non-public directories and move the files that are clearly not part of the live site.

### Why this phase comes first

This is the cleanest low-risk move available.

The repo already mixes three different things in the same surface area:

- browser-facing assets
- reusable site content
- print and design working files

Those should be separated before anything else, because none of that requires changing public page paths.

This phase gives the repo clear boundaries without asking the browser to find anything new.

### Exact edits

1. Create:
   - `content/portfolio/`
   - `content/notes/`
   - `content/works/`
   - `source-materials/portfolio/`
   - `media-source/site/`
   - `media-source/works/`
   - `scripts/`
2. Move `Portfolio Materials/Art_and_Architecture_Portfolio.md` to `content/portfolio/art-and-architecture-portfolio.md`.
3. Move `assets/Measurements.md` to `content/notes/measurements.md`.
4. Move print portfolio files, PDFs, `.indd`, `.ai`, and the contents of `Portfolio Materials/Portfolio editing/` into `source-materials/portfolio/`.
5. Move obvious original or source-only media out of `assets/` into `media-source/`.
   - Example: `assets/Profile photo.JPG` -> `media-source/site/profile-photo-original.jpg`

### Why this phase is not larger

It stops before touching any live asset paths.

That is deliberate. The job here is to separate categories of files, not to change how pages load styles, scripts, or images.

### Done when

- Public site files still live where they lived before.
- Markdown source files are no longer mixed into `assets/`.
- Print and design working files are no longer mixed into the site content area.
- Source originals are no longer sitting in the public asset tree.

## Phase 2: Make The Build Boundary Explicit

### Size

Small.

### What changes in this phase

Move the build logic out of `netlify.toml` and into a real script.

### Why this phase comes second

Once the non-public directories exist, the build should stop relying on a cleanup step to decide what is publishable.

Right now the deploy setup works, but the logic lives inline and only becomes obvious if you read the shell carefully. That is manageable when the repo is tiny. It stops being manageable once folders start moving.

This phase creates one place that defines what gets published and what does not.

### Exact edits

1. Add `scripts/build-site.sh`.
2. Move the current copy and cleanup logic from `netlify.toml` into that script.
3. Update `netlify.toml` to call the script.
4. Add `scripts/check-public-refs.sh` if the current reference check is still only living in terminal history.
5. Make sure the build copies only the intended public surface:
   - `index.html`
   - `assets/`
   - `gallery/`
   - `work/`
6. Confirm that `content/`, `source-materials/`, and `media-source/` do not get published.

### Why this phase is not larger

This phase should not move assets or refactor page code. Its job is only to make the publish boundary obvious and maintainable.

### Done when

- The site still builds to `site-dist`.
- The deploy logic is readable in one script.
- Non-public directories are clearly outside the publish step.

## Phase 3: Normalize Shared CSS And JS Paths

### Size

Small to medium.

### What changes in this phase

Move shared stylesheets and scripts into type-based folders under `assets/`.

### Why this phase comes third

These are reference updates, but they are simpler than the image move.

CSS and JS files are few in number, shared across many pages, and easy to verify. That makes them the right first path-normalization pass. It also clears the way for the later CSS extraction phases, because shared files end up in predictable places before their contents start changing.

### Exact edits

1. Create:
   - `assets/css/`
   - `assets/js/`
2. Move:
   - `assets/gallery.css` -> `assets/css/gallery.css`
   - `assets/site-loader.css` -> `assets/css/site-loader.css`
   - `assets/work-lightbox.css` -> `assets/css/work-lightbox.css`
   - `assets/gallery-tabs.js` -> `assets/js/gallery-tabs.js`
   - `assets/site-loader.js` -> `assets/js/site-loader.js`
   - `assets/work-lightbox.js` -> `assets/js/work-lightbox.js`
3. Update all references in:
   - `index.html`
   - `gallery/*.html`
   - `work/*.html`

### Why this phase is not larger

It stops before image moves and before CSS consolidation.

If you mix those in, you end up debugging path changes and style changes at the same time. That makes review harder for no gain.

### Done when

- All shared CSS loads from `assets/css/`.
- All shared JS loads from `assets/js/`.
- The pages behave the same as before.

## Phase 4: Normalize Public Image Paths

### Size

Medium.

### What changes in this phase

Move published images into a public image tree that is organized by purpose.

### Why this phase comes fourth

This is the biggest path-edit phase in the plan.

It needs to be isolated so that a broken image path is not confused with a broken stylesheet path or a layout regression. By the time this phase starts, the build boundary is already fixed and the shared CSS/JS locations are already stable.

That means any issue found here is almost certainly an image reference issue, which is exactly what you want during a repo move.

### Exact edits

1. Create:
   - `assets/img/site/`
   - `assets/img/works/`
2. Move shared site images into `assets/img/site/`.
   - Example: `assets/profile-photo-web.jpg` -> `assets/img/site/profile-photo.jpg`
3. Move each browser-facing work image folder from `assets/<slug>/` to `assets/img/works/<slug>/`.
4. Update every affected image `src` and image-link `href` in:
   - `index.html`
   - `gallery/*.html`
   - `work/*.html`

### Why this phase is not larger

This phase is already path-heavy. It should not include CSS extraction or content-model work.

### Done when

- All browser-facing images live under `assets/img/`.
- Shared site imagery and work imagery are separate.
- Every page still resolves its images correctly.

## Phase 5: Extract Global Shared CSS

### Size

Medium.

### What changes in this phase

Move the obvious cross-page CSS into a shared base stylesheet.

### Why this phase comes fifth

At this point, file locations are no longer moving around. That matters because CSS extraction is easier when import paths have stopped changing.

This phase should target the styles that are clearly shared across the homepage, gallery pages, and work pages:

- tokens
- reset rules
- ambient background
- navigation
- footer
- other cross-page primitives

Those rules are the safest to consolidate first because they already behave like shared code even though they are still embedded in individual HTML files.

### Exact edits

1. Add `assets/css/base.css`.
2. Move shared tokens into `base.css`.
3. Move shared reset rules into `base.css`.
4. Move shared nav, footer, and ambient styles into `base.css`.
5. Update `index.html`, `gallery/*.html`, and `work/*.html` to load `base.css`.
6. Leave page-specific layout rules where they are for now.

### Why this phase is not larger

If you also try to solve page-specific layout duplication here, the phase stops being about safe extraction and starts becoming a redesign-by-accident. That is not the goal.

### Done when

- Shared global CSS lives in one file.
- The visual result is unchanged.
- Common site-wide style edits only need one touchpoint.

## Phase 6: Extract Shared Work-Detail CSS

### Size

Medium.

### What changes in this phase

Pull the repeated layout CSS out of the work detail pages and into a shared stylesheet.

### Why this phase comes sixth

The work pages are the main duplication hotspot, but they are also the most visually sensitive pages in the repo.

That is why they should not be the first CSS consolidation step. By now the global base styles are already shared, the asset tree is stable, and the only thing left is the heavy repeated layout code that lives across the work pages.

This phase finally addresses the part of the repo that costs the most time to maintain.

### Exact edits

1. Add `assets/css/work-detail.css`.
2. Move the common detail-page rules into it.
3. Extract shared structures such as:
   - the back link block
   - detail header layout
   - detail lead rails
   - gallery row patterns
   - work navigation
4. Leave only genuinely page-specific rules inline or in page-specific files.
5. Load `work-detail.css` from all work pages.

### Why this phase is not larger

This phase is about shared detail-page styles only. It is not the right moment to convert the pages into generated templates or to change the content model.

### Done when

- Most shared work-page CSS lives in one place.
- A common layout change no longer requires touching every work file.

## Phase 7: Add Canonical Content Files For Each Work

### Size

Medium.

### What changes in this phase

Add one clear source file per artwork under `content/works/`.

### Why this phase comes last

This is the point where the repo stops being only a cleaner file tree and becomes a cleaner authoring system.

It needs to come last because the content files will refer to stable asset paths and a stable page structure. If you do this earlier, you risk creating a canonical content layer that immediately needs more migration work.

By waiting until the filesystem and shared CSS are already settled, the content layer can be introduced once and stay put.

### Exact edits

1. Add one file per work in `content/works/`.
2. Each file should include the fields that are currently repeated across the site:
   - slug
   - title
   - year
   - category
   - materials
   - dimensions
   - description
   - thumbnail path
   - primary image path
   - ordered gallery image list
3. Decide that these files are canonical for work metadata.
4. Keep the existing HTML pages as the render layer for now.
5. Update `README.md` so the authoring workflow is clear.

### Why this phase is not larger

This is where many repos overreach and jump straight into page generation.

That is not required to get the benefit. The immediate gain is having one place to edit the core facts for each work. Generation, if it is ever needed, can build on that later.

### Done when

- Each artwork has one canonical content file.
- The repo has a clear answer to where work metadata should be edited.

## What This Plan Deliberately Does Not Include

These are separate projects and should stay separate:

- changing page URLs
- moving to React, Astro, Vite, or another app framework
- redesigning the site
- generating pages from templates

Any of those may be worth doing later, but they are not needed to finish the reorganization itself.

## Verification Standard

After every phase:

1. Open the homepage.
2. Open at least one gallery page.
3. Open at least two work pages.
4. Confirm local CSS, JS, and image references still resolve.
5. Run the build and confirm `site-dist` still contains the expected public output.

## Good Stopping Points

This plan is intentionally built around clean stopping points.

- After Phase 2, the repo boundaries are clear and the build boundary is explicit.
- After Phase 4, the public asset tree is in good shape.
- After Phase 6, most of the duplication pain is gone.
- After Phase 7, the repo has both a cleaner structure and a cleaner authoring model.

## Final Standard

The reorganization is done when all of these are true:

1. The public pages still load at the same URLs.
2. Netlify still publishes the same site successfully.
3. `assets/` contains browser-facing files only.
4. `content/` contains reusable site content and structured work data.
5. `source-materials/` contains print and design working files.
6. `media-source/` contains originals and raw media.
7. Shared global CSS is centralized.
8. Shared work-detail CSS is centralized.
9. Each work has one canonical content file.
