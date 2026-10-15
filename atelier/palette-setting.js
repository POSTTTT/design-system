/*
 * Palette setting — a drop-in live theme switcher for the Atelier system.
 *
 * Include on any page that already loads the design-system CSS:
 *   <script src="../palette-setting.js"></script>
 *
 * A preset is a light/dark mode plus a signal colour. Mode is set with
 * <html data-theme>, so theme.css supplies the paper + ink values; the signal
 * colour overrides the two accent tokens. Choice persists in localStorage.
 * Pages can also flip the mode alone with window.atlTheme.toggle().
 */
(function () {
  var PRESETS = {
    Paper:  { mode: 'light', accent: '#2d81ff', ink: '#1659c4' },
    Night:  { mode: 'dark',  accent: '#2d81ff', ink: '#74aaff' },
    Signal: { mode: 'light', accent: '#ff5a1f', ink: '#b33d0f' },
    Moss:   { mode: 'light', accent: '#1f9d55', ink: '#14713c' },
    Violet: { mode: 'dark',  accent: '#8b5cf6', ink: '#c4b5fd' }
  };
  var STORAGE_KEY = 'atelier-palette';
  var root = document.documentElement;

  function systemMode() { return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  function apply(p) {
    root.setAttribute('data-theme', p.mode);
    root.style.setProperty('--ds-color-accent-primary', p.accent);
    root.style.setProperty('--ds-color-accent-ink', p.ink);
  }
  function save(p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; } }

  var current = load();
  if (current) apply(current);

  window.atlTheme = {
    toggle: function () {
      var mode = (root.getAttribute('data-theme') || systemMode()) === 'dark' ? 'light' : 'dark';
      var blue = !current || current.accent === PRESETS.Paper.accent;
      current = {
        mode: mode,
        accent: current ? current.accent : PRESETS.Paper.accent,
        ink: blue ? (mode === 'dark' ? PRESETS.Night.ink : PRESETS.Paper.ink) : current.ink
      };
      apply(current); save(current);
      return mode;
    }
  };

  function init() {
    injectStyles();
    var panel = el('div', 'atlset atlset--closed');
    panel.innerHTML =
      '<button class="atlset__fab" aria-expanded="false">Theme</button>' +
      '<div class="atlset__panel" role="dialog" aria-label="Theme">' +
        '<div class="atlset__head"><span>Theme</span><button class="atlset__x" aria-label="Close">✕</button></div>' +
        '<div class="atlset__presets"></div>' +
        '<label class="atlset__row"><span>Signal</span><input type="color" class="atlset__color"></label>' +
        '<button class="atlset__reset">Follow system</button>' +
      '</div>';
    document.body.appendChild(panel);
    var fab = panel.querySelector('.atlset__fab');
    var color = panel.querySelector('.atlset__color');
    function setOpen(o) { panel.classList.toggle('atlset--closed', !o); fab.setAttribute('aria-expanded', String(o)); }
    fab.addEventListener('click', function () { setOpen(panel.classList.contains('atlset--closed')); });
    panel.querySelector('.atlset__x').addEventListener('click', function () { setOpen(false); fab.focus(); });

    Object.keys(PRESETS).forEach(function (name) {
      var p = PRESETS[name];
      var b = el('button', 'atlset__preset');
      b.type = 'button';
      b.innerHTML = '<i style="background:' + (p.mode === 'dark' ? '#121316' : '#f2f1ee') + '"></i><i style="background:' + p.accent + '"></i>' + name;
      b.addEventListener('click', function () { current = Object.assign({}, p); apply(current); save(current); color.value = p.accent; });
      panel.querySelector('.atlset__presets').appendChild(b);
    });
    color.value = (current && current.accent) || '#2d81ff';
    color.addEventListener('input', function () {
      current = Object.assign({ mode: root.getAttribute('data-theme') || systemMode() }, current, { accent: color.value, ink: color.value });
      apply(current); save(current);
    });
    panel.querySelector('.atlset__reset').addEventListener('click', function () {
      current = null;
      root.removeAttribute('data-theme');
      root.style.removeProperty('--ds-color-accent-primary');
      root.style.removeProperty('--ds-color-accent-ink');
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      color.value = '#2d81ff';
    });
  }

  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  function injectStyles() {
    var mono = 'font-family:var(--ds-font-family-mono);font-size:var(--ds-font-size-label);letter-spacing:var(--ds-font-letter-spacing-label);text-transform:uppercase;';
    var css =
    '.atlset{position:fixed;left:20px;bottom:20px;z-index:9999;color:var(--ds-color-fg-default)}' +
    '.atlset button{cursor:pointer;color:inherit;border-radius:0}' +
    '.atlset button:focus-visible,.atlset__color:focus-visible{outline:2px solid var(--ds-color-accent-primary);outline-offset:2px}' +
    '.atlset__fab{' + mono + 'font-weight:700;height:36px;padding:0 14px;background:var(--ds-color-bg-invert);color:var(--ds-color-fg-on-invert)!important;border:0}' +
    '.atlset__panel{position:absolute;left:0;bottom:calc(100% + 8px);width:260px;max-width:calc(100vw - 40px);background:var(--ds-color-bg-raised);border:1px solid var(--ds-color-line-strong);padding:16px}' +
    '.atlset--closed .atlset__panel{display:none}' +
    '.atlset__head{' + mono + 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;color:var(--ds-color-fg-muted)}' +
    '.atlset__x{background:none;border:0;padding:4px}' +
    '.atlset__presets{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--ds-color-line-default);border:1px solid var(--ds-color-line-default)}' +
    '.atlset__preset{' + mono + 'display:flex;align-items:center;gap:6px;height:34px;padding:0 8px;background:var(--ds-color-bg-raised);border:0;text-align:left}' +
    '.atlset__preset:hover{background:var(--ds-color-bg-sunken)}' +
    '.atlset__preset i{width:8px;height:12px;flex-shrink:0;box-shadow:0 0 0 1px var(--ds-color-line-strong)}' +
    '.atlset__row{' + mono + 'display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:var(--ds-color-fg-muted)}' +
    '.atlset__color{width:72px;height:28px;padding:2px;border:1px solid var(--ds-color-line-strong);background:none}' +
    '.atlset__reset{' + mono + 'margin-top:12px;width:100%;height:32px;background:none;border:1px solid var(--ds-color-line-strong)}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
