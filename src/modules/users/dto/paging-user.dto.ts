import { IsNotEmpty } from 'class-validator';

export class PagingUserDto {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  page: number;
}
