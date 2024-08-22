import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Password không được để trống' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  newPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Token không được để trống' })
  token: string;
}
