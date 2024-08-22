import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên điểm tiêm không được để trống' })
  vaccinationSiteName: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Tỉnh/thành không được để trống' })
  provinceId: string;

  @IsString()
  @IsNotEmpty({ message: 'Quận/huyện không được để trống' })
  districtId: string;

  @IsString()
  @IsNotEmpty({ message: 'Phường/xã không được để trống' })
  wardId: string;
}
