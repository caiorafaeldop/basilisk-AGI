import { IsString, IsOptional, IsBoolean, IsArray, IsUrl, ValidateNested } from 'class-validator';
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
  primaryColor?: string;

  @IsOptional()
  @IsString()
  secondaryColor?: string;

  @IsOptional()
  @IsString()
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
}
