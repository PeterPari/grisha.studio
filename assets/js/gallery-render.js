(function () {
  var filter = window.WORKS_FILTER || {};
  var works = (window.WORKS || []).filter(function (w) {
    if (filter.status) return w.status === filter.status;
    return w.gallery === filter.gallery && w.status !== 'work-in-progress';
  });

  works.sort(function (a, b) {
    return b.year - a.year || b.num - a.num;
  });

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function countLabel(n) {
    return String(n).padStart(2, '0') + (n === 1 ? ' work' : ' works');
  }

  var grid = document.getElementById('gallery-grid');
  var countEl = document.getElementById('gallery-count');

  if (!grid) return;

  grid.innerHTML = works.map(function (w) {
    var imgClass = w.imgClass ? ' class="' + esc(w.imgClass) + '"' : '';
    var wipBadge = w.status === 'work-in-progress' ? ' &nbsp;&middot;&nbsp; Work in Progress' : '';
    var dimPart = w.dimensions ? '<br />' + w.dimensions : '';
    return (
      '<a href="../work/' + esc(w.slug) + '.html" class="card">\n' +
      '  <div class="card-img">\n' +
      '    <img' + imgClass + ' src="../' + esc(w.thumbnail) + '" alt="' + esc(w.title) + '" loading="lazy" decoding="async" />\n' +
      '    <div class="card-bar"></div>\n' +
      '  </div>\n' +
      '  <p class="card-title">' + w.title + '</p>\n' +
      '  <p class="card-meta">' + w.year + ' &nbsp;&middot;&nbsp; ' + w.materials + wipBadge + dimPart + '</p>\n' +
      '</a>'
    );
  }).join('\n');

  if (countEl) countEl.textContent = countLabel(works.length);
})();
