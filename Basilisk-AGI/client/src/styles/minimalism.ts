/**
 * MINIMALISM DESIGN SYSTEM - Premium Edition
 * Inspirado em Apple, Stripe, Linear - Elegância absoluta, espaços generosos, sutileza refinada
 */

export const MINIMALISM = {
  name: 'Minimalism',
  description: 'Elegância premium com espaços generosos e sutileza refinada',
  
  // Bordas - Ultradelgadas e discretas
  border: {
    color: 'rgba(0, 0, 0, 0.06)',  // Quase invisível
    width: {
      thin: '0.5px',
      normal: '1px',
      thick: '1px',
      extraThick: '1.5px',
    },
    radius: {
      none: '0px',
      sm: '4px',    // Mais reto
      md: '6px',    // Mais sharp
      lg: '8px',    // Minimalista
      xl: '10px',   // Sutil
    }
  },

  // Sombras - Sutilíssimas, quase imperceptíveis
  shadow: {
    color: 'rgba(0, 0, 0, 0.04)',
    small: '0 1px 2px rgba(0, 0, 0, 0.04)',
    medium: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
    large: '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.02)',
    extraLarge: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
    huge: '0 12px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.04)',
    massive: '0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 20px rgba(0, 0, 0, 0.06)',
  },

  // Texto - Leve e elegante
  text: {
    stroke: {
      thin: '0px',
      normal: '0px',
      thick: '0px',
    },
    shadow: {
      small: 'none',
      medium: 'none',
      large: 'none',
    },
    weight: {
      normal: '400',    // Regular como padrão
      medium: '500',    // Medium
      semibold: '600',  // Semibold
      bold: '700',      // Bold apenas para destaques
      extrabold: '800', // Extra para títulos especiais
    }
  },

  // Animações - Suaves e naturais
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',     // Ease-in-out suave
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bounce sutil
    },
    hover: {
      translate: '-translate-y-0.5',  // Levitação sutil
      scale: 'scale-[1.02]',          // Escala mínima
    }
  },

  // Espaçamentos - Generosos e respiráveis
  spacing: {
    xs: '0.75rem',   // 12px
    sm: '1.25rem',   // 20px
    md: '2rem',      // 32px
    lg: '3rem',      // 48px
    xl: '4rem',      // 64px
    '2xl': '6rem',   // 96px
    '3xl': '8rem',   // 128px
  },

  // Cores - Paleta neutra sofisticada
  colors: {
    primary: '#0F172A',      // Slate 900 - Quase preto elegante
    secondary: '#64748B',    // Slate 500 - Cinza médio
    accent: '#3B82F6',       // Blue 500 - Azul vibrante mas refinado
    success: '#10B981',      // Emerald 500
    danger: '#EF4444',       // Red 500
    white: '#FFFFFF',
    black: '#0F172A',        // Mais suave que preto puro
    lightBg: '#FFFFFF',      // Branco puro para light
    darkBg: '#0F172A',       // Slate escuro premium para dark
    gray: {
      50: '#F8FAFC',   // Slate 50 - Quase branco
      100: '#F1F5F9',  // Slate 100
      200: '#E2E8F0',  // Slate 200
      300: '#CBD5E1',  // Slate 300
      400: '#94A3B8',  // Slate 400
      500: '#64748B',  // Slate 500
      600: '#475569',  // Slate 600
      700: '#334155',  // Slate 700
      800: '#1E293B',  // Slate 800
      900: '#0F172A',  // Slate 900
    }
  },

  // Componentes - Design premium e refinado
  components: {
    button: {
      padding: '0.875rem 2rem',      // Mais generoso
      fontSize: '0.9375rem',         // 15px - Mais legível
      fontWeight: '500',
      borderRadius: '6px',           // Mais reto/sharp
      border: '1px solid rgba(0, 0, 0, 0.06)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      hover: {
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }
    },
    card: {
      padding: '2.5rem',             // Mais espaçoso
      borderRadius: '8px',           // Mais sharp
      border: '1px solid rgba(0, 0, 0, 0.06)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
      backgroundColor: '#ffffff',
    },
    input: {
      padding: '0.875rem 1.125rem',  // Mais confortável
      borderRadius: '6px',           // Consistente com botões
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
      fontSize: '0.9375rem',         // 15px
    },
    sidebar: {
      width: {
        collapsed: '4rem',           // 64px
        expanded: '16rem',           // 256px - Mais espaçoso
      },
      border: '1px solid rgba(0, 0, 0, 0.06)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      backgroundColor: '#ffffff',
    }
  }
} as const;

/**
 * Helper functions para aplicar estilos minimalism
 */
export const mn = {
  // Bordas
  border: (width: keyof typeof MINIMALISM.border.width = 'normal', radius: keyof typeof MINIMALISM.border.radius = 'md') => ({
    border: `${MINIMALISM.border.width[width]} solid ${MINIMALISM.border.color}`,
    borderRadius: MINIMALISM.border.radius[radius],
  }),

  // Sombras
  shadow: (size: keyof typeof MINIMALISM.shadow = 'medium') => ({
    boxShadow: MINIMALISM.shadow[size],
  }),

  // Borda + Sombra (combo mais comum)
  box: (
    borderWidth: keyof typeof MINIMALISM.border.width = 'normal',
    shadowSize: keyof typeof MINIMALISM.shadow = 'medium',
    borderRadius: keyof typeof MINIMALISM.border.radius = 'md'
  ) => ({
    border: `${MINIMALISM.border.width[borderWidth]} solid ${MINIMALISM.border.color}`,
    borderRadius: MINIMALISM.border.radius[borderRadius],
    boxShadow: MINIMALISM.shadow[shadowSize],
  }),

  // Texto sem stroke (minimalista)
  text: (weight: keyof typeof MINIMALISM.text.weight = 'normal') => ({
    fontWeight: MINIMALISM.text.weight[weight],
    textShadow: 'none',
  }),

  // Classes CSS para Tailwind
  classes: {
    border: (width: keyof typeof MINIMALISM.border.width = 'normal') => 
      `border-[${MINIMALISM.border.width[width]}] border-gray-200 rounded-[${MINIMALISM.border.radius.md}]`,
    
    hoverTranslate: 'hover:-translate-y-0.5 transition-all duration-300',
  }
};

export default MINIMALISM;
