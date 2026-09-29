# Skeuomorphism (modern) components

Tactile product-hardware component library: matte moulded plastic housings,
keys with real travel, turned-aluminium knobs, faders in grooves, slide
switches, pinhole LEDs and a dark glass display with an amber readout, all
under soft studio light. Geist + Geist Mono. Plain CSS built on the `--ds-*` tokens.

Compared with `skeuomorphism/` (linen, leather, paper), this one borrows from
modern consumer hardware: clean surfaces, realistic light, one signal-orange
accent, and no textures beyond the display scanlines.

## Use

One import gives the tokens **and** every component (classes namespaced `skm-`):

```html
<link rel="stylesheet" href="skeuomorphism-modern-compo/components.css" />
<body class="skm-studio">…</body>
```

Edge lighting reads `--ds-color-edge-highlight` / `--ds-color-edge-line`, so a
dark colorway only has to flip those two (see `palette-setting.js`).

## Components

| File | Classes |
|---|---|
| `components/studio.css`  | `.skm-studio` — seamless backdrop with a soft key light |
| `components/device.css`  | `.skm-device` (housing = card), `__title`, `__body`, `__legend`; `--dark` (graphite), `--recess` (sunken panel) |
| `components/key.css`     | `.skm-key` + `--accent --dark --sm --lg --square --round`, `__legend`; `aria-pressed="true"` latches; `.skm-segment` groups keys |
| `components/display.css` | `.skm-display`, `__label`, `__value`, `__dim` (unlit digit) |
| `components/knob.css`    | `.skm-knob` + `--sm --lg`; rotate the indicator with `--angle` (pair with `role="slider"`) |
| `components/slider.css`  | `.skm-slider` on `<input type="range">` + `--vertical` fader |
| `components/toggle.css`  | `.skm-toggle`, `__input`, `__track` — ribbed slide switch, orange groove when on |
| `components/tag.css`     | `.skm-tag` + `--accent --dark`; `.skm-led` + `--on --success --warning --danger`; `.skm-label` |
| `components/input.css`   | `.skm-input`, `.skm-field`, `.skm-field__label` |
| `components/alert.css`   | `.skm-alert`, `__title`, `__body` + `--success --warning --danger` (status LED) |
| `components/list.css`    | `.skm-list`, `__row`, `__label`, `__value` (+ `--success --warning --danger`) |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
