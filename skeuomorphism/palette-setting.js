/*
 * Palette setting — a drop-in live theme switcher for the skeuomorphism system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 * Presets re-upholster the desk: leather hide, tablecloth, paper, ink and button glass.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    accent:  '--ds-color-accent-primary',
    leather: '--ds-color-bg-leather',
    canvas:  '--ds-color-bg-canvas',
    paper:   '--ds-color-bg-paper',
    text:    '--ds-color-fg-default'
  };

  // Accents keep >= 4.5:1 against white button text.
  var PRESETS = {
    Saddle:  { accent: '#2b64c8', leather: '#8a5a36', canvas: '#e6ddcc', paper: '#fdf8ea', text: '#2e241b' },
    Walnut:  { accent: '#9a3412', leather: '#4e3322', canvas: '#d9cfbf', paper: '#f8f1e1', text: '#2a1f16' },
    Oxblood: { accent: '#7f1d1d', leather: '#6b1f22', canvas: '#e9e0d6', paper: '#fcf6ef', text: '#2d1a18' },
    Navy:    { accent: '#1e40af', leather: '#1f2f4d', canvas: '#dfe2e6', paper: '#f8f9fb', text: '#1c2433' },
    Olive:   { accent: '#3f6212', leather: '#55552c', canvas: '#e3e1cf', paper: '#fbfaef', text: '#2a2a1a' }
  };

  var STORAGE_KEY = 'skeuomorphism-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Saddle).
  var current = load() || Object.assign({}, PRESETS.Saddle);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'skset skset--closed');
    panel.innerHTML =
      '<button class="skset__fab" aria-label="Theme settings">Materials</button>' +
      '<div class="skset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="skset__head"><strong>Materials</strong><button class="skset__x" aria-label="Close">✕</button></div>' +
        '<p class="skset__lbl">Presets</p>' +
        '<div class="skset__presets"></div>' +
        '<p class="skset__lbl">Custom</p>' +
        '<div class="skset__customs"></div>' +
        '<button class="skset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.skset__fab');
    var closeB = panel.querySelector('.skset__x');
    var preEl  = panel.querySelector('.skset__presets');
    var cusEl  = panel.querySelector('.skset__customs');
    var resetB = panel.querySelector('.skset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('skset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('skset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'skset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="skset__sw"><i style="background:' + p.leather + '"></i>' +
        '<i style="background:' + p.accent + '"></i>' +
        '<i style="background:' + p.paper + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['accent', 'Button'], ['leather', 'Leather'], ['canvas', 'Linen'],
      ['paper', 'Paper'], ['text', 'Ink']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'skset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'skset__color';
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
      current = Object.assign({}, PRESETS.Saddle);
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
    '.skset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-sans);color:var(--ds-color-fg-default)}' +
    '.skset__fab{cursor:pointer;font-family:inherit;font-weight:var(--ds-font-weight-bold);font-size:var(--ds-font-size-sm);' +
      'color:var(--ds-color-fg-on-leather);text-shadow:var(--ds-text-shadow-deboss);' +
      'background:var(--sk-grain-strong),var(--ds-color-bg-leather);' +
      'border:var(--ds-border-width-hairline) solid color-mix(in srgb,var(--ds-color-bg-leather) 45%,black);' +
      'outline:var(--ds-border-width-stitch) dashed var(--ds-color-detail-stitch);outline-offset:-6px;' +
      'border-radius:var(--ds-radius-md);padding:var(--ds-space-3) var(--ds-space-5);box-shadow:var(--ds-shadow-object)}' +
    '.skset__fab:focus-visible,.skset__preset:focus-visible,.skset__reset:focus-visible,.skset__x:focus-visible{outline:var(--ds-border-width-focus) solid var(--ds-color-accent-primary);outline-offset:2px}' +
    '.skset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:272px;max-width:calc(100vw - 40px);' +
      'background:var(--sk-grain),var(--ds-color-bg-paper);border:var(--ds-border-width-hairline) solid var(--ds-color-border-default);' +
      'border-radius:var(--ds-radius-lg);padding:var(--ds-space-5);box-shadow:inset 0 1px 0 #fff,var(--ds-shadow-object)}' +
    '.skset--closed .skset__panel{display:none}' +
    '.skset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);' +
      'font-family:var(--ds-font-family-serif);font-size:var(--ds-font-size-base);text-shadow:var(--ds-text-shadow-emboss)}' +
    '.skset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);line-height:1}' +
    '.skset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-bold);' +
      'margin:var(--ds-space-4) 0 var(--ds-space-3);color:var(--ds-color-fg-muted);text-shadow:var(--ds-text-shadow-emboss)}' +
    '.skset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.skset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:inherit;font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-bold);color:var(--ds-color-fg-default);text-shadow:var(--ds-text-shadow-emboss);' +
      'background:linear-gradient(#fff,#e9e1d2);border:var(--ds-border-width-hairline) solid var(--ds-color-border-strong);border-radius:var(--ds-radius-sm);' +
      'padding:var(--ds-space-2);box-shadow:var(--ds-shadow-raised)}' +
    '.skset__preset:active{box-shadow:var(--ds-shadow-pressed)}' +
    '.skset__sw{display:inline-flex;flex-shrink:0;border:1px solid rgba(0,0,0,0.3);border-radius:3px;overflow:hidden}' +
    '.skset__sw i{width:6px;height:14px}' +
    '.skset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-sm);font-weight:var(--ds-font-weight-semibold)}' +
    '.skset__color{width:92px;height:28px;margin:0;cursor:pointer;background:#fff;' +
      'border:var(--ds-border-width-hairline) solid var(--ds-color-border-strong);border-radius:var(--ds-radius-sm);padding:0;box-shadow:var(--ds-shadow-inset)}' +
    '.skset__color::-webkit-color-swatch-wrapper{padding:3px}' +
    '.skset__color::-webkit-color-swatch{border:none;border-radius:3px}' +
    '.skset__color::-moz-color-swatch{border:none;border-radius:3px}' +
    '.skset__reset{margin-top:var(--ds-space-4);width:100%;cursor:pointer;font-family:inherit;font-weight:var(--ds-font-weight-bold);font-size:var(--ds-font-size-sm);' +
      'color:var(--ds-color-fg-default);text-shadow:var(--ds-text-shadow-emboss);background:linear-gradient(#fff,#e9e1d2);' +
      'border:var(--ds-border-width-hairline) solid var(--ds-color-border-strong);border-radius:var(--ds-radius-md);padding:var(--ds-space-2);box-shadow:var(--ds-shadow-raised)}' +
    '.skset__reset:active{box-shadow:var(--ds-shadow-pressed)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
