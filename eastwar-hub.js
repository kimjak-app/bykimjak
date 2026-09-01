/**
 * EASTWAR HUB — 블로그 전역 링크 허브 위젯 (모서리 고정형)
 * 스틸 이미지 / AI 영상 / OST / 개발일지를 한 곳에서 연결
 *
 * 사용법: 모든 페이지의 </body> 직전에 아래 한 줄만 추가
 * <script src="/bykimjak/eastwar-hub.js"></script>
 *
 * 동작:
 * - 뒷배경(블로그 본문)은 항상 스크롤·클릭 가능 (모달 아님, 모서리 위젯)
 * - 메인 페이지(index.html): 접속 시 0.5초 뒤 자동으로 펼쳐진 상태로 뜸
 *   (닫으면 같은 세션 동안은 다시 자동으로 안 뜸, 접힌 버튼으로 전환)
 * - 그 외 모든 페이지: 우측 하단에 56px 원형 버튼으로 접혀있다가 클릭하면 펼쳐짐
 * - 닫기(✕): 펼친 패널이 접힌 버튼으로 돌아감 (완전히 사라지지 않음)
 */
(function () {
  if (document.getElementById('ew-hub-root')) return; // 중복 삽입 방지

  var BASE = '/bykimjak';
  var BG_IMAGE = BASE + '/assets/eastwar/hub-panel-bg-01.png';

  var LINKS = [
    { label: 'DEVLOG · 02–A', title: '개발일지', href: BASE + '/make/eastwar.html' },
    { label: 'STILL · 01–C', title: '스틸', href: BASE + '/watch/still.html' },
    { label: 'OST · 01–B', title: 'OST', href: BASE + '/watch/ost.html' },
    { label: 'FILM · 01–A', title: '영상', href: BASE + '/watch/ai-film.html' }
  ];

  var isMainPage = /^\/bykimjak\/?(index\.html)?$/.test(window.location.pathname);
  var SESSION_KEY = 'ewHubClosed';

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (k === 'class') e.className = attrs[k];
        else e.setAttribute(k, attrs[k]);
      }
    }
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function injectStyles() {
    var css = [
      '#ew-hub-root{position:fixed;right:20px;bottom:20px;z-index:9998;',
      'font-family:var(--f-body,sans-serif);}',

      '#ew-hub-collapsed{width:56px;height:56px;border-radius:50%;',
      'background:var(--dark,#111);border:1px solid rgba(200,166,90,.55);',
      'display:flex;align-items:center;justify-content:center;cursor:pointer;',
      'box-shadow:0 6px 18px rgba(0,0,0,.35);transition:transform .18s ease, box-shadow .18s ease;',
      'transform:scale(1);opacity:1;}',
      '#ew-hub-collapsed:hover{transform:scale(1.06);box-shadow:0 10px 24px rgba(0,0,0,.42);}',
      '#ew-hub-collapsed.ew-hidden{transform:scale(0);opacity:0;pointer-events:none;position:absolute;}',
      '#ew-hub-collapsed svg{width:22px;height:22px;}',

      '#ew-hub-panel{position:absolute;right:0;bottom:0;width:400px;height:500px;',
      'max-width:calc(100vw - 40px);background-image:url(' + BG_IMAGE + ');',
      'background-size:cover;background-position:center;border-radius:4px;',
      'box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden;',
      'display:flex;flex-direction:column;padding:44px 40px 28px;box-sizing:border-box;',
      'transform:scale(.92);opacity:0;pointer-events:none;transform-origin:bottom right;',
      'transition:transform .24s cubic-bezier(.2,.8,.2,1), opacity .2s ease;}',
      '#ew-hub-panel.ew-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#ew-hub-title{text-align:center;margin-bottom:10px;}',
      '#ew-hub-title .ew-eyebrow{font-family:var(--f-mono,monospace);font-size:10px;',
      'letter-spacing:.14em;color:#a3854f;margin-bottom:8px;}',
      '#ew-hub-title .ew-main{font-family:var(--f-display,var(--f-body,sans-serif));',
      'font-size:21px;letter-spacing:.04em;color:#f1e8d6;}',

      '#ew-hub-links{flex:1;display:flex;flex-direction:column;justify-content:center;gap:22px;}',
      '.ew-hub-link{display:block;text-align:center;text-decoration:none;',
      'padding-bottom:16px;border-bottom:1px solid rgba(200,166,90,.22);',
      'transition:opacity .15s ease;}',
      '.ew-hub-link:last-child{border-bottom:none;padding-bottom:0;}',
      '.ew-hub-link:hover{opacity:.68;}',
      '.ew-hub-link .ew-label{display:block;font-family:var(--f-mono,monospace);',
      'font-size:10px;letter-spacing:.12em;color:#8a7550;margin-bottom:5px;}',
      '.ew-hub-link .ew-name{display:block;font-family:var(--f-kr,var(--f-body,sans-serif));',
      'font-size:16px;color:#f1e8d6;}',

      '#ew-hub-close{margin-top:10px;text-align:center;background:none;border:none;',
      'cursor:pointer;font-family:var(--f-mono,monospace);font-size:11px;',
      'letter-spacing:.1em;color:#6b5d42;padding:6px;}',
      '#ew-hub-close:hover{color:#a3854f;}',

      '@media(max-width:460px){#ew-hub-panel{width:calc(100vw - 24px);height:460px;',
      'right:-8px;padding:36px 28px 22px;}',
      '#ew-hub-root{right:12px;bottom:12px;}}'
    ].join('');
    document.head.appendChild(el('style', { id: 'ew-hub-style' }, css));
  }

  function buildLinks() {
    return LINKS.map(function (l) {
      return (
        '<a class="ew-hub-link" href="' + l.href + '">' +
        '<span class="ew-label">' + l.label + '</span>' +
        '<span class="ew-name">' + l.title + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function collapsedIconSVG() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="#c8a65a" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 2l7 4v6c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-4z"/>' +
      '<path d="M9.5 12l1.8 1.8L15 10"/>' +
      '</svg>'
    );
  }

  function init() {
    injectStyles();

    var root = el('div', { id: 'ew-hub-root' });

    var collapsed = el(
      'button',
      { id: 'ew-hub-collapsed', 'aria-label': 'EASTWAR 허브 열기' },
      collapsedIconSVG()
    );

    var panel = el('div', { id: 'ew-hub-panel', role: 'dialog', 'aria-label': 'EASTWAR 허브' });
    panel.innerHTML =
      '<div id="ew-hub-title">' +
      '<div class="ew-eyebrow">EASTWAR · 02–A</div>' +
      '<div class="ew-main">EASTWAR HUB</div>' +
      '</div>' +
      '<div id="ew-hub-links">' + buildLinks() + '</div>' +
      '<button id="ew-hub-close">닫기 ✕</button>';

    root.appendChild(collapsed);
    root.appendChild(panel);
    document.body.appendChild(root);

    function openPanel() {
      collapsed.classList.add('ew-hidden');
      panel.classList.add('ew-open');
    }
    function closePanel() {
      panel.classList.remove('ew-open');
      collapsed.classList.remove('ew-hidden');
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
    }

    collapsed.addEventListener('click', openPanel);
    panel.querySelector('#ew-hub-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('ew-open')) closePanel();
    });

    if (isMainPage) {
      var alreadyClosed = false;
      try { alreadyClosed = sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) {}
      if (!alreadyClosed) {
        setTimeout(openPanel, 500);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
