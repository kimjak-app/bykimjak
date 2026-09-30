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
  var PANEL_IMAGE = 'data:image/jpeg;base64,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';
  var POS_KEY = 'gappaePopupPosV2';
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
      'box-shadow:0 20px 55px rgba(0,0,0,.55);background:#0b0907;',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:top left;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1),opacity .22s ease;}',

      '#gp-popup-panel.gp-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#gp-popup-art{position:absolute;inset:0;width:100%;height:100%;display:block;',
      'object-fit:cover;user-select:none;-webkit-user-drag:none;pointer-events:none;}',

      '#gp-popup-drag{position:absolute;left:7%;right:7%;top:2%;height:18%;z-index:4;',
      'cursor:grab;touch-action:none;user-select:none;}',
      '#gp-popup-drag:active{cursor:grabbing;}',

      '#gp-popup-enter{position:absolute;left:29%;right:29%;top:72.5%;height:11%;z-index:6;',
      'display:block;border-radius:3px;background:transparent;color:transparent;',
      'font-size:0;text-decoration:none;cursor:pointer;}',
      '#gp-popup-enter:focus-visible{outline:2px solid #e2bc69;outline-offset:-3px;}',

      '#gp-popup-close{position:absolute;left:36%;right:36%;top:88%;height:6%;z-index:7;',
      'border:0;background:transparent;color:transparent;font-size:0;cursor:pointer;padding:0;}',
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
      '<img id="gp-popup-art" src="' + PANEL_IMAGE + '" alt="" aria-hidden="true" draggable="false">' +
      '<div id="gp-popup-drag" title="드래그해서 위치를 옮길 수 있어요"></div>' +
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

    // 매번 홈 진입 시 원본 포스터 팝업을 바로 연다.
    {
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