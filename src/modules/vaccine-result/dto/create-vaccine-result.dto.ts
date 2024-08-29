import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVaccineResultDto {
  @IsNumber()
  @IsNotEmpty()
  vaccineRegistrationId: number;

  @IsNumber()
  @IsNotEmpty()
  vaccineId: number;

  @IsNumber()
  @IsNotEmpty()
  vaccinationSiteId: number;
}
