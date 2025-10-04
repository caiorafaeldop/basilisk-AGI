import { PartialType } from '@nestjs/swagger';
import { CreateSiteConfigDto } from './create-site-config.dto';

export class UpdateSiteConfigDto extends PartialType(CreateSiteConfigDto) {}
