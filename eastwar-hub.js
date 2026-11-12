/** EASTWAR featured project popup — approved 2026-11-12. Live HTML text and links. */
(function () {
  'use strict';
  if (window.__byKimjakProjectHubV1) return;
  window.__byKimjakProjectHubV1 = true;

  var BASE = '/bykimjak';
  var VERSION = '20261112-eastwar-01';
  var ART = BASE + '/assets/ui/eastwar-popup-20261112.webp';
  var POSITION_KEY = 'byKimjakProjectHubPositionV2';
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
      :host{color-scheme:dark;font-family:"Pretendard Variable","Malgun Gothic",system-ui,sans-serif;color:#f7edd7;}
      *,*::before,*::after{box-sizing:border-box} [hidden]{display:none!important}
      button,a{-webkit-tap-highlight-color:transparent} button{font:inherit;cursor:pointer}
      a{color:inherit;text-decoration:none}
      #ph-panel{position:relative;width:var(--ph-width,380px);max-height:var(--ph-max-height,700px);overflow:auto;
        overscroll-behavior:contain;border:1px solid #b99a62;border-radius:6px;background:#10100f;
        box-shadow:0 16px 48px #0008, inset 0 0 0 2px #d5b57530;scrollbar-width:thin;scrollbar-color:#907747 #181714}
      #ph-card{background:#10100f;color:#f7edd7;padding-bottom:10px}
      .ph-hero{position:relative;height:min(calc(var(--ph-width,380px) - 2px),max(200px,calc(var(--ph-max-height,740px) - 390px)));background:#161615 center top/cover no-repeat;isolation:isolate;padding:20px 16px 0}
      .ph-hero::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,#0004,transparent 42%,transparent 72%,#10100f)}
      .ph-heading{cursor:grab;touch-action:none;user-select:none}.ph-heading:active{cursor:grabbing}
      .ph-eyebrow{display:block;color:#e5c991;font:8px/1.5 Georgia,serif;letter-spacing:.22em;padding-right:28px}
      .ph-title{margin:7px 0 2px;color:#f6df9d;font:bold clamp(36px,12vw,53px)/1 Georgia,"Times New Roman",serif;letter-spacing:-.035em;text-shadow:0 2px 8px #0009}
      .ph-tagline{margin:8px 0;color:#fff1d7;font-size:14px;line-height:1.55;font-weight:600;text-shadow:0 2px 4px #000,0 0 10px #000}
      .ph-tagline span{display:block}
      .ph-cta{display:flex;align-items:center;justify-content:center;gap:16px;min-height:46px;margin:-2px 16px 12px;
        border:1px solid #e4c98c;border-radius:4px;background:linear-gradient(120deg,#dfc085,#c09a51 55%,#d6b46c);color:#18130d;font-size:20px;font-weight:800;box-shadow:inset 0 0 0 2px #fff2}
      .ph-links{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:0 16px 14px}
      .ph-link{display:flex;align-items:center;justify-content:center;min-height:44px;border:1px solid #b49762;border-radius:3px;font-size:16px;font-weight:600;background:#ffffff03}
      .ph-videos{margin:0 16px;border-top:1px solid #aa926366;text-align:center;padding-top:12px}
      .ph-videos h2{font-size:25px;line-height:1.3;margin:0 0 10px;font-weight:800;letter-spacing:.04em}
      .ph-category{display:flex;align-items:center;gap:10px;margin:5px 12px 0;color:#ddba79;font-size:15px;font-weight:700}
      .ph-category::before,.ph-category::after{content:"";height:1px;background:#a6895455;flex:1}
      .ph-film-links{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;column-gap:5px;margin:0;font-size:14px;line-height:1.5}
      .ph-film-links a,.ph-coming{display:inline-flex;align-items:center;min-height:40px;white-space:nowrap}
      .ph-sep{color:#b4a286}.ph-coming{color:#c4bbab}.ph-coming small{font-size:11px;margin-left:3px}
      .ph-footer{text-align:center;margin:8px 0 0;color:#c6aa72;font:italic 12px/1.5 Georgia,serif}
      #ph-top-close{position:absolute;right:6px;top:6px;z-index:3;width:36px;height:36px;border:1px solid #d6bd7825;border-radius:50%;padding:0;background:#121211ed;color:#fff0ce;font-size:27px;line-height:1}
      a:hover{filter:brightness(1.18);background-color:#d6b46c18}a:focus-visible,button:focus-visible{outline:3px solid #ffe6a5;outline-offset:2px}
      #ph-collapsed{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#17130f;border:1px solid #c8a86a;
        box-shadow:0 6px 18px #0005;color:#dec38d;touch-action:none;cursor:grab;padding:0}
      #ph-collapsed svg{width:25px;height:25px;pointer-events:none}#ph-collapsed:active{cursor:grabbing}
      @media(max-width:360px){.ph-title{font-size:44px}.ph-eyebrow{font-size:7px}.ph-tagline{font-size:13px}.ph-film-links{font-size:12px;column-gap:4px}.ph-coming small{font-size:10px}}
      @media(prefers-reduced-motion:no-preference){a,button{transition:filter .15s ease}}
    `;
    shadow.appendChild(style);
    var panel = document.createElement('section');
    panel.id = 'ph-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'EASTWAR 및 영상 프로젝트 바로가기');
    panel.innerHTML = '<div id="ph-card"><header class="ph-hero" id="ph-hero">' +
      '<div class="ph-heading" title="드래그하여 이동"><span class="ph-eyebrow">BYKIMJAK · FEATURED PROJECT</span><h2 class="ph-title">EASTWAR</h2></div>' +
      '<p class="ph-tagline"><span>시대를 넘어, 길드와 함께</span><span>천하를 다시 쓰다</span></p></header>' +
      '<a class="ph-cta" href="' + BASE + '/watch/eastwar.html">EASTWAR 작품 보기 <span aria-hidden="true">→</span></a>' +
      '<nav class="ph-links" aria-label="EASTWAR 메뉴">' + LINKS.map(function (link) {
        return '<a class="ph-link" href="' + BASE + link[3] + '">' + link[1] + '</a>';
      }).join('') + '</nav>' +
      '<section class="ph-videos" aria-labelledby="ph-video-title"><h2 id="ph-video-title">영상 프로젝트</h2>' +
      '<h3 class="ph-category">실사</h3><nav class="ph-film-links" aria-label="실사 영상 프로젝트">' +
      '<a href="' + BASE + '/watch/horibyeong.html">호리병</a><span class="ph-sep" aria-hidden="true">·</span>' +
      '<a href="' + BASE + '/watch/gappae.html">갑패</a><span class="ph-sep" aria-hidden="true">·</span>' +
      '<a href="' + BASE + '/watch/baegopa.html">깡셰프 배고파!</a></nav>' +
      '<h3 class="ph-category">애니메이션</h3><nav class="ph-film-links" aria-label="애니메이션 영상 프로젝트">' +
      '<a href="' + BASE + '/watch/magic-block-master.html">매직블럭마스터</a><span class="ph-sep" aria-hidden="true">·</span>' +
      '<span class="ph-coming">아크니멜스<small>(준비중)</small></span></nav></section>' +
      '<p class="ph-footer">byKimjak — IP Architect</p></div><button id="ph-top-close" type="button" aria-label="팝업 접기">×</button>';
    var collapsed = document.createElement('button');
    collapsed.id = 'ph-collapsed';
    collapsed.type = 'button';
    collapsed.setAttribute('aria-label', 'EASTWAR 및 영상 프로젝트 메뉴 열기');
    collapsed.setAttribute('aria-controls', 'ph-panel');
    collapsed.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 4v6c0 5-4 8-8 10-4-2-8-5-8-10V6l8-4z"/><path d="M8 9l8 8M16 9l-8 8M7 8l2 2M15 10l2-2"/></svg>';
    shadow.appendChild(panel);
    shadow.appendChild(collapsed);
    var topClose = shadow.getElementById('ph-top-close');
    shadow.appendChild(topClose);
    document.body.appendChild(root);

    var CLOSED_KEY = 'byKimjakProjectHubClosed20261112';
    var isOpen = HOME;
    try { if (sessionStorage.getItem(CLOSED_KEY) === '1') isOpen = false; } catch (e) {}
    var position = null;
    var ready = false;
    var card = shadow.getElementById('ph-hero');
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
      var width = Math.min(380, Math.max(1, view.width - 24));
      var maxHeight = Math.max(44, view.height - 24);
      root.style.setProperty('--ph-width', width + 'px');
      root.style.setProperty('--ph-max-height', maxHeight + 'px');
      var actualWidth = isOpen ? width : 56;
      var actualHeight = isOpen ? Math.min(panel.scrollHeight + 2, maxHeight) : 56;
      var margin = view.width <= 760 ? 12 : 20;
      var defaultTop = view.width <= 760 ? view.top + view.height - actualHeight - 12 : view.top + 92;
      var desired = position || { left: view.left + margin, top: defaultTop };
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
      topClose.hidden = !isOpen;
      collapsed.hidden = isOpen;
      collapsed.setAttribute('aria-expanded', String(isOpen));
      place();
      root.style.visibility = 'visible';
    }
    function openPanel() { isOpen = true; render(); shadow.getElementById('ph-top-close').focus({ preventScroll: true }); }
    function closePanel() {
      isOpen = false;
      try { sessionStorage.setItem(CLOSED_KEY, '1'); } catch (e) {}
      savePosition();
      render();
      collapsed.focus({ preventScroll: true });
    }
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
    if (window.ResizeObserver) new ResizeObserver(place).observe(shadow.getElementById('ph-card'));
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
      if (!art.naturalWidth) { finish(false); return; }
      if (art.decode) art.decode().then(function () { finish(true); }, function () { finish(false); });
      else finish(true);
    };
    art.onerror = function () { finish(false); };
    art.src = ART;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
