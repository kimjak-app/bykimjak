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
    },
    {
      num: '006', date: '2026 · 05 · 02',
      ko: { href: 'eastwar-devlog-006.html',    title: '전투가 살아났다 — UI를 다듬고, 영웅이 뛰쳐나왔다', sub: '전투 UI 정돈과 영웅 고유특기 컷인 완성' },
      en: { href: 'eastwar-devlog-006-en.html', title: 'The Battle Came Alive — UI Polish and Hero Cut-ins', sub: 'Polishing the Battle UI and Completing the Hero Cut-in System' }
    },
    {
      num: '007', date: '2026.05.03',
      ko: { href: 'eastwar-devlog-007.html',    title: '전투가 깊어졌다 — 이펙트, 템포, 그리고 새로운 영웅들', sub: '컷인 시스템 확장, 수동전투, 중국 세력 추가' },
      en: { href: 'eastwar-devlog-007-en.html', title: 'The Battle Grew Deeper — Effects, Tempo, and New Heroes', sub: 'Cut-in expansion, manual combat, and the Han faction' }
    },
    {
      num: '008', date: '2026.05.07',
      ko: { href: 'eastwar-devlog-008.html',    title: '전장이 살아있다 — 고구려가 일어서고, 전투가 숨을 쉬다', sub: '고구려 세력 추가, AI 개선, 영웅 포섭 시스템' },
      en: { href: 'eastwar-devlog-008-en.html', title: 'The Battlefield Lives — Goguryeo Rises, and the Battle Breathes', sub: 'Goguryeo faction, AI fix, hero recruitment system' }
    },
    {
      num: '009', date: '2026.05.08',
      ko: { href: 'eastwar-devlog-009.html',    title: '왕이 된다는 것 — 재상, 성주, 자원, 그리고 전쟁을 준비하는 나라', sub: '플레이어는 왕이다. 재상·성주 배치, 자원 설계, 병종 상성' },
      en: { href: 'eastwar-devlog-009-en.html', title: 'What It Means to Be King — Chancellors, Governors, Resources, and a Nation That Prepares for War', sub: 'The player is the King. Chancellor·Governor placement, resource design, unit counters' }
    },
    {
      num: '010', date: '2026.05.09',
      ko: { href: 'eastwar-devlog-010.html',    title: '보이지 않는 곳을 다졌다 — 프로토타입에서 확장 가능한 구조로', sub: '구조 리팩토링, 자원 8종, 계절 턴, 내정 충성도 시스템' },
      en: { href: 'eastwar-devlog-010-en.html', title: "Reinforcing What You Can't See — From Working Prototype to a Structure Built to Scale", sub: 'Structural refactoring, 8 resources, seasonal turns, city loyalty system' }
    },
    {
      num: '011', date: '2026.05.13',
      ko: { href: 'eastwar-devlog-011.html',    title: '세계가 살아났다 — 군대, 무역, 외교가 한 게임에 들어오다', sub: '병력 3분류, 세력 명명, 내부 보급망, 대외무역, 13개 도시' },
      en: { href: 'eastwar-devlog-011-en.html', title: 'The World Came Alive — Armies, Trade, and Diplomacy Enter the Game', sub: 'Three-tier armies, named factions, supply lines, inter-faction trade, 13 cities' }
    },
    {
      num: '012', date: '2026.05.17',
      ko: { href: 'eastwar-devlog-012.html',    title: '고도로 건너가다 — 웹에서 만든 전투를 Godot 위에 다시 세우다', sub: 'Godot 이식, 자산 마이그레이션, 전투 루프, 18×10 격자 기준' },
      en: { href: 'eastwar-devlog-012-en.html', title: 'Crossing Over to Godot — Rebuilding the Battle Engine on a Real Game Engine', sub: 'Godot port, asset migration, battle loop, 18×10 grid standard' }
    },
    {
      num: '013', date: '2026 · 05 · 18',
      ko: { href: 'eastwar-devlog-013.html',    title: '데모가 게임이 된 3일', sub: '이동하고, 바라보고, 싸우고, 설계하다 — v0.64k ~ v0.65h' },
      en: { href: 'eastwar-devlog-013-en.html', title: 'Three Days That Turned a Demo Into a Game', sub: 'Move, face, fight, and architect — v0.64k ~ v0.65h' }
    },
    {
      num: '014', date: '2026 · 05 · 23',
      ko: { href: 'eastwar-devlog-014.html',    title: '화면은 그대로, 안은 완전히 갈아엎은 3일', sub: '슬롯 이관, 지원군 도착, AI 포위 — v0.65i~v0.67p' },
      en: { href: 'eastwar-devlog-014-en.html', title: 'Same Screen, A Completely Different Game Underneath', sub: 'Slot migration, reinforcement arrival, AI encirclement — v0.65i~v0.67p' }
    },
    {
      num: '015', date: '2026 · 05 · 25',
      ko: { href: 'eastwar-devlog-015.html',    title: '고유특기, 책략, 방어 도입 - 화려해진 전투', sub: '고유특기 MVP, 책략·방어 포팅, 유닛 슬롯 통합 — v0.67r~v0.68-pre' },
      en: { href: 'eastwar-devlog-015-en.html', title: 'Unique Skills, Strategy, and Defense — Battle Gets Spectacular', sub: 'Unique skill MVP, strategy/defend porting, unit slot unification — v0.67r~v0.68-pre' }
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
