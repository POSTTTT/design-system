# Neumorphism components

Soft-UI component library: one light surface, dual shadows (dark drop + light highlight),
pillowy radii, soft indigo accent, rounded sans. Plain CSS built on the `--ds-*` tokens.

## Use

One import gives the tokens **and** every component (classes namespaced `nm-`):

```html
<link rel="stylesheet" href="neumorphism-compo/components.css" />
```

## Components

| File | Classes |
|---|---|
| `components/button.css` | `.nm-btn` + `--primary --circle --sm --lg` (extruded; presses in on `:active`) |
| `components/card.css`   | `.nm-card`, `.nm-card__title`, `.nm-card__body`, `--inset`, `--flat` |
| `components/tag.css`    | `.nm-tag` + `--indigo --green --red`; `.nm-dot` + `--green --indigo --red`; `.nm-label` |
| `components/input.css`  | `.nm-input`, `.nm-field`, `.nm-field__label` (pressed-in well) |
| `components/alert.css`  | `.nm-alert`, `__icon`, `__title`, `__body` + `--success --warning --danger` |
| `components/list.css`   | `.nm-list`, `.nm-list__row`, `.nm-list__label`, `.nm-list__value` (+ `--indigo --green`) |
| `components/toggle.css` | `.nm-toggle`, `__track`, `__knob` — the signature soft switch |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
