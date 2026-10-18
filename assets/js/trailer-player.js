(function () {
  'use strict';
  // Only one featured film plays at a time, including manual hero playback.
  var featured = Array.from(document.querySelectorAll('.hero video'));
  featured.forEach(function (active) {
    active.addEventListener('play', function () {
      featured.forEach(function (other) { if (other !== active) other.pause(); });
    });
  });
  document.querySelectorAll('[data-trailer-player]').forEach(function (root) {
    var video = root.querySelector('video'), poster = root.querySelector('.trailer-poster');
    var status = root.querySelector('[data-trailer-status]'), pending = root.querySelector('.asset-pending');
    var controls = root.querySelector('.home-trailer__controls'), play = root.querySelector('[data-play]'), sound = root.querySelector('[data-sound]');
    function unavailable() {
      video.hidden = true; poster.hidden = false;
      if (controls) controls.hidden = true;
      if (pending) pending.hidden = false;
      if (status) status.textContent = '영상을 불러올 수 없습니다 · 작품 보기 →';
    }
    function label() {
      if (play) play.textContent = video.ended ? '처음부터 재생' : video.paused ? '재생' : '일시정지';
      root.classList.toggle('is-playing', !video.paused && !video.ended);
    }
    video.addEventListener('error', unavailable);
    video.addEventListener('loadedmetadata', function () {
      video.hidden = false; poster.hidden = true;
      if (pending) pending.hidden = true;
      if (status) status.textContent = root.dataset.title || '갑패 Trailer 03 · 제작일지 보기 →';
      if (controls) controls.hidden = false;
      label();
    });
    ['play','pause','ended'].forEach(function (event) { video.addEventListener(event, label); });
    if (controls) {
      if (matchMedia('(prefers-reduced-motion:reduce)').matches || (navigator.connection && navigator.connection.saveData)) video.autoplay = false;
      play.addEventListener('click', function () {
        if (video.ended) video.currentTime = 0;
        if (video.paused) video.play().catch(label); else video.pause();
      });
      sound.addEventListener('click', function () {
        video.muted = !video.muted; sound.textContent = video.muted ? '소리 켜기' : '소리 끄기';
      });
    }
    // Native media follows Release redirects without a CORS-restricted fetch HEAD.
    video.preload = 'metadata';
    video.src = root.dataset.videoPath;
    if (controls && video.autoplay) video.play().catch(label);
  });
})();
