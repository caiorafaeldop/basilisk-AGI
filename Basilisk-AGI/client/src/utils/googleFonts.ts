/**
 * Google Fonts Integration
 * Lista de fontes populares do Google Fonts
 */

export interface GoogleFont {
  name: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
  preview: string;
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-serif
  { name: 'Inter', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Roboto', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900], preview: 'Aa' },
  { name: 'Open Sans', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800], preview: 'Aa' },
  { name: 'Montserrat', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Poppins', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Lato', category: 'sans-serif', weights: [100, 300, 400, 700, 900], preview: 'Aa' },
  { name: 'Raleway', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Nunito', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Work Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'DM Sans', category: 'sans-serif', weights: [400, 500, 700], preview: 'Aa' },
  
  // Serif
  { name: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900], preview: 'Aa' },
  { name: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900], preview: 'Aa' },
  { name: 'Lora', category: 'serif', weights: [400, 500, 600, 700], preview: 'Aa' },
  { name: 'PT Serif', category: 'serif', weights: [400, 700], preview: 'Aa' },
  { name: 'Crimson Text', category: 'serif', weights: [400, 600, 700], preview: 'Aa' },
  
  // Display
  { name: 'Bebas Neue', category: 'display', weights: [400], preview: 'Aa' },
  { name: 'Oswald', category: 'display', weights: [200, 300, 400, 500, 600, 700], preview: 'Aa' },
  { name: 'Anton', category: 'display', weights: [400], preview: 'Aa' },
  { name: 'Righteous', category: 'display', weights: [400], preview: 'Aa' },
  
  // Handwriting
  { name: 'Pacifico', category: 'handwriting', weights: [400], preview: 'Aa' },
  { name: 'Dancing Script', category: 'handwriting', weights: [400, 500, 600, 700], preview: 'Aa' },
  
  // Monospace
  { name: 'Fira Code', category: 'monospace', weights: [300, 400, 500, 600, 700], preview: 'Aa' },
  { name: 'JetBrains Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700, 800], preview: 'Aa' },
];

export const FONT_WEIGHTS = [
  { value: '100', label: 'Thin (100)' },
  { value: '200', label: 'Extra Light (200)' },
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
  { value: '900', label: 'Black (900)' },
];

export const FONT_SIZES = {
  title: [
    { value: '2rem', label: 'Pequeno (2rem)' },
    { value: '2.5rem', label: 'Médio (2.5rem)' },
    { value: '3rem', label: 'Grande (3rem)' },
    { value: '3.5rem', label: 'Extra Grande (3.5rem)' },
    { value: '4rem', label: 'Gigante (4rem)' },
    { value: '5rem', label: 'Mega (5rem)' },
    { value: '6rem', label: 'Ultra (6rem)' },
  ],
  subtitle: [
    { value: '1rem', label: 'Pequeno (1rem)' },
    { value: '1.25rem', label: 'Médio (1.25rem)' },
    { value: '1.5rem', label: 'Grande (1.5rem)' },
    { value: '1.75rem', label: 'Extra Grande (1.75rem)' },
    { value: '2rem', label: 'Gigante (2rem)' },
  ],
  body: [
    { value: '0.875rem', label: 'Pequeno (0.875rem)' },
    { value: '1rem', label: 'Médio (1rem)' },
    { value: '1.125rem', label: 'Grande (1.125rem)' },
    { value: '1.25rem', label: 'Extra Grande (1.25rem)' },
  ],
};

export const LINE_HEIGHTS = [
  { value: '1', label: 'Compacto (1)' },
  { value: '1.2', label: 'Apertado (1.2)' },
  { value: '1.4', label: 'Normal (1.4)' },
  { value: '1.6', label: 'Confortável (1.6)' },
  { value: '1.8', label: 'Espaçoso (1.8)' },
  { value: '2', label: 'Extra Espaçoso (2)' },
];

export const LETTER_SPACINGS = [
  { value: '-0.05em', label: 'Muito Apertado (-0.05em)' },
  { value: '-0.03em', label: 'Apertado (-0.03em)' },
  { value: '-0.01em', label: 'Levemente Apertado (-0.01em)' },
  { value: '0', label: 'Normal (0)' },
  { value: '0.01em', label: 'Levemente Espaçado (0.01em)' },
  { value: '0.03em', label: 'Espaçado (0.03em)' },
  { value: '0.05em', label: 'Muito Espaçado (0.05em)' },
  { value: '0.1em', label: 'Extra Espaçado (0.1em)' },
];

/**
 * Carrega uma fonte do Google Fonts dinamicamente
 */
export const loadGoogleFont = (fontName: string, weights: number[] = [400, 700]): void => {
  const fontFamily = fontName.replace(/ /g, '+');
  const weightsStr = weights.join(',');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightsStr}&display=swap`;
  document.head.appendChild(link);
};

/**
 * Aplica a fonte globalmente
 */
export const applyGlobalFont = (fontName: string): void => {
  document.documentElement.style.setProperty('--font-family', `"${fontName}", sans-serif`);
};

/**
 * Remove todas as fontes do Google Fonts carregadas
 */
export const removeAllGoogleFonts = (): void => {
  const links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
  links.forEach(link => link.remove());
};
