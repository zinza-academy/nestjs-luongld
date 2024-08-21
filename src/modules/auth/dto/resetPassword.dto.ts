import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Password không được để trống' })
  newPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Token không được để trống' })
  token: string;
}
