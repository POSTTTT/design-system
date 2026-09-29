/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "color": {
    "palette": {
      "linen": "#e6ddcc",
      "linenShade": "#d6cab4",
      "leather": "#8a5a36",
      "leatherDeep": "#5a3820",
      "stitch": "#f0dfbd",
      "paper": "#fdf8ea",
      "rule": "#b9d2e8",
      "margin": "#e7a3a3",
      "metalLight": "#eef0f2",
      "metalDark": "#a4aab2",
      "ink": "#2e241b",
      "inkSoft": "#665545",
      "inkFaint": "#9a8a78",
      "white": "#ffffff",
      "sapphire": "#2b64c8",
      "moss": "#33782e",
      "amber": "#9a6212",
      "brick": "#b83a2e"
    },
    "bg": {
      "canvas": "#e6ddcc",
      "canvasShade": "#d6cab4",
      "paper": "#fdf8ea",
      "leather": "#8a5a36",
      "metalLight": "#eef0f2",
      "metalDark": "#a4aab2"
    },
    "fg": {
      "default": "#2e241b",
      "muted": "#665545",
      "faint": "#9a8a78",
      "onAccent": "#ffffff",
      "onLeather": "#f0dfbd"
    },
    "accent": {
      "primary": "#2b64c8"
    },
    "detail": {
      "stitch": "#f0dfbd",
      "rule": "#b9d2e8",
      "margin": "#e7a3a3"
    },
    "border": {
      "default": "rgba(46, 36, 27, 0.28)",
      "strong": "rgba(46, 36, 27, 0.5)"
    },
    "feedback": {
      "success": "#33782e",
      "warning": "#9a6212",
      "danger": "#b83a2e"
    }
  },
  "button": {
    "radius": "0.5rem",
    "borderWidth": "1px",
    "borderColor": "rgba(46, 36, 27, 0.5)",
    "fg": "#2e241b",
    "padding": {
      "x": "1.125rem",
      "y": "0.5rem"
    },
    "font": {
      "weight": 700,
      "size": "0.875rem"
    }
  },
  "card": {
    "bg": "#fdf8ea",
    "fg": "#2e241b",
    "radius": "0.75rem",
    "borderWidth": "1px",
    "borderColor": "rgba(46, 36, 27, 0.28)",
    "padding": "1.5rem"
  },
  "shadow": {
    "none": "none",
    "raised": "inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 2px rgba(40, 25, 10, 0.35), 0 2px 5px rgba(40, 25, 10, 0.18)",
    "object": "0 1px 1px rgba(40, 25, 10, 0.25), 0 6px 14px rgba(40, 25, 10, 0.22), 0 18px 36px rgba(40, 25, 10, 0.18)",
    "inset": "inset 0 2px 4px rgba(40, 25, 10, 0.3), inset 0 1px 1px rgba(40, 25, 10, 0.25), 0 1px 0 rgba(255, 255, 255, 0.6)",
    "pressed": "inset 0 2px 5px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(0, 0, 0, 0.3)"
  },
  "textShadow": {
    "emboss": "0 1px 0 rgba(255, 255, 255, 0.75)",
    "deboss": "0 -1px 0 rgba(0, 0, 0, 0.45)"
  },
  "border": {
    "width": {
      "hairline": "1px",
      "stitch": "2px",
      "focus": "2px"
    }
  },
  "radius": {
    "sm": "0.3125rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "full": "9999px"
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
      "sans": "'Source Sans 3', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      "serif": "'Libre Baskerville', Baskerville, Georgia, serif",
      "hand": "Caveat, 'Marker Felt', 'Bradley Hand', cursive"
    },
    "weight": {
      "regular": 400,
      "semibold": 600,
      "bold": 700
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.375rem",
      "2xl": "1.75rem",
      "3xl": "2.25rem",
      "4xl": "3rem"
    },
    "lineHeight": {
      "tight": 1.15,
      "snug": 1.35,
      "normal": 1.55,
      "ruled": 1.75
    },
    "letterSpacing": {
      "tight": "-0.01em",
      "normal": "0em",
      "wide": "0.1em"
    }
  }
} as const;

export type Tokens = typeof tokens;
