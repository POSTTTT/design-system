# Developer-brutalism components

Terminal-flavored component library: pure-black surfaces, hairline borders, amber /
green / red accents, white CTAs, monospace. Plain CSS built on the `--ds-*` tokens.

## Use

One import gives the tokens **and** every component (classes namespaced `db-`):

```html
<link rel="stylesheet" href="developer-brutalism-compo/components.css" />
```

## Components

| File | Classes |
|---|---|
| `components/button.css` | `.db-btn` + `--primary --accent --sm --lg` (uppercase) |
| `components/card.css`   | `.db-card`, `.db-card__title`, `.db-card__body`, `--grid` (dot texture), `--inset` |
| `components/tag.css`    | `.db-tag` + `--amber --green --red`; `.db-dot` + `--green --amber --red`; `.db-label` |
| `components/input.css`  | `.db-input`, `.db-field`, `.db-field__label` |
| `components/alert.css`  | `.db-alert`, `__title`, `__body` + `--success --warning --danger` |
| `components/list.css`   | `.db-list`, `.db-list__row`, `.db-list__label`, `.db-list__value` (+ `--amber --green --strike`) |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
