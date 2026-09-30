/**
 * GAPPAE TRAILER POPUP — HOME 전용 바로가기 위젯 v2
 * 2026-09-30
 * - 승인된 갑패 트레일러 팝업 아트워크를 패널 자체로 사용
 * - 이미지 위 바로가기/닫기 영역만 투명 인터랙션으로 유지
 * - 접힌 버튼/상단 영역 드래그 이동
 * - 위치 localStorage 저장
 * - 모바일에서는 EASTWAR HUB 자동 오픈과 겹치지 않게 단독 자동 오픈
 */
(function () {
  if (document.getElementById('gp-popup-root')) return;

  var BASE = '/bykimjak';
  var TARGET = BASE + '/make/gappae-trailer.html';
  var PANEL_IMAGE = BASE + '/assets/gappae-trailer/gappae-trailer-popup-01.jpg';
  var POS_KEY = 'gappaePopupPosV2';
  var SESSION_KEY = 'gappaePopupClosedV2';
  var DRAG_THRESHOLD = 4;

  var isMainPage = /^\/bykimjak\/?(index\.html)?$/.test(window.location.pathname);
  if (!isMainPage) return;

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
    if (document.getElementById('gp-popup-style')) return;

    var css = [
      '#gp-popup-root{position:fixed;left:20px;top:20px;z-index:9997;width:58px;height:58px;',
      'font-family:var(--f-body,sans-serif);}',

      '#gp-popup-collapsed{position:absolute;left:0;top:0;width:58px;height:58px;border-radius:50%;',
      'display:grid;place-items:center;cursor:grab;touch-action:none;user-select:none;',
      'background:radial-gradient(circle at 40% 32%,#3b3023 0,#17120d 58%,#090806 100%);',
      'border:1px solid rgba(214,174,88,.82);',
      'box-shadow:0 8px 24px rgba(0,0,0,.42),inset 0 0 0 3px rgba(118,78,24,.28);',
      'color:#d8b569;font-family:var(--f-kr,var(--f-body,sans-serif));font-size:23px;font-weight:700;',
      'transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .16s ease,box-shadow .18s ease;}',

      '#gp-popup-collapsed:hover{transform:scale(1.06);',
      'box-shadow:0 12px 30px rgba(0,0,0,.48),inset 0 0 0 3px rgba(118,78,24,.34);}',
      '#gp-popup-collapsed:active{cursor:grabbing;}',
      '#gp-popup-collapsed.gp-hidden{transform:scale(0);opacity:0;pointer-events:none;}',

      '#gp-popup-panel{position:absolute;left:0;top:0;width:320px;max-width:calc(100vw - 24px);',
      'aspect-ratio:3/4;overflow:hidden;border-radius:6px;',
      'box-shadow:0 20px 55px rgba(0,0,0,.55);background:transparent;',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:top left;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1),opacity .22s ease;}',

      '#gp-popup-panel.gp-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#gp-popup-art{position:absolute;inset:0;width:100%;height:100%;display:block;',
      'object-fit:cover;user-select:none;-webkit-user-drag:none;pointer-events:none;}',

      '#gp-popup-drag{position:absolute;left:7%;right:7%;top:2%;height:18%;z-index:4;',
      'cursor:grab;touch-action:none;user-select:none;}',
      '#gp-popup-drag:active{cursor:grabbing;}',

      '#gp-popup-caption{position:absolute;left:10%;right:10%;top:65.5%;z-index:5;text-align:center;',
      'font-family:var(--f-kr,var(--f-body,sans-serif));font-size:13px;font-weight:700;',
      'letter-spacing:.04em;color:#f3e6ca;text-shadow:0 2px 8px rgba(0,0,0,.95);}',
      '#gp-popup-enter{position:absolute;left:27%;right:27%;top:72%;height:11%;z-index:6;',
      'display:flex;align-items:center;justify-content:center;border-radius:4px;',
      'border:1px solid rgba(226,188,105,.88);background:rgba(11,9,7,.78);',
      'color:#f3e6ca;font-family:var(--f-kr,var(--f-body,sans-serif));font-size:14px;',
      'font-weight:700;letter-spacing:.06em;text-decoration:none;cursor:pointer;',
      'box-shadow:0 6px 20px rgba(0,0,0,.38);backdrop-filter:blur(2px);}',
      '#gp-popup-enter:hover{background:rgba(40,28,15,.88);}',
      '#gp-popup-enter:focus-visible{outline:2px solid #e2bc69;outline-offset:2px;}',

      '#gp-popup-close{position:absolute;left:36%;right:36%;top:88%;height:6%;z-index:7;',
      'border:0;background:rgba(0,0,0,.42);color:#c9b184;font-size:11px;cursor:pointer;padding:0;',
      'border-radius:999px;}',
      '#gp-popup-close:focus-visible{outline:1px solid #c79a4d;outline-offset:-2px;}',

      '@media(max-width:760px){',
      '#gp-popup-panel{width:min(320px,calc(100vw - 24px));}',
      '#gp-popup-root{z-index:9999;}',
      '}'
    ].join('');

    document.head.appendChild(el('style', { id: 'gp-popup-style' }, css));
  }

  function forceReflow(node) {
    return node.offsetHeight;
  }

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function savePosition(left, top) {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ left: left, top: top }));
    } catch (e) {}
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

  function activeSize(panel, collapsed) {
    if (panel.classList.contains('gp-open')) {
      return {
        width: panel.offsetWidth || 320,
        height: panel.offsetHeight || 427
      };
    }
    return {
      width: collapsed.offsetWidth || 58,
      height: collapsed.offsetHeight || 58
    };
  }

  function pinToPixels(root, panel, collapsed, left, top) {
    var size = activeSize(panel, collapsed);
    var maxLeft = Math.max(4, window.innerWidth - size.width - 4);
    var maxTop = Math.max(4, window.innerHeight - size.height - 4);
    left = clamp(left, 4, maxLeft);
    top = clamp(top, 4, maxTop);
    root.style.left = left + 'px';
    root.style.top = top + 'px';
    return { left: left, top: top };
  }

  function defaultPosition() {
    var panelW = Math.min(320, Math.max(280, window.innerWidth - 24));
    var panelH = panelW * 4 / 3;

    if (window.innerWidth <= 760) {
      return {
        left: 12,
        top: Math.max(76, window.innerHeight - panelH - 12)
      };
    }

    return { left: 20, top: 20 };
  }

  function makeDraggable(root, panel, collapsed, handle, onEnd) {
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var startLeft = 0;
    var startTop = 0;

    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      var rect = root.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
    });

    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        moved = true;
      }
      if (!moved) return;

      var pos = pinToPixels(root, panel, collapsed, startLeft + dx, startTop + dy);
      savePosition(pos.left, pos.top);
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (onEnd) onEnd(moved, e);
    }

    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
  }

  function init() {
    injectStyles();

    var root = el('div', { id: 'gp-popup-root' });

    var collapsed = el('button', {
      id: 'gp-popup-collapsed',
      type: 'button',
      'aria-label': '갑패 트레일러 작업 팝업 열기. 드래그로 위치 이동 가능'
    }, '갑');

    var panel = el('div', {
      id: 'gp-popup-panel',
      role: 'dialog',
      'aria-label': '갑패 트레일러 작업 바로가기'
    });

    panel.innerHTML =
      '<img id="gp-popup-art" src="' + PANEL_IMAGE + '" alt="갑패 트레일러 팝업 이미지" draggable="false">' +
      '<div id="gp-popup-drag" title="드래그해서 위치를 옮길 수 있어요"></div>' +
      '<div id="gp-popup-caption">갑패 트레일러 작업</div>' +
      '<a id="gp-popup-enter" href="' + TARGET + '" aria-label="갑패 트레일러 제작일지로 바로가기">바로가기</a>' +
      '<button id="gp-popup-close" type="button" aria-label="갑패 트레일러 팝업 닫기">닫기</button>';

    root.appendChild(collapsed);
    root.appendChild(panel);
    document.body.appendChild(root);

    var saved = loadPosition();

    requestAnimationFrame(function () {
      if (!window.innerWidth || !window.innerHeight) return;
      var p = saved || defaultPosition();
      var pos = pinToPixels(root, panel, collapsed, p.left, p.top);
      if (!saved) savePosition(pos.left, pos.top);
    });

    function openPanel() {
      collapsed.classList.add('gp-hidden');
      forceReflow(panel);

      requestAnimationFrame(function () {
        panel.classList.add('gp-open');

        requestAnimationFrame(function () {
          if (!window.innerWidth || !window.innerHeight) return;
          var rect = root.getBoundingClientRect();
          var pos = pinToPixels(root, panel, collapsed, rect.left, rect.top);
          savePosition(pos.left, pos.top);
        });
      });
    }

    function closePanel() {
      panel.classList.remove('gp-open');
      forceReflow(collapsed);

      requestAnimationFrame(function () {
        collapsed.classList.remove('gp-hidden');

        requestAnimationFrame(function () {
          if (!window.innerWidth || !window.innerHeight) return;
          var rect = root.getBoundingClientRect();
          var pos = pinToPixels(root, panel, collapsed, rect.left, rect.top);
          savePosition(pos.left, pos.top);
        });
      });

      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch (e) {}
    }

    makeDraggable(root, panel, collapsed, collapsed, function (wasDragged) {
      if (!wasDragged) openPanel();
    });

    makeDraggable(root, panel, collapsed, panel.querySelector('#gp-popup-drag'), function () {});

    panel.querySelector('#gp-popup-close').addEventListener('click', closePanel);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('gp-open')) closePanel();
    });

    window.addEventListener('resize', function () {
      if (!window.innerWidth || !window.innerHeight) return;
      var rect = root.getBoundingClientRect();
      var pos = pinToPixels(root, panel, collapsed, rect.left, rect.top);
      savePosition(pos.left, pos.top);
    });

    var alreadyClosed = false;
    try {
      alreadyClosed = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {}

    // AUTO OPEN FIX 2026-09-30:
    // 이미지가 준비되기 전에 검은 패널이 먼저 보이지 않도록,
    // 갑패 아트워크 로딩 완료 후 즉시 팝업을 연다.
    if (!alreadyClosed) {
      var art = panel.querySelector('#gp-popup-art');
      var autoOpen = function () {
        if (!panel.classList.contains('gp-open')) openPanel();
      };

      if (art.complete && art.naturalWidth > 0) {
        requestAnimationFrame(autoOpen);
      } else {
        art.addEventListener('load', autoOpen, { once: true });
        art.addEventListener('error', function () {
          collapsed.classList.remove('gp-hidden');
        }, { once: true });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();