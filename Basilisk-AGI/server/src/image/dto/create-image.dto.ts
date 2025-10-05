import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  folder: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  width?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  height?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  size?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  format?: string;
}
