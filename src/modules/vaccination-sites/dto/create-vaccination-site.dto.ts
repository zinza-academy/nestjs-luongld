import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVaccinationSiteDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên điểm tiêm không được để trống' })
  vaccinationSiteName: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Tỉnh/thành không được để trống' })
  provinceId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Quận/huyện không được để trống' })
  districtId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Phường/xã không được để trống' })
  wardId: number;

  @IsString()
  @IsNotEmpty({ message: 'Tên người đúng đầu cơ sở không được để trống' })
  vaccinationSiteLeader: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Số lượng bàn tiêm không được để trống' })
  quantityTable: number;
}
