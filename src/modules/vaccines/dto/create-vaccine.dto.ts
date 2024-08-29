import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVaccineDto {
  @IsNotEmpty()
  @IsNumber()
  injectionNo: number;

  @IsNotEmpty()
  @IsString()
  vaccineName: string;

  @IsNotEmpty()
  @IsString()
  batchNumber: string;
}
