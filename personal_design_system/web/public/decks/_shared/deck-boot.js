/**
 * Deck boot — loads reveal.js locally, falls back to the CDN.
 *
 * Presenting from a venue means assuming there is no network. Run
 * `npm run vendor:reveal` once and reveal is served from
 * public/vendor/reveal/, so the deck works with the wifi off. Until then
 * this falls back to jsDelivr so the templates are never broken.
 *
 * Config follows DESIGN.md: 1280x720 canvas so the rem scale maps to px,
 * and transition 'none' because the Slides surface says cuts only.
 *
 * A deck may opt out of the canvas size by setting
 * `window.DECK_SIZE = { width, height }` before this script loads
 * (designing-with-ai runs native 1920x1080). Everything else stays.
 */
(function () {
  var LOCAL = "/vendor/reveal/";
  var CDN = "https://cdn.jsdelivr.net/npm/reveal.js@5.2.1/";

  function css(href) {
    return new Promise(function (resolve, reject) {
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      l.onload = resolve;
      l.onerror = function () { reject(new Error(href)); };
      // Prepended, not appended: reveal.css must sit BEFORE deck.css in
      // document order so our overrides win every equal-specificity tie
      // (.reveal h1, .reveal p, .reveal pre and friends).
      document.head.insertBefore(l, document.head.firstChild);
    });
  }

  function js(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  function loadFrom(base) {
    return css(base + "dist/reveal.css")
      .then(function () { return js(base + "dist/reveal.js"); })
      .then(function () {
        // Speaker notes are optional. A missing plugin must not stop the deck.
        return js(base + "plugin/notes/notes.js").catch(function () {});
      })
      .then(function () { return base; });
  }

  function start(base) {
    window.__revealBase = base;
    var plugins = typeof window.RevealNotes !== "undefined" ? [window.RevealNotes] : [];
    var size = window.DECK_SIZE || {};
    window.Reveal.initialize({
      width: size.width || 1280,
      height: size.height || 720,
      margin: 0,
      minScale: 0.2,
      maxScale: 2.0,
      transition: "none",
      backgroundTransition: "none",
      controls: true,
      controlsLayout: "edges",
      progress: true,
      slideNumber: false,
      hash: true,
      pdfSeparateFragments: false,
      plugins: plugins,
    });
  }

  loadFrom(LOCAL)
    .then(start)
    .catch(function () {
      loadFrom(CDN).then(start).catch(function (err) {
        document.documentElement.innerHTML =
          '<pre style="font:14px ui-monospace,monospace;padding:48px;color:#0a0a0a;background:#fafaf7">' +
          "reveal.js failed to load from both /vendor/reveal/ and the CDN.\n\n" +
          "Fix: cd web && npm run vendor:reveal\n\n" +
          String(err) +
          "</pre>";
      });
    });
})();
