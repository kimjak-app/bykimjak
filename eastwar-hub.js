/**
 * EASTWAR HUB — 블로그 전역 링크 허브 위젯 (드래그 이동형) v3
 * v2 대비 변경점:
 * - 첫 위치: 우측 하단 → 우측 상단
 * - 접힌 버튼 / 펼친 패널 모두 마우스(또는 터치)로 드래그해서 화면 아무 곳이나 이동 가능
 * - 옮긴 위치는 localStorage에 저장돼서 새로고침해도, 다른 페이지로 이동해도 유지됨
 *
 * 사용법: 모든 페이지의 </body> 직전에 아래 한 줄만 추가
 * <script src="/bykimjak/eastwar-hub.js"></script>
 */
(function () {
  if (document.getElementById('ew-hub-root')) return; // 중복 삽입 방지

  var BASE = '/bykimjak';
  var BG_IMAGE = BASE + '/assets/eastwar/hub-panel-bg-01.png';
  var POS_KEY = 'ewHubPos';
  var SESSION_KEY = 'ewHubClosed';
  var DRAG_THRESHOLD = 4; // 이 이상 움직여야 '클릭'이 아니라 '드래그'로 인정

  var LINKS = [
    { label: 'DEVLOG · 02–A', title: '개발일지', titleEn: 'Devlog', href: BASE + '/make/eastwar.html' },
    { label: 'STILL · 01–C', title: '스틸', titleEn: 'Still', href: BASE + '/watch/still.html' },
    { label: 'OST · 01–B', title: 'OST', titleEn: '', href: BASE + '/watch/ost.html' },
    { label: 'FILM · 01–A', title: '영상', titleEn: 'Film', href: BASE + '/watch/ai-film.html' }
  ];

  var isMainPage = /^\/bykimjak\/?(index\.html)?$/.test(window.location.pathname);

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
      '#ew-hub-root{position:fixed;top:20px;right:20px;z-index:9998;',
      'font-family:var(--f-body,sans-serif);}',

      '#ew-hub-collapsed{width:56px;height:56px;border-radius:50%;',
      'background:var(--dark,#111);border:1px solid rgba(200,166,90,.55);',
      'display:flex;align-items:center;justify-content:center;cursor:grab;',
      'box-shadow:0 6px 18px rgba(0,0,0,.35);touch-action:none;user-select:none;',
      'transition:transform .2s cubic-bezier(.2,.8,.2,1), opacity .16s ease, box-shadow .18s ease;',
      'transform:scale(1);opacity:1;}',
      '#ew-hub-collapsed:active{cursor:grabbing;}',
      '#ew-hub-collapsed:hover{transform:scale(1.06);box-shadow:0 10px 24px rgba(0,0,0,.42);}',
      '#ew-hub-collapsed.ew-hidden{transform:scale(0);opacity:0;pointer-events:none;position:absolute;top:0;right:0;}',
      '#ew-hub-collapsed svg{width:22px;height:22px;pointer-events:none;}',

      '#ew-hub-panel{position:absolute;top:0;right:0;width:320px;height:400px;',
      'max-width:calc(100vw - 40px);background-image:url(' + BG_IMAGE + ');',
      'background-size:cover;background-position:center;border-radius:4px;',
      'box-shadow:0 20px 50px rgba(0,0,0,.5);overflow:hidden;',
      'display:flex;flex-direction:column;padding:34px 32px 22px;box-sizing:border-box;',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:top right;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1), opacity .22s ease;}',
      '#ew-hub-panel.ew-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#ew-hub-title{text-align:center;margin-bottom:8px;cursor:grab;touch-action:none;',
      'user-select:none;padding:2px 0 10px;}',
      '#ew-hub-title:active{cursor:grabbing;}',
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
      'padding:28px 24px 18px;}}'
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

  function forceReflow(node) {
    return node.offsetHeight;
  }

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function savePosition(left, top) {
    try { localStorage.setItem(POS_KEY, JSON.stringify({ left: left, top: top })); } catch (e) {}
  }
  function loadPosition() {
    try {
      var raw = localStorage.getItem(POS_KEY);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (typeof p.left === 'number' && typeof p.top === 'number') return p;
    } catch (e) {}
    return null;
  }

  // root를 특정 화면 좌표(left, top 픽셀)에 고정시킨다.
  // 처음엔 top:20px;right:20px 앵커로 떠있다가, 한 번이라도 옮기면
  // 이후로는 left/top 픽셀 좌표로 위치를 관리한다 (right/bottom 앵커 해제).
  function pinToPixels(root, left, top) {
    var w = root.offsetWidth || 56;
    var h = root.offsetHeight || 56;
    left = clamp(left, 4, window.innerWidth - w - 4);
    top = clamp(top, 4, window.innerHeight - h - 4);
    root.style.right = 'auto';
    root.style.left = left + 'px';
    root.style.top = top + 'px';
    return { left: left, top: top };
  }

  function makeDraggable(root, handle, onDragEnd) {
    var dragging = false;
    var moved = false;
    var startX = 0, startY = 0;
    var startLeft = 0, startTop = 0;

    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      var rect = root.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    });

    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        moved = true;
      }
      if (moved) {
        var pos = pinToPixels(root, startLeft + dx, startTop + dy);
        savePosition(pos.left, pos.top);
      }
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (onDragEnd) onDragEnd(moved, e);
    }
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);

    return { wasDragged: function () { return moved; } };
  }

  function init() {
    injectStyles();

    var root = el('div', { id: 'ew-hub-root' });

    var collapsed = el(
      'button',
      { id: 'ew-hub-collapsed', 'aria-label': 'EASTWAR 허브 열기 (드래그로 위치 이동 가능)' },
      collapsedIconSVG()
    );

    var panel = el('div', { id: 'ew-hub-panel', role: 'dialog', 'aria-label': 'EASTWAR 허브' });
    panel.innerHTML =
      '<div id="ew-hub-title" title="드래그해서 위치를 옮길 수 있어요">' +
      '<div class="ew-eyebrow">EASTWAR · 02–A</div>' +
      '<div class="ew-main">EASTWAR HUB</div>' +
      '</div>' +
      '<div id="ew-hub-links">' + buildLinks() + '</div>' +
      '<button id="ew-hub-close">닫기 ✕</button>';

    root.appendChild(collapsed);
    root.appendChild(panel);
    document.body.appendChild(root);

    // 저장된 위치가 있으면 그 자리에서 시작, 없으면 기본값(우측 상단) 유지
    // 단, 복원 시점에 뷰포트 크기가 아직 0으로 잡히면(백그라운드 탭 등) 건너뛴다 —
    // 그대로 pinToPixels를 호출하면 화면 밖 좌표로 clamp된 값이 굳어버린다.
    var saved = loadPosition();
    if (saved) {
      requestAnimationFrame(function () {
        if (!window.innerWidth || !window.innerHeight) return;
        pinToPixels(root, saved.left, saved.top);
      });
    }

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

    // 접힌 버튼: 드래그하면 이동, 그냥 클릭하면 열림
    var collapsedDrag = makeDraggable(root, collapsed, function (wasDragged) {
      if (!wasDragged) openPanel();
    });

    // 펼친 패널: 타이틀 영역을 잡고 드래그하면 이동 (링크는 그대로 클릭 가능)
    makeDraggable(root, panel.querySelector('#ew-hub-title'), function () {});

    panel.querySelector('#ew-hub-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('ew-open')) closePanel();
    });

    // 창 크기가 바뀌어도(모바일 회전 등) 위젯이 화면 밖으로 나가지 않게 보정
    // 단, 탭이 백그라운드로 가는 등 뷰포트 크기가 일시적으로 0으로 잡히는
    // 순간의 resize는 무시한다 (그대로 반영하면 위젯이 (4,4)로 튕겨나가 저장됨)
    window.addEventListener('resize', function () {
      if (!window.innerWidth || !window.innerHeight) return;
      var rect = root.getBoundingClientRect();
      if (root.style.left) {
        var pos = pinToPixels(root, rect.left, rect.top);
        savePosition(pos.left, pos.top);
      }
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
