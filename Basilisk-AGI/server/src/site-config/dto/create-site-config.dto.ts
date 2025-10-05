import { IsString, IsOptional, IsBoolean, IsArray, IsUrl, ValidateNested, Min, Max, IsIn, Matches, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class HeroHighlightDto {
  @IsString()
  icon: string;

  @IsString()
  text: string;
}

class QualificationDto {
  @IsString()
  icon: string;

  @IsString()
  text: string;
}

class QuickLinkDto {
  @IsString()
  name: string;

  @IsString()
  href: string;
}

export class CreateSiteConfigDto {
  // Branding
  @IsOptional()
  @IsString()
  siteName?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  favicon?: string;

  // Theme Colors
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'primaryColor deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  primaryColor?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'secondaryColor deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  secondaryColor?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'accentColor deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  accentColor?: string;

  // Hero Section
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsString()
  heroCtaText?: string;

  @IsOptional()
  @IsString()
  heroCtaType?: string;

  @IsOptional()
  @IsString()
  heroCtaLink?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeroHighlightDto)
  heroHighlights?: HeroHighlightDto[];

  // About Section
  @IsOptional()
  @IsBoolean()
  aboutEnabled?: boolean;

  @IsOptional()
  @IsString()
  aboutTitle?: string;

  @IsOptional()
  @IsString()
  aboutSubtitle?: string;

  @IsOptional()
  @IsString()
  aboutContent?: string;

  @IsOptional()
  @IsString()
  aboutImage?: string;

  @IsOptional()
  @IsString()
  aboutImageMobile?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QualificationDto)
  qualifications?: QualificationDto[];

  // Contact Information
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  addressComplement?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  mapEmbedUrl?: string;

  @IsOptional()
  @IsString()
  businessHours?: string;

  // Social Media
  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  // Sections Toggle
  @IsOptional()
  @IsBoolean()
  heroEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  teamEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  blogEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  testimonialsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  faqEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  ctaEnabled?: boolean;

  // Footer
  @IsOptional()
  @IsString()
  footerDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  footerServices?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuickLinkDto)
  footerQuickLinks?: QuickLinkDto[];

  @IsOptional()
  @IsString()
  footerCopyright?: string;

  @IsOptional()
  @IsString()
  footerLegalText?: string;

  // SEO
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  // Additional Settings
  @IsOptional()
  @IsString()
  customCss?: string;

  @IsOptional()
  @IsString()
  customScript?: string;

  // 🔥 TIPOGRAFIA COMPLETA
  @IsOptional()
  @IsString()
  fontFamily?: string;

  @IsOptional()
  @IsString()
  titleFontSize?: string;

  @IsOptional()
  @IsString()
  titleFontWeight?: string;

  @IsOptional()
  @IsString()
  titleLineHeight?: string;

  @IsOptional()
  @IsString()
  titleLetterSpacing?: string;

  @IsOptional()
  @IsString()
  subtitleFontSize?: string;

  @IsOptional()
  @IsString()
  subtitleFontWeight?: string;

  @IsOptional()
  @IsString()
  subtitleLineHeight?: string;

  @IsOptional()
  @IsString()
  bodyFontSize?: string;

  @IsOptional()
  @IsString()
  bodyFontWeight?: string;

  @IsOptional()
  @IsString()
  bodyLineHeight?: string;

  // 🔥 ESPAÇAMENTOS
  @IsOptional()
  @IsString()
  sectionSpacing?: string;

  @IsOptional()
  @IsString()
  cardPadding?: string;

  @IsOptional()
  @IsString()
  buttonPadding?: string;

  @IsOptional()
  @IsString()
  headerPadding?: string;

  @IsOptional()
  @IsString()
  heroPaddingTop?: string;

  @IsOptional()
  @IsString()
  heroPaddingBottom?: string;

  // 🔥 BOTÕES AVANÇADOS
  @IsOptional()
  @IsString()
  buttonRadius?: string;

  @IsOptional()
  @IsString()
  buttonShadow?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'buttonShadowColor deve ser uma cor hexadecimal válida' })
  buttonShadowColor?: string;

  @IsOptional()
  @IsString()
  @IsIn(['lift', 'scale', 'glow', 'pulse', 'none'], { message: 'buttonHoverEffect deve ser: lift, scale, glow, pulse ou none' })
  buttonHoverEffect?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'buttonHoverColor deve ser uma cor hexadecimal válida' })
  buttonHoverColor?: string;

  @IsOptional()
  @IsString()
  @IsIn(['sm', 'md', 'lg', 'xl'], { message: 'buttonSize deve ser: sm, md, lg ou xl' })
  buttonSize?: string;

  // 🔥 HEADER AVANÇADO
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'headerOpacity deve ser entre 0 e 1' })
  @Max(1, { message: 'headerOpacity deve ser entre 0 e 1' })
  headerOpacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'headerBlur deve ser entre 0 e 50' })
  @Max(50, { message: 'headerBlur deve ser entre 0 e 50' })
  headerBlur?: number;

  @IsOptional()
  @IsString()
  headerHeight?: string;

  @IsOptional()
  @IsString()
  @IsIn(['fixed', 'sticky', 'static'], { message: 'headerPosition deve ser: fixed, sticky ou static' })
  headerPosition?: string;

  @IsOptional()
  @IsString()
  @IsIn(['fade', 'slide', 'shrink', 'none'], { message: 'headerAnimation deve ser: fade, slide, shrink ou none' })
  headerAnimation?: string;

  @IsOptional()
  @IsString()
  headerShadow?: string;

  // 🔥 IMAGENS COM FILTROS
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'imageBrightness deve ser entre 0 e 200' })
  @Max(200, { message: 'imageBrightness deve ser entre 0 e 200' })
  imageBrightness?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'imageContrast deve ser entre 0 e 200' })
  @Max(200, { message: 'imageContrast deve ser entre 0 e 200' })
  imageContrast?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'imageSaturation deve ser entre 0 e 200' })
  @Max(200, { message: 'imageSaturation deve ser entre 0 e 200' })
  imageSaturation?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'imageBlur deve ser entre 0 e 20' })
  @Max(20, { message: 'imageBlur deve ser entre 0 e 20' })
  imageBlur?: number;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'imageOverlayColor deve ser uma cor hexadecimal válida' })
  imageOverlayColor?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'imageOverlayOpacity deve ser entre 0 e 100' })
  @Max(100, { message: 'imageOverlayOpacity deve ser entre 0 e 100' })
  imageOverlayOpacity?: number;

  // 🔥 ANIMAÇÕES
  @IsOptional()
  @IsString()
  transitionSpeed?: string;

  @IsOptional()
  @IsString()
  animationDelay?: string;

  @IsOptional()
  @IsBoolean()
  enableParallax?: boolean;

  @IsOptional()
  @IsBoolean()
  enableFadeIn?: boolean;

  @IsOptional()
  @IsString()
  cardHoverEffect?: string;

  // 🔥 FOOTER COMPLETO
  @IsOptional()
  @IsString()
  footerBg?: string;

  @IsOptional()
  @IsString()
  footerTextColor?: string;

  @IsOptional()
  @IsBoolean()
  footerShowSocial?: boolean;

  @IsOptional()
  @IsBoolean()
  footerShowNewsletter?: boolean;

  @IsOptional()
  @IsString()
  footerNewsletterTitle?: string;

  @IsOptional()
  @IsString()
  footerNewsletterSubtitle?: string;

  // 🔥 SEO AVANÇADO
  @IsOptional()
  @IsString()
  ogTitle?: string;

  @IsOptional()
  @IsString()
  ogDescription?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @IsString()
  twitterCard?: string;

  @IsOptional()
  @IsString()
  googleAnalyticsId?: string;

  @IsOptional()
  @IsString()
  facebookPixelId?: string;

  // 🔥 NOVAS SEÇÕES
  @IsOptional()
  @IsBoolean()
  galleryEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  videoEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  counterEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  partnersEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  timelineEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  pricingEnabled?: boolean;

  // Design System & Theme
  @IsOptional()
  @IsString()
  siteTheme?: string;

  @IsOptional()
  @IsString()
  designSystem?: string;

  @IsOptional()
  @IsString()
  heroLayout?: string;

  @IsOptional()
  @IsString()
  heroCtaAction?: string;

  // Header Colors
  @IsOptional()
  @IsString()
  headerBgColor?: string;

  @IsOptional()
  @IsString()
  headerTextColor?: string;

  @IsOptional()
  @IsString()
  headerBtnColor?: string;

  @IsOptional()
  @IsString()
  headerBtnTextColor?: string;

  @IsOptional()
  @IsBoolean()
  useAutoHeaderColors?: boolean;

  // Extra Button
  @IsOptional()
  @IsBoolean()
  extraBtnEnabled?: boolean;

  @IsOptional()
  @IsString()
  extraBtnLabel?: string;

  @IsOptional()
  @IsString()
  extraBtnLink?: string;

  @IsOptional()
  @IsString()
  extraBtnType?: string;
}
