import { useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export const DynamicThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { config } = useSiteConfig();

  useEffect(() => {
    if (!config) return;

    // Aplicar cores dinâmicas via CSS variables
    const root = document.documentElement;
    
    // Converter hex para HSL para usar com Tailwind/shadcn
    const hexToHSL = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '0 0% 0%';
      
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);

      return `${h} ${s}% ${l}%`;
    };

    // Aplicar cores do config
    if (config.primaryColor) {
      root.style.setProperty('--primary', hexToHSL(config.primaryColor));
    }
    
    if (config.secondaryColor) {
      root.style.setProperty('--secondary', hexToHSL(config.secondaryColor));
    }
    
    if (config.accentColor) {
      root.style.setProperty('--accent', hexToHSL(config.accentColor));
    }

    // Aplicar meta tags dinamicamente
    if (config.metaTitle) {
      document.title = config.metaTitle;
    } else if (config.siteName) {
      document.title = config.siteName;
    }

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (config.metaDescription) {
      metaDescription.setAttribute('content', config.metaDescription);
    }

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (config.metaKeywords) {
      metaKeywords.setAttribute('content', config.metaKeywords);
    }

    // Favicon
    if (config.favicon) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = config.favicon;
    }

    // Custom CSS
    if (config.customCss) {
      let customStyle = document.getElementById('custom-site-css');
      if (!customStyle) {
        customStyle = document.createElement('style');
        customStyle.id = 'custom-site-css';
        document.head.appendChild(customStyle);
      }
      customStyle.textContent = config.customCss;
    }

    // Custom Script
    if (config.customScript) {
      let customScript = document.getElementById('custom-site-script');
      if (!customScript) {
        customScript = document.createElement('script');
        customScript.id = 'custom-site-script';
        document.body.appendChild(customScript);
      }
      customScript.textContent = config.customScript;
    }

  }, [config]);

  return <>{children}</>;
};
