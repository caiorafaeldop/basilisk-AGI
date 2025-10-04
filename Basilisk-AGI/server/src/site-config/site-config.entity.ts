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

  createdAt: Date;
  updatedAt: Date;
}
