import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVaccineRegistrationDto {
  @IsString()
  @IsNotEmpty({ message: 'Nhóm ưu tiên không được để trống' })
  priorityGroup: string;

  @IsString()
  @IsNotEmpty({ message: 'Số thẻ BHYT không được để trống' })
  healthInsuranceCardNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Nghề nghiệp không được để trống' })
  job: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa điểm công tác không được để trống' })
  workPlace: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ hiện tại không được để trống' })
  addressCurrent: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Ngày mong muốn tiêm không được để trống' })
  desiredVaccinationDate: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Buổi tiêm không được để trống' })
  vaccinationSession: number;
}
