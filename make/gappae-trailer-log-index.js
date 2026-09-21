/* Gappae Trailer — shared log-index renderer with pagination
   Add a new log entry to LOGS to update all devlog pages automatically. */
(function () {
  var PER_PAGE = 5;

  /* Entry format:
     { num: '001', date: '2026.09.19',
       ko: { href: 'gappae-trailer-devlog-001.html',    title: '...', sub: '' },
       en: { href: 'gappae-trailer-devlog-001-en.html', title: '...', sub: '' } } */
  var LOGS = [
    {
      num: '001', date: '2026.09.19',
      ko: { href: 'gappae-trailer-devlog-001.html',    title: '드라마를 2분에 담다 — 갑패 트레일러 테스트 제작 첫날', sub: '' },
      en: { href: 'gappae-trailer-devlog-001-en.html', title: 'Fitting a Drama into Two Minutes — Day One of the Gappae Trailer Test', sub: '' }
    },
    {
      num: '002', date: '2026.09.20',
      ko: { href: 'gappae-trailer-devlog-002.html',    title: '휴일, 디테일을 채우다 — 갑패 트레일러 테스트 제작 이틀째', sub: '' },
      en: { href: 'gappae-trailer-devlog-002-en.html', title: 'A Day Off, Filling in the Details — Day Two of the Gappae Trailer Test', sub: '' }
    }
  ];

  /* Find which page the current log falls on */
  function pageOf(num) {
    var idx = LOGS.findIndex(function (l) { return l.num === num; });
    return idx < 0 ? 1 : Math.floor(idx / PER_PAGE) + 1;
  }

  function render(container, lang, currentNum, page) {
    if (!container) return;
    if (!LOGS.length) {
      container.innerHTML = '<p class="log-index__empty">'
        + (lang === 'en' ? 'First log coming soon' : '첫 제작일지 준비 중') + '</p>';
      return;
    }
    var totalPages = Math.ceil(LOGS.length / PER_PAGE);
    page = Math.max(1, Math.min(page || pageOf(currentNum), totalPages));

    var start = (page - 1) * PER_PAGE;
    var slice = LOGS.slice(start, start + PER_PAGE);

    var hdText = lang === 'en'
      ? 'All Production Logs · 전체 제작일지'
      : '전체 제작일지 · All Production Logs';

    var html = '<p class="log-index__hd">' + hdText + '</p>';

    slice.forEach(function (log) {
      var isCur = log.num === currentNum;
      var d = log[lang] || log.ko;
      var cls = 'log-index__item' + (isCur ? ' log-index__item--current' : '');

      if (isCur) {
        html += '<span class="' + cls + '">'
          + '<span class="log-index__num">#' + log.num + '</span>'
          + '<span class="log-index__t">' + d.title
          + (d.sub ? '<span class="ko">' + d.sub + '</span>' : '') + '</span>'
          + '<span class="log-index__date">' + log.date + '</span>'
          + '</span>';
      } else {
        html += '<a href="' + d.href + '" class="' + cls + '">'
          + '<span class="log-index__num">#' + log.num + '</span>'
          + '<span class="log-index__t">' + d.title
          + (d.sub ? '<span class="ko">' + d.sub + '</span>' : '') + '</span>'
          + '<span class="log-index__date">' + log.date + '</span>'
          + '</a>';
      }
    });

    if (totalPages > 1) {
      html += '<div class="log-pager">';
      for (var p = 1; p <= totalPages; p++) {
        var ac = p === page ? ' log-pager__btn--active' : '';
        html += '<button class="log-pager__btn' + ac + '" data-page="' + p + '">' + p + '</button>';
      }
      html += '</div>';
    }

    container.innerHTML = html;
    container._liLang = lang;
    container._liCur  = currentNum;

    /* bind pagination */
    var btns = container.querySelectorAll('.log-pager__btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        render(container, container._liLang, container._liCur, parseInt(btn.dataset.page, 10));
      });
    });
  }

  window.GAPPAE_LI = { render: render };
})();
