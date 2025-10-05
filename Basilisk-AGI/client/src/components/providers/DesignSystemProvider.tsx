import { useEffect } from 'react';
import { useDesignSystem } from '@/hooks/useDesignSystem';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { MINIMALISM } from '@/styles/minimalism';
import { NEOBRUTALISM } from '@/styles/neobrutalism';
import { hexToHSL } from '@/utils/colorConverter';

export const DesignSystemProvider = ({ children }: { children: React.ReactNode }) => {
  const { system, systemName } = useDesignSystem();
  const { config } = useSiteConfig();

  useEffect(() => {
    const root = document.documentElement;
    
    if (systemName === 'minimalism') {
      // MINIMALISMO - Tema claro/escuro
      const isDark = config?.siteTheme === 'dark';
      
      // Cores base
      root.style.setProperty('--site-bg-color', isDark ? MINIMALISM.colors.darkBg : MINIMALISM.colors.lightBg);
      root.style.setProperty('--site-text-color', isDark ? MINIMALISM.colors.white : MINIMALISM.colors.black);
      
      // Header translúcido premium (blur mais forte) + gradiente sutil
      const primaryColor = config?.primaryColor || MINIMALISM.colors.primary;
      const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };
      const lightenColor = (color: string, percent: number) => {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
      };
      const darkenColor = (color: string, percent: number) => {
        const num = parseInt(color.replace("#",""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
      };
      const lightPrimaryColor = lightenColor(primaryColor, 20);
      const darkPrimaryColor = darkenColor(primaryColor, 15);
      
      root.style.setProperty('--header-bg', 
        isDark 
          ? `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%)`
          : `linear-gradient(135deg, ${hexToRgba(primaryColor, 0.08)} 0%, ${hexToRgba(darkPrimaryColor, 0.12)} 100%)`
      );
      root.style.setProperty('--header-backdrop', 'blur(20px)');
      
      // Bordas e sombras - Ultra sutis
      root.style.setProperty('--border-color', isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)');
      root.style.setProperty('--shadow-color', MINIMALISM.shadow.color);
      root.style.setProperty('--shadow-style', MINIMALISM.shadow.medium);
      
      // Componentes: Botões
      root.style.setProperty('--button-radius', MINIMALISM.components.button.borderRadius);
      root.style.setProperty('--button-border', MINIMALISM.components.button.border);
      root.style.setProperty('--button-shadow', MINIMALISM.components.button.boxShadow);
      
      root.style.setProperty('--card-radius', MINIMALISM.components.card.borderRadius);
      root.style.setProperty('--card-border', MINIMALISM.components.card.border);
      root.style.setProperty('--card-shadow', MINIMALISM.components.card.boxShadow);
      root.style.setProperty('--card-bg', MINIMALISM.components.card.backgroundColor);
      
      // Componentes: Panels - Premium
      root.style.setProperty('--panel-radius', '8px');
      root.style.setProperty('--panel-border', '1px solid ' + (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'));
      root.style.setProperty('--panel-shadow', MINIMALISM.shadow.large);
      root.style.setProperty('--panel-bg', isDark ? MINIMALISM.colors.gray[800] : MINIMALISM.colors.white);
      
      // Accent e cores auxiliares - Slate premium
      root.style.setProperty('--accent-color', config?.secondaryColor || MINIMALISM.colors.accent);
      root.style.setProperty('--muted-bg', isDark ? 'rgba(255, 255, 255, 0.03)' : MINIMALISM.colors.gray[50]);
      root.style.setProperty('--muted-border', isDark ? 'rgba(255, 255, 255, 0.08)' : MINIMALISM.colors.gray[200]);
      
      // Sidebar adaptativo ao tema - Premium
      root.style.setProperty('--sidebar-bg', isDark ? MINIMALISM.colors.gray[900] : MINIMALISM.colors.white);
      root.style.setProperty('--sidebar-border-color', isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)');
      root.style.setProperty('--sidebar-shadow', MINIMALISM.shadow.medium);
      root.style.setProperty('--sidebar-icon-color', config?.secondaryColor || MINIMALISM.colors.accent);
      root.style.setProperty('--sidebar-text-color', isDark ? MINIMALISM.colors.gray[100] : MINIMALISM.colors.gray[800]);
      root.style.setProperty('--sidebar-item-hover-bg', isDark ? 'rgba(255, 255, 255, 0.03)' : MINIMALISM.colors.gray[50]);
      
      // Bridge HSL para shadcn (Minimalism)
      root.style.setProperty('--sidebar-background', hexToHSL(isDark ? MINIMALISM.colors.gray[900] : MINIMALISM.colors.white));
      root.style.setProperty('--sidebar-foreground', hexToHSL(isDark ? MINIMALISM.colors.gray[100] : MINIMALISM.colors.gray[800]));
      root.style.setProperty('--sidebar-primary', hexToHSL(config?.secondaryColor || MINIMALISM.colors.primary));
      root.style.setProperty('--sidebar-primary-foreground', hexToHSL(MINIMALISM.colors.white));
      root.style.setProperty('--sidebar-accent', hexToHSL(isDark ? MINIMALISM.colors.gray[800] : MINIMALISM.colors.gray[50]));
      root.style.setProperty('--sidebar-accent-foreground', hexToHSL(isDark ? MINIMALISM.colors.gray[100] : MINIMALISM.colors.gray[800]));
      root.style.setProperty('--sidebar-border', hexToHSL(isDark ? MINIMALISM.colors.gray[700] : MINIMALISM.colors.gray[200]));
      root.style.setProperty('--sidebar-ring', hexToHSL(config?.secondaryColor || MINIMALISM.colors.primary));
      
    } else {
      // NEOBRUTALISM - Cor primária como fundo
      const primaryColor = config?.primaryColor || NEOBRUTALISM.colors.primary;
      
      // Cores base
      root.style.setProperty('--site-bg-color', primaryColor);
      root.style.setProperty('--site-text-color', NEOBRUTALISM.colors.black);
      
      // Header sólido
      root.style.setProperty('--header-bg', config?.headerBgColor || '#1e293b');
      root.style.setProperty('--header-backdrop', 'none');
      
      // Bordas e sombras
      root.style.setProperty('--border-color', NEOBRUTALISM.border.color);
      root.style.setProperty('--shadow-color', NEOBRUTALISM.shadow.color);
      root.style.setProperty('--shadow-style', NEOBRUTALISM.shadow.medium);
      
      // Componentes: Botões
      root.style.setProperty('--button-radius', NEOBRUTALISM.components.button.borderRadius);
      root.style.setProperty('--button-border', NEOBRUTALISM.components.button.border);
      root.style.setProperty('--button-shadow', NEOBRUTALISM.components.button.boxShadow);
      
      // Componentes: Cards
      root.style.setProperty('--card-radius', NEOBRUTALISM.components.card.borderRadius);
      root.style.setProperty('--card-border', NEOBRUTALISM.components.card.border);
      root.style.setProperty('--card-shadow', NEOBRUTALISM.components.card.boxShadow);
      root.style.setProperty('--card-bg', NEOBRUTALISM.components.card.backgroundColor);
      
      // Componentes: Panels
      root.style.setProperty('--panel-radius', '16px');
      root.style.setProperty('--panel-border', '1px solid ' + NEOBRUTALISM.border.color);
      root.style.setProperty('--panel-shadow', NEOBRUTALISM.shadow.large);
      root.style.setProperty('--panel-bg', NEOBRUTALISM.colors.white);
      
      // Accent e cores auxiliares
      root.style.setProperty('--accent-color', config?.secondaryColor || NEOBRUTALISM.colors.secondary);
      root.style.setProperty('--muted-bg', NEOBRUTALISM.colors.lightBg);
      root.style.setProperty('--muted-border', NEOBRUTALISM.colors.black);
      
      // Sidebar
      root.style.setProperty('--sidebar-bg', NEOBRUTALISM.colors.white);
      root.style.setProperty('--sidebar-border-color', NEOBRUTALISM.border.color);
      root.style.setProperty('--sidebar-shadow', NEOBRUTALISM.shadow.medium);
      root.style.setProperty('--sidebar-icon-color', NEOBRUTALISM.colors.black);
      root.style.setProperty('--sidebar-text-color', NEOBRUTALISM.colors.black);
      root.style.setProperty('--sidebar-item-hover-bg', primaryColor);
      
      // Bridge HSL para shadcn (Neobrutalism)
      root.style.setProperty('--sidebar-background', hexToHSL(NEOBRUTALISM.colors.white));
      root.style.setProperty('--sidebar-foreground', hexToHSL(NEOBRUTALISM.colors.black));
      root.style.setProperty('--sidebar-primary', hexToHSL(primaryColor));
      root.style.setProperty('--sidebar-primary-foreground', hexToHSL(NEOBRUTALISM.colors.white));
      root.style.setProperty('--sidebar-accent', hexToHSL(primaryColor));
      root.style.setProperty('--sidebar-accent-foreground', hexToHSL(NEOBRUTALISM.colors.black));
      root.style.setProperty('--sidebar-border', hexToHSL(NEOBRUTALISM.border.color));
      root.style.setProperty('--sidebar-ring', hexToHSL(primaryColor));
    }
  }, [systemName, config?.siteTheme, config?.primaryColor, config?.secondaryColor, config?.headerBgColor]);

  return <>{children}</>;
};
