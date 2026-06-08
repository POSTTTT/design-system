# Neo-Brutalism theme

The neo-brutalism component library: thick black borders, hard offset shadows,
vivid accents. Every component is plain CSS built on the `--ds-*` design tokens,
so changing `tokens/` re-themes them automatically.

## Use

One import gives you the tokens **and** every component:

```html
<link rel="stylesheet" href="neo-brutalism-compo/components.css" />
```

Then use the classes (all namespaced `nb-`):

```html
<button class="nb-btn">Primary</button>
<button class="nb-btn nb-btn--secondary nb-btn--lg">Big secondary</button>

<div class="nb-card">
  <h3 class="nb-card__title">Title</h3>
  <p class="nb-card__body">Body text.</p>
</div>

<span class="nb-tag nb-tag--success">shipped</span>

<label class="nb-field">
  <span class="nb-field__label">Email</span>
  <input class="nb-input" placeholder="you@example.com" />
</label>

<div class="nb-alert nb-alert--info">
  <div><p class="nb-alert__title">Heads up</p><p class="nb-alert__body">Saved.</p></div>
</div>
```

## Components

| File | Classes |
|---|---|
| `components/button.css` | `.nb-btn` + `--secondary --tertiary --ghost --danger --sm --lg` |
| `components/card.css`   | `.nb-card`, `.nb-card__title`, `.nb-card__body`, `--accent` |
| `components/tag.css`    | `.nb-tag` + `--primary --success --danger` |
| `components/input.css`  | `.nb-input`, `.nb-field`, `.nb-field__label` |
| `components/alert.css`  | `.nb-alert`, `__title`, `__body` + `--info --success --danger` |

## Adding a component

1. Create `components/<name>.css`, style it with `var(--ds-*)` tokens only
   (never hard-coded colors/sizes).
2. Add an `@import` line to `components.css`.
3. Showcase it in `/catalog/index.html`.
