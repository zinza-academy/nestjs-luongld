import { IsNotEmpty, IsNumber } from 'class-validator';

export class PagingVaccinationSiteDto {
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  page: number;
}
