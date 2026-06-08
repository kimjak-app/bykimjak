function PAGINATE(listSel, itemSel, perPage) {
  var list = document.querySelector(listSel);
  if (!list) return;
  var items = Array.from(list.querySelectorAll(itemSel));
  if (items.length <= perPage) {
    items.forEach(function(el) { el.classList.add('in'); });
    return;
  }
  var total = Math.ceil(items.length / perPage);
  var cur = 1;

  function show(page) {
    items.forEach(function(el, i) {
      var on = i >= (page - 1) * perPage && i < page * perPage;
      el.style.display = on ? '' : 'none';
      if (on) el.classList.add('in');
    });
    var old = list.querySelector('.pager');
    if (old) old.remove();
    if (total <= 1) return;
    var pager = document.createElement('div');
    pager.className = 'pager';
    for (var p = 1; p <= total; p++) {
      var btn = document.createElement('button');
      btn.className = 'pager__btn' + (p === page ? ' pager__btn--active' : '');
      btn.textContent = p;
      if (p !== page) {
        (function(pg) {
          btn.addEventListener('click', function() { cur = pg; show(pg); });
        })(p);
      }
      pager.appendChild(btn);
    }
    list.appendChild(pager);
  }

  show(cur);
}
