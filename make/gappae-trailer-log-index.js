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
    },
    {
      num: '003', date: '2026.09.22–28',
      ko: { href: 'gappae-trailer-devlog-003.html',    title: '캐릭터 시트 완성', sub: '영상을 만들기 전에, 사람부터 고정했다' },
      en: { href: 'gappae-trailer-devlog-003-en.html', title: 'Character Sheets Complete', sub: 'Locking the people before generating the trailer' }
    },
    {
      num: '004', date: '2026.09.22–23',
      ko: { href: 'gappae-trailer-devlog-004.html',    title: '텍스트 콘티 완성', sub: '2분을 20개의 비트로 쪼개다' },
      en: { href: 'gappae-trailer-devlog-004-en.html', title: 'Text Storyboard Complete', sub: 'Breaking two minutes into twenty beats' }
    },
    {
      num: '005', date: '2026.09.24–26',
      ko: { href: 'gappae-trailer-devlog-005.html',    title: '그림 스토리 보드 완성', sub: '텍스트 콘티를 화면으로 옮기다' },
      en: { href: 'gappae-trailer-devlog-005-en.html', title: 'Illustrated Storyboard Complete', sub: 'Turning the text storyboard into visible shots' }
    },
    {
      num: '006', date: '2026.09.26–28',
      ko: { href: 'gappae-trailer-devlog-006.html',    title: '장소 이미지 확정', sub: '카메라가 움직이기 전에, 공간부터 고정했다' },
      en: { href: 'gappae-trailer-devlog-006-en.html', title: 'Location Images Locked', sub: 'Before moving the camera, I had to lock the space' }
    },
    {
      num: '007', date: '2026.09.29',
      ko: { href: 'gappae-trailer-devlog-007.html',    title: '갑패 주요인물 캐릭터시트 재작업', sub: '실사 배우의 얼굴 감각을 더 정확히 고정하다' },
      en: { href: 'gappae-trailer-devlog-007-en.html', title: 'Reworking the Main Character Sheets', sub: 'Pushing the cast closer to the feel of real actors' }
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
