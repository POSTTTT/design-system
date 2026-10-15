# Atelier components

Editorial studio-instrument component library: warm paper, near-black ink and
a 1px hairline grid. Pages are one ruled frame of rows and indexed cells,
each cell topped by a mono label bar ("OUTLINES ······ 01"). Headlines are
Archivo 620 with tight tracking and one Instrument Serif italic accent word;
body copy is Inter at 62% ink; labels and buttons are Geist Mono caps. Square
corners, no shadows. Signal blue appears only on live things: the scroll
ruler, range values, focus rings and links. Plain CSS built on the `--ds-*` tokens.

Light and dark both ship: `components/theme.css` follows the OS, and
`<html data-theme="dark|light">` forces one (see `palette-setting.js`).

## Use

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Geist+Mono:wght@400;500;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap" />
<link rel="stylesheet" href="atelier-compo/components.css" />
<body class="atl-page">
  <nav class="atl-nav">…</nav>
  <main class="atl-frame">…</main>
</body>
```

## Components

| File | Classes |
|---|---|
| `components/theme.css`  | dark values for the semantic tokens (`data-theme` or `prefers-color-scheme`) |
| `components/page.css`   | `.atl-page` — paper, Inter, blue focus ring; `.atl-link` |
| `components/type.css`   | `.atl-mark` (extended wordmark), `.atl-xl`, `.atl-h1`, `.atl-h2`, `.atl-h3`, `.atl-serif` (italic accent), `.atl-lead`, `.atl-body`, `.atl-label` (+ `--faint`), `.atl-micro`, `.atl-index` (stacked section index) |
| `components/grid.css`   | `.atl-frame` (ruled 1200px column), `.atl-row`, `.atl-pad` (+ `--xl`), `.atl-bar` (section label bar), `.atl-cells` (+ `--3 --4`), `.atl-cell`, `__head`, `__body` |
| `components/button.css` | `.atl-btn` (hairline outline) + `--primary --ghost --sm --icon` |
| `components/nav.css`    | `.atl-nav`, `__brand`, `__group` (+ `--end`), `__item` (`aria-current="page"` inverts), `__icon`, `__cta`, `.atl-nav__hide-sm` |
| `components/tag.css`    | `.atl-tag` + `--solid --live`; `.atl-facts` (middot fact list) |
| `components/input.css`  | `.atl-field`, `__row`, `__value`; `.atl-input`; `.atl-range` (hairline track, square thumb); `.atl-segment` (radio group) |
| `components/media.css`  | `.atl-media` (sunken scanline well) + `--marks` crosshairs, `__chip` overlay |
| `components/ticker.css` | `.atl-ticker`, `__track`, `__item` — drifting mono strip, still under reduced motion |
| `components/ruler.css`  | `.atl-ruler`, `__mark`, `__value` — fixed scroll gauge; set `--atl-progress` from JS |
| `components/alert.css`  | `.atl-alert`, `__label` + `--neutral --danger` |
| `components/footer.css` | `.atl-footer` (brand cell + link columns), `.atl-legal` strip |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
