/*
 * Palette setting — a drop-in live theme switcher for the Inkline system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component (and any `.ink-art` SVG) recolors instantly.
 * Choice persists in localStorage. Presets are "pen + paper" pairs, including
 * a dark chalkboard where the ink becomes chalk.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    ink:     '--ds-color-ink-line',
    text:    '--ds-color-fg-default',
    muted:   '--ds-color-fg-muted',
    faint:   '--ds-color-fg-faint',
    onInk:   '--ds-color-fg-on-ink',
    paper:   '--ds-color-bg-canvas',
    field:   '--ds-color-bg-field',
    sheet:   '--ds-color-bg-sheet',
    success: '--ds-color-feedback-success',
    warning: '--ds-color-feedback-warning',
    danger:  '--ds-color-feedback-danger'
  };

  var LIGHT = { success: '#1d7a3e', warning: '#9a6200', danger: '#c4291c' };
  var DARK  = { success: '#6fd391', warning: '#f3c04a', danger: '#ff7a6b' };
  // Text and line share one pen, so `text` follows `ink` unless a preset says otherwise.
  function mk(base, p) { return Object.assign({ text: p.ink, field: p.paper }, base, p); }

  var PRESETS = {
    Sketchbook: mk(LIGHT, { ink: '#111111', muted: '#444444', faint: '#6b6b6b', onInk: '#ffffff', paper: '#fbfaf6', sheet: '#ffffff' }),
    Sepia:      mk(LIGHT, { ink: '#3a2614', muted: '#5e4630', faint: '#7a6450', onInk: '#fbf3e2', paper: '#f2e8d2', sheet: '#fbf5e8' }),
    Blueprint:  mk(LIGHT, { ink: '#16357a', muted: '#2e4a8c', faint: '#4f6299', onInk: '#ffffff', paper: '#eef2fa', sheet: '#ffffff' }),
    'Red pen':  mk(LIGHT, { ink: '#a3161a', muted: '#7a2a28', faint: '#8a5250', onInk: '#ffffff', paper: '#fbf7f2', sheet: '#ffffff', danger: '#111111' }),
    Chalkboard: mk(DARK,  { ink: '#f1efe6', muted: '#c9c6ba', faint: '#a29f94', onInk: '#20262a', paper: '#20262a', sheet: '#2a3136' })
  };

  var STORAGE_KEY = 'inkline-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Sketchbook).
  var current = load() || Object.assign({}, PRESETS.Sketchbook);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'inkset inkset--closed');
    panel.innerHTML =
      '<button class="inkset__fab" aria-label="Theme settings" aria-expanded="false">Pen &amp; paper</button>' +
      '<div class="inkset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="inkset__head"><strong>Pen &amp; paper</strong><button class="inkset__x" aria-label="Close">✕</button></div>' +
        '<p class="inkset__lbl">Presets</p>' +
        '<div class="inkset__presets"></div>' +
        '<p class="inkset__lbl">Custom</p>' +
        '<div class="inkset__customs"></div>' +
        '<button class="inkset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.inkset__fab');
    var closeB = panel.querySelector('.inkset__x');
    var preEl  = panel.querySelector('.inkset__presets');
    var cusEl  = panel.querySelector('.inkset__customs');
    var resetB = panel.querySelector('.inkset__reset');

    function setOpen(open) {
      panel.classList.toggle('inkset--closed', !open);
      fab.setAttribute('aria-expanded', String(open));
    }
    fab.addEventListener('click', function () { setOpen(panel.classList.contains('inkset--closed')); });
    closeB.addEventListener('click', function () { setOpen(false); fab.focus(); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'inkset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="inkset__sw"><i style="background:' + p.paper + '"></i>' +
        '<i style="background:' + p.ink + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [['ink', 'Ink'], ['paper', 'Page'], ['sheet', 'Paper-white'], ['onInk', 'Text on ink']];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'inkset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'inkset__color';
      input.value = current[key] || '#000000';
      input.addEventListener('input', function () {
        current[key] = input.value;
        // One pen: changing ink also changes text; changing page also changes the input fill.
        if (key === 'ink') current.text = input.value;
        if (key === 'paper') current.field = input.value;
        apply(current); save(current);
      });
      inputs[key] = input;
      row.appendChild(span); row.appendChild(input);
      cusEl.appendChild(row);
    });

    function syncInputs() {
      fields.forEach(function (f) { if (inputs[f[0]]) inputs[f[0]].value = current[f[0]]; });
    }

    resetB.addEventListener('click', function () {
      current = Object.assign({}, PRESETS.Sketchbook);
      clearVars();
      apply(current);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      syncInputs();
    });

    syncInputs();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var box = 'background:var(--ds-color-bg-sheet);color:var(--ds-color-fg-default);border:var(--ds-border-width-thin) solid var(--ds-color-ink-line);' +
      'box-shadow:var(--ds-shadow-small);border-radius:0;cursor:pointer;font-family:var(--ds-font-family-hand);';
    var css =
    '.inkset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-hand);color:var(--ds-color-fg-default)}' +
    '.inkset__fab{' + box + 'font-family:var(--ds-font-family-display);font-size:1.25rem;letter-spacing:var(--ds-font-letter-spacing-wide);' +
      'border-width:var(--ds-border-width-ink);box-shadow:var(--ds-shadow-ink);padding:6px 16px;min-height:44px}' +
    '.inkset__fab:active,.inkset__preset:active,.inkset__reset:active{transform:translate(3px,3px);box-shadow:none}' +
    '.inkset button:focus-visible,.inkset__color:focus-visible{outline:var(--ds-border-width-focus) dashed var(--ds-color-ink-line);outline-offset:3px}' +
    '.inkset__panel{position:absolute;right:0;bottom:calc(100% + 16px);width:280px;max-width:calc(100vw - 40px);box-sizing:border-box;' +
      'background:var(--ds-color-bg-sheet);border:var(--ds-border-width-ink) solid var(--ds-color-ink-line);box-shadow:var(--ds-shadow-ink);padding:var(--ds-space-5)}' +
    '.inkset--closed .inkset__panel{display:none}' +
    '.inkset__head{display:flex;align-items:center;justify-content:space-between;font-family:var(--ds-font-family-display);font-size:1.5rem;letter-spacing:var(--ds-font-letter-spacing-wide)}' +
    '.inkset__head strong{font-weight:400}' +
    '.inkset__x{cursor:pointer;background:none;border:none;padding:4px;margin:0;color:var(--ds-color-fg-default);font-size:1rem;line-height:1}' +
    '.inkset__lbl{margin:var(--ds-space-4) 0 var(--ds-space-2);font-weight:700;font-size:0.875rem;letter-spacing:1px;text-transform:uppercase}' +
    '.inkset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.inkset__preset{' + box + 'display:flex;align-items:center;gap:8px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.95rem;padding:4px 8px}' +
    '.inkset__sw{display:inline-flex;flex-shrink:0;border:2px solid var(--ds-color-ink-line)}' +
    '.inkset__sw i{width:8px;height:14px}' +
    '.inkset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:1rem}' +
    '.inkset__color{width:88px;height:30px;margin:0;padding:2px;cursor:pointer;background:var(--ds-color-bg-sheet);border:var(--ds-border-width-thin) solid var(--ds-color-ink-line);border-radius:0}' +
    '.inkset__color::-webkit-color-swatch-wrapper{padding:0}' +
    '.inkset__color::-webkit-color-swatch{border:none;border-radius:0}' +
    '.inkset__color::-moz-color-swatch{border:none;border-radius:0}' +
    '.inkset__reset{' + box + 'margin-top:var(--ds-space-3);width:100%;font-size:1rem;padding:6px}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
