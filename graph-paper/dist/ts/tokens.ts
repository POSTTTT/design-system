/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "border": {
    "width": {
      "thin": "1.5px",
      "base": "2px",
      "thick": "2.5px",
      "heavy": "7px"
    }
  },
  "color": {
    "palette": {
      "paper": "#f7f4e4",
      "grid": "#d9e2c8",
      "white": "#ffffff",
      "ink": "#1f3a93",
      "inkSoft": "#5a6fb5",
      "inkFaint": "#8a93b8",
      "orange": "#e8730c",
      "rust": "#c0392b",
      "green": "#16895a"
    },
    "bg": {
      "canvas": "#f7f4e4",
      "surface": "#ffffff",
      "grid": "#d9e2c8"
    },
    "fg": {
      "default": "#1f3a93",
      "muted": "#5a6fb5",
      "faint": "#8a93b8",
      "onInk": "#f7f4e4"
    },
    "accent": {
      "primary": "#1f3a93",
      "control": "#e8730c"
    },
    "marker": {
      "rust": "#c0392b",
      "green": "#16895a"
    },
    "border": {
      "default": "#1f3a93",
      "soft": "#5a6fb5"
    },
    "feedback": {
      "success": "#16895a",
      "warning": "#e8730c",
      "danger": "#c0392b"
    }
  },
  "button": {
    "radius": "0.5rem",
    "borderWidth": "2px",
    "borderColor": "#1f3a93",
    "bg": "rgba(0, 0, 0, 0)",
    "fg": "#1f3a93",
    "padding": {
      "x": "0.875rem",
      "y": "0.5rem"
    },
    "font": {
      "weight": 600,
      "size": "0.875rem"
    }
  },
  "card": {
    "bg": "#ffffff",
    "fg": "#1f3a93",
    "radius": "0.75rem",
    "borderWidth": "2px",
    "borderColor": "#1f3a93",
    "padding": "1.5rem"
  },
  "radius": {
    "none": "0rem",
    "sm": "0.375rem",
    "md": "0.5rem",
    "lg": "0.625rem",
    "xl": "0.75rem",
    "full": "9999px"
  },
  "shadow": {
    "none": "none",
    "sm": "2px 2px 0 rgba(31,58,147,0.12)"
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
      "serif": "Georgia, 'Times New Roman', Times, serif"
    },
    "weight": {
      "regular": 400,
      "semibold": 600,
      "bold": 700
    },
    "size": {
      "xs": "0.8125rem",
      "sm": "0.875rem",
      "base": "0.9688rem",
      "lg": "1.1875rem",
      "xl": "1.375rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.75rem"
    },
    "lineHeight": {
      "tight": 1.2,
      "snug": 1.4,
      "normal": 1.65
    },
    "letterSpacing": {
      "tight": "-0.005em",
      "normal": "0em",
      "wide": "0.1em",
      "wider": "0.16em"
    }
  }
} as const;

export type Tokens = typeof tokens;
