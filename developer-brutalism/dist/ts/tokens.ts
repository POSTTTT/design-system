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
      "black": "#0a0a0a",
      "panel": "#0e0e0f",
      "inset": "#141517",
      "line": "#262626",
      "lineSoft": "#1a1a1c",
      "white": "#ffffff",
      "fg": "#e6e6e6",
      "muted": "#8a8a8a",
      "faint": "#5a5a5a",
      "amber": "#e0a04a",
      "orange": "#ff7a1a",
      "green": "#3fd97f",
      "red": "#ff5c5c"
    },
    "bg": {
      "canvas": "#0a0a0a",
      "surface": "#0e0e0f",
      "inset": "#141517"
    },
    "fg": {
      "default": "#e6e6e6",
      "muted": "#8a8a8a",
      "faint": "#5a5a5a",
      "onInvert": "#0a0a0a"
    },
    "accent": {
      "primary": "#e0a04a",
      "bright": "#ff7a1a"
    },
    "border": {
      "default": "#262626",
      "soft": "#1a1a1c",
      "strong": "#e0a04a"
    },
    "feedback": {
      "success": "#3fd97f",
      "warning": "#e0a04a",
      "danger": "#ff5c5c"
    }
  },
  "button": {
    "radius": "0.25rem",
    "borderWidth": "1px",
    "borderColor": "#262626",
    "bg": "rgba(0, 0, 0, 0)",
    "fg": "#e6e6e6",
    "padding": {
      "x": "1rem",
      "y": "0.625rem"
    },
    "font": {
      "weight": 600,
      "size": "0.8125rem"
    }
  },
  "card": {
    "bg": "#0e0e0f",
    "fg": "#e6e6e6",
    "radius": "0.25rem",
    "borderWidth": "1px",
    "borderColor": "#262626",
    "padding": "1.5rem"
  },
  "radius": {
    "none": "0rem",
    "sm": "0.125rem",
    "md": "0.25rem",
    "lg": "0.375rem",
    "full": "9999px"
  },
  "shadow": {
    "none": "0px 0px 0px 0px transparent",
    "sm": "0px 4px 12px 0px #00000080",
    "md": "0px 10px 30px 0px #000000a6"
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
      "mono": "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "size": {
      "xs": "0.6875rem",
      "sm": "0.8125rem",
      "base": "0.9375rem",
      "lg": "1.125rem",
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.75rem",
      "4xl": "3.5rem"
    },
    "lineHeight": {
      "tight": 1.15,
      "snug": 1.35,
      "normal": 1.6
    },
    "letterSpacing": {
      "tight": "-0.01em",
      "normal": "0em",
      "wide": "0.1em",
      "wider": "0.18em"
    }
  }
} as const;

export type Tokens = typeof tokens;
