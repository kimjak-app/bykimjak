/* EASTWAR — shared log-index renderer with pagination
   Add a new log entry to LOGS to update all devlog pages automatically. */
(function () {
  var PER_PAGE = 5;

  var LOGS = [
    {
      num: '001', date: '2026 · 04 · 22',
      ko: { href: 'eastwar.html',         title: '무모한 도전의 시작',                           sub: '1인 작가, 게임을 만들다' },
      en: { href: 'eastwar-en.html',      title: 'The Reckless Beginning',                     sub: 'A Solo Writer Makes a Game' }
    },
    {
      num: '002', date: '2026 · 04 · 23',
      ko: { href: 'eastwar-devlog-002.html',    title: '엔진을 선택하다',                        sub: '동경이와 함께 시작된 고도 입문기' },
      en: { href: 'eastwar-devlog-002-en.html', title: 'Choosing the Engine',                  sub: 'How a Dog Named Donggyeong Led Me to Godot' }
    },
    {
      num: '003', date: '2026 · 04 · 30',
      ko: { href: 'eastwar-devlog-003.html',    title: '웹이냐 Godot이냐 — 엔진을 고르는 밤',    sub: '코드 한 줄 없이 게임 구조를 설계한 이야기' },
      en: { href: 'eastwar-devlog-003.html',    title: 'Web or Godot? — The Night We Chose an Engine', sub: 'Designing a Game Structure Without Writing a Single Line of Code' }
    },
    {
      num: '004', date: '2026 · 05 · 01',
      ko: { href: 'eastwar-devlog-004.html',    title: 'Phaser를 어떻게 쓸 것인가 — 설계의 원칙', sub: '코드 한 줄 없이 게임 구조를 설계한 이야기 2' },
      en: { href: 'eastwar-devlog-004-en.html', title: 'How to Use Phaser — The Principles of Design', sub: 'Defining Roles Before Writing a Single Line of Code' }
    },
    {
      num: '005', date: '2026 · 05 · 01',
      ko: { href: 'eastwar-devlog-005.html',    title: '전투를 만들다 — 코드보다 먼저 전장이 섰다', sub: '전투 엔진 구현의 첫 번째 기록' },
      en: { href: 'eastwar-devlog-005-en.html', title: 'Building the Battle — The Battlefield Came First', sub: 'The First Record of Implementing the Battle Engine' }
    }
  ];

  /* Find which page the current log falls on */
  function pageOf(num) {
    var idx = LOGS.findIndex(function (l) { return l.num === num; });
    return idx < 0 ? 1 : Math.floor(idx / PER_PAGE) + 1;
  }

  function render(container, lang, currentNum, page) {
    if (!container) return;
    var totalPages = Math.ceil(LOGS.length / PER_PAGE);
    page = Math.max(1, Math.min(page || pageOf(currentNum), totalPages));

    var start = (page - 1) * PER_PAGE;
    var slice = LOGS.slice(start, start + PER_PAGE);

    var hdText = lang === 'en'
      ? 'All Dev Logs · 전체 개발일지'
      : '전체 개발일지 · All Dev Logs';

    var html = '<p class="log-index__hd">' + hdText + '</p>';

    slice.forEach(function (log) {
      var isCur = log.num === currentNum;
      var d = log[lang] || log.ko;
      var cls = 'log-index__item' + (isCur ? ' log-index__item--current' : '');

      if (isCur) {
        html += '<span class="' + cls + '">'
          + '<span class="log-index__num">#' + log.num + '</span>'
          + '<span class="log-index__t">' + d.title
          + '<span class="ko">' + d.sub + '</span></span>'
          + '<span class="log-index__date">' + log.date + '</span>'
          + '</span>';
      } else {
        html += '<a href="' + d.href + '" class="' + cls + '">'
          + '<span class="log-index__num">#' + log.num + '</span>'
          + '<span class="log-index__t">' + d.title
          + '<span class="ko">' + d.sub + '</span></span>'
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

  window.EASTWAR_LI = { render: render };
})();
