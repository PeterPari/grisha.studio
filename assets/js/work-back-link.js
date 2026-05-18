(function () {
  var map = {
    "a-mycelium-mind": { href: "../gallery/ceramic.html", label: "Ceramic" },
    "a-totemic-exploration-of-jazz": {
      href: "../gallery/ceramic.html",
      label: "Ceramic",
    },
    aqueduct: { href: "../gallery/ceramic.html", label: "Ceramic" },
    hydrant: { href: "../gallery/ceramic.html", label: "Ceramic" },
    icarus: { href: "../gallery/ceramic.html", label: "Ceramic" },
    "slip-cast-shoe-and-bottle-for-group-show": {
      href: "../gallery/ceramic.html",
      label: "Ceramic",
    },
    "tower-of-babel": { href: "../gallery/ceramic.html", label: "Ceramic" },
    void: { href: "../gallery/ceramic.html", label: "Ceramic" },
    "wishing-well": { href: "../gallery/ceramic.html", label: "Ceramic" },
    "ear-to-ear-a-listening-forest": {
      href: "../gallery/wood.html",
      label: "Wood",
    },
    "weathered-huts-of-the-soul": {
      href: "../gallery/wood.html",
      label: "Wood",
    },
    "what-is-a-city": { href: "../gallery/wood.html", label: "Wood" },
    "wood-gong": { href: "../gallery/wood.html", label: "Wood" },
    "icarus-print": {
      href: "../gallery/print-and-paper.html",
      label: "Print and Paper",
    },
    smokestack: {
      href: "../gallery/work-in-progress.html",
      label: "Work in Progress",
    },
  };

  var slug = window.location.pathname.split("/").pop().replace(".html", "");
  var cat = map[slug];
  if (!cat) return;

  var link = document.querySelector(".back-link");
  if (!link) return;

  link.href = cat.href;
  link.textContent = cat.label;
})();
