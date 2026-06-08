/*
 * Palette setting — a drop-in live theme switcher for the developer-brutalism system.
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
    accent: '--ds-color-accent-primary',
    bright: '--ds-color-accent-bright',
    canvas: '--ds-color-bg-canvas',
    text:   '--ds-color-fg-default',
    border: '--ds-color-border-default'
  };

  var PRESETS = {
    Amber:  { accent: '#e0a04a', bright: '#ff7a1a', canvas: '#0a0a0a', text: '#e6e6e6', border: '#262626' },
    Matrix: { accent: '#3fd97f', bright: '#7dffa0', canvas: '#060806', text: '#c8f7d4', border: '#143019' },
    Ice:    { accent: '#5cc8ff', bright: '#8ad8ff', canvas: '#06080c', text: '#d6e6f2', border: '#1c2733' },
    Synth:  { accent: '#ff5cc8', bright: '#b06bff', canvas: '#0c0810', text: '#f0d9ff', border: '#2a1830' },
    Mono:   { accent: '#cfcfcf', bright: '#ffffff', canvas: '#0a0a0a', text: '#e6e6e6', border: '#2a2a2a' }
  };

  var STORAGE_KEY = 'db-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Amber).
  var current = load() || Object.assign({}, PRESETS.Amber);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'dbset dbset--closed');
    panel.innerHTML =
      '<button class="dbset__fab" aria-label="Theme settings">◐ Theme</button>' +
      '<div class="dbset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="dbset__head"><strong>Theme</strong><button class="dbset__x" aria-label="Close">✕</button></div>' +
        '<p class="dbset__lbl">Presets</p>' +
        '<div class="dbset__presets"></div>' +
        '<p class="dbset__lbl">Custom</p>' +
        '<div class="dbset__customs"></div>' +
        '<button class="dbset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.dbset__fab');
    var closeB = panel.querySelector('.dbset__x');
    var preEl  = panel.querySelector('.dbset__presets');
    var cusEl  = panel.querySelector('.dbset__customs');
    var resetB = panel.querySelector('.dbset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('dbset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('dbset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'dbset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="dbset__sw"><i style="background:' + p.accent + '"></i>' +
        '<i style="background:' + p.bright + '"></i>' +
        '<i style="background:' + p.canvas + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['accent', 'Accent'], ['bright', 'Bright'],
      ['canvas', 'Canvas'], ['text', 'Text'], ['border', 'Border']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'dbset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'dbset__color';
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
      current = Object.assign({}, PRESETS.Amber);
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
    '.dbset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-mono)}' +
    '.dbset__fab{font-family:var(--ds-font-family-mono);font-weight:var(--ds-font-weight-semibold);' +
      'font-size:var(--ds-font-size-sm);text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);' +
      'cursor:pointer;color:var(--ds-color-accent-primary);background:var(--ds-color-bg-surface);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-accent-primary);border-radius:var(--ds-radius-md);' +
      'padding:var(--ds-space-3) var(--ds-space-4)}' +
    '.dbset__fab:hover{color:var(--ds-color-fg-default)}' +
    '.dbset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:268px;' +
      'background:var(--ds-color-bg-surface);color:var(--ds-color-fg-default);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);' +
      'box-shadow:var(--ds-shadow-md);padding:var(--ds-space-4)}' +
    '.dbset--closed .dbset__panel{display:none}' +
    '.dbset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-base)}' +
    '.dbset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-bold);line-height:1}' +
    '.dbset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wider);font-size:var(--ds-font-size-xs);' +
      'margin:var(--ds-space-3) 0 var(--ds-space-2);color:var(--ds-color-accent-primary)}' +
    '.dbset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.dbset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;' +
      'min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:var(--ds-font-family-mono);font-size:var(--ds-font-size-xs);text-transform:uppercase;' +
      'letter-spacing:var(--ds-font-letter-spacing-wide);color:var(--ds-color-fg-default);background:var(--ds-color-bg-inset);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:var(--ds-space-2)}' +
    '.dbset__preset:hover{border-color:var(--ds-color-border-strong)}' +
    '.dbset__sw{display:inline-flex;flex-shrink:0}' +
    '.dbset__sw i{width:8px;height:16px;border:1px solid var(--ds-color-border-default)}' +
    '.dbset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-sm)}' +
    '.dbset__color{width:96px;height:28px;margin:0;cursor:pointer;background:none;' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-sm);padding:0}' +
    '.dbset__color::-webkit-color-swatch-wrapper{padding:0}' +
    '.dbset__color::-webkit-color-swatch{border:none;border-radius:0}' +
    '.dbset__color::-moz-color-swatch{border:none}' +
    '.dbset__reset{margin-top:var(--ds-space-3);width:100%;cursor:pointer;font-family:var(--ds-font-family-mono);' +
      'font-size:var(--ds-font-size-sm);text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);' +
      'color:var(--ds-color-fg-default);background:var(--ds-color-bg-inset);' +
      'border:var(--ds-border-width-thin) solid var(--ds-color-border-default);border-radius:var(--ds-radius-md);padding:var(--ds-space-2)}' +
    '.dbset__reset:hover{border-color:var(--ds-color-border-strong)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
