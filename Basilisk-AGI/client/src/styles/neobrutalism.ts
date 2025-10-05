/**
 * NEOBRUTALISM DESIGN SYSTEM
 * Sistema completo de design neobrutalist - bordas grossas, sombras marcantes, cores vibrantes
 */

export const NEOBRUTALISM = {
  name: 'Neobrutalism',
  description: 'Bordas finas modernas, cantos arredondados e sombras sutis',
  
  // Bordas
  border: {
    color: '#000000',
    width: {
      thin: '1px',
      normal: '1px',
      thick: '2px',
      extraThick: '3px',
    },
    radius: {
      none: '0px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
    }
  },

  // Sombras
  shadow: {
    color: '#000000',
    small: '1px 1px 0px #000000',
    medium: '2px 2px 0px #000000',
    large: '3px 3px 0px #000000',
    extraLarge: '4px 4px 0px #000000',
    huge: '6px 6px 0px #000000',
    massive: '8px 8px 0px #000000',
  },

  // Texto
  text: {
    stroke: {
      thin: '1px',
      normal: '1px',
      thick: '2px',
    },
    shadow: {
      small: '1px 1px 0px #000000',
      medium: '2px 2px 0px #000000',
      large: '3px 3px 0px #000000',
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    }
  },

  // Animações e Transições
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    hover: {
      translate: 'translate-x-0.5 translate-y-0.5',
      scale: 'scale-105',
    }
  },

  // Espaçamentos
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Cores padrão
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE951',
    success: '#95E1D3',
    danger: '#F38181',
    white: '#FFFFFF',
    black: '#000000',
    lightBg: '#F7F7F8',
    darkBg: '#1e293b',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },

  // Componentes específicos
  components: {
    button: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '700',
      borderRadius: '12px',
      border: '1px solid #000000',
      boxShadow: '2px 2px 0px #000000',
      hover: {
        transform: 'translate(0.125rem, 0.125rem)',
        boxShadow: '1px 1px 0px #000000',
      }
    },
    card: {
      padding: '1.5rem',
      borderRadius: '16px',
      border: '1px solid #000000',
      boxShadow: '3px 3px 0px #000000',
      backgroundColor: '#FFFFFF',
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      border: '1px solid #000000',
      boxShadow: '1px 1px 0px #000000',
      fontSize: '1rem',
    },
    sidebar: {
      width: {
        collapsed: '4rem',    // 64px
        expanded: '16rem',    // 256px
      },
      border: '1px solid #000000',
      boxShadow: '2px 0px 0px #000000',
      backgroundColor: '#FFFFFF',
    }
  }
} as const;

/**
 * Helper functions para aplicar estilos neobrutalism
 */
export const nb = {
  // Bordas
  border: (width: keyof typeof NEOBRUTALISM.border.width = 'normal', radius: keyof typeof NEOBRUTALISM.border.radius = 'md') => ({
    border: `${NEOBRUTALISM.border.width[width]} solid ${NEOBRUTALISM.border.color}`,
    borderRadius: NEOBRUTALISM.border.radius[radius],
  }),

  // Sombras
  shadow: (size: keyof typeof NEOBRUTALISM.shadow = 'medium') => ({
    boxShadow: NEOBRUTALISM.shadow[size],
  }),

  // Borda + Sombra (combo mais comum)
  box: (
    borderWidth: keyof typeof NEOBRUTALISM.border.width = 'normal',
    shadowSize: keyof typeof NEOBRUTALISM.shadow = 'medium',
    borderRadius: keyof typeof NEOBRUTALISM.border.radius = 'md'
  ) => ({
    border: `${NEOBRUTALISM.border.width[borderWidth]} solid ${NEOBRUTALISM.border.color}`,
    borderRadius: NEOBRUTALISM.border.radius[borderRadius],
    boxShadow: NEOBRUTALISM.shadow[shadowSize],
  }),

  // Texto com stroke
  textStroke: (width: keyof typeof NEOBRUTALISM.text.stroke = 'normal', shadowSize: keyof typeof NEOBRUTALISM.text.shadow = 'medium') => ({
    color: '#FFFFFF',
    WebkitTextStroke: `${NEOBRUTALISM.text.stroke[width]} ${NEOBRUTALISM.border.color}`,
    paintOrder: 'stroke fill',
    textShadow: NEOBRUTALISM.text.shadow[shadowSize],
  }),

  // Classes CSS para Tailwind
  classes: {
    border: (width: keyof typeof NEOBRUTALISM.border.width = 'normal') => 
      `border-[${NEOBRUTALISM.border.width[width]}] border-black rounded-[${NEOBRUTALISM.border.radius.md}]`,
    
    hoverTranslate: 'hover:translate-x-0.5 hover:translate-y-0.5 transition-all',
  }
};

export default NEOBRUTALISM;
