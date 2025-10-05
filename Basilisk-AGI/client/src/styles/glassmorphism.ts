/**
 * Glassmorphism Design System
 * Sistema de design com efeito de vidro fosco
 */

import { DesignSystem } from './designSystem';

export const glassmorphism: DesignSystem = {
  name: 'glassmorphism',
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    background: '#0f0c29',
    text: '#ffffff',
    border: 'rgba(255, 255, 255, 0.18)',
    muted: 'rgba(255, 255, 255, 0.1)',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  borders: {
    none: '0',
    thin: '1px',
    normal: '1px',
    thick: '2px',
    radius: {
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      full: '9999px',
    },
  },

  shadows: {
    none: 'none',
    small: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    medium: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    large: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 20px rgba(102, 126, 234, 0.5)',
  },

  effects: {
    blur: {
      sm: '4px',
      md: '10px',
      lg: '20px',
      xl: '40px',
    },
    opacity: {
      low: '0.1',
      medium: '0.15',
      high: '0.25',
    },
  },

  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  components: {
    button: {
      base: {
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        fontWeight: '600',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
      variants: {
        primary: {
          background: 'rgba(102, 126, 234, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        secondary: {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        ghost: {
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: '#ffffff',
        },
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
      },
    },

    card: {
      base: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        padding: '1.5rem',
      },
      hover: {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
      },
    },

    input: {
      base: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '12px',
        padding: '0.75rem 1rem',
        color: '#ffffff',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      },
      focus: {
        border: '1px solid rgba(102, 126, 234, 0.5)',
        boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
      },
    },

    header: {
      base: {
        background: 'rgba(15, 12, 41, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },

    modal: {
      base: {
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      },
    },
  },
};

// Helper para aplicar glassmorphism
export const applyGlassmorphism = (opacity: number = 0.1, blur: number = 10) => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
});

// Helper para glassmorphism escuro
export const applyDarkGlassmorphism = (opacity: number = 0.1, blur: number = 10) => ({
  background: `rgba(0, 0, 0, ${opacity})`,
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
});
