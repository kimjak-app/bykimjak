/**
 * EASTWAR HUB — 블로그 전역 링크 허브 위젯 (모서리 고정형) v2
 * v1 대비 변경점:
 * - 패널 크기 400x500 → 320x400 (배경 이미지 비율 4:5 그대로 유지, 크롭 없음)
 * - 펼침/닫힘 애니메이션이 재생되지 않던 버그 수정 (강제 reflow 추가)
 *
 * 사용법: 모든 페이지의 </body> 직전에 아래 한 줄만 추가
 * <script src="/bykimjak/eastwar-hub.js"></script>
 */
(function () {
  if (document.getElementById('ew-hub-root')) return; // 중복 삽입 방지

  var BASE = '/bykimjak';
  var BG_IMAGE = BASE + '/assets/eastwar/hub-panel-bg-01.png';

  var LINKS = [
    { label: 'DEVLOG · 02–A', title: '개발일지', titleEn: 'Devlog', href: BASE + '/make/eastwar.html' },
    { label: 'STILL · 01–C', title: '스틸', titleEn: 'Still', href: BASE + '/watch/still.html' },
    { label: 'OST · 01–B', title: 'OST', titleEn: '', href: BASE + '/watch/ost.html' },
    { label: 'FILM · 01–A', title: '영상', titleEn: 'Film', href: BASE + '/watch/ai-film.html' }
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
      'box-shadow:0 6px 18px rgba(0,0,0,.35);',
      'transition:transform .2s cubic-bezier(.2,.8,.2,1), opacity .16s ease, box-shadow .18s ease;',
      'transform:scale(1);opacity:1;}',
      '#ew-hub-collapsed:hover{transform:scale(1.06);box-shadow:0 10px 24px rgba(0,0,0,.42);}',
      '#ew-hub-collapsed.ew-hidden{transform:scale(0);opacity:0;pointer-events:none;position:absolute;right:0;bottom:0;}',
      '#ew-hub-collapsed svg{width:22px;height:22px;}',

      '#ew-hub-panel{position:absolute;right:0;bottom:0;width:320px;height:400px;',
      'max-width:calc(100vw - 40px);background-image:url(' + BG_IMAGE + ');',
      'background-size:cover;background-position:center;border-radius:4px;',
      'box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden;',
      'display:flex;flex-direction:column;padding:34px 32px 22px;box-sizing:border-box;',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:bottom right;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1), opacity .22s ease;}',
      '#ew-hub-panel.ew-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#ew-hub-title{text-align:center;margin-bottom:8px;}',
      '#ew-hub-title .ew-eyebrow{font-family:var(--f-mono,monospace);font-size:9px;',
      'letter-spacing:.14em;color:#a3854f;margin-bottom:6px;}',
      '#ew-hub-title .ew-main{font-family:var(--f-display,var(--f-body,sans-serif));',
      'font-size:17px;letter-spacing:.04em;color:#f1e8d6;}',

      '#ew-hub-links{flex:1;display:flex;flex-direction:column;justify-content:center;gap:16px;}',
      '.ew-hub-link{display:block;text-align:center;text-decoration:none;',
      'padding-bottom:12px;border-bottom:1px solid rgba(200,166,90,.22);',
      'transition:opacity .15s ease;}',
      '.ew-hub-link:last-child{border-bottom:none;padding-bottom:0;}',
      '.ew-hub-link:hover{opacity:.68;}',
      '.ew-hub-link .ew-label{display:block;font-family:var(--f-mono,monospace);',
      'font-size:9px;letter-spacing:.12em;color:#8a7550;margin-bottom:4px;}',
      '.ew-hub-link .ew-name{display:block;font-family:var(--f-kr,var(--f-body,sans-serif));',
      'font-size:14px;color:#f1e8d6;}',
      '.ew-hub-link .ew-name-en{font-family:var(--f-body,sans-serif);font-size:10px;',
      'color:#8a7550;margin-left:4px;font-style:normal;}',

      '#ew-hub-close{margin-top:8px;text-align:center;background:none;border:none;',
      'cursor:pointer;font-family:var(--f-mono,monospace);font-size:10px;',
      'letter-spacing:.1em;color:#6b5d42;padding:5px;}',
      '#ew-hub-close:hover{color:#a3854f;}',

      '@media(max-width:380px){#ew-hub-panel{width:calc(100vw - 24px);height:360px;',
      'right:-8px;padding:28px 24px 18px;}',
      '#ew-hub-root{right:12px;bottom:12px;}}'
    ].join('');
    document.head.appendChild(el('style', { id: 'ew-hub-style' }, css));
  }

  function buildLinks() {
    return LINKS.map(function (l) {
      var enPart = l.titleEn ? '<span class="ew-name-en">(' + l.titleEn + ')</span>' : '';
      return (
        '<a class="ew-hub-link" href="' + l.href + '">' +
        '<span class="ew-label">' + l.label + '</span>' +
        '<span class="ew-name">' + l.title + enPart + '</span>' +
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

  // 강제 reflow: 요소가 DOM에 붙은 직후 바로 클래스를 바꾸면
  // 브라우저가 시작 상태를 건너뛰고 transition을 재생하지 않는 문제가 있어,
  // 스타일을 한 번 읽어서 강제로 레이아웃을 계산시킨 뒤 다음 프레임에 클래스를 바꾼다.
  function forceReflow(node) {
    return node.offsetHeight;
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
      forceReflow(panel);
      requestAnimationFrame(function () {
        panel.classList.add('ew-open');
      });
    }
    function closePanel() {
      panel.classList.remove('ew-open');
      forceReflow(collapsed);
      requestAnimationFrame(function () {
        collapsed.classList.remove('ew-hidden');
      });
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
