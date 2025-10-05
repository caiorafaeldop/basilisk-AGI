import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SiteConfigService } from './site-config.service';
import { UpdateSiteConfigDto } from './dto/update-site-config.dto';
import { SiteConfig } from './site-config.entity';
import { PublicRoute } from '../decorators/public.decorator';

@ApiTags('site-config')
@Controller('site-config')
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @PublicRoute()
  @Get()
  @ApiOperation({ summary: 'Get site configuration (public)' })
  @ApiResponse({ status: 200, description: 'Returns site configuration' })
  async getConfig(): Promise<SiteConfig> {
    return this.siteConfigService.getConfig();
  }

  @PublicRoute()
  @Get('first-setup')
  @ApiOperation({ summary: 'Check if this is first setup' })
  @ApiResponse({ status: 200, description: 'Returns boolean indicating first setup' })
  async isFirstSetup(): Promise<{ isFirstSetup: boolean }> {
    const isFirst = await this.siteConfigService.isFirstSetup();
    return { isFirstSetup: isFirst };
  }

  @Put()
  @ApiOperation({ summary: 'Update site configuration (admin only)' })
  @ApiResponse({ status: 200, description: 'Configuration updated successfully' })
  async update(@Body() updateDto: UpdateSiteConfigDto): Promise<SiteConfig> {
    return this.siteConfigService.update(updateDto);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset configuration to defaults (admin only)' })
  @ApiResponse({ status: 200, description: 'Configuration reset successfully' })
  async reset(): Promise<SiteConfig> {
    return this.siteConfigService.reset();
  }
}
