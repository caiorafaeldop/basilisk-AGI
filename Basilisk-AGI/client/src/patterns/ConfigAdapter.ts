/**
 * ADAPTER PATTERN - Configuration Adapters
 * Adapta diferentes formatos de configuração para um formato unificado
 */

import { SiteConfigComplete } from './ConfigBuilder';

// Interface unificada
export interface UnifiedConfig {
  identity: {
    name: string;
    logo?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  typography: {
    fontFamily?: string;
    sizes: {
      title?: string;
      subtitle?: string;
      body?: string;
    };
    weights: {
      title?: string;
      subtitle?: string;
      body?: string;
    };
  };
  spacing: {
    section?: string;
    card?: string;
    button?: string;
    header?: string;
  };
  components: {
    button: any;
    header: any;
    card: any;
    footer: any;
  };
  seo: {
    meta?: any;
    og?: any;
    analytics?: any;
  };
  sections: {
    enabled: string[];
  };
}

// Adapter para configuração antiga (legado)
export class LegacyConfigAdapter {
  adapt(legacyConfig: any): UnifiedConfig {
    return {
      identity: {
        name: legacyConfig.siteName || '',
        logo: legacyConfig.logo
      },
      colors: {
        primary: legacyConfig.primaryColor || '#3b82f6',
        secondary: legacyConfig.secondaryColor || '#8b5cf6',
        accent: legacyConfig.accentColor
      },
      typography: {
        fontFamily: legacyConfig.fontFamily,
        sizes: {
          title: legacyConfig.titleFontSize,
          subtitle: legacyConfig.subtitleFontSize,
          body: legacyConfig.bodyFontSize
        },
        weights: {
          title: legacyConfig.titleFontWeight,
          subtitle: legacyConfig.subtitleFontWeight,
          body: legacyConfig.bodyFontWeight
        }
      },
      spacing: {
        section: legacyConfig.sectionSpacing,
        card: legacyConfig.cardPadding,
        button: legacyConfig.buttonPadding,
        header: legacyConfig.headerPadding
      },
      components: {
        button: this.adaptButton(legacyConfig),
        header: this.adaptHeader(legacyConfig),
        card: this.adaptCard(legacyConfig),
        footer: this.adaptFooter(legacyConfig)
      },
      seo: {
        meta: {
          description: legacyConfig.metaDescription,
          keywords: legacyConfig.metaKeywords
        },
        og: {
          title: legacyConfig.ogTitle,
          description: legacyConfig.ogDescription,
          image: legacyConfig.ogImage
        },
        analytics: {
          googleId: legacyConfig.googleAnalyticsId,
          facebookPixel: legacyConfig.facebookPixelId
        }
      },
      sections: {
        enabled: this.getEnabledSections(legacyConfig)
      }
    };
  }

  private adaptButton(config: any) {
    return {
      radius: config.buttonRadius,
      shadow: config.buttonShadow,
      fontSize: config.buttonFontSize,
      fontWeight: config.buttonFontWeight,
      padding: config.buttonPadding,
      hoverEffect: config.buttonHoverEffect
    };
  }

  private adaptHeader(config: any) {
    return {
      bg: config.headerBg,
      blur: config.headerBlur,
      opacity: config.headerOpacity,
      height: config.headerHeight,
      position: config.headerPosition,
      animation: config.headerAnimation
    };
  }

  private adaptCard(config: any) {
    return {
      bg: config.cardBg,
      radius: config.cardRadius,
      shadow: config.cardShadow,
      padding: config.cardPadding
    };
  }

  private adaptFooter(config: any) {
    return {
      bg: config.footerBg,
      textColor: config.footerTextColor,
      copyright: config.footerCopyright,
      links: config.footerLinks,
      showSocial: config.footerShowSocial,
      showNewsletter: config.footerShowNewsletter
    };
  }

