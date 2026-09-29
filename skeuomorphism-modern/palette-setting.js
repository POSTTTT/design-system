/*
 * Palette setting — a drop-in live theme switcher for the modern skeuomorphism system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * It overrides the semantic `--ds-*` color variables at the document root, so
 * every token-driven component recolors instantly. Choice persists in localStorage.
 * Presets are product colorways — including two dark housings, which also flip
 * the edge lighting and text so the hardware reads correctly in the dark.
 */
(function () {
  // Setting key -> the CSS variable it overrides.
  var VARS = {
    accent:    '--ds-color-accent-primary',
    canvas:    '--ds-color-bg-canvas',
    plastic:   '--ds-color-bg-plastic',
    dark:      '--ds-color-bg-dark',
    text:      '--ds-color-fg-default',
    muted:     '--ds-color-fg-muted',
    faint:     '--ds-color-fg-faint',
    highlight: '--ds-color-edge-highlight',
    line:      '--ds-color-edge-line',
    success:   '--ds-color-feedback-success',
    warning:   '--ds-color-feedback-warning',
    danger:    '--ds-color-feedback-danger'
  };

  var LIGHT = { highlight: 'rgba(255,255,255,0.9)', line: 'rgba(28,28,30,0.09)', success: '#1f7a45', warning: '#a86400', danger: '#cc3322' };
  var DARK  = { highlight: 'rgba(255,255,255,0.1)', line: 'rgba(0,0,0,0.5)',     success: '#4ade80', warning: '#fbbf24', danger: '#ff6b5b' };
  function mk(base, p) { return Object.assign({}, base, p); }

  // Accents are bright and carry graphite text (fg-on-accent), so they stay >= 4.5:1.
  var PRESETS = {
    Studio:   mk(LIGHT, { accent: '#ff5a1f', canvas: '#e9e8e4', plastic: '#f5f4f0', dark: '#1c1c1e', text: '#1c1c1e', muted: '#5f5e5a', faint: '#8f8d87' }),
    Sunbeam:  mk(LIGHT, { accent: '#ffc933', canvas: '#ece6d6', plastic: '#f8f3e6', dark: '#2a2620', text: '#2a2620', muted: '#6a6152', faint: '#978d7b' }),
    Mint:     mk(LIGHT, { accent: '#3ddc97', canvas: '#e2e7e4', plastic: '#f2f5f3', dark: '#1d2522', text: '#1b2320', muted: '#56625d', faint: '#87928d' }),
    Graphite: mk(DARK,  { accent: '#ff5a1f', canvas: '#141416', plastic: '#2a2a2e', dark: '#0d0d0f', text: '#f2f1ed', muted: '#b3b1ab', faint: '#85837e' }),
    Midnight: mk(DARK,  { accent: '#5ab8ff', canvas: '#10141c', plastic: '#232a36', dark: '#0a0d13', text: '#eef2f8', muted: '#a9b3c2', faint: '#7d8898' })
  };

  var STORAGE_KEY = 'skeuomorphism-modern-palette';
  var root = document.documentElement;

  function apply(p) { for (var k in VARS) { if (p[k]) root.style.setProperty(VARS[k], p[k]); } }
  function clearVars() { for (var k in VARS) { root.style.removeProperty(VARS[k]); } }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  // Apply saved palette as early as possible (default = Studio).
  var current = load() || Object.assign({}, PRESETS.Studio);
  apply(current);

  function init() {
    injectStyles();

    var panel = el('div', 'skmset skmset--closed');
    panel.innerHTML =
      '<button class="skmset__fab" aria-label="Theme settings"><span class="skmset__led"></span>Colorway</button>' +
      '<div class="skmset__panel" role="dialog" aria-label="Theme settings">' +
        '<div class="skmset__head"><strong>Colorway</strong><button class="skmset__x" aria-label="Close">✕</button></div>' +
        '<p class="skmset__lbl">Presets</p>' +
        '<div class="skmset__presets"></div>' +
        '<p class="skmset__lbl">Custom</p>' +
        '<div class="skmset__customs"></div>' +
        '<button class="skmset__reset">Reset to default</button>' +
      '</div>';
    document.body.appendChild(panel);

    var fab    = panel.querySelector('.skmset__fab');
    var closeB = panel.querySelector('.skmset__x');
    var preEl  = panel.querySelector('.skmset__presets');
    var cusEl  = panel.querySelector('.skmset__customs');
    var resetB = panel.querySelector('.skmset__reset');

    fab.addEventListener('click', function () { panel.classList.toggle('skmset--closed'); });
    closeB.addEventListener('click', function () { panel.classList.add('skmset--closed'); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'skmset__preset');
      b.type = 'button';
      b.innerHTML =
        '<span class="skmset__sw"><i style="background:' + p.plastic + '"></i>' +
        '<i style="background:' + p.accent + '"></i>' +
        '<i style="background:' + p.dark + '"></i></span>' + name;
      b.addEventListener('click', function () {
        current = Object.assign({}, p);
        apply(current); save(current); syncInputs();
      });
      preEl.appendChild(b);
    });

    // Only solid colors are hand-tunable; edge lighting comes from the preset.
    var fields = [
      ['accent', 'Accent'], ['plastic', 'Housing'], ['dark', 'Dark keys'],
      ['canvas', 'Backdrop'], ['text', 'Text']
    ];
    var inputs = {};
    fields.forEach(function (f) {
      var key = f[0];
      var row = el('label', 'skmset__row');
      var span = el('span'); span.textContent = f[1];
      var input = document.createElement('input');
      input.type = 'color';
      input.className = 'skmset__color';
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
      current = Object.assign({}, PRESETS.Studio);
      clearVars();
      apply(current);
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      syncInputs();
    });

    syncInputs();
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var cap = 'background:linear-gradient(to bottom,color-mix(in srgb,var(--ds-color-bg-plastic) 82%,white),var(--ds-color-bg-plastic) 40%,color-mix(in srgb,var(--ds-color-bg-plastic) 93%,black));' +
      'border:none;box-shadow:var(--ds-shadow-key);color:var(--ds-color-fg-default);cursor:pointer;font-family:inherit;';
    var mono = 'font-family:var(--ds-font-family-mono);text-transform:uppercase;letter-spacing:var(--ds-font-letter-spacing-wide);font-size:var(--ds-font-size-2xs);';
    var css =
    '.skmset{position:fixed;right:20px;bottom:20px;z-index:9999;font-family:var(--ds-font-family-sans);color:var(--ds-color-fg-default)}' +
    '.skmset__fab{' + cap + mono + 'display:inline-flex;align-items:center;gap:8px;border-radius:var(--ds-radius-full);padding:10px 16px}' +
    '.skmset__fab:active,.skmset__preset:active,.skmset__reset:active{box-shadow:var(--ds-shadow-pressed);transform:translateY(1px)}' +
    '.skmset__led{width:7px;height:7px;border-radius:50%;background:var(--ds-color-accent-primary);box-shadow:0 0 6px var(--ds-color-accent-primary)}' +
    '.skmset__fab:focus-visible,.skmset__preset:focus-visible,.skmset__reset:focus-visible,.skmset__x:focus-visible{outline:var(--ds-border-width-focus) solid var(--ds-color-accent-primary);outline-offset:3px}' +
    '.skmset__panel{position:absolute;right:0;bottom:calc(100% + 14px);width:276px;max-width:calc(100vw - 40px);' +
      'background:linear-gradient(to bottom,color-mix(in srgb,var(--ds-color-bg-plastic) 86%,white),var(--ds-color-bg-plastic) 28%);' +
      'border-radius:var(--ds-radius-xl);padding:var(--ds-space-5);box-shadow:var(--ds-shadow-device)}' +
    '.skmset--closed .skmset__panel{display:none}' +
    '.skmset__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-base);font-weight:var(--ds-font-weight-semibold)}' +
    '.skmset__x{cursor:pointer;background:none;border:none;padding:0;margin:0;color:var(--ds-color-fg-muted);font-size:var(--ds-font-size-base);line-height:1}' +
    '.skmset__lbl{' + mono + 'margin:var(--ds-space-4) 0 var(--ds-space-3);color:var(--ds-color-fg-muted)}' +
    '.skmset__presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--ds-space-2)}' +
    '.skmset__preset{' + cap + 'display:flex;align-items:center;gap:var(--ds-space-2);min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
      'font-size:var(--ds-font-size-xs);font-weight:var(--ds-font-weight-medium);border-radius:var(--ds-radius-sm);padding:var(--ds-space-2)}' +
    '.skmset__sw{display:inline-flex;flex-shrink:0;border-radius:3px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}' +
    '.skmset__sw i{width:6px;height:14px}' +
    '.skmset__row{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--ds-space-2);font-size:var(--ds-font-size-sm)}' +
    '.skmset__color{width:92px;height:28px;margin:0;cursor:pointer;border:none;border-radius:var(--ds-radius-sm);padding:0;' +
      'background:color-mix(in srgb,var(--ds-color-bg-plastic) 92%,black);box-shadow:var(--ds-shadow-well)}' +
    '.skmset__color::-webkit-color-swatch-wrapper{padding:4px}' +
    '.skmset__color::-webkit-color-swatch{border:none;border-radius:3px}' +
    '.skmset__color::-moz-color-swatch{border:none;border-radius:3px}' +
    '.skmset__reset{' + cap + 'margin-top:var(--ds-space-4);width:100%;font-weight:var(--ds-font-weight-medium);font-size:var(--ds-font-size-sm);' +
      'border-radius:var(--ds-radius-md);padding:var(--ds-space-2)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
