/**
 * Hook para aplicar efeitos de hover nos botões
 * Baseado nas configurações do site
 */

import { useSiteConfig } from './useSiteConfig';
import { CSSProperties } from 'react';

export const useButtonEffects = () => {
  const { config } = useSiteConfig();

  const getButtonStyle = (variant: 'primary' | 'secondary' = 'primary'): CSSProperties => {
    const baseStyle: CSSProperties = {
      borderRadius: config?.buttonRadius || '6px',
      boxShadow: config?.buttonShadow || '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: config?.buttonPadding || '0.875rem 2rem',
      transitionDuration: config?.transitionSpeed || '300ms',
      transitionProperty: 'all',
      fontFamily: config?.fontFamily || 'inherit'
    };

    return baseStyle;
  };

  const getButtonHoverClass = (): string => {
    const effect = config?.buttonHoverEffect || 'lift';
    
    switch (effect) {
      case 'lift':
        return 'hover:-translate-y-1 hover:shadow-2xl';
      case 'scale':
        return 'hover:scale-105';
      case 'glow':
        return 'hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'none':
        return '';
      default:
        return 'hover:-translate-y-1';
    }
  };

  const getButtonSize = (): string => {
    const size = config?.buttonSize || 'md';
    
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-12 py-6 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return {
    getButtonStyle,
    getButtonHoverClass,
    getButtonSize
  };
};
