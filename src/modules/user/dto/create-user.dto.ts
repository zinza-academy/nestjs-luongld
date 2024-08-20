import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MaxLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Tuổi không được để trống' })
  age: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
