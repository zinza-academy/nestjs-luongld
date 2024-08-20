import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Số CMT/CCCD không được để trống' })
  @Matches(/^[0-9]{9}$|^[0-9]{12}$/, {
    message: 'Số CMT/CCCD phải có độ dài 9 hoặc 12 số',
  })
  citizenId: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Tỉnh/thành không được để trống' })
  provinceId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Quận/huyện không được để trống' })
  districtId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Phường/xã không được để trống' })
  wardId: number;
}
