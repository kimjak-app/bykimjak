(function () {
  'use strict';
  var nav = document.querySelector('nav.nav');
  if (!nav || nav.dataset.enhanced === 'true') return;
  var menu = nav.querySelector('.nav__menu'), cta = nav.querySelector('.nav__cta');
  if (!menu || !cta) return;
  nav.dataset.enhanced = 'true';
  var watch = Array.from(menu.querySelectorAll('.has-drop')).find(function (item) {
    var link = item.querySelector('a');
    return link && link.textContent.toUpperCase().includes('WATCH');
  });
  var drop = watch && watch.querySelector('.drop');
  if (drop && !drop.querySelector('a[href$="watch/gappae.html"]')) {
    drop.replaceChildren();
    [['01–A', 'GAPPAE / 갑패', 'gappae'], ['01–B', 'EASTWAR', 'eastwar'], ['01–C', 'MAGIC BLOCK MASTER', 'magic-block-master']].forEach(function (project) {
      var link = document.createElement('a'), index = document.createElement('span');
      link.href = '/bykimjak/watch/' + project[2] + '.html';
      index.className = 'sub-idx';
      index.textContent = project[0];
      link.append(index, document.createTextNode(project[1]));
      drop.append(link);
    });
  }
  if (drop && !drop.querySelector('a[href$="watch/baegopa.html"]')) {
    var baegopaLink = document.createElement('a'), baegopaIndex = document.createElement('span');
    baegopaLink.href = '/bykimjak/watch/baegopa.html';
    baegopaIndex.className = 'sub-idx';
    baegopaIndex.textContent = '01–D';
    baegopaLink.append(baegopaIndex, document.createTextNode('깡셰프 배고파!'));
    drop.append(baegopaLink);
  }
  if (drop && !drop.querySelector('a[href$="watch/horibyeong.html"]')) {
    var hw = document.createElement('a'), hi = document.createElement('span');
    hw.href = '/bykimjak/watch/horibyeong.html'; hi.className = 'sub-idx'; hi.textContent = '01–E';
    hw.append(hi, document.createTextNode('호리병 / HORIBYEONG')); drop.append(hw);
  }
  if (drop && !drop.querySelector('a[href$="watch/character-films.html"]')) {
    var filmLink = document.createElement('a'), filmIndex = document.createElement('span');
    filmLink.href = '/bykimjak/watch/character-films.html'; filmIndex.className = 'sub-idx'; filmIndex.textContent = '01–F';
    filmLink.append(filmIndex, document.createTextNode('캐릭터 필름 / CHARACTER FILMS')); drop.append(filmLink);
  }
  // Keep the WATCH label bilingual on both static and generated menus.
  var mbmWatchLink = drop && drop.querySelector('a[href$="magic-block-master.html"]');
  if (mbmWatchLink) {
    var mbmWatchIndex = mbmWatchLink.querySelector('.sub-idx');
    mbmWatchLink.replaceChildren();
    if (mbmWatchIndex) mbmWatchLink.append(mbmWatchIndex);
    mbmWatchLink.append(document.createTextNode('MAGIC BLOCK MASTER / 매직블록마스터'));
  }
  var make = Array.from(menu.querySelectorAll('.has-drop')).find(function (item) {
    var link = item.querySelector('a');
    return link && link.textContent.toUpperCase().includes('MAKE');
  });
  var makeDrop = make && make.querySelector('.drop');
  if (makeDrop && !makeDrop.querySelector('a[href$="make/baegopa.html"]')) {
    var makingLink = document.createElement('a'), makingIndex = document.createElement('span');
    makingLink.href = '/bykimjak/make/baegopa.html';
    makingIndex.className = 'sub-idx';
    makingIndex.textContent = '02–E';
    makingLink.append(makingIndex, document.createTextNode('깡셰프 배고파! 제작기'));
    makeDrop.append(makingLink);
  }
  if (makeDrop && !makeDrop.querySelector('a[href$="make/magic-block-master.html"]')) {
    var mbmLink = document.createElement('a'), mbmIndex = document.createElement('span');
    mbmLink.href = '/bykimjak/make/magic-block-master.html';
    mbmIndex.className = 'sub-idx';
    mbmIndex.textContent = '02–F';
    mbmLink.append(mbmIndex, document.createTextNode('매직블록마스터 제작기'));
    makeDrop.append(mbmLink);
  }
  if (makeDrop && !makeDrop.querySelector('a[href$="make/horibyeong.html"]')) {
    var horiLink = document.createElement('a'), horiIndex = document.createElement('span');
    horiLink.href = '/bykimjak/make/horibyeong.html';
    horiIndex.className = 'sub-idx'; horiIndex.textContent = '02–G';
    horiLink.append(horiIndex, document.createTextNode('호리병 제작기 / HORIBYEONG'));
    makeDrop.append(horiLink);
  }
  document.querySelectorAll('footer a[href="#"]').forEach(function (link) {
    link.removeAttribute('href');
    link.classList.add('unavailable-link');
  });
  document.querySelectorAll('footer .bottom span').forEach(function (span) {
    if (/^\s*v\.\d+\s*\/\s*2026\.05\s*$/i.test(span.textContent)) span.remove();
  });
  menu.id = 'site-menu';
  menu.setAttribute('aria-label', '사이트 전체 메뉴');
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-toggle';
  button.textContent = '메뉴';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', menu.id);
  cta.prepend(button);
  function close() {
    nav.classList.remove('mobile-open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '메뉴';
  }
  button.addEventListener('click', function () {
    var open = nav.classList.toggle('mobile-open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? '닫기' : '메뉴';
  });
  menu.addEventListener('click', function (event) { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('mobile-open')) { close(); button.focus(); }
  });
  document.addEventListener('click', function (event) { if (!nav.contains(event.target)) close(); });
  matchMedia('(min-width:781px)').addEventListener('change', close);
})();
