import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty({ message: ' không được để trống' })
  vaccinationSiteName: string;

  @IsString()
  @IsNotEmpty({ message: ' không được để trống' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: ' không được để trống' })
  provinceId: string;

  @IsString()
  @IsNotEmpty({ message: ' không được để trống' })
  districtId: string;

  @IsString()
  @IsNotEmpty({ message: ' không được để trống' })
  wardId: string;
}
