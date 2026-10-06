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
