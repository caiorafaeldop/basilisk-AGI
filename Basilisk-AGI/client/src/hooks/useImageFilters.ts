/**
 * Hook para aplicar filtros em imagens
 * Baseado nas configurações do site
 */

import { useSiteConfig } from './useSiteConfig';
import { CSSProperties } from 'react';

export const useImageFilters = () => {
  const { config } = useSiteConfig();

  const getImageStyle = (): CSSProperties => {
    const brightness = config?.imageBrightness || 100;
    const contrast = config?.imageContrast || 100;
    const saturation = config?.imageSaturation || 100;
    const blur = config?.imageBlur || 0;

    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`,
      transition: `filter ${config?.transitionSpeed || '300ms'} ease`
    };
  };

  const getImageOverlayStyle = (): CSSProperties => {
    const overlayColor = config?.imageOverlayColor || '#000000';
    const overlayOpacity = (config?.imageOverlayOpacity || 0) / 100;

    return {
      position: 'absolute' as const,
      inset: 0,
      backgroundColor: overlayColor,
      opacity: overlayOpacity,
      pointerEvents: 'none' as const,
      transition: `opacity ${config?.transitionSpeed || '300ms'} ease`
    };
  };

  return {
    getImageStyle,
    getImageOverlayStyle
  };
};
