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
      "void": "#1e2228",
      "ink": "#282c34",
      "black": "#111111",
      "cyan": "#9cdef2",
      "slate": "#6b8a94",
      "border": "#355a66",
      "coral": "#e06c75",
      "coralLight": "#f0989e",
      "green": "#50fa7b",
      "gold": "#f0ad4e",
      "white": "#ffffff"
    },
    "bg": {
      "canvas": "#282c34",
      "surface": "#1e2228",
      "code": "#111111"
    },
    "fg": {
      "default": "#9cdef2",
      "heading": "#9cdef2",
      "muted": "#6b8a94",
      "onAccent": "#ffffff"
    },
    "accent": {
      "primary": "#e06c75",
      "secondary": "#f0989e"
    },
    "border": {
      "default": "#355a66",
      "strong": "#e06c75"
    },
    "feedback": {
      "success": "#50fa7b",
      "warning": "#f0ad4e",
      "danger": "#e06c75",
      "info": "#9cdef2"
    }
  },
  "button": {
    "radius": "0.625rem",
    "borderWidth": "1px",
    "borderColor": "#355a66",
    "bg": "#111111",
    "fg": "#9cdef2",
    "padding": {
      "x": "1rem",
      "y": "0.5625rem"
    },
    "font": {
      "weight": 600,
      "size": "0.875rem"
    }
  },
  "card": {
    "bg": "#1e2228",
    "fg": "#9cdef2",
    "radius": "0.5rem",
    "borderWidth": "1px",
    "borderColor": "#355a66",
    "shadow": "0px 12px 40px 0px #00000066",
    "padding": "1.5rem"
  },
  "radius": {
    "none": "0rem",
    "sm": "0.375rem",
    "md": "0.5rem",
    "lg": "0.625rem",
    "xl": "0.875rem",
    "full": "9999px"
  },
  "shadow": {
    "sm": "0px 6px 22px 0px #00000066",
    "md": "0px 12px 40px 0px #00000066",
    "lg": "0px 24px 60px 0px #00000066",
    "glow": "0px 4px 18px 0px #e06c7559",
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
      "mono": "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
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
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.75rem",
      "4xl": "3.25rem"
    },
    "lineHeight": {
      "tight": 1.12,
      "snug": 1.3,
      "normal": 1.6
    },
    "letterSpacing": {
      "tight": "-0.01em",
      "normal": "0em",
      "wide": "0.08em"
    }
  }
} as const;

export type Tokens = typeof tokens;
