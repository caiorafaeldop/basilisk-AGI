/**
 * BUILDER PATTERN - Site Configuration
 * Constrói configurações complexas passo a passo
 */

export interface SiteConfigComplete {
  // Identidade
  siteName: string;
  logo?: string;
  
  // Cores
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  
  // Tipografia
  fontFamily?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  titleLineHeight?: string;
  titleLetterSpacing?: string;
  subtitleFontSize?: string;
  subtitleFontWeight?: string;
  subtitleLineHeight?: string;
  bodyFontSize?: string;
  bodyFontWeight?: string;
  bodyLineHeight?: string;
  
  // Espaçamentos
  sectionSpacing?: string;
  cardPadding?: string;
  buttonPadding?: string;
  headerPadding?: string;
  
  // Botões
  buttonRadius?: string;
  buttonShadow?: string;
  buttonFontSize?: string;
  buttonFontWeight?: string;
  buttonBorderWidth?: number;
  buttonHoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
  
  // Header
  headerBg?: string;
  headerBlur?: number;
  headerOpacity?: number;
  headerHeight?: string;
  headerShadow?: string;
  headerBorderColor?: string;
  headerBorderWidth?: number;
  headerPosition?: 'fixed' | 'sticky' | 'static';
  headerAnimation?: 'fade' | 'slide' | 'none';
  
  // Cards
  cardBg?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardBorderColor?: string;
  cardBorderWidth?: number;
  
  // Imagens
  imageBrightness?: number;
  imageContrast?: number;
  imageSaturation?: number;
  imageBlur?: number;
  imageOverlayColor?: string;
  imageOverlayOpacity?: number;
  
  // Animações
  transitionSpeed?: string;
  animationDelay?: string;
  enableParallax?: boolean;
  enableFadeIn?: boolean;
  
  // Footer
  footerBg?: string;
  footerTextColor?: string;
  footerCopyright?: string;
  footerLinks?: Array<{ label: string; url: string }>;
  footerShowSocial?: boolean;
  footerShowNewsletter?: boolean;
  
  // SEO
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  favicon?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  
  // Seções
  heroEnabled?: boolean;
  aboutEnabled?: boolean;
  teamEnabled?: boolean;
  galleryEnabled?: boolean;
  videoEnabled?: boolean;
  counterEnabled?: boolean;
  partnersEnabled?: boolean;
  timelineEnabled?: boolean;
  pricingEnabled?: boolean;
  blogEnabled?: boolean;
  testimonialsEnabled?: boolean;
  faqEnabled?: boolean;
  ctaEnabled?: boolean;
  
  // Tema
  siteTheme?: 'light' | 'dark';
  designSystem?: 'minimalism' | 'neobrutalism';
}

export class SiteConfigBuilder {
  private config: Partial<SiteConfigComplete> = {};

  // Identidade
  setIdentity(siteName: string, logo?: string): this {
    this.config.siteName = siteName;
    this.config.logo = logo;
    return this;
  }

  // Cores
  setColors(primary: string, secondary: string, accent?: string): this {
    this.config.primaryColor = primary;
    this.config.secondaryColor = secondary;
    this.config.accentColor = accent;
    return this;
  }

  // Tipografia
  setTypography(options: {
    fontFamily?: string;
    titleSize?: string;
    titleWeight?: string;
    subtitleSize?: string;
    bodySize?: string;
  }): this {
    this.config.fontFamily = options.fontFamily;
    this.config.titleFontSize = options.titleSize;
    this.config.titleFontWeight = options.titleWeight;
    this.config.subtitleFontSize = options.subtitleSize;
    this.config.bodyFontSize = options.bodySize;
    return this;
  }

  // Espaçamentos
  setSpacing(options: {
    section?: string;
    card?: string;
    button?: string;
    header?: string;
  }): this {
    this.config.sectionSpacing = options.section;
    this.config.cardPadding = options.card;
    this.config.buttonPadding = options.button;
    this.config.headerPadding = options.header;
    return this;
  }

  // Botões
  setButton(options: {
    radius?: string;
    shadow?: string;
    fontSize?: string;
    fontWeight?: string;
    hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
  }): this {
    this.config.buttonRadius = options.radius;
    this.config.buttonShadow = options.shadow;
    this.config.buttonFontSize = options.fontSize;
    this.config.buttonFontWeight = options.fontWeight;
    this.config.buttonHoverEffect = options.hoverEffect;
    return this;
  }

  // Header
  setHeader(options: {
    bg?: string;
    blur?: number;
    opacity?: number;
    height?: string;
    position?: 'fixed' | 'sticky' | 'static';
    animation?: 'fade' | 'slide' | 'none';
  }): this {
    this.config.headerBg = options.bg;
    this.config.headerBlur = options.blur;
    this.config.headerOpacity = options.opacity;
    this.config.headerHeight = options.height;
    this.config.headerPosition = options.position;
    this.config.headerAnimation = options.animation;
    return this;
  }

  // Footer
  setFooter(options: {
    bg?: string;
    textColor?: string;
    copyright?: string;
    links?: Array<{ label: string; url: string }>;
    showSocial?: boolean;
    showNewsletter?: boolean;
  }): this {
    this.config.footerBg = options.bg;
    this.config.footerTextColor = options.textColor;
    this.config.footerCopyright = options.copyright;
    this.config.footerLinks = options.links;
    this.config.footerShowSocial = options.showSocial;
    this.config.footerShowNewsletter = options.showNewsletter;
    return this;
  }

  // SEO
  setSEO(options: {
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    favicon?: string;
    googleAnalyticsId?: string;
  }): this {
    this.config.metaDescription = options.description;
    this.config.metaKeywords = options.keywords;
    this.config.ogTitle = options.ogTitle;
    this.config.ogDescription = options.ogDescription;
    this.config.ogImage = options.ogImage;
    this.config.favicon = options.favicon;
    this.config.googleAnalyticsId = options.googleAnalyticsId;
    return this;
  }

  // Seções
  enableSections(sections: string[]): this {
    sections.forEach(section => {
      const key = `${section}Enabled` as keyof SiteConfigComplete;
      (this.config as any)[key] = true;
    });
    return this;
  }

  // Tema
  setTheme(theme: 'light' | 'dark', designSystem: 'minimalism' | 'neobrutalism'): this {
    this.config.siteTheme = theme;
    this.config.designSystem = designSystem;
    return this;
  }

  // Construir
  build(): SiteConfigComplete {
    if (!this.config.siteName || !this.config.primaryColor || !this.config.secondaryColor) {
      throw new Error('Site name and colors are required');
    }
    return this.config as SiteConfigComplete;
  }

  // Reset
  reset(): this {
    this.config = {};
    return this;
  }
}
