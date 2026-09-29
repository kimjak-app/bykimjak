/**
 * GAPPAE TRAILER POPUP — HOME 전용 바로가기 위젯 v1
 * - 갑패 트레일러 제작일지(02-D) 바로가기
 * - HOME에서 세션당 자동 오픈
 * - 닫으면 원형 버튼으로 축소
 * - 접힌 버튼/상단 타이틀 영역 드래그 이동
 * - 위치 localStorage 저장
 */
(function () {
  if (document.getElementById('gp-popup-root')) return;

  var BASE = '/bykimjak';
  var TARGET = BASE + '/make/gappae-trailer.html';
  var BG_IMAGE = BASE + '/assets/gappae-trailer/keyart-master-01.png';
  var POS_KEY = 'gappaePopupPos';
  var SESSION_KEY = 'gappaePopupClosed';
  var DRAG_THRESHOLD = 4;

  var isMainPage = /^\\/bykimjak\\/?(index\\.html)?$/.test(window.location.pathname);
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
      '#gp-popup-root{position:fixed;left:20px;top:20px;z-index:9997;',
      'font-family:var(--f-body,sans-serif);width:58px;height:58px;}',

      '#gp-popup-collapsed{position:absolute;left:0;top:0;width:58px;height:58px;border-radius:50%;',
      'display:grid;place-items:center;cursor:grab;touch-action:none;user-select:none;',
      'background:radial-gradient(circle at 40% 32%,#3b3023 0,#17120d 58%,#090806 100%);',
      'border:1px solid rgba(214,174,88,.82);',
      'box-shadow:0 8px 24px rgba(0,0,0,.42),inset 0 0 0 3px rgba(118,78,24,.28);',
      'color:#d8b569;font-family:var(--f-kr,var(--f-body,sans-serif));font-size:23px;font-weight:700;',
      'transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .16s ease,box-shadow .18s ease;}',

      '#gp-popup-collapsed:hover{transform:scale(1.06);box-shadow:0 12px 30px rgba(0,0,0,.48),inset 0 0 0 3px rgba(118,78,24,.34);}',
      '#gp-popup-collapsed:active{cursor:grabbing;}',
      '#gp-popup-collapsed.gp-hidden{transform:scale(0);opacity:0;pointer-events:none;}',

      '#gp-popup-panel{position:absolute;left:0;top:0;width:320px;max-width:calc(100vw - 24px);',
      'aspect-ratio:3/4;overflow:hidden;border-radius:5px;',
      'background-image:linear-gradient(180deg,rgba(5,4,3,.12) 0%,rgba(5,4,3,.26) 42%,rgba(5,4,3,.72) 72%,rgba(5,4,3,.88) 100%),url(' + BG_IMAGE + ');',
      'background-size:cover;background-position:center;',
      'box-shadow:0 20px 55px rgba(0,0,0,.55);',
      'transform:scale(.9);opacity:0;pointer-events:none;transform-origin:top left;',
      'transition:transform .26s cubic-bezier(.2,.8,.2,1),opacity .22s ease;}',

      '#gp-popup-panel::before{content:"";position:absolute;inset:7px;border:2px solid rgba(202,157,65,.9);',
      'box-shadow:inset 0 0 0 1px rgba(82,49,14,.9),0 0 0 1px rgba(15,10,5,.9);pointer-events:none;z-index:2;}',

      '#gp-popup-panel::after{content:"";position:absolute;inset:14px;border:1px solid rgba(181,132,48,.38);pointer-events:none;z-index:2;}',

      '#gp-popup-panel.gp-open{transform:scale(1);opacity:1;pointer-events:auto;}',

      '.gp-corner{position:absolute;width:24px;height:24px;z-index:4;pointer-events:none;}',
      '.gp-corner::before,.gp-corner::after{content:"";position:absolute;background:#c89a45;}',
      '.gp-corner::before{width:24px;height:2px;top:0;left:0;}',
      '.gp-corner::after{width:2px;height:24px;top:0;left:0;}',
      '.gp-corner.tl{left:17px;top:17px;}',
      '.gp-corner.tr{right:17px;top:17px;transform:rotate(90deg);}',
      '.gp-corner.br{right:17px;bottom:17px;transform:rotate(180deg);}',
      '.gp-corner.bl{left:17px;bottom:17px;transform:rotate(270deg);}',

      '#gp-popup-drag{position:absolute;left:42px;right:42px;top:26px;z-index:5;text-align:center;',
      'cursor:grab;touch-action:none;user-select:none;padding:4px 0 14px;}',
      '#gp-popup-drag:active{cursor:grabbing;}',
      '#gp-popup-drag .gp-eyebrow{font-family:var(--f-mono,monospace);font-size:9px;letter-spacing:.18em;',
      'color:#d1a95f;text-shadow:0 1px 4px #000;margin-bottom:5px;}',
      '#gp-popup-drag .gp-head{font-family:var(--f-display,var(--f-body,sans-serif));font-size:12px;',
      'letter-spacing:.13em;color:#f3ead7;text-shadow:0 2px 6px #000;text-transform:uppercase;}',

      '#gp-popup-copy{position:absolute;left:28px;right:28px;bottom:110px;z-index:5;text-align:center;',
      'pointer-events:none;text-shadow:0 2px 10px rgba(0,0,0,.95);}',
      '#gp-popup-copy .gp-kicker{font-family:var(--f-kr,var(--f-body,sans-serif));font-size:22px;',
      'font-weight:700;letter-spacing:-.04em;color:#e3c27c;margin-bottom:5px;}',
      '#gp-popup-copy .gp-title{font-family:var(--f-kr,var(--f-body,sans-serif));font-size:18px;',
      'font-weight:600;letter-spacing:-.02em;color:#fff3dd;}',

      '#gp-popup-enter{position:absolute;left:50%;bottom:58px;transform:translateX(-50%);z-index:6;',
      'width:62%;min-width:170px;height:46px;display:flex;align-items:center;justify-content:center;',
      'border:1px solid rgba(222,183,98,.88);background:rgba(15,11,7,.62);',
      'box-shadow:inset 0 0 0 2px rgba(92,58,18,.45),0 6px 18px rgba(0,0,0,.24);',
      'font-family:var(--f-kr,var(--f-body,sans-serif));font-size:18px;font-weight:600;',
      'letter-spacing:.04em;color:#f2d9a0;text-decoration:none;',
      'transition:background .18s ease,transform .18s ease,box-shadow .18s ease;}',
      '#gp-popup-enter:hover{background:rgba(64,43,18,.78);transform:translateX(-50%) translateY(-2px);',
      'box-shadow:inset 0 0 0 2px rgba(122,82,28,.5),0 10px 24px rgba(0,0,0,.34);}',

      '#gp-popup-enter small{position:absolute;top:48px;font-family:var(--f-mono,monospace);',
      'font-size:8px;letter-spacing:.18em;color:#b89a64;white-space:nowrap;font-weight:400;}',

      '#gp-popup-close{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:7;',
      'border:0;background:transparent;cursor:pointer;padding:5px 12px;',
      'font-family:var(--f-mono,monospace);font-size:9px;letter-spacing:.12em;color:#a98a55;',
      'text-shadow:0 1px 5px #000;}',
      '#gp-popup-close:hover{color:#e1bc72;}',

      '@media(max-width:760px){#gp-popup-panel{width:min(320px,calc(100vw - 24px));}',
      '#gp-popup-copy{bottom:108px;}#gp-popup-enter{bottom:58px;}}'
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

  function defaultPosition(panel) {
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
      '<span class="gp-corner tl"></span>' +
      '<span class="gp-corner tr"></span>' +
      '<span class="gp-corner br"></span>' +
      '<span class="gp-corner bl"></span>' +
      '<div id="gp-popup-drag" title="드래그해서 위치를 옮길 수 있어요">' +
        '<div class="gp-eyebrow">GAPPAE TRAILER · 02–D</div>' +
        '<div class="gp-head">TRAILER WORKSPACE</div>' +
      '</div>' +
      '<div id="gp-popup-copy">' +
        '<div class="gp-kicker">갑패</div>' +
        '<div class="gp-title">트레일러 작업</div>' +
      '</div>' +
      '<a id="gp-popup-enter" href="' + TARGET + '" aria-label="갑패 트레일러 제작일지로 바로가기">' +
        '바로가기<small>TRAILER WORKSPACE</small>' +
      '</a>' +
      '<button id="gp-popup-close" type="button" aria-label="갑패 트레일러 팝업 닫기">닫기 ✕</button>';

    root.appendChild(collapsed);
    root.appendChild(panel);
    document.body.appendChild(root);

    var saved = loadPosition();
    requestAnimationFrame(function () {
      if (!window.innerWidth || !window.innerHeight) return;
      var p = saved || defaultPosition(panel);
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

    if (!alreadyClosed) {
      setTimeout(openPanel, 900);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();