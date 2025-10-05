import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto';
import { UploadService } from '../upload/upload.service';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload de imagem com crop e metadata' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Imagem enviada e salva com sucesso',
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
    @Body('userId') userId?: string,
    @Body('width') width?: string,
    @Body('height') height?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    // Validar tipo de arquivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não permitido. Use apenas JPEG, PNG, GIF ou WebP.');
    }

    // Validar tamanho do arquivo (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5MB');
    }

    try {
      // Upload para Cloudinary
      const uploadFolder = folder || 'basilisk/hero';
      const imageUrl = await this.uploadService.uploadImage(file, uploadFolder);

      // Extrair formato do mimetype
      const format = file.mimetype.split('/')[1];

      // Criar registro no banco
      const imageData: CreateImageDto = {
        userId: userId || undefined,
        name: file.originalname,
        url: imageUrl,
        folder: uploadFolder,
        width: width ? parseInt(width) : undefined,
        height: height ? parseInt(height) : undefined,
        size: file.size,
        format,
      };

      const savedImage = await this.imageService.create(imageData);

      if (!savedImage) {
        throw new BadRequestException('Erro ao salvar imagem no banco de dados');
      }

      return {
        success: true,
        imageId: savedImage.id,
        url: savedImage.url,
        width: savedImage.width,
        height: savedImage.height,
        message: 'Imagem enviada com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao fazer upload da imagem: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as imagens' })
  @ApiResponse({ status: 200, description: 'Lista de imagens' })
  async findAll(@Query('userId') userId?: string) {
    return this.imageService.findAll(userId);
  }

  @Get('folder/:folder')
  @ApiOperation({ summary: 'Listar imagens por pasta' })
  @ApiResponse({ status: 200, description: 'Lista de imagens da pasta' })
  async findByFolder(
    @Param('folder') folder: string,
    @Query('userId') userId?: string,
  ) {
    return this.imageService.findByFolder(folder, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar imagem por ID' })
  @ApiResponse({ status: 200, description: 'Imagem encontrada' })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada' })
  async findOne(@Param('id') id: string) {
    return this.imageService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar imagem' })
  @ApiResponse({ status: 200, description: 'Imagem deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada' })
  @ApiResponse({ status: 400, description: 'Imagem está em uso' })
  async delete(@Param('id') id: string) {
    // Verificar se a imagem está em uso
    const isInUse = await this.imageService.isImageInUse(id);
    if (isInUse) {
      throw new BadRequestException('Não é possível deletar esta imagem pois ela está sendo usada');
    }

    return this.imageService.delete(id);
  }
}
