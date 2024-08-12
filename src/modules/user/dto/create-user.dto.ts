import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
