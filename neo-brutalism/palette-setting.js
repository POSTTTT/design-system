/*
 * Palette setting — a drop-in live theme switcher for the neo-brutalism system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    primary:   '--ds-color-accent-primary',
    secondary: '--ds-color-accent-secondary',
    tertiary:  '--ds-color-accent-tertiary',
    canvas:    '--ds-color-bg-canvas',
    onAccent:  '--ds-color-fg-on-accent'
  };

  var PRESETS = {
    Brutalist: { primary: '#ffdb00', secondary: '#ff5cab', tertiary: '#4dd0e1', canvas: '#fdfbf3', onAccent: '#000000' },
    Electric:  { primary: '#18ffff', secondary: '#ff4081', tertiary: '#ffea00', canvas: '#eafcff', onAccent: '#000000' },
    Candy:     { primary: '#ff7ab8', secondary: '#ffd23f', tertiary: '#7ad7ff', canvas: '#fff0f6', onAccent: '#000000' },
    Acid:      { primary: '#c6ff00', secondary: '#ff3df5', tertiary: '#00ffd0', canvas: '#f7ffe0', onAccent: '#000000' },
    Mono:      { primary: '#ffffff', secondary: '#d4d4d4', tertiary: '#a3a3a3', canvas: '#f2f2f2', onAccent: '#000000' }
  };

  var STORAGE_KEY = 'nb-palette';
  var root = document.documentElement;

  function apply(p) {
    for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); }
  }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Brutalist).
  var current = load() || Object.assign({}, PRESETS.Brutalist);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'nbset nbset--closed');
    panel.innerHTML =
      '<button class="nbset__fab" aria-label="Palette settings">🎨 Palette</button>' +
      '<div class="nbset__panel" role="dialog" aria-label="Palette settings">' +
        '<div class="nbset__head"><strong>Palette</strong><button class="nbset__x" aria-label="Close">✕</button></div>' +
        '<p class="nbset__lbl">Presets</p>' +
        '<div class="nbset__presets"></div>' +
        '<p class="nbset__lbl">Custom</p>' +
        '<div class="nbset__customs"></div>' +
        '<button class="nbset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.nbset__fab');
    var closeB = panel.querySelector('.nbset__x');
    var preEl  = panel.querySelector('.nbset__presets');
    var cusEl  = panel.querySelector('.nbset__customs');
    var resetB = panel.querySelector('.nbset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('nbset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('nbset--closed'); });

    // preset buttons
    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'nbset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="nbset__sw"><i style="background:' + p.primary + '"></i>' +
        '<i style="background:' + p.secondary + '"></i>' +
        '<i style="background:' + p.tertiary + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    // custom color pickers
    var fields = [
      ['primary', 'Primary'], ['secondary', 'Secondary'],
      ['tertiary', 'Tertiary'], ['canvas', 'Canvas']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'nbset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'nbset__color';
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
      current = Object.assign({}, PRESETS.Brutalist);
      for (var k in VARS) { root.style.removeProperty(VARS[k]); }
      apply(current);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      syncInputs();
    });

    syncInputs();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var css =
    '.nbset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-sans)}' +
    '.nbset__fab{font-family:var(--ds-font-family-mono);font-weight:var(--ds-font-weight-bold);text-transform:uppercase;' +
      'letter-spacing:var(--ds-font-letter-spacing-wide);font-size:var(--ds-font-size-sm);cursor:pointer;' +
      'background:var(--ds-color-accent-primary);color:var(--ds-color-fg-on-accent);' +
      'border:var(--ds-border-width-thick) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);' +
      'box-shadow:var(--ds-shadow-sm);padding:var(--ds-space-3) var(--ds-space-4)}' +
    '.nbset__fab:active{box-shadow:var(--ds-shadow-none);transform:translate(4px,4px)}' +
    '.nbset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:260px;' +
      'background:var(--ds-color-bg-surface);color:var(--ds-color-fg-default);' +
      'border:var(--ds-border-width-heavy) solid var(--ds-color-border-default);border-radius:var(--ds-radius-lg);' +
      'box-shadow:var(--ds-shadow-lg);padding:var(--ds-space-4)}' +
    '.nbset--closed .nbset__panel{display:none}' +
    '.nbset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-lg)}' +
    '.nbset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;font-size:var(--ds-font-size-lg);font-weight:var(--ds-font-weight-black);line-height:1}' +
    '.nbset__lbl{font-family:var(--ds-font-family-mono);text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);' +
      'font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-bold);margin:var(--ds-space-3) 0 var(--ds-space-2);color:var(--ds-color-fg-muted)}' +
    '.nbset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.nbset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;font-weight:var(--ds-font-weight-bold);' +
      'min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-size:var(--ds-font-size-xs);background:var(--ds-color-bg-surface);' +
      'border:var(--ds-border-width-base) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);' +
      'box-shadow:var(--ds-shadow-xs);padding:var(--ds-space-2)}' +
    '.nbset__preset:active{box-shadow:var(--ds-shadow-none);transform:translate(2px,2px)}' +
    '.nbset__sw{display:inline-flex;flex-shrink:0}' +
    '.nbset__sw i{width:8px;height:16px;border:1px solid var(--ds-color-border-default)}' +
    '.nbset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-weight:var(--ds-font-weight-bold);font-size:var(--ds-font-size-sm)}' +
    '.nbset__color{width:96px;height:32px;margin:0;cursor:pointer;background:none;' +
      'border:var(--ds-border-width-base) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:0}' +
    '.nbset__color::-webkit-color-swatch-wrapper{padding:0}' +
    '.nbset__color::-webkit-color-swatch{border:none;border-radius:0}' +
    '.nbset__color::-moz-color-swatch{border:none}' +
    '.nbset__reset{margin-top:var(--ds-space-3);width:100%;cursor:pointer;font-family:var(--ds-font-family-mono);' +
      'font-weight:var(--ds-font-weight-bold);font-size:var(--ds-font-size-sm);background:var(--ds-color-bg-surface);' +
      'border:var(--ds-border-width-thick) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);' +
      'box-shadow:var(--ds-shadow-xs);padding:var(--ds-space-2)}' +
    '.nbset__reset:active{box-shadow:var(--ds-shadow-none);transform:translate(2px,2px)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
