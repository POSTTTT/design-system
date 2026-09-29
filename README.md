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
| `package.json` | The style's project manifest. |

## Styles

### `neo-brutalism/`
Loud and physical. Thick solid-black borders, hard `0`-blur offset shadows that
make every element look like a sticker peeled onto the page, and vivid
yellow / pink / cyan accents over a warm off-white paper canvas. Heavy black
display type, sharp corners, and a playful, in-your-face attitude.

### `monospace/`
Quiet and technical — a dark terminal aesthetic inspired by Atom One Dark. A
charcoal `#282c34` canvas with cyan text, teal hairline borders, and a coral→pink
gradient as the single accent. Soft, deep, blurred shadows, gently rounded corners,
and `Fira Code` monospace throughout, with bracketed `[ LABEL ]` tags and
terminal-window chrome.

### `developer-brutalism/`
Raw and high-contrast — a pure-black `#0a0a0a` terminal console. Off-white text
with an amber primary accent, plus terminal green and red, and solid-white CTAs.
Flat surfaces with hairline borders and a subtle dot-grid texture, barely-rounded
corners, uppercase wide-tracked mono labels, and `JetBrains Mono` throughout. Its
prototype is a multi-agent orchestration console (status sidebar · chat · consensus).

### `neumorphism/`
Soft and tactile. A single light `#e0e5ec` surface where everything — cards, buttons,
inputs — is the *same* color as the page, with depth carved purely by **dual shadows**:
a dark drop at the bottom-right and a white highlight at the top-left. Elements look
extruded, and press *into* the surface when active. Pillowy large radii, low-contrast
slate text, a soft indigo accent, and rounded `Poppins` type. Includes a signature soft
toggle. Its prototype is a calm wellness dashboard (AURA — player · stats · preferences).

### `graph-paper/`
Pen-on-graph-paper engineering aesthetic. Cobalt ink `#1f3a93` ruled on a cream
`#f7f4e4` paper canvas with a faint green grid, an orange `#e8730c` control accent,
and rust / green markers — like a hand-drawn 3GPP or circuit schematic. Georgia serif
throughout, thick inked borders, small radii, uppercase letter-spaced eyebrows, dashed
divider rules, and white node-boxes. Includes a filled-ink tab control. Its prototype
is a tabbed rainwater-harvesting schematic with an inline pen-style SVG diagram that
recolors with the theme (flow plane vs. dashed control plane).

### `glassmorphism/`
Frosted glass floating over light. A deep night `#0b1026` canvas lit by three soft
color orbs (violet / magenta / cyan), with every surface a translucent pane:
white-alpha fills, `backdrop-filter` blur, hairline light-catching edges and an
inset top shine. Pill buttons with an accent glow, generous radii, and `Manrope`
throughout. Falls back to near-opaque panes without blur support or under
*reduce transparency*. Includes a glossy glass toggle. Its prototype is a smart-home
dashboard (HALO — climate dial · rooms · energy · scenes).

### `skeuomorphism/`
Interfaces made of things. A linen tablecloth `#e6ddcc` canvas holding cream grained
paper cards, tan leather panels with dashed cream stitching, brushed-aluminium
plates, and glossy candy-glass keys with a split highlight. Everything is lit from
above: top-edge highlights, soft drop shadows, inset wells, letterpress text, and
domed LED lamps. Textures are pure CSS / inline SVG noise. Source Sans 3 UI,
Libre Baskerville titles, Caveat handwriting. Includes a recessed ON/OFF toggle.
Its prototype is a notes-and-records desk (FOLIO: leather notebook cover, ruled
notepad, hi-fi deck with VU meters and a draggable volume knob).

### `skeuomorphism-modern/`
Skeuomorphism rebuilt from modern consumer hardware instead of leather and linen.
Matte off-white `#f5f4f0` moulded plastic under soft studio light, graphite keys,
and one signal-orange `#ff5a1f` accent. Keys have real travel and latch down,
aluminium knobs turn, faders sit in grooves, and slide switches have ribbed caps.
A dark glass display glows with an amber readout and faint scanlines, and pinhole
LEDs show status. `Geist` + `Geist Mono`. Light and dark colorways flip the edge
lighting. Its prototype is a product page for a desktop radio (FIELD 01) whose
tuning dial, presets, volume, band selector and EQ all work.
