/**
 * GAPPAE TRAILER POPUP — HOME ONLY
 * Rebuilt 2026-09-30 using EASTWAR-style robust structure.
 */
(function () {
  if (document.getElementById('gp-hub-root')) return;

  var BASE = '/bykimjak';
  var TARGET = BASE + '/make/gappae-trailer.html';
  var BG_IMAGE = BASE + '/assets/gappae-trailer/gappae-trailer-popup-01.jpg';
  var POS_KEY = 'gpHubPosV3';
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
    if (document.getElementById('gp-hub-style')) return;

    var css = [
      '#gp-hub-root{position:fixed;left:20px;top:20px;z-index:9999;width:58px;height:58px;',
      'font-family:var(--f-body,sans-serif);}',

      '#gp-hub-collapsed{position:absolute;left:0;top:0;width:58px;height:58px;border-radius:50%;',
      'display:grid;place-items:center;cursor:grab;touch-action:none;user-select:none;',
      'background:radial-gradient(circle at 40% 32%,#3b3023 0,#17120d 58%,#090806 100%);',
      'border:1px solid rgba(214,174,88,.82);',
      'box-shadow:0 8px 24px rgba(0,0,0,.42),inset 0 0 0 3px rgba(118,78,24,.28);',
      'color:#d8b569;font-family:var(--f-kr,var(--f-body,sans-serif));font-size:23px;font-weight:700;',
      'transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .16s ease,box-shadow .18s ease;}',

      '#gp-hub-collapsed:hover{transform:scale(1.06);',
      'box-shadow:0 12px 30px rgba(0,0,0,.48),inset 0 0 0 3px rgba(118,78,24,.34);}',
      '#gp-hub-collapsed:active{cursor:grabbing;}',
      '#gp-hub-collapsed.gp-hidden{transform:scale(0);opacity:0;pointer-events:none;}',

      '#gp-hub-panel{position:absolute;left:0;top:0;width:320px;max-width:calc(100vw - 24px);',
      'aspect-ratio:3/4;border-radius:6px;overflow:hidden;',
      'background-image:url("' + BG_IMAGE + '");background-size:cover;background-position:center;',
      'box-shadow:0 20px 55px rgba(0,0,0,.55);',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:top left;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1),opacity .22s ease;}',

      '#gp-hub-panel.gp-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '#gp-hub-drag{position:absolute;left:7%;right:7%;top:2%;height:18%;z-index:4;',
      'cursor:grab;touch-action:none;user-select:none;}',
      '#gp-hub-drag:active{cursor:grabbing;}',

      '#gp-hub-enter{position:absolute;left:29%;right:29%;top:72.5%;height:11%;z-index:6;',
      'display:block;border-radius:3px;background:transparent;color:transparent;',
      'font-size:0;text-decoration:none;cursor:pointer;}',
      '#gp-hub-enter:focus-visible{outline:2px solid #e2bc69;outline-offset:-3px;}',

      '#gp-hub-close{position:absolute;left:36%;right:36%;top:88%;height:6%;z-index:7;',
      'border:0;background:transparent;color:transparent;font-size:0;cursor:pointer;padding:0;}',
      '#gp-hub-close:focus-visible{outline:1px solid #c79a4d;outline-offset:-2px;}',

      '@media(max-width:760px){',
      '#gp-hub-panel{width:min(320px,calc(100vw - 24px));}',
      '#gp-hub-root{left:12px;top:auto;bottom:12px;}',
      '}'
    ].join('');

    document.head.appendChild(el('style', { id: 'gp-hub-style' }, css));
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

  function activeSize(panel, collapsed) {
    if (panel.classList.contains('gp-open')) {
      return { width: panel.offsetWidth || 320, height: panel.offsetHeight || 427 };
    }
    return { width: collapsed.offsetWidth || 58, height: collapsed.offsetHeight || 58 };
  }

  function pinToPixels(root, panel, collapsed, left, top) {
    var size = activeSize(panel, collapsed);
    var maxLeft = Math.max(4, window.innerWidth - size.width - 4);
    var maxTop = Math.max(4, window.innerHeight - size.height - 4);
    left = clamp(left, 4, maxLeft);
    top = clamp(top, 4, maxTop);
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.style.left = left + 'px';
    root.style.top = top + 'px';
    return { left: left, top: top };
  }

  function defaultPosition() {
    var panelW = Math.min(320, Math.max(280, window.innerWidth - 24));
    var panelH = panelW * 4 / 3;
    if (window.innerWidth <= 760) {
      return { left: 12, top: Math.max(76, window.innerHeight - panelH - 12) };
    }
    return { left: 20, top: 20 };
  }

  function makeDraggable(root, panel, collapsed, handle, onEnd) {
    var dragging = false;
    var moved = false;
    var startX = 0, startY = 0, startLeft = 0, startTop = 0;

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
      if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) moved = true;
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

    var root = el('div', { id: 'gp-hub-root' });
    var collapsed = el('button', {
      id: 'gp-hub-collapsed',
      type: 'button',
      'aria-label': '갑패 트레일러 팝업 열기'
    }, '갑');

    var panel = el('div', {
      id: 'gp-hub-panel',
      role: 'dialog',
      'aria-label': '갑패 트레일러 작업 바로가기'
    });

    panel.innerHTML =
      '<div id="gp-hub-drag" title="드래그해서 위치를 옮길 수 있어요"></div>' +
      '<a id="gp-hub-enter" href="' + TARGET + '" aria-label="갑패 트레일러 제작일지로 바로가기">바로가기</a>' +
      '<button id="gp-hub-close" type="button" aria-label="갑패 트레일러 팝업 닫기">닫기</button>';

    root.appendChild(collapsed);
    root.appendChild(panel);
    document.body.appendChild(root);

    var saved = loadPosition();

    function openPanel() {
      collapsed.classList.add('gp-hidden');
      panel.classList.add('gp-open');

      requestAnimationFrame(function () {
        if (!window.innerWidth || !window.innerHeight) return;
        var p = saved || defaultPosition();
        var pos = pinToPixels(root, panel, collapsed, p.left, p.top);
        if (!saved) savePosition(pos.left, pos.top);
      });
    }

    function closePanel() {
      panel.classList.remove('gp-open');
      collapsed.classList.remove('gp-hidden');

      requestAnimationFrame(function () {
        if (!window.innerWidth || !window.innerHeight) return;
        var rect = root.getBoundingClientRect();
        var pos = pinToPixels(root, panel, collapsed, rect.left, rect.top);
        savePosition(pos.left, pos.top);
      });
    }

    makeDraggable(root, panel, collapsed, collapsed, function (wasDragged) {
      if (!wasDragged) openPanel();
    });

    makeDraggable(root, panel, collapsed, panel.querySelector('#gp-hub-drag'), function () {});

    panel.querySelector('#gp-hub-close').addEventListener('click', closePanel);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('gp-open')) closePanel();
    });

    window.addEventListener('resize', function () {
      if (!window.innerWidth || !window.innerHeight) return;
      var rect = root.getBoundingClientRect();
      var pos = pinToPixels(root, panel, collapsed, rect.left, rect.top);
      savePosition(pos.left, pos.top);
    });

    // 첫 진입은 축약 아이콘이 아니라 포스터 팝업이 바로 보인다.
    openPanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();