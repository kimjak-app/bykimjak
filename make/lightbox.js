/* Gappae Trailer — image lightbox (self-contained)
   Targets: .devlog__body img (skip when data-nozoom is present)
   Usage:   <script src="lightbox.js"></script> at the end of <body> */
(function () {
  'use strict';
  if (window.__gappaeLightbox) return;
  window.__gappaeLightbox = true;

  var SEL = '.devlog__body img:not([data-nozoom])';

  var css = ''
    + SEL + '{cursor:zoom-in}'
    + '#gl-lb{position:fixed;inset:0;z-index:2000;display:none;background:rgba(13,11,9,.94);background:color-mix(in srgb,var(--dark,#0D0B09) 94%,transparent);color:var(--dark-ink,#FAF7F2)}'
    + '#gl-lb.open{display:block}'
    + '#gl-lb .gl-stage{position:absolute;inset:0;display:flex;overflow:auto;overscroll-behavior:contain}'
    + '#gl-lb .gl-img{display:block;margin:auto;max-width:96vw;max-height:90vh;width:auto;height:auto;cursor:zoom-in;user-select:none;-webkit-user-drag:none}'
    + '#gl-lb.actual .gl-img{max-width:none;max-height:none;cursor:zoom-out}'
    + '#gl-lb .gl-cap{position:absolute;left:0;right:0;bottom:0;padding:18px 72px 20px;text-align:center;pointer-events:none;font-family:var(--f-mono,ui-monospace,monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase;line-height:1.5;color:var(--dark-ink-2,#9C948A);background:linear-gradient(to top,rgba(13,11,9,.85),rgba(13,11,9,0))}'
    + '#gl-lb .gl-cap:empty{display:none}'
    + '#gl-lb .gl-count{position:absolute;top:22px;left:24px;font-family:var(--f-mono,ui-monospace,monospace);font-size:11px;letter-spacing:.08em;color:var(--dark-ink-2,#9C948A);pointer-events:none}'
    + '#gl-lb .gl-btn{position:absolute;width:44px;height:44px;border-radius:999px;border:1px solid var(--dark-ink-2,#9C948A);background:rgba(13,11,9,.6);color:var(--dark-ink,#FAF7F2);font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .2s,color .2s,border-color .2s}'
    + '#gl-lb .gl-btn:hover,#gl-lb .gl-btn:focus-visible{background:var(--dark-ink,#FAF7F2);color:var(--dark,#0D0B09);border-color:var(--dark-ink,#FAF7F2)}'
    + '#gl-lb .gl-close{top:16px;right:16px}'
    + '#gl-lb .gl-prev,#gl-lb .gl-next{top:50%;margin-top:-22px}'
    + '#gl-lb .gl-prev{left:16px}#gl-lb .gl-next{right:16px}'
    + '#gl-lb.single .gl-prev,#gl-lb.single .gl-next,#gl-lb.single .gl-count{display:none}'
    + '@media(max-width:600px){#gl-lb .gl-cap{padding:14px 20px 16px}#gl-lb .gl-prev{left:8px}#gl-lb .gl-next{right:8px}}';

  var style = document.createElement('style');
  style.setAttribute('data-gl', '');
  style.textContent = css;
  document.head.appendChild(style);

  var lb = document.createElement('div');
  lb.id = 'gl-lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = ''
    + '<div class="gl-stage"><img class="gl-img" alt="" draggable="false" /></div>'
    + '<div class="gl-count" aria-hidden="true"></div>'
    + '<div class="gl-cap" aria-live="polite"></div>'
    + '<button type="button" class="gl-btn gl-prev" aria-label="Previous image">&#8592;</button>'
    + '<button type="button" class="gl-btn gl-next" aria-label="Next image">&#8594;</button>'
    + '<button type="button" class="gl-btn gl-close" aria-label="Close">&#10005;</button>';
  document.body.appendChild(lb);

  var stage = lb.querySelector('.gl-stage');
  var big = lb.querySelector('.gl-img');
  var cap = lb.querySelector('.gl-cap');
  var count = lb.querySelector('.gl-count');
  var btnPrev = lb.querySelector('.gl-prev');
  var btnNext = lb.querySelector('.gl-next');
  var btnClose = lb.querySelector('.gl-close');

  var list = [];
  var idx = 0;
  var opener = null;
  var prevOverflow = '';
  var prevPad = '';

  function captionOf(img) {
    var box = img.closest('div, figure');
    if (!box || box.classList.contains('devlog__body')) return '';
    if (box.querySelectorAll('img').length !== 1) return '';
    var fc = box.querySelector('figcaption');
    return fc ? fc.textContent.trim() : '';
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    var img = list[idx];
    lb.classList.remove('actual');
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt || '';
    cap.textContent = captionOf(img);
    count.textContent = (idx + 1) + ' / ' + list.length;
  }

  function open(img) {
    list = Array.prototype.slice.call(document.querySelectorAll(SEL));
    var i = list.indexOf(img);
    if (i < 0) return;
    opener = img;
    lb.classList.toggle('single', list.length < 2);
    show(i);
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    prevOverflow = document.body.style.overflow;
    prevPad = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (sbw > 0) document.body.style.paddingRight = sbw + 'px';
    lb.classList.add('open');
    btnClose.focus({ preventScroll: true });
  }

  function close() {
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open', 'actual');
    big.removeAttribute('src');
    document.body.style.overflow = prevOverflow;
    document.body.style.paddingRight = prevPad;
    if (opener) opener.focus({ preventScroll: true });
    opener = null;
  }

  function step(d) { if (list.length > 1) show(idx + d); }

  /* open on click / Enter / Space */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && t.matches && t.matches(SEL)) { e.preventDefault(); open(t); }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (!lb.classList.contains('open')) {
      if ((e.key === 'Enter' || e.key === ' ') && t && t.matches && t.matches(SEL)) { e.preventDefault(); open(t); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Tab') {
      var f = [btnPrev, btnNext, btnClose].filter(function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (!lb.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* overlay interactions */
  big.addEventListener('click', function (e) { e.stopPropagation(); lb.classList.toggle('actual'); });
  stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  btnClose.addEventListener('click', function (e) { e.stopPropagation(); close(); });
  btnPrev.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  btnNext.addEventListener('click', function (e) { e.stopPropagation(); step(1); });

  /* make page images keyboard-reachable */
  function prep() {
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function (img) {
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', prep);
  else prep();
})();
