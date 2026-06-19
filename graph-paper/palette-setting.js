/*
 * Palette setting — a drop-in live theme switcher for the graph-paper system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 * Presets re-ink the page: a pen color, a control accent, and the paper it's on.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    ink:     '--ds-color-accent-primary',
    control: '--ds-color-accent-control',
    paper:   '--ds-color-bg-canvas',
    text:    '--ds-color-fg-default',
    border:  '--ds-color-border-default'
  };

  var PRESETS = {
    Cobalt:   { ink: '#1f3a93', control: '#e8730c', paper: '#f7f4e4', text: '#1f3a93', border: '#1f3a93' },
    Graphite: { ink: '#3a3a3a', control: '#b5651d', paper: '#f4f2ec', text: '#3a3a3a', border: '#3a3a3a' },
    Sepia:    { ink: '#5b3a29', control: '#c0392b', paper: '#f3e9d2', text: '#5b3a29', border: '#5b3a29' },
    Forest:   { ink: '#1f5135', control: '#c0392b', paper: '#eef1e4', text: '#1f5135', border: '#1f5135' },
    Crimson:  { ink: '#7a1f2b', control: '#1f6f8b', paper: '#f6efe6', text: '#7a1f2b', border: '#7a1f2b' }
  };

  var STORAGE_KEY = 'graph-paper-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Cobalt).
  var current = load() || Object.assign({}, PRESETS.Cobalt);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'gpset gpset--closed');
    panel.innerHTML =
      '<button class="gpset__fab" aria-label="Theme settings">✎ Ink</button>' +
      '<div class="gpset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="gpset__head"><strong>Ink &amp; paper</strong><button class="gpset__x" aria-label="Close">✕</button></div>' +
        '<p class="gpset__lbl">Presets</p>' +
        '<div class="gpset__presets"></div>' +
        '<p class="gpset__lbl">Custom</p>' +
        '<div class="gpset__customs"></div>' +
        '<button class="gpset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.gpset__fab');
    var closeB = panel.querySelector('.gpset__x');
    var preEl  = panel.querySelector('.gpset__presets');
    var cusEl  = panel.querySelector('.gpset__customs');
    var resetB = panel.querySelector('.gpset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('gpset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('gpset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'gpset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="gpset__sw"><i style="background:' + p.ink + '"></i>' +
        '<i style="background:' + p.control + '"></i>' +
        '<i style="background:' + p.paper + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['ink', 'Ink'], ['control', 'Control'],
      ['paper', 'Paper'], ['text', 'Text'], ['border', 'Border']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'gpset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'gpset__color';
      input.value = current[key] || '#000000';
      input.addEventListener('input', function () {
        current[key] = input.value;
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
      current = Object.assign({}, PRESETS.Cobalt);
      clearVars();
      apply(current);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      syncInputs();
    });

    syncInputs();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var css =
    '.gpset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-serif)}' +
    '.gpset__fab{font-family:var(--ds-font-family-serif);font-weight:var(--ds-font-weight-semibold);' +
      'font-size:var(--ds-font-size-sm);cursor:pointer;color:var(--ds-color-fg-on-ink);' +
      'background:var(--ds-color-accent-primary);border:var(--ds-border-width-base) solid var(--ds-color-accent-primary);' +
      'border-radius:var(--ds-radius-md);padding:var(--ds-space-2) var(--ds-space-4)}' +
    '.gpset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:266px;' +
      'background:var(--ds-color-bg-surface);color:var(--ds-color-fg-default);' +
      'border:var(--ds-border-width-base) solid var(--ds-color-border-default);' +
      'border-radius:var(--ds-radius-lg);padding:var(--ds-space-5)}' +
    '.gpset--closed .gpset__panel{display:none}' +
    '.gpset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-bold)}' +
    '.gpset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-bold);line-height:1}' +
    '.gpset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wider);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-semibold);' +
      'margin:var(--ds-space-4) 0 var(--ds-space-3);color:var(--ds-color-fg-muted)}' +
    '.gpset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.gpset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;' +
      'min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:var(--ds-font-family-serif);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-semibold);' +
      'color:var(--ds-color-fg-default);background:transparent;' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:var(--ds-space-2)}' +
    '.gpset__preset:hover{background:rgba(0,0,0,0.04)}' +
    '.gpset__sw{display:inline-flex;flex-shrink:0;border:var(--ds-border-width-thin) solid var(--ds-color-border-default)}' +
    '.gpset__sw i{width:6px;height:15px}' +
    '.gpset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-sm)}' +
    '.gpset__color{width:92px;height:28px;margin:0;cursor:pointer;background:none;' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:0}' +
    '.gpset__color::-webkit-color-swatch-wrapper{padding:2px}' +
    '.gpset__color::-webkit-color-swatch{border:none;border-radius:0}' +
    '.gpset__color::-moz-color-swatch{border:none}' +
    '.gpset__reset{margin-top:var(--ds-space-4);width:100%;cursor:pointer;font-family:var(--ds-font-family-serif);' +
      'font-weight:var(--ds-font-weight-semibold);font-size:var(--ds-font-size-sm);' +
      'color:var(--ds-color-fg-default);background:transparent;' +
      'border:var(--ds-border-width-base) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);padding:var(--ds-space-2)}' +
    '.gpset__reset:hover{background:rgba(0,0,0,0.04)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
