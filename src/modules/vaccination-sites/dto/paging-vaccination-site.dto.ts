import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PagingVaccinationSiteDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  provinceId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  districtId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  wardId?: number;

  @IsString()
  @IsOptional()
  vaccinationSite?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
