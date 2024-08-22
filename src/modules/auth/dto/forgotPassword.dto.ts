import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
}
