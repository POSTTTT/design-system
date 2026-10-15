/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "color": {
    "palette": {
      "paper": "#f2f1ee",
      "paperHigh": "#faf9f7",
      "paperLow": "#e9e8e4",
      "ink": "#101014",
      "black": "#000000",
      "blue": "#2d81ff",
      "blueInk": "#1659c4",
      "red": "#b3261e"
    },
    "bg": {
      "canvas": "#f2f1ee",
      "raised": "#faf9f7",
      "sunken": "#e9e8e4",
      "invert": "#101014"
    },
    "fg": {
      "default": "#101014",
      "strong": "#000000",
      "muted": "rgba(16, 16, 20, 0.62)",
      "faint": "rgba(16, 16, 20, 0.42)",
      "onInvert": "#f2f1ee"
    },
    "line": {
      "default": "rgba(16, 16, 20, 0.16)",
      "strong": "rgba(16, 16, 20, 0.4)"
    },
    "accent": {
      "primary": "#2d81ff",
      "ink": "#1659c4"
    },
    "feedback": {
      "danger": "#b3261e"
    },
    "scanline": "rgba(16, 16, 20, 0.03)"
  },
  "button": {
    "height": "3rem",
    "padding": "1.5rem",
    "font": {
      "size": "0.6875rem",
      "weight": 700
    }
  },
  "cell": {
    "padding": "2rem",
    "bg": "#f2f1ee"
  },
  "shadow": {
    "none": "none",
    "glow": "0 0 6px var(--ds-color-accent-primary)"
  },
  "border": {
    "width": {
      "hairline": "1px",
      "focus": "2px"
    }
  },
  "radius": {
    "none": "0px"
  },
  "motion": {
    "duration": {
      "fast": "120ms",
      "base": "200ms"
    },
    "ease": "cubic-bezier(0.2, 0, 0, 1)"
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
  "layout": {
    "frame": "75rem",
    "nav": "3rem",
    "bar": "2.5rem"
  },
  "font": {
    "family": {
      "display": "Archivo, 'Helvetica Neue', Arial, sans-serif",
      "serif": "'Instrument Serif', Georgia, serif",
      "sans": "Inter, ui-sans-serif, system-ui, sans-serif",
      "mono": "'Geist Mono', ui-monospace, Menlo, monospace"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "display": 620,
      "bold": 700,
      "heavy": 750
    },
    "size": {
      "micro": "0.5625rem",
      "label": "0.6875rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lead": "1.125rem",
      "h3": "1.5rem",
      "h2": "2.25rem",
      "h1": "3.75rem",
      "xl": "4.5rem",
      "mark": "6rem"
    },
    "lineHeight": {
      "display": 1.02,
      "heading": 1.33,
      "normal": 1.5,
      "lead": 1.625
    },
    "letterSpacing": {
      "tight": "-0.035em",
      "snug": "-0.02em",
      "normal": "0em",
      "micro": "0.08em",
      "label": "0.15em",
      "button": "0.12em"
    },
    "stretch": {
      "normal": "100%",
      "extended": "125%"
    }
  }
} as const;

export type Tokens = typeof tokens;
