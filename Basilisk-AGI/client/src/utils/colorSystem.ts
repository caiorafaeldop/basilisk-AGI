/**
 * Advanced Color System
 * Sistema avançado de cores com geração automática de paletas
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  light: string;
  dark: string;
}

/**
 * Converte HEX para RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Converte RGB para HEX
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Converte HEX para HSL
 */
export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

/**
 * Converte HSL para HEX
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
};

/**
 * Clarear cor
 */
export const lightenColor = (hex: string, percent: number): string => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.min(100, l + percent));
};

/**
 * Escurecer cor
 */
export const darkenColor = (hex: string, percent: number): string => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, l - percent));
};

/**
 * Ajustar saturação
 */
export const saturateColor = (hex: string, percent: number): string => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.min(100, s + percent), l);
};

/**
 * Dessaturar cor
 */
export const desaturateColor = (hex: string, percent: number): string => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.max(0, s - percent), l);
};

/**
 * Gerar cor complementar
 */
export const getComplementaryColor = (hex: string): string => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex((h + 180) % 360, s, l);
};

/**
 * Gerar cores análogas
 */
export const getAnalogousColors = (hex: string): [string, string] => {
  const { h, s, l } = hexToHsl(hex);
  return [
    hslToHex((h + 30) % 360, s, l),
    hslToHex((h - 30 + 360) % 360, s, l)
  ];
};

/**
 * Gerar cores triádicas
 */
export const getTriadicColors = (hex: string): [string, string] => {
  const { h, s, l } = hexToHsl(hex);
  return [
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l)
  ];
};

/**
 * Gerar paleta completa baseada em uma cor primária
 */
export const generatePalette = (primaryColor: string, theme: 'light' | 'dark' = 'light'): ColorPalette => {
  const { h, s, l } = hexToHsl(primaryColor);

  // Cor secundária (análoga)
  const secondary = hslToHex((h + 30) % 360, s, l);

  // Cor de acento (complementar com ajuste)
  const accent = hslToHex((h + 180) % 360, Math.min(100, s + 10), l);

  // Cores de status
  const success = hslToHex(120, 60, theme === 'light' ? 45 : 55); // Verde
  const warning = hslToHex(45, 90, theme === 'light' ? 55 : 65); // Amarelo/Laranja
  const error = hslToHex(0, 70, theme === 'light' ? 50 : 60); // Vermelho
  const info = hslToHex(200, 70, theme === 'light' ? 50 : 60); // Azul

  // Cores neutras
  const light = theme === 'light' ? '#f8f9fa' : '#2d3748';
  const dark = theme === 'light' ? '#1a202c' : '#f7fafc';

  return {
    primary: primaryColor,
    secondary,
    accent,
    success,
    warning,
    error,
    info,
    light,
    dark
  };
};

/**
 * Gerar gradiente entre duas cores
 */
export const generateGradient = (
  color1: string,
  color2: string,
  angle: number = 135,
  type: 'linear' | 'radial' = 'linear'
): string => {
  if (type === 'radial') {
    return `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`;
  }
  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
};

/**
 * Verificar contraste entre duas cores (WCAG)
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (hex: string): number => {
    const { r, g, b } = hexToRgb(hex);
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Verificar se o contraste é acessível (WCAG AA)
 */
export const isAccessibleContrast = (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Gerar cor de texto baseada no fundo
 */
export const getTextColorForBackground = (backgroundColor: string): string => {
  const { l } = hexToHsl(backgroundColor);
  return l > 50 ? '#000000' : '#FFFFFF';
};

/**
 * Aplicar opacidade a uma cor HEX
 */
export const addOpacity = (hex: string, opacity: number): string => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
