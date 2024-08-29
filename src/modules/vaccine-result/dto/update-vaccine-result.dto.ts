import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineResultDto } from './create-vaccine-result.dto';

export class UpdateVaccineResultDto extends PartialType(
  CreateVaccineResultDto,
) {}
