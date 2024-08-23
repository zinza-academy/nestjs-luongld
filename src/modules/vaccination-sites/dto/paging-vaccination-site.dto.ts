import { IsNotEmpty } from 'class-validator';

export class PagingVaccinationSiteDto {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;

  provinceId?: number;

  districtId?: number;

  wardId?: number;
}