  private getEnabledSections(config: any): string[] {
    const sections = [];
    if (config.heroEnabled) sections.push('hero');
    if (config.aboutEnabled) sections.push('about');
    if (config.teamEnabled) sections.push('team');
    if (config.galleryEnabled) sections.push('gallery');
    if (config.videoEnabled) sections.push('video');
    if (config.counterEnabled) sections.push('counter');
    if (config.partnersEnabled) sections.push('partners');
    if (config.timelineEnabled) sections.push('timeline');
    if (config.pricingEnabled) sections.push('pricing');
    if (config.blogEnabled) sections.push('blog');
    if (config.testimonialsEnabled) sections.push('testimonials');
    if (config.faqEnabled) sections.push('faq');
    if (config.ctaEnabled) sections.push('cta');
    return sections;
  }
}

// Adapter para API externa
export class ExternalAPIAdapter {
  adapt(externalData: any): UnifiedConfig {
    // Adapta dados de APIs externas (ex: WordPress, Contentful)
    return {
      identity: {
        name: externalData.site?.title || '',
        logo: externalData.site?.logo?.url
      },
      colors: {
        primary: externalData.theme?.colors?.primary || '#3b82f6',
        secondary: externalData.theme?.colors?.secondary || '#8b5cf6',
        accent: externalData.theme?.colors?.accent
      },
      typography: {
        fontFamily: externalData.theme?.typography?.fontFamily,
        sizes: {
          title: externalData.theme?.typography?.h1?.size,
          subtitle: externalData.theme?.typography?.h2?.size,
          body: externalData.theme?.typography?.body?.size
        },
        weights: {
          title: externalData.theme?.typography?.h1?.weight,
          subtitle: externalData.theme?.typography?.h2?.weight,
          body: externalData.theme?.typography?.body?.weight
        }
      },
      spacing: {
        section: externalData.theme?.spacing?.section,
        card: externalData.theme?.spacing?.card,
        button: externalData.theme?.spacing?.button,
        header: externalData.theme?.spacing?.header
      },
      components: {
        button: externalData.theme?.components?.button || {},
        header: externalData.theme?.components?.header || {},
        card: externalData.theme?.components?.card || {},
        footer: externalData.theme?.components?.footer || {}
      },
      seo: {
        meta: externalData.seo?.meta || {},
        og: externalData.seo?.og || {},
        analytics: externalData.seo?.analytics || {}
      },
      sections: {
        enabled: externalData.sections?.map((s: any) => s.type) || []
      }
    };
  }
}

// Adapter para novo formato completo
export class ModernConfigAdapter {
  adapt(modernConfig: SiteConfigComplete): UnifiedConfig {
    return {
      identity: {
        name: modernConfig.siteName,
        logo: modernConfig.logo
      },
      colors: {
        primary: modernConfig.primaryColor,
        secondary: modernConfig.secondaryColor,
        accent: modernConfig.accentColor
      },
      typography: {
        fontFamily: modernConfig.fontFamily,
        sizes: {
          title: modernConfig.titleFontSize,
          subtitle: modernConfig.subtitleFontSize,
          body: modernConfig.bodyFontSize
        },
        weights: {
          title: modernConfig.titleFontWeight,
          subtitle: modernConfig.subtitleFontWeight,
          body: modernConfig.bodyFontWeight
        }
      },
      spacing: {
        section: modernConfig.sectionSpacing,
        card: modernConfig.cardPadding,
        button: modernConfig.buttonPadding,
        header: modernConfig.headerPadding
      },
      components: {
        button: {
          radius: modernConfig.buttonRadius,
          shadow: modernConfig.buttonShadow,
          fontSize: modernConfig.buttonFontSize,
          fontWeight: modernConfig.buttonFontWeight,
          hoverEffect: modernConfig.buttonHoverEffect
        },
        header: {
          bg: modernConfig.headerBg,
          blur: modernConfig.headerBlur,
          opacity: modernConfig.headerOpacity,
          height: modernConfig.headerHeight,
          position: modernConfig.headerPosition,
          animation: modernConfig.headerAnimation
        },
        card: {
          bg: modernConfig.cardBg,
          radius: modernConfig.cardRadius,
          shadow: modernConfig.cardShadow,
          padding: modernConfig.cardPadding
        },
        footer: {
          bg: modernConfig.footerBg,
          textColor: modernConfig.footerTextColor,
          copyright: modernConfig.footerCopyright,
          links: modernConfig.footerLinks,
          showSocial: modernConfig.footerShowSocial,
          showNewsletter: modernConfig.footerShowNewsletter
        }
      },
      seo: {
        meta: {
          description: modernConfig.metaDescription,
          keywords: modernConfig.metaKeywords,
          favicon: modernConfig.favicon
        },
        og: {
          title: modernConfig.ogTitle,
          description: modernConfig.ogDescription,
          image: modernConfig.ogImage,
          twitterCard: modernConfig.twitterCard
        },
        analytics: {
          googleId: modernConfig.googleAnalyticsId,
          facebookPixel: modernConfig.facebookPixelId
        }
      },
      sections: {
        enabled: this.getEnabledSections(modernConfig)
      }
    };
  }

  private getEnabledSections(config: SiteConfigComplete): string[] {
    const sections = [];
    if (config.heroEnabled) sections.push('hero');
    if (config.aboutEnabled) sections.push('about');
    if (config.teamEnabled) sections.push('team');
    if (config.galleryEnabled) sections.push('gallery');
    if (config.videoEnabled) sections.push('video');
    if (config.counterEnabled) sections.push('counter');
    if (config.partnersEnabled) sections.push('partners');
    if (config.timelineEnabled) sections.push('timeline');
    if (config.pricingEnabled) sections.push('pricing');
    if (config.blogEnabled) sections.push('blog');
    if (config.testimonialsEnabled) sections.push('testimonials');
    if (config.faqEnabled) sections.push('faq');
    if (config.ctaEnabled) sections.push('cta');
    return sections;
  }
}
