# Inkline components

Hand-inked sketchbook component library, extracted from the Inkline Guitars
page: paper-white surfaces, heavy black outlines, hard 0-blur offset shadows in
the same ink, and shading drawn as hatch / crosshatch lines instead of
gradients. Square corners. Bangers for anything shouted, Kalam handwriting for
everything said. Plain CSS built on the `--ds-*` tokens.

Compared with `neo-brutalism/` (also thick borders and hard shadows), Inkline
has no colour fills at all: one ink on paper, with colour kept for status
markers only.

## Use

One import gives the tokens **and** every component (classes namespaced `ink-`):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bangers&family=Kalam:wght@400;700&display=swap" />
<link rel="stylesheet" href="inkline-compo/components.css" />
<body class="ink-page">…</body>
```

Every line, shadow and hatch reads `--ds-color-ink-line`, so a theme only
flips that, the paper colours and `--ds-color-fg-on-ink` (see `palette-setting.js`).

## Components

| File | Classes |
|---|---|
| `components/page.css`   | `.ink-page` — paper canvas, Kalam body, ink links, dashed focus ring; `--mono` swaps the body to Courier Prime |
| `components/type.css`   | `.ink-display`, `.ink-h2` (+ `--boxed`), `.ink-h3` (+ `--lg`), `.ink-num`, `.ink-eyebrow`, `.ink-lead`, `.ink-logo` |
| `components/hatch.css`  | `.ink-hatch`, `.ink-xhatch`, `.ink-hatch--light` — line shading on any element |
| `components/panel.css`  | `.ink-panel` (card) + `--flat --roomy --tilt-l --tilt-r`, `__art` (illustration frame), `__price` |
| `components/button.css` | `.ink-btn` + `--solid --sm` — lifts on hover, stamps down on press; `aria-pressed="true"` fills with ink (filters, toggles) |
| `components/band.css`   | `.ink-band` (+ `--tight`) ruled section, `.ink-wrap` 1200px column, `.ink-grid` auto-fit cards |
| `components/steps.css`  | `.ink-steps`, `__item`, `__num`, `__title` |
| `components/tag.css`    | `.ink-tag` + `--solid --hatch`; `.ink-dot` + `--on --success --warning --danger` |
| `components/input.css`  | `.ink-field`, `__hint`, `.ink-input` (input / textarea, `aria-invalid`) |
| `components/check.css`  | `.ink-check` — checkbox drawn as a box with a scrawled X; radio as a filled dot |
| `components/alert.css`  | `.ink-alert`, `__title`, `__body` + `--success --warning --danger` (hatched marker stripe) |
| `components/code.css`   | `.ink-code` (figure), `__bar`, `pre` + `.c .k .s` ink-only highlighting; `--log` fixed-height log; `.ink-kbd` inline code / keys |
| `components/table.css`  | `.ink-table` wrapper around a `<table>` — ruled ledger, scrolls sideways; `.num` right-aligned cells |
| `components/art.css`    | `.ink-art` on an inline `<svg>` — repaints `#111` / `#fff` to the live theme |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
