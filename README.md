# design-system

A collection of reusable UI **design styles**. Each style lives in its own
top-level folder as a self-contained project — its own design tokens, components,
a visual catalog, and an example prototype.

## Folder layout

Every style folder follows the same template:

| Folder / file | What it holds |
|---|---|
| `tokens/` | The design values — colors, type, spacing, radius, borders, shadows — as JSON. The single source of truth. |
| `build/` | Turns the tokens into usable output (plus a small preview server). |
| `dist/` | Generated output: CSS variables, a Tailwind preset, and a TS object. |
| `<style>-compo/` | The component styles — button, card, tag, input, alert… as CSS classes. |
| `catalog/` | A page previewing every token and component live. |
| `prototype/` | A full example page — the style in a real layout. |
| `palette-setting.js` | A drop-in theme switcher with color presets, used by the catalog and prototypes. |
| `package.json` | The style's project manifest. |

## Opening a catalog or prototype

Just open the HTML file in a browser — `dist/` is committed, so the styles work
straight from a clone with no build step.

If you edit anything in `tokens/`, regenerate that style's `dist/`:

```sh
cd <style>
npm install   # first time only
npm run build
```

`npm run catalog` rebuilds and serves the catalog and prototype on the style's
port (see the table below).

## Styles

### At a glance

| Style | Look | Key colors | Fonts | Prefix | Port |
|---|---|---|---|---|---|
| [`neo-brutalism`](neo-brutalism/) | Loud stickers: thick black borders, hard offset shadows | `#000` · yellow / pink / cyan on off-white | Archivo, JetBrains Mono | `nb-` | 4321 |
| [`monospace`](monospace/) | Quiet dark terminal, Atom One Dark | `#282c34` · cyan · coral→pink gradient | Fira Code | `ms-` | 4322 |
| [`developer-brutalism`](developer-brutalism/) | Raw black console, flat and high-contrast | `#0a0a0a` · amber · terminal green / red | JetBrains Mono | `db-` | 4323 |
| [`neumorphism`](neumorphism/) | Soft extruded surfaces, depth from dual shadows | `#e0e5ec` · slate · soft indigo | Poppins | `nm-` | 4324 |
| [`graph-paper`](graph-paper/) | Pen-drawn engineering schematic on grid paper | cobalt `#1f3a93` · cream `#f7f4e4` · orange | Georgia | `gp-` | 4325 |
| [`glassmorphism`](glassmorphism/) | Frosted glass panes over glowing orbs | night `#0b1026` · violet / magenta / cyan | Manrope | `gl-` | 4326 |
| [`skeuomorphism`](skeuomorphism/) | Real materials: linen, paper, leather, aluminium | linen `#e6ddcc` · tan leather · candy glass | Source Sans 3, Libre Baskerville, Caveat | `sk-` | 4327 |
| [`skeuomorphism-modern`](skeuomorphism-modern/) | Modern hardware: matte plastic, keys, knobs | plastic `#f5f4f0` · graphite · orange `#ff5a1f` | Geist, Geist Mono | `skm-` | 4328 |
| [`inkline`](inkline/) | Hand-inked sketchbook with hatch shading | paper `#fbfaf6` · one ink `#111` | Bangers, Kalam, Courier Prime | `ink-` | 4329 |
| [`atelier`](atelier/) | Editorial hairline grid, studio instrument | paper `#f2f1ee` · ink `#101014` · blue `#2d81ff` | Archivo, Instrument Serif, Inter, Geist Mono | `atl-` | 4330 |

### Prototypes

| Style | Page | What it shows |
|---|---|---|
| `neo-brutalism` | [CONCRETE](neo-brutalism/prototype/index.html) | A loud project tracker |
| `monospace` | [MERIDIAN](monospace/prototype/index.html) | A self-hosted AI workspace for the terminal |
| `developer-brutalism` | [QUORUM](developer-brutalism/prototype/index.html) | Multi-agent console: status sidebar, chat, consensus |
| | [ANVIL](developer-brutalism/prototype/landing.html) | Landing page for a build / test / ship CLI |
| `neumorphism` | [AURA](neumorphism/prototype/index.html) | Calm wellness dashboard: player, stats, preferences |
| `graph-paper` | [FIELD NOTES](graph-paper/prototype/index.html) | Tabbed rainwater-harvesting schematic with a pen-style SVG diagram |
| | [DRAFTBOARD](graph-paper/prototype/landing.html) | Landing page for a diagramming tool |
| `glassmorphism` | [HALO](glassmorphism/prototype/index.html) | Smart-home dashboard: climate dial, rooms, energy, scenes |
| `skeuomorphism` | [FOLIO](skeuomorphism/prototype/index.html) | Notes-and-records desk: notebook, notepad, hi-fi deck with VU meters |
| `skeuomorphism-modern` | [FIELD 01](skeuomorphism-modern/prototype/index.html) | Desktop radio with working tuning, presets, volume, band and EQ |
| `inkline` | [HATCHWORK](inkline/prototype/index.html) | Flash-tattoo studio: size filters, pick a design, live estimate, booking form |
| | [PLOTBOT](inkline/prototype/plotter.html) | Mono variant: pen plotter that draws stroke by stroke, serial log, queue |
| `atelier` | [KERN](atelier/prototype/index.html) | Type-design studio: specimen cells and a variable-font playground |

