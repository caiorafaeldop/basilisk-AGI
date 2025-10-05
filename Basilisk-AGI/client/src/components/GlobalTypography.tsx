/**
 * Global Typography Component
 * Aplica tipografia globalmente baseada nas configurações
 */

import { useEffect, useMemo } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { loadGoogleFont } from '@/utils/googleFonts';

export const GlobalTypography = () => {
  const { config } = useSiteConfig();

  // Memoizar valores de tipografia para evitar re-renders desnecessários
  const typographyConfig = useMemo(() => ({
    fontFamily: config?.fontFamily,
    titleFontSize: config?.titleFontSize,
    titleFontWeight: config?.titleFontWeight,
    titleLineHeight: config?.titleLineHeight,
    titleLetterSpacing: config?.titleLetterSpacing,
    subtitleFontSize: config?.subtitleFontSize,
    subtitleFontWeight: config?.subtitleFontWeight,
    subtitleLineHeight: config?.subtitleLineHeight,
    bodyFontSize: config?.bodyFontSize,
    bodyFontWeight: config?.bodyFontWeight,
    bodyLineHeight: config?.bodyLineHeight,
    sectionSpacing: config?.sectionSpacing,
    cardPadding: config?.cardPadding,
    buttonRadius: config?.buttonRadius,
    buttonShadow: config?.buttonShadow,
    transitionSpeed: config?.transitionSpeed,
    animationDelay: config?.animationDelay,
  }), [
    config?.fontFamily,
    config?.titleFontSize,
    config?.titleFontWeight,
    config?.titleLineHeight,
    config?.titleLetterSpacing,
    config?.subtitleFontSize,
    config?.subtitleFontWeight,
    config?.subtitleLineHeight,
    config?.bodyFontSize,
    config?.bodyFontWeight,
    config?.bodyLineHeight,
    config?.sectionSpacing,
    config?.cardPadding,
    config?.buttonRadius,
    config?.buttonShadow,
    config?.transitionSpeed,
    config?.animationDelay,
  ]);

  // Carregar fonte do Google Fonts
  useEffect(() => {
    if (typographyConfig.fontFamily) {
      try {
        loadGoogleFont(typographyConfig.fontFamily, [100, 200, 300, 400, 500, 600, 700, 800, 900]);
      } catch (error) {
        console.error('Erro ao carregar fonte:', error);
      }
    }
  }, [typographyConfig.fontFamily]);

  // Aplicar estilos globais
  useEffect(() => {
    if (!config) return;

    try {
      const root = document.documentElement;

    // Tipografia
    if (config.fontFamily) {
      root.style.setProperty('--font-family', `"${config.fontFamily}", sans-serif`);
    }
    if (config.titleFontSize) {
      root.style.setProperty('--title-font-size', config.titleFontSize);
    }
    if (config.titleFontWeight) {
      root.style.setProperty('--title-font-weight', config.titleFontWeight);
    }
    if (config.titleLineHeight) {
      root.style.setProperty('--title-line-height', config.titleLineHeight);
    }
    if (config.titleLetterSpacing) {
      root.style.setProperty('--title-letter-spacing', config.titleLetterSpacing);
    }
    if (config.subtitleFontSize) {
      root.style.setProperty('--subtitle-font-size', config.subtitleFontSize);
    }
    if (config.subtitleFontWeight) {
      root.style.setProperty('--subtitle-font-weight', config.subtitleFontWeight);
    }
    if (config.bodyFontSize) {
      root.style.setProperty('--body-font-size', config.bodyFontSize);
    }
    if (config.bodyFontWeight) {
      root.style.setProperty('--body-font-weight', config.bodyFontWeight);
    }

    // Espaçamentos
    if (config.sectionSpacing) {
      root.style.setProperty('--section-spacing', config.sectionSpacing);
    }
    if (config.cardPadding) {
      root.style.setProperty('--card-padding', config.cardPadding);
    }

    // Botões
    if (config.buttonRadius) {
      root.style.setProperty('--button-radius', config.buttonRadius);
    }
    if (config.buttonShadow) {
      root.style.setProperty('--button-shadow', config.buttonShadow);
    }

    // Animações
    if (config.transitionSpeed) {
      root.style.setProperty('--transition-speed', config.transitionSpeed);
    }
    if (config.animationDelay) {
      root.style.setProperty('--animation-delay', config.animationDelay);
    }
    } catch (error) {
      console.error('Erro ao aplicar estilos globais:', error);
    }
  }, [typographyConfig]);

  return null; // Este componente não renderiza nada
};
