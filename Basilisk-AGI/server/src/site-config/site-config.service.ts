import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongoAdapter } from '../prisma/mongo.adapter';
import { CreateSiteConfigDto } from './dto/create-site-config.dto';
import { UpdateSiteConfigDto } from './dto/update-site-config.dto';
import { SiteConfig } from './site-config.entity';
import { Prisma } from '@prisma/client';
import { suggestHeaderColors } from '../utils/colorHarmony';

@Injectable()
export class SiteConfigService {
  private mongoAdapter: MongoAdapter;

  constructor(private prisma: PrismaService) {
    this.mongoAdapter = new MongoAdapter(prisma);
  }

  /**
   * Normaliza ObjectId do MongoDB para string
   */
  private normalizeId(id: any): string {
    if (!id) return id;
    if (typeof id === 'string') return id;
    if (id.$oid) return id.$oid;
    return String(id);
  }

  /**
   * Transforma dados do Prisma (com JsonValue) para SiteConfig tipado
   */
  private transformPrismaConfig(config: any): SiteConfig {
    const normalizedId = config.id || config._id;
    
    return {
      ...config,
      id: this.normalizeId(normalizedId), // Garantir que o ID é sempre string
      heroHighlights: config.heroHighlights as any,
      qualifications: config.qualifications as any,
      footerServices: config.footerServices as any,
      footerQuickLinks: config.footerQuickLinks as any,
    };
  }

  /**
   * Retorna a configuração ativa do site (sempre a primeira/única)
   * Se não existir, cria uma com valores padrão
   */
  async getConfig(): Promise<SiteConfig> {
    // Usa MongoAdapter diretamente para evitar problemas de conversão
    let config = await this.mongoAdapter.findOne('SiteConfig', {});
    
    if (!config) {
      // Criar configuração padrão usando MongoAdapter (sem transação)
      const defaultConfig = {
        siteName: 'Meu Site',
        primaryColor: '#8B4513',
        secondaryColor: '#D4AF37',
        accentColor: '#4A5568',
        heroTitle: 'Bem-vindo',
        heroSubtitle: 'Descrição do seu negócio',
        heroCtaText: 'Entre em Contato',
        aboutTitle: 'Sobre Nós',
        businessHours: 'Segunda a Sexta: 9h às 18h',
        footerCopyright: 'Todos os direitos reservados.',
        heroEnabled: true,
        aboutEnabled: true,
        teamEnabled: true,
        blogEnabled: true,
        testimonialsEnabled: false,
        faqEnabled: false,
        ctaEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        config = await this.prisma.siteConfig.create({ data: defaultConfig });
      } catch (error) {
        // Se falhar com Prisma (transação), usa MongoAdapter
        if (error.code === 'P2031') {
          config = await this.mongoAdapter.createDocument('SiteConfig', defaultConfig);
        } else {
          throw error;
        }
      }
    }

    return this.transformPrismaConfig(config);
  }

  /**
   * Atualiza a configuração do site
   */
  async update(updateDto: UpdateSiteConfigDto): Promise<SiteConfig> {
    // Buscar a configuração existente
    const config = await this.getConfig();
    
    console.log('Config before update:', { id: config.id, type: typeof config.id });
    
    if (!config.id) {
      throw new Error('Config ID is missing');
    }

    // Converter arrays para JSON se necessário
    const data: any = { ...updateDto, updatedAt: new Date() };

    // Se useAutoHeaderColors = true e há primaryColor, calcular cores do header
    if (data.useAutoHeaderColors !== false) {
      const primaryColor = data.primaryColor || config.primaryColor;
      if (primaryColor) {
        const suggested = suggestHeaderColors(primaryColor);
        data.headerBgColor = suggested.headerBgColor;
        data.headerTextColor = suggested.headerTextColor;
        data.headerBtnColor = suggested.headerBtnColor;
        data.headerBtnTextColor = suggested.headerBtnTextColor;
      }
    }

    // Sempre usa MongoAdapter para evitar problemas com tipos do Prisma
    try {
      const updated = await this.mongoAdapter.updateDocument(
        'SiteConfig',
        { _id: { $oid: config.id } },
        data,
      );
      
      console.log('Updated successfully via MongoAdapter');
      return this.transformPrismaConfig(updated);
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  /**
   * Cria uma nova configuração (usado apenas se não existir nenhuma)
   */
  async create(createDto: CreateSiteConfigDto): Promise<SiteConfig> {
    // Converter arrays para JSON se necessário
    const data: any = {
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    try {
      const config = await this.prisma.siteConfig.create({ data });
      return this.transformPrismaConfig(config);
    } catch (error) {
      // Se falhar com transação, usa MongoAdapter
      if (error.code === 'P2031') {
        const config = await this.mongoAdapter.createDocument('SiteConfig', data);
        return this.transformPrismaConfig(config);
      }
      throw error;
    }
  }

  /**
   * Reseta a configuração para valores padrão
   */
  async reset(): Promise<SiteConfig> {
    const config = await this.getConfig();

    const resetData = {
      siteName: 'Meu Site',
      logo: null,
      favicon: null,
      primaryColor: '#8B4513',
      secondaryColor: '#D4AF37',
      accentColor: '#4A5568',
      heroTitle: 'Bem-vindo',
      heroSubtitle: 'Descrição do seu negócio',
      heroImage: null,
      heroCtaText: 'Entre em Contato',
      heroCtaLink: null,
      heroHighlights: null,
      aboutEnabled: true,
      aboutTitle: 'Sobre Nós',
      aboutSubtitle: null,
      aboutContent: null,
      aboutImage: null,
      aboutImageMobile: null,
      qualifications: null,
      phone: null,
      email: null,
      whatsapp: null,
      address: null,
      addressComplement: null,
      city: null,
      state: null,
      zipCode: null,
      mapEmbedUrl: null,
      businessHours: 'Segunda a Sexta: 9h às 18h',
      linkedin: null,
      instagram: null,
      facebook: null,
      twitter: null,
      tiktok: null,
      youtube: null,
      heroEnabled: true,
      teamEnabled: true,
      blogEnabled: true,
      testimonialsEnabled: false,
      faqEnabled: false,
      ctaEnabled: true,
      footerDescription: null,
      footerServices: null,
      footerQuickLinks: null,
      footerCopyright: 'Todos os direitos reservados.',
      footerLegalText: null,
      metaTitle: null,
      metaDescription: null,
      metaKeywords: null,
      customCss: null,
      customScript: null,
      updatedAt: new Date(),
    };

    try {
      const reset = await this.prisma.siteConfig.update({
        where: { id: config.id },
        data: resetData,
      });
      return this.transformPrismaConfig(reset);
    } catch (error) {
      // Se falhar com transação, usa MongoAdapter
      if (error.code === 'P2031') {
        const reset = await this.mongoAdapter.updateDocument(
          'SiteConfig',
          { _id: config.id },
          resetData,
        );
        return this.transformPrismaConfig(reset);
      }
      throw error;
    }
  }

  /**
   * Verifica se é a primeira configuração (setup inicial)
   */
  async isFirstSetup(): Promise<boolean> {
    // Usa MongoAdapter diretamente
    const config = await this.mongoAdapter.findOne('SiteConfig', {});
    
    // Se não existe ou se está com valores padrão básicos
    if (!config) return true;
    
    // Considerar como "primeira vez" se não tem logo e está com nome padrão
    return !config.logo && config.siteName === 'Meu Site';
  }
}
