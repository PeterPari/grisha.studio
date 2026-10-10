(function () {
  var filter = window.WORKS_FILTER || {};
  var LABELS = {
    stone: 'Stone',
    ceramic: 'Ceramic',
    wood: 'Wood',
    'print-and-paper': 'Print and Paper'
  };

  var works = (window.WORKS || []).filter(function (w) {
    if (filter.status) return w.status === filter.status;
    if (w.status === 'work-in-progress' || w.status === 'archived') return false;
    if (filter.all) return LABELS[w.gallery];
    return w.gallery === filter.gallery;
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

  var grid = document.getElementById('gallery-grid');
  if (!grid) return;

  function cardHtml(w) {
    var imgClass = w.imgClass ? ' class="' + esc(w.imgClass) + '"' : '';
    var dimPart = w.dimensions ? '<br />' + w.dimensions : '';
    return (
      '<a href="../work/' + esc(w.slug) + '.html" class="card">\n' +
      (w.thumbnail
        ? '  <div class="card-img">\n' +
          '    <img' + imgClass + ' src="../' + esc(w.thumbnail) + '" alt="' + esc(w.title) + '" loading="lazy" decoding="async" />\n' +
          '    <div class="card-bar"></div>\n' +
          '  </div>\n'
        : '  <div class="card-img placeholder">\n' +
          '    <span class="placeholder-label">Photo coming soon</span>\n' +
          '    <div class="card-bar"></div>\n' +
          '  </div>\n') +
      '  <p class="card-title">' + esc(w.title) + '</p>\n' +
      '  <p class="card-meta">' + w.year + ' &nbsp;&middot;&nbsp; ' + esc(w.materials) + dimPart + '</p>\n' +
      '</a>'
    );
  }

  function render(list) {
    grid.innerHTML = list.map(cardHtml).join('\n');
  }

  var bar = document.getElementById('work-filters');
  if (!bar || !filter.all) {
    render(works);
    return;
  }

  // Hub: in-place medium filters, deep-linkable via #ceramic etc.
  var keys = Object.keys(LABELS).filter(function (k) {
    return works.some(function (w) { return w.gallery === k; });
  });

  bar.innerHTML = ['all'].concat(keys).map(function (k) {
    return (
      '<button type="button" class="work-filter" data-filter="' + k + '" aria-pressed="false">' +
      (k === 'all' ? 'Latest' : LABELS[k]) + '</button>'
    );
  }).join('');

  var buttons = Array.prototype.slice.call(bar.querySelectorAll('.work-filter'));

  function apply(k, updateHash) {
    if (keys.indexOf(k) === -1) k = 'all';
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === k ? 'true' : 'false');
    });
    render(k === 'all' ? works : works.filter(function (w) { return w.gallery === k; }));
    if (updateHash && window.history && history.replaceState) {
      history.replaceState(null, '', k === 'all' ? location.pathname + location.search : '#' + k);
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-filter'), true); });
  });

  window.addEventListener('hashchange', function () {
    apply(location.hash.slice(1), false);
  });

  apply(location.hash.slice(1), false);
})();
