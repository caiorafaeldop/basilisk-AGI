import { apiClient } from '@/config/api';

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

export interface SiteConfig {
  id: string;

  // Branding
  siteName: string;
  logo?: string;
  favicon?: string;

  // Theme Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;

  // Site Theme
  siteTheme?: string;
  
  // Design System
  designSystem?: string;

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

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroCtaText: string;
  heroCtaLink?: string;
  heroCtaAction?: 'whatsapp' | 'instagram' | 'external' | 'section';
  heroHighlights?: HeroHighlight[];
  heroSlides?: { title: string; subtitle: string; cta: string }[];
  heroLayout?: 'split-center' | 'full-width' | 'overlap' | 'zigzag' | 'cards-grid' | 'minimal' | 'asymmetric' | 'floating';

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
  buttonHoverEffect?: 'lift' | 'scale' | 'glow' | 'pulse' | 'none';
  buttonHoverColor?: string;
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl';

  // 🔥 HEADER AVANÇADO
  headerOpacity?: number;
  headerBlur?: number;
  headerHeight?: string;
  headerPosition?: 'fixed' | 'sticky' | 'static';
  headerAnimation?: 'fade' | 'slide' | 'shrink' | 'none';
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
  cardHoverEffect?: 'lift' | 'scale' | 'glow' | 'none';

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

  createdAt: string;
  updatedAt: string;
}

export interface UpdateSiteConfigDto {
  siteName?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  siteTheme?: string;
  designSystem?: string;
  headerBgColor?: string;
  headerTextColor?: string;
  headerBtnColor?: string;
  headerBtnTextColor?: string;
  useAutoHeaderColors?: boolean;
  extraBtnEnabled?: boolean;
  extraBtnLabel?: string;
  extraBtnLink?: string;
  extraBtnType?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  heroCtaAction?: 'whatsapp' | 'instagram' | 'external' | 'section';
  heroHighlights?: HeroHighlight[];
  heroSlides?: { title: string; subtitle: string; cta: string }[];
  aboutEnabled?: boolean;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutContent?: string;
  aboutImage?: string;
  aboutImageMobile?: string;
  qualifications?: Qualification[];
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  addressComplement?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  mapEmbedUrl?: string;
  businessHours?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  heroEnabled?: boolean;
  teamEnabled?: boolean;
  blogEnabled?: boolean;
  testimonialsEnabled?: boolean;
  faqEnabled?: boolean;
  ctaEnabled?: boolean;
  footerDescription?: string;
  footerServices?: string[];
  footerQuickLinks?: QuickLink[];
  footerCopyright?: string;
  footerLegalText?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
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
  buttonHoverEffect?: 'lift' | 'scale' | 'glow' | 'pulse' | 'none';
  buttonHoverColor?: string;
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl';

  // 🔥 HEADER AVANÇADO
  headerOpacity?: number;
  headerBlur?: number;
  headerHeight?: string;
  headerPosition?: 'fixed' | 'sticky' | 'static';
  headerAnimation?: 'fade' | 'slide' | 'shrink' | 'none';
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
  cardHoverEffect?: 'lift' | 'scale' | 'glow' | 'none';

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
  heroLayout?: string;
}

export const siteConfigApi = {
  getConfig: async (): Promise<SiteConfig> => {
    const response = await apiClient.get('/site-config');
    return response.data;
  },

  isFirstSetup: async (): Promise<boolean> => {
    const response = await apiClient.get('/site-config/first-setup');
    return response.data.isFirstSetup;
  },

  update: async (data: UpdateSiteConfigDto): Promise<SiteConfig> => {
    const response = await apiClient.put('/site-config', data);
    return response.data;
  },

  reset: async (): Promise<SiteConfig> => {
    const response = await apiClient.post('/site-config/reset');
    return response.data;
  },
};
