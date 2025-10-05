/**
 * OBSERVER PATTERN - Configuration Changes
 * Notifica componentes quando a configuração muda
 */

export interface Observer {
  update(config: any): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

export class ConfigSubject implements Subject {
  private observers: Observer[] = [];
  private config: any = {};

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Observer already attached');
    }
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Observer not found');
    }
    this.observers.splice(observerIndex, 1);
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.config);
    }
  }

  setConfig(config: any): void {
    this.config = config;
    this.notify();
  }

  getConfig(): any {
    return this.config;
  }
}

// Observers específicos
export class HeaderObserver implements Observer {
  update(config: any): void {
    console.log('Header updated with config:', config);
    // Atualizar header com nova config
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('headerConfigChanged', { detail: config }));
    }
  }
}

export class FooterObserver implements Observer {
  update(config: any): void {
    console.log('Footer updated with config:', config);
    // Atualizar footer com nova config
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('footerConfigChanged', { detail: config }));
    }
  }
}

export class ThemeObserver implements Observer {
  update(config: any): void {
    console.log('Theme updated with config:', config);
    // Atualizar tema com nova config
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', config.siteTheme || 'light');
      document.documentElement.setAttribute('data-design-system', config.designSystem || 'minimalism');
    }
  }
}

export class SEOObserver implements Observer {
  update(config: any): void {
    console.log('SEO updated with config:', config);
    // Atualizar meta tags
    if (typeof document !== 'undefined') {
      // Meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', config.metaDescription || '');

      // OG tags
      this.updateOGTag('og:title', config.ogTitle || config.siteName);
      this.updateOGTag('og:description', config.ogDescription || config.metaDescription);
      this.updateOGTag('og:image', config.ogImage || '');

      // Title
      document.title = config.siteName || 'Landing Page';

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
    }
  }

  private updateOGTag(property: string, content: string): void {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
}

export class AnalyticsObserver implements Observer {
  update(config: any): void {
    console.log('Analytics updated with config:', config);
    
    // Google Analytics
    if (config.googleAnalyticsId && typeof window !== 'undefined') {
      // Carregar GA
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', config.googleAnalyticsId);
    }

    // Facebook Pixel
    if (config.facebookPixelId && typeof window !== 'undefined') {
      // Carregar FB Pixel
      (window as any).fbq = (window as any).fbq || function() {
        ((window as any).fbq.q = (window as any).fbq.q || []).push(arguments);
      };
      (window as any).fbq('init', config.facebookPixelId);
      (window as any).fbq('track', 'PageView');
    }
  }
}
