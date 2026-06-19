# Graph Paper components

Pen-on-graph-paper component library: cobalt ink ruled on cream paper, an orange
control accent, rust + green markers, Georgia serif, dashed dividers. Plain CSS
built on the `--ds-*` tokens.

## Use

One import gives the tokens **and** every component (classes namespaced `gp-`):

```html
<link rel="stylesheet" href="graph-paper-compo/components.css" />
```

## Components

| File | Classes |
|---|---|
| `components/button.css` | `.gp-btn` + `--primary --control --sm --lg` (ruled outline; primary filled ink) |
| `components/card.css`   | `.gp-card`, `__title`, `__body`, `--note --note-rust --note-ctrl` (edge bar), `--grid` (graph texture) |
| `components/tag.css`    | `.gp-tag` + `--control --rust --green`; `.gp-dot` + `--rust --green --ctrl`; `.gp-label` |
| `components/input.css`  | `.gp-input`, `.gp-field`, `.gp-field__label` (orange pen on focus) |
| `components/alert.css`  | `.gp-alert`, `__title`, `__body` + `--success --warning --danger` |
| `components/list.css`   | `.gp-list`, `__row`, `__label`, `__value` (+ `--control --rust --green`), `__sym` (legend glyph); dashed rules |
| `components/tabs.css`   | `.gp-tabs`, `.gp-tab`, `.gp-tab--active` — filled-ink active tab |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