### Signature details

<details>
<summary><b><code>neo-brutalism/</code></b> — loud and physical</summary>

- Thick solid-black borders and hard `0`-blur offset shadows, so every element looks like a sticker on the page.
- Vivid yellow / pink / cyan accents over a warm off-white paper canvas.
- Heavy black display type, sharp corners, playful attitude.
</details>

<details>
<summary><b><code>monospace/</code></b> — quiet terminal</summary>

- Charcoal `#282c34` canvas, cyan text, teal hairline borders.
- A coral→pink gradient as the single accent.
- Soft, deep, blurred shadows and gently rounded corners.
- `Fira Code` throughout, bracketed `[ LABEL ]` tags, terminal-window chrome.
</details>

<details>
<summary><b><code>developer-brutalism/</code></b> — raw black console</summary>

- Pure-black `#0a0a0a` canvas, off-white text, amber primary, terminal green and red, solid-white CTAs.
- Flat surfaces, hairline borders, a subtle dot-grid texture, barely-rounded corners.
- Uppercase wide-tracked mono labels, `JetBrains Mono` throughout.
</details>

<details>
<summary><b><code>neumorphism/</code></b> — soft and tactile</summary>

- One light `#e0e5ec` surface: cards, buttons and inputs are the same color as the page.
- Depth comes only from **dual shadows**: dark bottom-right, white top-left. Pressed elements sink in.
- Pillowy radii, low-contrast slate text, soft indigo accent, rounded `Poppins`.
- Signature soft toggle.
</details>

<details>
<summary><b><code>graph-paper/</code></b> — pen-on-graph-paper schematic</summary>

- Cobalt ink `#1f3a93` on cream `#f7f4e4` paper with a faint green grid.
- Orange `#e8730c` control accent, rust / green markers.
- Georgia serif, thick inked borders, small radii, letter-spaced eyebrows, dashed dividers, white node boxes.
- Filled-ink tab control; SVG diagrams recolor with the theme.
</details>

<details>
<summary><b><code>glassmorphism/</code></b> — frosted glass over light</summary>

- Deep night `#0b1026` canvas lit by violet / magenta / cyan orbs.
- Translucent panes: white-alpha fills, `backdrop-filter` blur, light-catching hairline edges, inset top shine.
- Pill buttons with accent glow, generous radii, `Manrope`.
- Falls back to near-opaque panes without blur support or under *reduce transparency*.
</details>

<details>
<summary><b><code>skeuomorphism/</code></b> — interfaces made of things</summary>

- Linen `#e6ddcc` canvas, cream grained paper cards, tan leather with stitching, brushed aluminium, candy-glass keys.
- Lit from above: top-edge highlights, soft drop shadows, inset wells, letterpress text, domed LED lamps.
- Textures are pure CSS / inline SVG noise.
- Source Sans 3 UI, Libre Baskerville titles, Caveat handwriting. Recessed ON/OFF toggle.
</details>

<details>
<summary><b><code>skeuomorphism-modern/</code></b> — modern consumer hardware</summary>

- Matte off-white `#f5f4f0` plastic under soft studio light, graphite keys, one signal-orange `#ff5a1f` accent.
- Keys with real travel that latch, turning aluminium knobs, faders in grooves, ribbed slide switches.
- Dark glass display with amber readout and scanlines; pinhole status LEDs.
- `Geist` + `Geist Mono`. Light and dark colorways flip the edge lighting.
</details>

<details>
<summary><b><code>inkline/</code></b> — hand-inked sketchbook</summary>

- Paper `#fbfaf6` and paper-white panels drawn in one black ink `#111`.
- 3px outlines, hard 0-blur offset ink shadows, square corners.
- Shading drawn as hatch / crosshatch lines, never gradients. Panels can sit at a slight tilt.
- Buttons lift on hover and stamp flat when pressed.
- `Bangers` display caps, `Kalam` handwriting; `.ink-page--mono` swaps the body to `Courier Prime`.
- Color only for status markers. Inline SVG drawn in `#111` / `#fff` follows the theme via `.ink-art`.
- Presets: Sketchbook, Sepia, Blueprint, Red pen, dark Chalkboard.
</details>

<details>
<summary><b><code>atelier/</code></b> — editorial studio instrument</summary>

- Warm paper `#f2f1ee`, near-black ink `#101014`, body copy at 62% ink.
- The page is one 1px hairline grid of rows and indexed cells, each with a mono label bar.
- Extended `Archivo` headlines (variable width + weight) with an `Instrument Serif` italic accent word; `Inter` body; `Geist Mono` caps labels.
- Square corners, no shadows. Signal blue `#2d81ff` only on live things: scroll ruler, slider values, focus rings, links.
- Drifting ticker strip, scanline media wells, segmented control.
- Light and dark, following the OS or forced with `data-theme`.
</details>
