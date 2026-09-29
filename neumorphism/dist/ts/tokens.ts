/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "border": {
    "width": {
      "thin": "1px",
      "thick": "2px"
    }
  },
  "color": {
    "palette": {
      "base": "#e0e5ec",
      "baseRaised": "#e6ebf2",
      "shadowDark": "#a3b1c6",
      "shadowLight": "#ffffff",
      "line": "#c8d0e7",
      "white": "#ffffff",
      "ink": "#4d5b7c",
      "inkMuted": "#6b7a99",
      "inkFaint": "#9aa7bf",
      "indigo": "#6d5dfc",
      "indigoBright": "#8b7cff",
      "green": "#4caf94",
      "amber": "#e0a955",
      "red": "#e76f6f"
    },
    "bg": {
      "canvas": "#e0e5ec",
      "surface": "#e0e5ec",
      "raised": "#e6ebf2"
    },
    "shadow": {
      "dark": "#a3b1c6",
      "light": "#ffffff"
    },
    "fg": {
      "default": "#4d5b7c",
      "muted": "#6b7a99",
      "faint": "#9aa7bf",
      "onAccent": "#ffffff"
    },
    "accent": {
      "primary": "#6d5dfc",
      "bright": "#8b7cff"
    },
    "border": {
      "default": "#c8d0e7",
      "strong": "#6d5dfc"
    },
    "feedback": {
      "success": "#4caf94",
      "warning": "#e0a955",
      "danger": "#e76f6f"
    }
  },
  "button": {
    "radius": "1.25rem",
    "bg": "#e0e5ec",
    "fg": "#4d5b7c",
    "shadow": "7px 7px 14px #a3b1c6, -7px -7px 14px #ffffff",
    "shadowActive": "inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff",
    "padding": {
      "x": "1.5rem",
      "y": "0.75rem"
    },
    "font": {
      "weight": 600,
      "size": "0.875rem"
    }
  },
  "card": {
    "bg": "#e0e5ec",
    "fg": "#4d5b7c",
    "radius": "1.75rem",
    "shadow": "7px 7px 14px #a3b1c6, -7px -7px 14px #ffffff",
    "padding": "2rem"
  },
  "radius": {
    "none": "0rem",
    "sm": "0.5rem",
    "md": "0.875rem",
    "lg": "1.25rem",
    "xl": "1.75rem",
    "full": "9999px"
  },
  "shadow": {
    "raisedSm": "4px 4px 8px #a3b1c6, -4px -4px 8px #ffffff",
    "raised": "7px 7px 14px #a3b1c6, -7px -7px 14px #ffffff",
    "raisedLg": "12px 12px 24px #a3b1c6, -12px -12px 24px #ffffff",
    "insetSm": "inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff",
    "inset": "inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff",
    "accent": "6px 6px 12px #5648c9, -6px -6px 12px #9587ff",
    "none": "none"
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
      "sans": "Poppins, Nunito, ui-rounded, -apple-system, 'Segoe UI', Roboto, sans-serif"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.25rem",
      "xl": "1.75rem",
      "2xl": "2.25rem",
      "3xl": "3rem",
      "4xl": "3.75rem"
    },
    "lineHeight": {
      "tight": 1.15,
      "snug": 1.35,
      "normal": 1.6
    },
    "letterSpacing": {
      "tight": "-0.02em",
      "normal": "0em",
      "wide": "0.08em",
      "wider": "0.15em"
    }
  }
} as const;

export type Tokens = typeof tokens;
