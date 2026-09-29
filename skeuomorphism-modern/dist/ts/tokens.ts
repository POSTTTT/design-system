/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */
export const tokens = {
  "color": {
    "palette": {
      "studio": "#e9e8e4",
      "plastic": "#f5f4f0",
      "graphite": "#1c1c1e",
      "glass": "#0f1211",
      "readout": "#ffb454",
      "text": "#1c1c1e",
      "textSoft": "#5f5e5a",
      "textFaint": "#8f8d87",
      "white": "#ffffff",
      "orange": "#ff5a1f",
      "green": "#1f7a45",
      "amber": "#a86400",
      "red": "#cc3322"
    },
    "bg": {
      "canvas": "#e9e8e4",
      "plastic": "#f5f4f0",
      "dark": "#1c1c1e",
      "display": "#0f1211"
    },
    "fg": {
      "default": "#1c1c1e",
      "muted": "#5f5e5a",
      "faint": "#8f8d87",
      "onAccent": "#1c1c1e",
      "onDark": "#f5f4f0",
      "readout": "#ffb454"
    },
    "accent": {
      "primary": "#ff5a1f"
    },
    "edge": {
      "highlight": "rgba(255, 255, 255, 0.9)",
      "line": "rgba(28, 28, 30, 0.09)"
    },
    "feedback": {
      "success": "#1f7a45",
      "warning": "#a86400",
      "danger": "#cc3322"
    }
  },
  "button": {
    "radius": "0.625rem",
    "bg": "#f5f4f0",
    "fg": "#1c1c1e",
    "padding": {
      "x": "1.125rem",
      "y": "0.625rem"
    },
    "font": {
      "weight": 500,
      "size": "0.875rem"
    }
  },
  "device": {
    "bg": "#f5f4f0",
    "fg": "#1c1c1e",
    "radius": "2rem",
    "padding": "1.5rem"
  },
  "shadow": {
    "none": "none",
    "key": "inset 0 1px 0 var(--ds-color-edge-highlight), inset 0 -2px 0 rgba(0, 0, 0, 0.07), 0 1px 1px rgba(0, 0, 0, 0.08), 0 3px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 18px -6px rgba(0, 0, 0, 0.16)",
    "pressed": "inset 0 2px 4px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(0, 0, 0, 0.04), 0 1px 0 var(--ds-color-edge-highlight)",
    "device": "inset 0 1px 0 var(--ds-color-edge-highlight), 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 24px -10px rgba(0, 0, 0, 0.14), 0 40px 80px -30px rgba(0, 0, 0, 0.24)",
    "well": "inset 0 2px 5px rgba(0, 0, 0, 0.14), inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 0 var(--ds-color-edge-highlight)"
  },
  "border": {
    "width": {
      "hairline": "1px",
      "focus": "2px"
    }
  },
  "radius": {
    "sm": "0.375rem",
    "md": "0.625rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "2xl": "2rem",
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
      "sans": "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
      "mono": "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace"
    },
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "size": {
      "2xs": "0.6875rem",
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.75rem",
      "4xl": "3.5rem"
    },
    "lineHeight": {
      "tight": 1.05,
      "snug": 1.3,
      "normal": 1.55
    },
    "letterSpacing": {
      "tight": "-0.035em",
      "normal": "0em",
      "wide": "0.08em"
    }
  }
} as const;

export type Tokens = typeof tokens;
