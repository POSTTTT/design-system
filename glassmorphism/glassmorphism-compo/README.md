# Glassmorphism components

Frosted-glass component library: translucent panes with backdrop blur, hairline
light-catching edges and a top-edge shine, floating over a night canvas lit by
three soft color orbs. Manrope sans. Plain CSS built on the `--ds-*` tokens.

## Use

One import gives the tokens **and** every component (classes namespaced `gl-`):

```html
<link rel="stylesheet" href="glassmorphism-compo/components.css" />
<body class="gl-backdrop">…</body>
```

Glass needs color behind it — put `.gl-backdrop` on `<body>` (or any wrapper).
Browsers without `backdrop-filter`, and users with *reduce transparency* on, get
near-opaque panes automatically so text keeps its contrast.

## Components

| File | Classes |
|---|---|
| `components/backdrop.css` | `.gl-backdrop` — night canvas + three orbs (`--ds-color-bg-orb-a/b/c`); opaque-pane fallback |
| `components/button.css`   | `.gl-btn` + `--primary --ghost --sm --lg --icon` (frosted pill; primary solid accent with glow) |
| `components/card.css`     | `.gl-card`, `__title`, `__body`, `--strong` (thicker frost), `--interactive` (hover lift), `--tinted` (accent bleed) |
| `components/tag.css`      | `.gl-tag` + `--accent --success --warning --danger`; `.gl-dot` + same; `.gl-label` |
| `components/input.css`    | `.gl-input`, `.gl-field`, `.gl-field__label` (secondary-accent ring on focus) |
| `components/alert.css`    | `.gl-alert`, `__title`, `__body` + `--success --warning --danger` |
| `components/list.css`     | `.gl-list`, `__row`, `__label`, `__icon`, `__value` (+ `--success --warning --danger`) |
| `components/toggle.css`   | `.gl-toggle`, `__input`, `__track` — frosted track, glossy bead, accent glow when on |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only.
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
