/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "color": {
    "palette": {
      "night": "#0b1026",
      "violet": "#7c3aed",
      "magenta": "#ec4899",
      "cyan": "#22d3ee",
      "white": "#ffffff",
      "frost": "rgba(255, 255, 255, 0.08)",
      "frostStrong": "rgba(255, 255, 255, 0.14)",
      "frostEdge": "rgba(255, 255, 255, 0.22)",
      "frostShine": "rgba(255, 255, 255, 0.45)",
      "text": "#f8fafc",
      "textSoft": "rgba(248, 250, 252, 0.74)",
      "textFaint": "rgba(248, 250, 252, 0.52)",
      "mint": "#34d399",
      "amber": "#fbbf24",
      "rose": "#fb7185"
    },
    "bg": {
      "canvas": "#0b1026",
      "glass": "rgba(255, 255, 255, 0.08)",
      "glassStrong": "rgba(255, 255, 255, 0.14)",
      "orb": {
        "a": "#7c3aed",
        "b": "#ec4899",
        "c": "#22d3ee"
      }
    },
    "fg": {
      "default": "#f8fafc",
      "muted": "rgba(248, 250, 252, 0.74)",
      "faint": "rgba(248, 250, 252, 0.52)",
      "onAccent": "#ffffff"
    },
    "accent": {
      "primary": "#7c3aed",
      "secondary": "#22d3ee"
    },
    "border": {
      "glass": "rgba(255, 255, 255, 0.22)",
      "shine": "rgba(255, 255, 255, 0.45)"
    },
    "feedback": {
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185"
    }
  },
  "button": {
    "radius": "9999px",
    "borderWidth": "1px",
    "borderColor": "rgba(255, 255, 255, 0.22)",
    "bg": "rgba(255, 255, 255, 0.08)",
    "fg": "#f8fafc",
    "padding": {
      "x": "1.25rem",
      "y": "0.625rem"
    },
    "font": {
      "weight": 600,
      "size": "0.875rem"
    }
  },
  "card": {
    "bg": "rgba(255, 255, 255, 0.08)",
    "fg": "#f8fafc",
    "radius": "1.75rem",
    "borderWidth": "1px",
    "borderColor": "rgba(255, 255, 255, 0.22)",
    "blur": "18px",
    "padding": "1.5rem"
  },
  "blur": {
    "sm": "8px",
    "md": "18px",
    "lg": "32px"
  },
  "shadow": {
    "none": "none",
    "glass": "0 8px 32px rgba(4, 6, 24, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
    "lift": "0 16px 48px rgba(4, 6, 24, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.45)",
    "glow": "0 0 0 1px rgba(255, 255, 255, 0.18), 0 8px 28px color-mix(in srgb, var(--ds-color-accent-primary) 55%, transparent)"
  },
  "border": {
    "width": {
      "hairline": "1px",
      "base": "1.5px",
      "focus": "2px"
    }
  },
  "radius": {
    "sm": "0.5rem",
    "md": "0.875rem",
    "lg": "1.25rem",
    "xl": "1.75rem",
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
      "sans": "Manrope, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "black": 800
    },
    "size": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.375rem",
      "2xl": "1.75rem",
      "3xl": "2.25rem",
      "4xl": "3.25rem"
    },
    "lineHeight": {
      "tight": 1.1,
      "snug": 1.35,
      "normal": 1.6
    },
    "letterSpacing": {
      "tight": "-0.025em",
      "normal": "0em",
      "wide": "0.12em"
    }
  }
} as const;

export type Tokens = typeof tokens;
