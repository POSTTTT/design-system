/*
 * Palette setting — a drop-in live theme switcher for the glassmorphism system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 * Presets relight the backdrop: the night canvas, its three orbs, and the accents.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    accent:    '--ds-color-accent-primary',
    secondary: '--ds-color-accent-secondary',
    canvas:    '--ds-color-bg-canvas',
    orbA:      '--ds-color-bg-orb-a',
    orbB:      '--ds-color-bg-orb-b',
    orbC:      '--ds-color-bg-orb-c'
  };

  // Accents keep >= 4.5:1 against white button text.
  var PRESETS = {
    Aurora: { accent: '#7c3aed', secondary: '#22d3ee', canvas: '#0b1026', orbA: '#7c3aed', orbB: '#ec4899', orbC: '#22d3ee' },
    Sunset: { accent: '#e11d48', secondary: '#fbbf24', canvas: '#1a0b16', orbA: '#f97316', orbB: '#e11d48', orbC: '#a855f7' },
    Ocean:  { accent: '#2563eb', secondary: '#2dd4bf', canvas: '#04121f', orbA: '#0ea5e9', orbB: '#2563eb', orbC: '#14b8a6' },
    Forest: { accent: '#047857', secondary: '#a3e635', canvas: '#07140f', orbA: '#10b981', orbB: '#84cc16', orbC: '#0d9488' },
    Mono:   { accent: '#475569', secondary: '#e2e8f0', canvas: '#0a0a0f', orbA: '#64748b', orbB: '#94a3b8', orbC: '#334155' }
  };

  var STORAGE_KEY = 'glassmorphism-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Aurora).
  var current = load() || Object.assign({}, PRESETS.Aurora);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'glset glset--closed');
    panel.innerHTML =
      '<button class="glset__fab" aria-label="Theme settings">◐ Light</button>' +
      '<div class="glset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="glset__head"><strong>Backdrop light</strong><button class="glset__x" aria-label="Close">✕</button></div>' +
        '<p class="glset__lbl">Presets</p>' +
        '<div class="glset__presets"></div>' +
        '<p class="glset__lbl">Custom</p>' +
        '<div class="glset__customs"></div>' +
        '<button class="glset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.glset__fab');
    var closeB = panel.querySelector('.glset__x');
    var preEl  = panel.querySelector('.glset__presets');
    var cusEl  = panel.querySelector('.glset__customs');
    var resetB = panel.querySelector('.glset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('glset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('glset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'glset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="glset__sw"><i style="background:' + p.orbA + '"></i>' +
        '<i style="background:' + p.orbB + '"></i>' +
        '<i style="background:' + p.orbC + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    var fields = [
      ['accent', 'Accent'], ['secondary', 'Secondary'], ['canvas', 'Canvas'],
      ['orbA', 'Orb A'], ['orbB', 'Orb B'], ['orbC', 'Orb C']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'glset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'glset__color';
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
      current = Object.assign({}, PRESETS.Aurora);
      clearVars();
      apply(current);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      syncInputs();
    });

    syncInputs();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var glass =
      'background:var(--ds-color-bg-glass-strong);-webkit-backdrop-filter:blur(var(--ds-blur-lg)) saturate(160%);' +
      'backdrop-filter:blur(var(--ds-blur-lg)) saturate(160%);' +
      'border:var(--ds-border-width-hairline) solid var(--ds-color-border-glass);box-shadow:var(--ds-shadow-glass);';
    var css =
    '.glset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-sans);color:var(--ds-color-fg-default)}' +
    '.glset__fab{font-family:inherit;font-weight:var(--ds-font-weight-semibold);font-size:var(--ds-font-size-sm);cursor:pointer;' +
      'color:var(--ds-color-fg-default);' + glass + 'border-radius:var(--ds-radius-full);padding:var(--ds-space-2) var(--ds-space-4)}' +
    '.glset__fab:focus-visible,.glset__preset:focus-visible,.glset__reset:focus-visible,.glset__x:focus-visible{outline:var(--ds-border-width-focus) solid var(--ds-color-accent-secondary);outline-offset:2px}' +
    '.glset__panel{position:absolute;right:0;bottom:calc(100% + 12px);width:272px;max-width:calc(100vw - 40px);' +
      glass + 'background:rgba(16,20,48,0.72);border-radius:var(--ds-radius-lg);padding:var(--ds-space-5)}' +
    '.glset--closed .glset__panel{display:none}' +
    '.glset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-3);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-bold)}' +
    '.glset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);line-height:1}' +
    '.glset__lbl{text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-semibold);' +
      'margin:var(--ds-space-4) 0 var(--ds-space-3);color:var(--ds-color-fg-muted)}' +
    '.glset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.glset__preset{display:flex;align-items:center;gap:var(--ds-space-2);cursor:pointer;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-family:inherit;font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-semibold);color:var(--ds-color-fg-default);' +
      'background:rgba(255,255,255,0.06);border:var(--ds-border-width-hairline) solid var(--ds-color-border-glass);border-radius:var(--ds-radius-sm);padding:var(--ds-space-2)}' +
    '.glset__preset:hover{background:rgba(255,255,255,0.14)}' +
    '.glset__sw{display:inline-flex;flex-shrink:0;border-radius:var(--ds-radius-full);overflow:hidden}' +
    '.glset__sw i{width:7px;height:14px}' +
    '.glset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-sm)}' +
    '.glset__color{width:92px;height:28px;margin:0;cursor:pointer;background:rgba(255,255,255,0.06);' +
      'border:var(--ds-border-width-hairline) solid var(--ds-color-border-glass);border-radius:var(--ds-radius-sm);padding:0}' +
    '.glset__color::-webkit-color-swatch-wrapper{padding:3px}' +
    '.glset__color::-webkit-color-swatch{border:none;border-radius:4px}' +
    '.glset__color::-moz-color-swatch{border:none;border-radius:4px}' +
    '.glset__reset{margin-top:var(--ds-space-4);width:100%;cursor:pointer;font-family:inherit;' +
      'font-weight:var(--ds-font-weight-semibold);font-size:var(--ds-font-size-sm);color:var(--ds-color-fg-default);' +
      'background:rgba(255,255,255,0.06);border:var(--ds-border-width-hairline) solid var(--ds-color-border-glass);border-radius:var(--ds-radius-full);padding:var(--ds-space-2)}' +
    '.glset__reset:hover{background:rgba(255,255,255,0.14)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
