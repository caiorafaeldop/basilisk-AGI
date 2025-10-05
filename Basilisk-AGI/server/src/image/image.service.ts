import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateImageDto } from './dto';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto) {
    // SOLUÇÃO: Limpar dados antigos com formato errado e inserir corretamente
    
    // 1. Deletar qualquer documento antigo com createdAt como string
    try {
      await this.prisma.$runCommandRaw({
        delete: 'images',
        deletes: [{
          q: { url: createImageDto.url },
          limit: 0
        }]
      });
    } catch (e) {
      // Ignore se não existir
    }

    // 2. Inserir com ISODate correto do MongoDB
    const result = await this.prisma.$runCommandRaw({
      insert: 'images',
      documents: [{
        userId: createImageDto.userId || null,
        name: createImageDto.name,
        url: createImageDto.url,
        folder: createImageDto.folder,
        width: createImageDto.width || null,
        height: createImageDto.height || null,
        size: createImageDto.size || null,
        format: createImageDto.format || null,
        createdAt: { $date: new Date().toISOString() },
        updatedAt: { $date: new Date().toISOString() },
      }]
    }) as any;

    // 3. Aguardar e buscar
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const image = await this.prisma.image.findFirst({
      where: { url: createImageDto.url },
      orderBy: { createdAt: 'desc' },
    });

    return image;
  }

  async findAll(userId?: string) {
    try {
      const where = userId ? { userId } : {};
      return await this.prisma.image.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
      return [];
    }
  }

  async findOne(id: string) {
    try {
      const image = await this.prisma.image.findUnique({
        where: { id },
      });

      if (!image) {
        throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
      }

      return image;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Erro ao buscar imagem:', error);
      throw new NotFoundException(`Imagem com ID ${id} não encontrada`);
    }
  }

  async findByFolder(folder: string, userId?: string) {
    try {
      const where = userId ? { folder, userId } : { folder };
      return await this.prisma.image.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Erro ao buscar imagens por pasta:', error);
      return [];
    }
  }

  async delete(id: string) {
    try {
      const image = await this.findOne(id);
      
      // TODO: Verificar se a imagem está sendo usada em algum lugar
      // antes de deletar (SiteConfig, Articles, etc.)
      
      await this.prisma.image.delete({
        where: { id },
      });

      return { success: true, message: 'Imagem deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      throw error;
    }
  }

  async isImageInUse(imageId: string): Promise<boolean> {
    // Verificar se a imagem está sendo usada no SiteConfig
    const siteConfig = await this.prisma.siteConfig.findFirst();
    
    if (!siteConfig) return false;

    // Verificar heroImage
    if (siteConfig.heroImage === imageId) return true;

    // Verificar heroSlides
    if (siteConfig.heroSlides) {
      const slides = siteConfig.heroSlides as any[];
      if (slides.some(slide => slide.imageId === imageId)) return true;
    }

    // Verificar logo
    if (siteConfig.logo === imageId) return true;

    // Verificar aboutImage
    if (siteConfig.aboutImage === imageId) return true;

    return false;
  }
}
