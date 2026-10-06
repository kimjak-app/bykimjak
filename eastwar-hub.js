/**
 * byKimjak PROJECT HUB — GAPPAE + EASTWAR, 20261001-combined-02
 * One widget; live HTML links; 640x960 web-optimized artwork from the supplied PNG.
 * Starts collapsed so the homepage trailer remains unobstructed.
 */
(function () {
  'use strict';
  if (window.__byKimjakProjectHubV1) return;
  window.__byKimjakProjectHubV1 = true;

  var BASE = '/bykimjak';
  var VERSION = '20261001-combined-02';
  var ART = BASE + '/assets/ui/gappae-eastwar-popup-bg-01.webp?v=' + VERSION;
  var POSITION_KEY = 'byKimjakProjectHubPositionV1';
  var HOME = new RegExp('^' + BASE + '/?(?:index\\.html)?$').test(location.pathname);
  var LINKS = [
    ['DEVLOG · 02–A', '개발일지', 'Devlog', '/make/eastwar.html'],
    ['WATCH · EASTWAR', '작품 허브', 'Works', '/watch/eastwar.html'],
    ['OST · EASTWAR', 'OST', '', '/watch/eastwar.html#ost'],
    ['FILM · EASTWAR', '영상', 'Film', '/watch/eastwar.html#trailer']
  ];

  function init() {
    // Older pages receive menu fixes without rewriting their document content.
    if (document.querySelector('nav.nav')) {
      if (!document.querySelector('link[href$="assets/css/site-navigation.css"]')) {
        var navigationStyle = document.createElement('link');
        navigationStyle.rel = 'stylesheet';
        navigationStyle.href = BASE + '/assets/css/site-navigation.css';
        document.head.appendChild(navigationStyle);
      }
      if (!document.querySelector('script[src$="assets/js/site-navigation.js"]')) {
        var navigationScript = document.createElement('script');
        navigationScript.src = BASE + '/assets/js/site-navigation.js';
        document.body.appendChild(navigationScript);
      }
    }
    if (document.getElementById('project-hub-root')) return;
    // Remove only our superseded widgets, never page content or unrelated dialogs.
    ['gp-popup-root', 'gp-hub-root', 'gappae-popup-clean', 'ew-hub-root'].forEach(function (id) {
      var old = document.getElementById(id);
      if (old) old.remove();
    });
    var root = document.createElement('div');
    root.id = 'project-hub-root';
    root.dataset.version = VERSION;
    root.dataset.art = 'loading';
    root.style.cssText = 'all:initial;position:fixed;z-index:9998;visibility:hidden;display:block;';
    // Page-wide CSS and image-slot observers cannot alter this widget's controls.
    var shadow = root.attachShadow({ mode: 'open' });
    var style = document.createElement('style');
    style.textContent = `
      :host{color-scheme:light;font-family:var(--f-kr,"Pretendard Variable",system-ui,sans-serif);}
      *,*::before,*::after{box-sizing:border-box;}
      [hidden]{display:none!important;}
      button,a{-webkit-tap-highlight-color:transparent;}
      button{font:inherit;cursor:pointer;}
      a{color:inherit;text-decoration:none;}
      #ph-panel{position:relative;width:var(--ph-width,320px);max-height:var(--ph-max-height,650px);
        overflow:auto;overscroll-behavior:contain;border-radius:7px;
        box-shadow:0 16px 42px rgba(0,0,0,.35);scrollbar-width:thin;}
      #ph-card{position:relative;isolation:isolate;width:100%;height:var(--ph-card-height,480px);
        background:#f3eee5 center top/100% 100% no-repeat;color:#29241d;}
      #ph-card::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;}
      :host([data-art="ready"]) #ph-card{color:#fff8e9;background-color:#211d18;}
      :host([data-art="ready"]) #ph-card::before{background:linear-gradient(180deg,
        rgba(0,0,0,.08) 0%,rgba(0,0,0,.16) 34.375%,rgba(0,0,0,.26) 34.375%,rgba(0,0,0,.36) 100%);}
      .ph-gappae{height:34.375%;display:flex;flex-direction:column;align-items:center;
        justify-content:center;padding:19px 28px 17px;}
      .ph-heading{margin:0;text-align:center;cursor:grab;touch-action:none;user-select:none;}
      .ph-heading:active{cursor:grabbing;}
      .ph-eyebrow{display:block;font-family:var(--f-mono,monospace);font-size:9px;line-height:1.4;
        font-weight:500;letter-spacing:.16em;color:#66532f;}
      .ph-gappae h2{margin:6px 0 0;font-size:18px;font-weight:650;line-height:1.35;letter-spacing:-.015em;}
      #ph-gappae-link{display:flex;align-items:center;justify-content:center;gap:16px;
        min-height:44px;width:158px;margin-top:13px;border:1px solid #b59b65;border-radius:3px;
        font-size:14px;font-weight:650;letter-spacing:.03em;background:rgba(255,255,255,.5);}
      .ph-eastwar{height:65.625%;padding:15px 28px 7px;display:flex;flex-direction:column;}
      .ph-eastwar h2{margin:0;font-family:var(--f-display,system-ui,sans-serif);font-size:16px;
        font-weight:600;line-height:1.4;letter-spacing:.12em;text-align:center;}
      .ph-links{display:flex;flex:1;min-height:0;flex-direction:column;justify-content:center;gap:3px;}
      .ph-link{display:flex;flex-direction:column;align-items:center;justify-content:center;
        min-height:44px;padding:4px 4px 6px;border-bottom:1px solid rgba(112,89,43,.25);}
      .ph-link:last-child{border-bottom:0;}
      .ph-label{font-family:var(--f-mono,monospace);font-size:9px;line-height:1.25;
        letter-spacing:.11em;font-weight:500;color:#66532f;}
      .ph-name{font-size:14px;font-weight:600;line-height:1.45;}
      .ph-en{font-size:10px;font-weight:400;margin-left:4px;}
      #ph-close{flex-shrink:0;align-self:center;min-width:130px;min-height:44px;padding:7px 12px;
        border:0;background:none;font-size:11px;letter-spacing:.1em;color:inherit;}
      #ph-top-close{position:absolute;right:2px;top:2px;z-index:3;width:44px;height:44px;
        padding:0;border:0;border-radius:50%;background:transparent;color:inherit;font-size:18px;}
      :host([data-art="ready"]) .ph-heading,
      :host([data-art="ready"]) .ph-name,
      :host([data-art="ready"]) #ph-close,
      :host([data-art="ready"]) #ph-top-close{text-shadow:0 1px 3px #000,0 0 10px rgba(0,0,0,.85);}
      :host([data-art="ready"]) #ph-top-close{color:#fff8e9;}
      :host([data-art="ready"]) .ph-eyebrow,
      :host([data-art="ready"]) .ph-label{color:#ead8ac;text-shadow:0 1px 3px #000;}
      :host([data-art="ready"]) #ph-gappae-link{background:rgba(15,12,9,.7);border-color:#c8a86a;color:#fff4dc;}
      :host([data-art="ready"]) .ph-link{border-color:rgba(230,205,150,.32);
        background:linear-gradient(90deg,transparent,rgba(10,8,6,.32) 25%,rgba(10,8,6,.32) 75%,transparent);}
      a:hover{filter:brightness(1.12);}
      a:focus-visible,button:focus-visible{outline:2px solid #d8b65e;outline-offset:-3px;}
      #ph-collapsed{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;
        background:#17130f;border:1px solid #c8a86a;box-shadow:0 6px 18px rgba(0,0,0,.28);
        color:#dec38d;touch-action:none;cursor:grab;padding:0;}
      #ph-collapsed svg{width:25px;height:25px;pointer-events:none;}
      #ph-collapsed:active{cursor:grabbing;}
      :host([data-art="missing"]) .ph-gappae{border-bottom:1px solid #b59b65;}
      @media(prefers-reduced-motion:no-preference){a,button{transition:filter .15s ease;}}
    `;
    shadow.appendChild(style);
    var panel = document.createElement('section');
    panel.id = 'ph-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', '갑패 트레일러와 EASTWAR 바로가기');
    panel.innerHTML = '<div id="ph-card">' +
      '<section class="ph-gappae" aria-labelledby="ph-gappae-title">' +
      '<div class="ph-heading" title="드래그하여 이동">' +
      '<span class="ph-eyebrow">GAPPAE TRAILER</span>' +
      '<h2 id="ph-gappae-title">갑패 트레일러 작업</h2></div>' +
      '<a id="ph-gappae-link" href="' + BASE + '/make/gappae-trailer.html">바로가기 <span aria-hidden="true">→</span></a>' +
      '</section><section class="ph-eastwar" aria-labelledby="ph-eastwar-title">' +
      '<h2 class="ph-heading" id="ph-eastwar-title" title="드래그하여 이동">EASTWAR HUB</h2>' +
      '<nav class="ph-links" aria-label="EASTWAR 메뉴">' + LINKS.map(function (link) {
        return '<a class="ph-link" href="' + BASE + link[3] + '"><span class="ph-label">' + link[0] +
          '</span><span class="ph-name">' + link[1] + (link[2] ? '<span class="ph-en">(' + link[2] + ')</span>' : '') + '</span></a>';
      }).join('') + '</nav><button id="ph-close" type="button">닫기 ✕</button></section></div>' +
      '<button id="ph-top-close" type="button" aria-label="통합 팝업 접기">×</button>';
    var collapsed = document.createElement('button');
    collapsed.id = 'ph-collapsed';
    collapsed.type = 'button';
    collapsed.setAttribute('aria-label', '갑패 · EASTWAR 통합 팝업 열기. 드래그하여 이동 가능');
    collapsed.setAttribute('aria-controls', 'ph-panel');
    collapsed.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z"/><path d="M8 9l8 8M16 9l-8 8M7 8l2 2M15 10l2-2"/></svg>';
    shadow.appendChild(panel);
    shadow.appendChild(collapsed);
    document.body.appendChild(root);

    var isOpen = false;
    var position = null;
    var ready = false;
    var card = shadow.getElementById('ph-card');
    try {
      var stored = JSON.parse(localStorage.getItem(POSITION_KEY));
      if (stored && typeof stored.left === 'number' && isFinite(stored.left) &&
          typeof stored.top === 'number' && isFinite(stored.top)) position = stored;
    } catch (e) { /* Storage disabled must not disable navigation. */ }

    function viewport() {
      var vv = window.visualViewport;
      return { width: vv ? vv.width : document.documentElement.clientWidth,
        height: vv ? vv.height : window.innerHeight,
        left: vv ? vv.offsetLeft : 0, top: vv ? vv.offsetTop : 0 };
    }
    function place() {
      var view = viewport();
      if (view.width < 1 || view.height < 1) return;
      var width = Math.min(320, Math.max(1, view.width - 24));
      var cardHeight = Math.max(420, width * 1.5);
      var maxHeight = Math.max(44, view.height - 24);
      root.style.setProperty('--ph-width', width + 'px');
      root.style.setProperty('--ph-card-height', cardHeight + 'px');
      root.style.setProperty('--ph-max-height', maxHeight + 'px');
      var actualWidth = isOpen ? width : 56;
      var actualHeight = isOpen ? Math.min(cardHeight, maxHeight) : 56;
      var margin = view.width <= 760 ? 12 : 20;
      var defaultTop = view.width <= 760 ? view.top + view.height - actualHeight - 12 : view.top + 92;
      var desired = position || { left: view.left + view.width - actualWidth - margin, top: defaultTop };
      var maxLeft = Math.max(view.left + 4, view.left + view.width - actualWidth - 4);
      var maxTop = Math.max(view.top + 4, view.top + view.height - actualHeight - 4);
      root.style.left = Math.max(view.left + 4, Math.min(desired.left, maxLeft)) + 'px';
      root.style.top = Math.max(view.top + 4, Math.min(desired.top, maxTop)) + 'px';
      root.style.width = actualWidth + 'px';
      root.style.height = actualHeight + 'px';
    }
    function savePosition() {
      var r = root.getBoundingClientRect();
      position = { left: r.left, top: r.top };
      try { localStorage.setItem(POSITION_KEY, JSON.stringify(position)); } catch (e) {}
    }
    function render() {
      root.dataset.open = isOpen ? 'true' : 'false';
      panel.hidden = !isOpen;
      collapsed.hidden = isOpen;
      collapsed.setAttribute('aria-expanded', String(isOpen));
      place();
      if (ready || !HOME) root.style.visibility = 'visible';
    }
    function openPanel() { isOpen = true; render(); }
    function closePanel() {
      isOpen = false;
      savePosition();
      render();
      collapsed.focus({ preventScroll: true });
    }
    shadow.getElementById('ph-close').addEventListener('click', closePanel);
    shadow.getElementById('ph-top-close').addEventListener('click', closePanel);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) closePanel();
    });
    function draggable(handle, tap) {
      var drag = null;
      var suppressClick = false;
      handle.addEventListener('pointerdown', function (event) {
        if (event.isPrimary === false || event.button !== 0) return;
        var r = root.getBoundingClientRect();
        drag = { x: event.clientX, y: event.clientY, left: r.left, top: r.top, moved: false };
        suppressClick = false;
        if (handle.setPointerCapture) handle.setPointerCapture(event.pointerId);
      });
      handle.addEventListener('pointermove', function (event) {
        if (!drag) return;
        var dx = event.clientX - drag.x;
        var dy = event.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
        if (!drag.moved) return;
        position = { left: drag.left + dx, top: drag.top + dy };
        place();
      });
      handle.addEventListener('pointerup', function () {
        if (!drag) return;
        suppressClick = drag.moved;
        if (drag.moved) savePosition();
        drag = null;
      });
      handle.addEventListener('pointercancel', function () { drag = null; suppressClick = true; });
      if (tap) handle.addEventListener('click', function (event) {
        if (suppressClick && event.detail !== 0) { suppressClick = false; return; }
        tap();
      });
    }
    draggable(collapsed, openPanel);
    shadow.querySelectorAll('.ph-heading').forEach(function (heading) { draggable(heading); });
    window.addEventListener('resize', place);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', place);
      window.visualViewport.addEventListener('scroll', place);
    }
    window.addEventListener('pageshow', function (event) { if (event.persisted) closePanel(); });
    render();

    // Decode before painting artwork. Loading/failure never leaves an empty image box.
    var art = new Image();
    var timer = setTimeout(function () { finish(false); }, 6000);
    function finish(ok) {
      if (ready && !ok) return;
      clearTimeout(timer);
      root.dataset.art = ok ? 'ready' : 'missing';
      if (ok) card.style.backgroundImage = 'url(' + JSON.stringify(ART) + ')';
      ready = true;
      render();
    }
    art.onload = function () {
      if (art.naturalWidth !== 640 || art.naturalHeight !== 960) { finish(false); return; }
      if (art.decode) art.decode().then(function () { finish(true); }, function () { finish(false); });
      else finish(true);
    };
    art.onerror = function () { finish(false); };
    art.src = ART;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
