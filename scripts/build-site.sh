#!/usr/bin/env bash
set -euo pipefail

# Build script for grisha.studio
# Copies only public-facing files into site-dist.
# content/, source-materials/, and media-source/ are never included.

DIST="site-dist"

rm -rf "$DIST"
mkdir -p "$DIST"

# Public files
cp index.html "$DIST/"
cp favicon.* "$DIST/"
cp robots.txt "$DIST/"
cp sitemap.xml "$DIST/"
cp llms.txt "$DIST/"
cp -R assets gallery work "$DIST/"

# Strip local metadata that must not be published
find "$DIST" -name '.DS_Store' -delete
find "$DIST" -name '._*' -delete
find "$DIST" -iname '*.md' -delete

# Publish the homepage markdown mirror AFTER the blanket .md strip above.
cp index.md "$DIST/"
