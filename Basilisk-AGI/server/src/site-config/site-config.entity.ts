export interface HeroHighlight {
  icon: string;
  text: string;
}

export interface Qualification {
  icon: string;
  text: string;
}

export interface QuickLink {
  name: string;
  href: string;
}

export class SiteConfig {
  id: string;

  // Branding
  siteName: string;
  logo?: string;
  favicon?: string;

  // Theme Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroCtaText: string;
  heroCtaLink?: string;
  heroHighlights?: HeroHighlight[];

  // About Section
  aboutEnabled: boolean;
  aboutTitle: string;
  aboutSubtitle?: string;
  aboutContent?: string;
  aboutImage?: string;
  aboutImageMobile?: string;
  qualifications?: Qualification[];

  // Contact Information
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  addressComplement?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  mapEmbedUrl?: string;
  businessHours: string;

  // Social Media
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;

  // Sections Toggle
  heroEnabled: boolean;
  teamEnabled: boolean;
  blogEnabled: boolean;
  testimonialsEnabled: boolean;
  faqEnabled: boolean;
  ctaEnabled: boolean;

  // Footer
  footerDescription?: string;
  footerServices?: string[];
  footerQuickLinks?: QuickLink[];
  footerCopyright: string;
  footerLegalText?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // Additional Settings
  customCss?: string;
  customScript?: string;

  // 🔥 TIPOGRAFIA COMPLETA
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

  // 🔥 ESPAÇAMENTOS
  sectionSpacing?: string;
  cardPadding?: string;
  buttonPadding?: string;
  headerPadding?: string;
  heroPaddingTop?: string;
  heroPaddingBottom?: string;

  // 🔥 BOTÕES AVANÇADOS
  buttonRadius?: string;
  buttonShadow?: string;
  buttonShadowColor?: string;
  buttonHoverEffect?: string;
  buttonHoverColor?: string;
  buttonSize?: string;

  // 🔥 HEADER AVANÇADO
  headerOpacity?: number;
  headerBlur?: number;
  headerHeight?: string;
  headerPosition?: string;
  headerAnimation?: string;
  headerShadow?: string;

  // 🔥 IMAGENS COM FILTROS
  imageBrightness?: number;
  imageContrast?: number;
  imageSaturation?: number;
  imageBlur?: number;
  imageOverlayColor?: string;
  imageOverlayOpacity?: number;

  // 🔥 ANIMAÇÕES
  transitionSpeed?: string;
  animationDelay?: string;
  enableParallax?: boolean;
  enableFadeIn?: boolean;
  cardHoverEffect?: string;

  // 🔥 FOOTER COMPLETO
  footerBg?: string;
  footerTextColor?: string;
  footerShowSocial?: boolean;
  footerShowNewsletter?: boolean;
  footerNewsletterTitle?: string;
  footerNewsletterSubtitle?: string;

  // 🔥 SEO AVANÇADO
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;

  // 🔥 NOVAS SEÇÕES
  galleryEnabled?: boolean;
  videoEnabled?: boolean;
  counterEnabled?: boolean;
  partnersEnabled?: boolean;
  timelineEnabled?: boolean;
  pricingEnabled?: boolean;

  // Design System & Theme
  siteTheme?: string;
  designSystem?: string;
  heroLayout?: string;
  heroCtaAction?: string;

  // Header Colors
  headerBgColor?: string;
  headerTextColor?: string;
  headerBtnColor?: string;
  headerBtnTextColor?: string;
  useAutoHeaderColors?: boolean;

  // Extra Button
  extraBtnEnabled?: boolean;
  extraBtnLabel?: string;
  extraBtnLink?: string;
  extraBtnType?: string;

  createdAt: Date;
  updatedAt: Date;
}
