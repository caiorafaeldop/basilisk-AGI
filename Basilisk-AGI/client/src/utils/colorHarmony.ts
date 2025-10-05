/**
 * Converte HEX para HSL
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Converte HSL para HEX
 */
function hslToHex(h: number, s: number, l: number): string {
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

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calcula contraste entre duas cores
 */
function getContrast(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!rgb) return 0;

    const [r, g, b] = [
      parseInt(rgb[1], 16) / 255,
      parseInt(rgb[2], 16) / 255,
      parseInt(rgb[3], 16) / 255,
    ].map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * VARIAÇÃO 1: Clássico Conservador
 * Tema CLARO: Header claro + texto escuro
 * Tema ESCURO: Header escuro + texto claro
 */
export function suggestHeaderColorsVariation1(primaryColor: string, siteTheme: 'light' | 'dark' = 'light') {
  const hsl = hexToHSL(primaryColor);

  if (siteTheme === 'light') {
    // TEMA CLARO: Header claro + texto escuro
    const headerBgColor = hslToHex(hsl.h, Math.min(hsl.s * 0.9, 70), 92); // L: 92% (muito claro)
    const headerTextColor = '#1a1a1a'; // Texto escuro
    const headerBtnColor = primaryColor;
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  } else {
    // TEMA ESCURO: Header muito escuro + texto claro
    const headerBgColor = hslToHex(hsl.h, Math.min(hsl.s * 0.7, 50), 15); // L: 15% (muito escuro)
    const headerTextColor = '#ffffff'; // Texto claro
    const headerBtnColor = primaryColor;
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  }
}

/**
 * VARIAÇÃO 2: Moderno Equilibrado
 * Tema CLARO: Header médio claro + texto escuro
 * Tema ESCURO: Header médio escuro + texto claro
 */
export function suggestHeaderColorsVariation2(primaryColor: string, siteTheme: 'light' | 'dark' = 'light') {
  const hsl = hexToHSL(primaryColor);

  if (siteTheme === 'light') {
    // TEMA CLARO: Header médio claro + texto escuro
    const headerBgColor = hslToHex(hsl.h, Math.min(hsl.s * 0.8, 60), 85); // L: 85% (médio claro)
    const headerTextColor = '#2d2d2d'; // Texto escuro
    const btnHsl = { ...hsl, s: Math.min(hsl.s * 1.1, 90) };
    const headerBtnColor = hslToHex(btnHsl.h, btnHsl.s, btnHsl.l);
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  } else {
    // TEMA ESCURO: Header médio escuro + texto claro
    const headerBgColor = hslToHex(hsl.h, Math.min(hsl.s * 0.6, 45), 22); // L: 22% (médio escuro)
    const headerTextColor = '#f0f0f0'; // Texto claro suave
    const btnHsl = { ...hsl, s: Math.min(hsl.s * 1.1, 90) };
    const headerBtnColor = hslToHex(btnHsl.h, btnHsl.s, btnHsl.l);
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  }
}

/**
 * VARIAÇÃO 3: Vibrante Ousado
 * Tema CLARO: Header saturado claro + texto escuro
 * Tema ESCURO: Header saturado escuro + texto claro
 */
export function suggestHeaderColorsVariation3(primaryColor: string, siteTheme: 'light' | 'dark' = 'light') {
  const hsl = hexToHSL(primaryColor);

  if (siteTheme === 'light') {
    // TEMA CLARO: Header saturado claro + texto escuro
    const headerBgColor = hslToHex(
      hsl.h, 
      Math.min(hsl.s * 1.2, 85), // Mais saturação
      75 // L: 75% (claro mas vibrante)
    );
    const headerTextColor = '#1a1a1a'; // Texto escuro
    const btnHsl = { 
      h: hsl.h, 
      s: Math.min(hsl.s * 0.9, 80), 
      l: Math.min(hsl.l * 1.3, 60) 
    };
    const headerBtnColor = hslToHex(btnHsl.h, btnHsl.s, btnHsl.l);
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  } else {
    // TEMA ESCURO: Header saturado escuro + texto claro
    const headerBgColor = hslToHex(
      hsl.h, 
      Math.min(hsl.s * 1.2, 85), // Mais saturação
      25 // L: 25% (escuro mas vibrante)
    );
    const headerTextColor = '#ffffff'; // Texto claro
    const btnHsl = { 
      h: hsl.h, 
      s: Math.min(hsl.s * 0.9, 80), 
      l: Math.min(hsl.l * 1.3, 60) 
    };
    const headerBtnColor = hslToHex(btnHsl.h, btnHsl.s, btnHsl.l);
    const btnContrast = getContrast(headerBtnColor, '#ffffff');
    const headerBtnTextColor = btnContrast >= 4.5 ? '#ffffff' : '#000000';
    
    return { headerBgColor, headerTextColor, headerBtnColor, headerBtnTextColor };
  }
}

/**
 * Função principal que aplica a variação escolhida
 */
export function suggestHeaderColors(
  primaryColor: string, 
  siteTheme: 'light' | 'dark' = 'light',
  variation: 1 | 2 | 3 = 1
) {
  switch (variation) {
    case 1:
      return suggestHeaderColorsVariation1(primaryColor, siteTheme);
    case 2:
      return suggestHeaderColorsVariation2(primaryColor, siteTheme);
    case 3:
      return suggestHeaderColorsVariation3(primaryColor, siteTheme);
    default:
      return suggestHeaderColorsVariation1(primaryColor, siteTheme);
  }
}
