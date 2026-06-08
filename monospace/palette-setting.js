/*
 * Palette setting — a drop-in live theme switcher for the monospace system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 */
(function () {
  // Setting key -> the CSS variable(s) it overrides.
  var VARS = {
    accent:  '--ds-color-accent-primary',
    accent2: '--ds-color-accent-secondary',
    canvas:  '--ds-color-bg-canvas',
    text:    ['--ds-color-fg-default', '--ds-color-fg-heading'],
    border:  '--ds-color-border-default'
  };

  var PRESETS = {
    'One Dark': { accent: '#e06c75', accent2: '#f0989e', canvas: '#282c34', text: '#9cdef2', border: '#355a66' },
    Dracula:    { accent: '#ff79c6', accent2: '#bd93f9', canvas: '#282a36', text: '#f8f8f2', border: '#44475a' },
    Gruvbox:    { accent: '#fe8019', accent2: '#fabd2f', canvas: '#282828', text: '#ebdbb2', border: '#504945' },
    Nord:       { accent: '#88c0d0', accent2: '#81a1c1', canvas: '#2e3440', text: '#d8dee9', border: '#434c5e' },
    Matrix:     { accent: '#50fa7b', accent2: '#00ffa3', canvas: '#0d120d', text: '#7dffa0', border: '#1f3a26' }
  };

  var STORAGE_KEY = 'ms-palette';
  var root = document.documentElement;

  function applyVar(name, val) { root.style.setProperty(name, val); }
  function apply(p) {
    for (var k in VARS) {
      if (!p[k]) continue;
      var t = VARS[k];
      if (Array.isArray(t)) t.forEach(function (n) { applyVar(n, p[k]); });
      else applyVar(t, p[k]);
    }
  }
  function clearVars() {
    for (var k in VARS) {
      var t = VARS[k];
      (Array.isArray(t) ? t : [t]).forEach(function (n) { root.style.removeProperty(n); });
    }
  }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = One Dark).
  var current = load() || Object.assign({}, PRESETS['One Dark']);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'msset msset--closed');
    panel.innerHTML =
      '<button class="msset__fab" aria-label="Theme settings">◐ Theme</button>' +
      '<div class="msset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="msset__head"><strong>Theme</strong><button class="msset__x" aria-label="Close">✕</button></div>' +
        '<p class="msset__lbl">Presets</p>' +
        '<div class="msset__presets"></div>' +
        '<p class="msset__lbl">Custom</p>' +
        '<div class="msset__customs"></div>' +
        '<button class="msset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.msset__fab');
    var closeB = panel.querySelector('.msset__x');
    var preEl  = panel.querySelector('.msset__presets');
    var cusEl  = panel.querySelector('.msset__customs');
    var resetB = panel.querySelector('.msset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('msset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('msset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'msset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="msset__sw"><i style="background:' + p.accent + '"></i>' +
        '<i style="background:' + p.accent2 + '"></i>' +
        '<i style="background:' + p.canvas + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['accent', 'Accent'], ['accent2', 'Accent 2'],
      ['canvas', 'Canvas'], ['text', 'Text'], ['border', 'Border']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'msset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'msset__color';
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
      current = Object.assign({}, PRESETS['One Dark']);
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
    '.msset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-mono)}' +
    '.msset__fab{font-family:var(--ds-font-family-mono);font-weight:var(--ds-font-weight-semibold);' +
      'font-size:var(--ds-font-size-sm);cursor:pointer;color:var(--ds-color-fg-on-accent);' +
      'background:linear-gradient(135deg,var(--ds-color-accent-primary),var(--ds-color-accent-secondary));' +
      'border:none;border-radius:var(--ds-radius-lg);box-shadow:var(--ds-shadow-md);padding:var(--ds-space-3) var(--ds-space-4)}' +
    '.msset__fab:hover{filter:brightness(1.07)}' +
    '.msset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:270px;' +
      'background:var(--ds-color-bg-surface);color:var(--ds-color-fg-default);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-lg);' +
      'box-shadow:var(--ds-shadow-lg);padding:var(--ds-space-4)}' +
    '.msset--closed .msset__panel{display:none}' +
    '.msset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);' +
      'font-size:var(--ds-font-size-lg);color:var(--ds-color-fg-heading)}' +
    '.msset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);' +
      'font-size:var(--ds-font-size-lg);font-weight:var(--ds-font-weight-bold);line-height:1}' +
    '.msset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);' +
      'font-size:var(--ds-font-size-xs);margin:var(--ds-space-3) 0 var(--ds-space-2);color:var(--ds-color-fg-muted)}' +
    '.msset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.msset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;' +
      'min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:var(--ds-font-family-mono);font-weight:var(--ds-font-weight-medium);font-size:var(--ds-font-size-xs);' +
      'color:var(--ds-color-fg-default);background:var(--ds-color-bg-code);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);' +
      'padding:var(--ds-space-2)}' +
    '.msset__preset:hover{border-color:var(--ds-color-border-strong)}' +
    '.msset__sw{display:inline-flex;flex-shrink:0}' +
    '.msset__sw i{width:8px;height:16px;border:1px solid var(--ds-color-border-default)}' +
    '.msset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);' +
      'font-size:var(--ds-font-size-sm);color:var(--ds-color-fg-default)}' +
    '.msset__color{width:96px;height:30px;margin:0;cursor:pointer;background:none;' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:0}' +
    '.msset__color::-webkit-color-swatch-wrapper{padding:0}' +
    '.msset__color::-webkit-color-swatch{border:none;border-radius:0}' +
    '.msset__color::-moz-color-swatch{border:none}' +
    '.msset__reset{margin-top:var(--ds-space-3);width:100%;cursor:pointer;font-family:var(--ds-font-family-mono);' +
      'font-size:var(--ds-font-size-sm);color:var(--ds-color-fg-default);background:var(--ds-color-bg-code);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);' +
      'padding:var(--ds-space-2)}' +
    '.msset__reset:hover{border-color:var(--ds-color-border-strong)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
