/** Compatibility loader only; the standalone GAPPAE popup has been retired. */
(function () {
  if (window.__byKimjakProjectHubV1 || document.getElementById('bykimjak-project-hub-loader')) return;
  var script = document.createElement('script');
  script.id = 'bykimjak-project-hub-loader';
  script.src = '/bykimjak/eastwar-hub.js?v=20261001-combined-02';
  script.defer = true;
  document.head.appendChild(script);
})();
