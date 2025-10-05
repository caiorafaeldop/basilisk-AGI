/**
 * Style Helpers
 * Helpers centralizados para evitar código duplicado
 */

import { CSSProperties } from 'react';

export type SystemName = 'minimalism' | 'neobrutalism';

/**
 * Retorna estilos de card baseado no design system
 */
export const getCardStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--panel-bg)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    };
  }

  return {
    borderRadius: '16px',
    border: '2px solid #000000',
    backgroundColor: 'var(--panel-bg)',
    boxShadow: '3px 3px 0px #000000',
  };
};

/**
 * Retorna estilos de título baseado no design system
 */
export const getTitleStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }

  return {
    color: '#FFFFFF',
    WebkitTextStroke: '4px #000000',
    paintOrder: 'stroke fill',
    textShadow: '6px 6px 0px #000000',
  };
};

/**
 * Retorna estilos de botão primário baseado no design system
 */
export const getPrimaryButtonStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
      color: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    };
  }

  return {
    backgroundColor: 'var(--primary-color)',
    color: '#000000',
    border: '3px solid #000000',
    borderRadius: '12px',
    boxShadow: '4px 4px 0px #000000',
  };
};

/**
 * Retorna estilos de botão secundário baseado no design system
 */
export const getSecondaryButtonStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
      borderRadius: '8px',
    };
  }

  return {
    backgroundColor: 'transparent',
    color: 'var(--primary-color)',
    border: '3px solid var(--primary-color)',
    borderRadius: '12px',
  };
};

/**
 * Retorna estilos de input baseado no design system
 */
export const getInputStyle = (systemName: SystemName, hasError: boolean = false): CSSProperties => {
  const baseStyle: CSSProperties = {
    backgroundColor: 'var(--muted-bg)',
    color: 'var(--site-text-color)',
  };

  if (systemName === 'minimalism') {
    return {
      ...baseStyle,
      border: `1px solid ${hasError ? '#ef4444' : 'var(--border-color)'}`,
      borderRadius: '8px',
    };
  }

  return {
    ...baseStyle,
    border: `2px solid ${hasError ? '#ef4444' : '#000000'}`,
    borderRadius: '12px',
  };
};

/**
 * Retorna classe de hover para cards
 */
export const getCardHoverClass = (effect?: string): string => {
  switch (effect) {
    case 'lift':
      return 'hover:-translate-y-2 hover:shadow-lg';
    case 'scale':
      return 'hover:scale-105';
    case 'glow':
      return 'hover:shadow-2xl';
    case 'none':
      return '';
    default:
      return 'hover:scale-105';
  }
};

/**
 * Retorna estilos de container de seção
 */
export const getSectionContainerStyle = (spacing?: string): CSSProperties => {
  return {
    paddingTop: spacing || 'var(--section-spacing, 4rem)',
    paddingBottom: spacing || 'var(--section-spacing, 4rem)',
  };
};

/**
 * Retorna estilos de modal/dialog baseado no design system
 */
export const getModalStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--panel-bg)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    };
  }

  return {
    borderRadius: '20px',
    border: '4px solid #000000',
    backgroundColor: 'var(--panel-bg)',
    boxShadow: '8px 8px 0px #000000',
  };
};

/**
 * Retorna estilos de badge/tag baseado no design system
 */
export const getBadgeStyle = (systemName: SystemName, variant: 'primary' | 'secondary' | 'success' | 'warning' = 'primary'): CSSProperties => {
  const colors = {
    primary: 'var(--primary-color)',
    secondary: 'var(--secondary-color)',
    success: '#10b981',
    warning: '#f59e0b',
  };

  if (systemName === 'minimalism') {
    return {
      backgroundColor: colors[variant],
      color: '#ffffff',
      borderRadius: '6px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '600',
    };
  }

  return {
    backgroundColor: colors[variant],
    color: '#000000',
    border: '2px solid #000000',
    borderRadius: '8px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '700',
    boxShadow: '2px 2px 0px #000000',
  };
};

/**
 * Retorna estilos de divider/separator
 */
export const getDividerStyle = (systemName: SystemName): CSSProperties => {
  if (systemName === 'minimalism') {
    return {
      height: '1px',
      backgroundColor: 'var(--border-color)',
      opacity: 0.5,
    };
  }

  return {
    height: '2px',
    backgroundColor: '#000000',
  };
};
