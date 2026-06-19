/*
 * Palette setting — a drop-in live theme switcher for the neumorphism system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 *
 * Note: neumorphic depth comes from dual shadows whose colors are baked into the
 * shadow tokens, so presets keep a light surface — they retint the accent and
 * the surface family, which is what reads as a different "soft theme".
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    accent:  '--ds-color-accent-primary',
    bright:  '--ds-color-accent-bright',
    surface: '--ds-color-bg-surface',
    canvas:  '--ds-color-bg-canvas',
    text:    '--ds-color-fg-default'
  };

  var PRESETS = {
    Indigo:   { accent: '#6d5dfc', bright: '#8b7cff', surface: '#e0e5ec', canvas: '#e0e5ec', text: '#4d5b7c' },
    Mint:     { accent: '#2fb59a', bright: '#4fd4b8', surface: '#e2ece8', canvas: '#e2ece8', text: '#415a52' },
    Coral:    { accent: '#f0688a', bright: '#ff8aa6', surface: '#efe6e6', canvas: '#efe6e6', text: '#6e4a52' },
    Slate:    { accent: '#5b7ca8', bright: '#7d9bc4', surface: '#e3e7ee', canvas: '#e3e7ee', text: '#465269' },
    Lavender: { accent: '#9b6dfc', bright: '#b894ff', surface: '#e8e4f0', canvas: '#e8e4f0', text: '#564d6e' }
  };

  var STORAGE_KEY = 'nm-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Indigo).
  var current = load() || Object.assign({}, PRESETS.Indigo);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'nmset nmset--closed');
    panel.innerHTML =
      '<button class="nmset__fab" aria-label="Theme settings">◐ Theme</button>' +
      '<div class="nmset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="nmset__head"><strong>Theme</strong><button class="nmset__x" aria-label="Close">✕</button></div>' +
        '<p class="nmset__lbl">Presets</p>' +
        '<div class="nmset__presets"></div>' +
        '<p class="nmset__lbl">Custom</p>' +
        '<div class="nmset__customs"></div>' +
        '<button class="nmset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.nmset__fab');
    var closeB = panel.querySelector('.nmset__x');
    var preEl  = panel.querySelector('.nmset__presets');
    var cusEl  = panel.querySelector('.nmset__customs');
    var resetB = panel.querySelector('.nmset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('nmset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('nmset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'nmset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="nmset__sw"><i style="background:' + p.accent + '"></i>' +
        '<i style="background:' + p.bright + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['accent', 'Accent'], ['bright', 'Bright'],
      ['surface', 'Surface'], ['canvas', 'Canvas'], ['text', 'Text']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'nmset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'nmset__color';
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
      current = Object.assign({}, PRESETS.Indigo);
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
    '.nmset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-sans)}' +
    '.nmset__fab{font-family:var(--ds-font-family-sans);font-weight:var(--ds-font-weight-semibold);' +
      'font-size:var(--ds-font-size-sm);cursor:pointer;color:var(--ds-color-accent-primary);' +
      'background:var(--ds-color-bg-surface);border:none;border-radius:var(--ds-radius-full);' +
      'padding:var(--ds-space-3) var(--ds-space-5);box-shadow:var(--ds-shadow-raised-sm)}' +
    '.nmset__fab:active{box-shadow:var(--ds-shadow-inset-sm)}' +
    '.nmset__panel{position:absolute;right:0;bottom:calc(100% + 14px);width:264px;' +
      'background:var(--ds-color-bg-surface);color:var(--ds-color-fg-default);border:none;' +
      'border-radius:var(--ds-radius-xl);box-shadow:var(--ds-shadow-raised-lg);padding:var(--ds-space-5)}' +
    '.nmset--closed .nmset__panel{display:none}' +
    '.nmset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-base)}' +
    '.nmset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-bold);line-height:1}' +
    '.nmset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wider);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-bold);' +
      'margin:var(--ds-space-4) 0 var(--ds-space-3);color:var(--ds-color-accent-primary)}' +
    '.nmset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-3)}' +
    '.nmset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;' +
      'min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:var(--ds-font-family-sans);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-semibold);' +
      'color:var(--ds-color-fg-default);background:var(--ds-color-bg-surface);' +
      'border:none;border-radius:var(--ds-radius-md);padding:var(--ds-space-2);box-shadow:var(--ds-shadow-raised-sm)}' +
    '.nmset__preset:active{box-shadow:var(--ds-shadow-inset-sm)}' +
    '.nmset__sw{display:inline-flex;flex-shrink:0;border-radius:var(--ds-radius-full);overflow:hidden}' +
    '.nmset__sw i{width:10px;height:15px}' +
    '.nmset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-sm)}' +
    '.nmset__color{width:88px;height:32px;margin:0;cursor:pointer;background:var(--ds-color-bg-surface);' +
      'border:none;border-radius:var(--ds-radius-md);padding:5px;box-shadow:var(--ds-shadow-inset)}' +
    '.nmset__color::-webkit-color-swatch-wrapper{padding:0}' +
    '.nmset__color::-webkit-color-swatch{border:none;border-radius:var(--ds-radius-sm)}' +
    '.nmset__color::-moz-color-swatch{border:none;border-radius:var(--ds-radius-sm)}' +
    '.nmset__reset{margin-top:var(--ds-space-4);width:100%;cursor:pointer;font-family:var(--ds-font-family-sans);' +
      'font-weight:var(--ds-font-weight-semibold);font-size:var(--ds-font-size-sm);' +
      'color:var(--ds-color-fg-default);background:var(--ds-color-bg-surface);' +
      'border:none;border-radius:var(--ds-radius-lg);padding:var(--ds-space-3);box-shadow:var(--ds-shadow-raised-sm)}' +
    '.nmset__reset:active{box-shadow:var(--ds-shadow-inset-sm)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
