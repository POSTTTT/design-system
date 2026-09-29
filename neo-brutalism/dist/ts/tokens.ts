/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "border": {
    "width": {
      "thin": "1px",
      "base": "2px",
      "thick": "3px",
      "heavy": "4px"
    }
  },
  "color": {
    "palette": {
      "black": "#000000",
      "white": "#ffffff",
      "ink": "#111111",
      "paper": "#fdfbf3",
      "cloud": "#f4f1e8",
      "yellow": "#ffdb00",
      "pink": "#ff5cab",
      "cyan": "#4dd0e1",
      "lime": "#a3e635",
      "violet": "#9b5cff",
      "orange": "#ff7a1a",
      "red": "#ff3b30",
      "green": "#16c47f",
      "blue": "#2f6bff",
      "gray": {
        "100": "#e7e4da",
        "300": "#c4c0b4",
        "500": "#8a8678",
        "700": "#4d4a40"
      }
    },
    "bg": {
      "canvas": "#fdfbf3",
      "surface": "#ffffff",
      "sunken": "#f4f1e8",
      "inverse": "#111111"
    },
    "fg": {
      "default": "#111111",
      "muted": "#4d4a40",
      "subtle": "#8a8678",
      "inverse": "#fdfbf3",
      "onAccent": "#000000"
    },
    "accent": {
      "primary": "#ffdb00",
      "secondary": "#ff5cab",
      "tertiary": "#4dd0e1"
    },
    "border": {
      "default": "#000000",
      "muted": "#c4c0b4"
    },
    "feedback": {
      "danger": "#ff3b30",
      "success": "#16c47f",
      "info": "#2f6bff"
    }
  },
  "button": {
    "radius": "0.5rem",
    "borderWidth": "3px",
    "borderColor": "#000000",
    "shadow": {
      "rest": "4px 4px 0px 0px #000000",
      "hover": "6px 6px 0px 0px #000000",
      "press": "0px 0px 0px 0px transparent"
    },
    "padding": {
      "x": "1.5rem",
      "y": "0.75rem"
    },
    "fg": "#000000",
    "bg": "#ffdb00",
    "font": {
      "weight": 800,
      "size": "1rem"
    }
  },
  "card": {
    "bg": "#ffffff",
    "fg": "#111111",
    "radius": "0.75rem",
    "borderWidth": "3px",
    "borderColor": "#000000",
    "shadow": "6px 6px 0px 0px #000000",
    "padding": "1.5rem"
  },
  "radius": {
    "none": "0rem",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "full": "9999px"
  },
  "shadow": {
    "xs": "2px 2px 0px 0px #000000",
    "sm": "4px 4px 0px 0px #000000",
    "md": "6px 6px 0px 0px #000000",
    "lg": "8px 8px 0px 0px #000000",
    "none": "0px 0px 0px 0px transparent"
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
      "sans": "Archivo, Inter, 'Helvetica Neue', Arial, sans-serif",
      "mono": "'JetBrains Mono', 'Space Mono', ui-monospace, monospace"
    },
    "weight": {
      "regular": 400,
      "medium": 600,
      "bold": 800,
      "black": 900
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.25rem",
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.75rem",
      "4xl": "3.75rem"
    },
    "lineHeight": {
      "tight": 1.05,
      "snug": 1.25,
      "normal": 1.5
    },
    "letterSpacing": {
      "tight": "-0.02em",
      "normal": "0em",
      "wide": "0.08em"
    }
  }
} as const;

export type Tokens = typeof tokens;
