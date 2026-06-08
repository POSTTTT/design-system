# Monospace components

Terminal-flavored component library: dark surfaces, hairline teal borders, coral
gradient accents, soft shadows, `Fira Code`. Plain CSS built on the `--ds-*` tokens,
so editing `tokens/` re-themes everything.

## Use

One import gives the tokens **and** every component (classes namespaced `ms-`):

```html
<link rel="stylesheet" href="monospace-compo/components.css" />
```

## Components

| File | Classes |
|---|---|
| `components/button.css`   | `.ms-btn` + `--primary --ghost --sm --lg` |
| `components/card.css`     | `.ms-card`, `.ms-card__title`, `.ms-card__body`, `--glow` |
| `components/tag.css`      | `.ms-tag` (renders `[ LABEL ]`) + `--accent --success --warning` |
| `components/input.css`    | `.ms-input`, `.ms-field`, `.ms-field__label` |
| `components/alert.css`    | `.ms-alert`, `__title`, `__body` + `--success --warning --danger --info` |
| `components/terminal.css` | `.ms-term`, `.ms-term__bar`, `.ms-term__dot--r/y/g`, `.ms-term__title`, `.ms-term__body` |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
