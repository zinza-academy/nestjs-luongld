import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PagingDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;
}
