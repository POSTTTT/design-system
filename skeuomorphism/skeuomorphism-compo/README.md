# Skeuomorphism components

Real-world-materials component library: linen canvas, stitched leather, grained
cream paper, brushed aluminium, glossy candy-glass keys and domed LEDs, all lit
from above with letterpress text. Source Sans 3 UI, Libre Baskerville titles,
Caveat handwriting. Plain CSS built on the `--ds-*` tokens.

## Use

One import gives the tokens **and** every component (classes namespaced `sk-`):

```html
<link rel="stylesheet" href="skeuomorphism-compo/components.css" />
<body class="sk-linen">…</body>
```

Textures are pure CSS / inline SVG noise, so there are no image files to ship.
They're exposed as `--sk-grain`, `--sk-grain-strong` and `--sk-brushed` for reuse.

## Components

| File | Classes |
|---|---|
| `components/materials.css` | `.sk-linen` (linen canvas) + the `--sk-grain`, `--sk-grain-strong`, `--sk-brushed` textures |
| `components/button.css`    | `.sk-btn` (ivory key) + `--primary --success --danger` (glossy), `--metal`, `--sm --lg --round` |
| `components/card.css`      | `.sk-card` (paper), `__title`, `__body`, `--leather` (stitched), `--metal` (brushed plate), `--notepad` (ruled, handwritten) |
| `components/tag.css`       | `.sk-tag` + `--accent --success --warning --danger`; `.sk-led` + `--on --success --warning --danger`; `.sk-label` |
| `components/input.css`     | `.sk-input`, `.sk-field`, `.sk-field__label` (inset well) |
| `components/alert.css`     | `.sk-alert`, `__title`, `__body` + `--success --warning --danger` (taped paper note; put a `.sk-led` first) |
| `components/list.css`      | `.sk-list`, `__row` (div or link), `__label`, `__value` (+ `--muted --success --warning --danger`), `__chevron` |
| `components/toggle.css`    | `.sk-toggle`, `__input`, `__track` — recessed ON/OFF switch with an aluminium knob |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
