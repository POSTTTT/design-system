/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "color": {
    "palette": {
      "paper": "#fbfaf6",
      "sheet": "#ffffff",
      "ink": "#111111",
      "inkSoft": "#444444",
      "inkFaint": "#6b6b6b",
      "red": "#c4291c",
      "green": "#1d7a3e",
      "amber": "#9a6200"
    },
    "bg": {
      "canvas": "#fbfaf6",
      "sheet": "#ffffff",
      "field": "#fbfaf6"
    },
    "fg": {
      "default": "#111111",
      "muted": "#444444",
      "faint": "#6b6b6b",
      "onInk": "#ffffff"
    },
    "ink": {
      "line": "#111111"
    },
    "feedback": {
      "success": "#1d7a3e",
      "warning": "#9a6200",
      "danger": "#c4291c"
    }
  },
  "button": {
    "bg": "#ffffff",
    "fg": "#111111",
    "padding": {
      "x": "1.75rem",
      "y": "0.875rem"
    },
    "font": {
      "size": "1.625rem"
    }
  },
  "panel": {
    "bg": "#ffffff",
    "fg": "#111111",
    "padding": "1.75rem"
  },
  "shadow": {
    "none": "none",
    "ink": "6px 6px 0 var(--ds-color-ink-line)",
    "lift": "8px 8px 0 var(--ds-color-ink-line)",
    "small": "3px 3px 0 var(--ds-color-ink-line)"
  },
  "border": {
    "width": {
      "thin": "2px",
      "ink": "3px",
      "rule": "4px",
      "focus": "3px"
    }
  },
  "radius": {
    "none": "0px",
    "full": "9999px"
  },
  "tilt": {
    "left": "-1.5deg",
    "right": "1deg"
  },
  "hatch": {
    "line": "1.5px",
    "gap": "8px",
    "cross": "9px"
  },
  "space": {
    "0": "0rem",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.5rem",
    "6": "2rem",
    "7": "3rem",
    "8": "4rem",
    "9": "6rem"
  },
  "font": {
    "family": {
      "display": "Bangers, Impact, sans-serif",
      "hand": "Kalam, 'Comic Neue', cursive",
      "mono": "'Courier Prime', 'Courier New', ui-monospace, monospace"
    },
    "weight": {
      "regular": 400,
      "bold": 700
    },
    "size": {
      "xs": "1rem",
      "sm": "1.125rem",
      "base": "1.1875rem",
      "lg": "1.3125rem",
      "xl": "1.625rem",
      "2xl": "2rem",
      "3xl": "2.25rem",
      "4xl": "3.5rem",
      "5xl": "4rem",
      "6xl": "5.75rem"
    },
    "lineHeight": {
      "tight": 0.95,
      "snug": 1,
      "normal": 1.5
    },
    "letterSpacing": {
      "normal": "0px",
      "wide": "1px",
      "wider": "1.5px",
      "widest": "2px"
    }
  }
} as const;

export type Tokens = typeof tokens;
