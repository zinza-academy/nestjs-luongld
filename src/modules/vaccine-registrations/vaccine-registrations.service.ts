import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { VaccineRegistration } from './entities/vaccine-registration.entity';

@Injectable()
export class VaccineRegistrationsService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private vaccinationRegistrationService: Repository<VaccineRegistration>,
    private userService: UserService,
  ) {}
  async create(
    userId: number,
    createVaccineRegistrationDto: CreateVaccineRegistrationDto,
  ) {
    const user = await this.userService.findOneById(userId);
    await this.vaccinationRegistrationService
      .createQueryBuilder()
      .insert()
      .into(VaccineRegistration)
      .values({ ...createVaccineRegistrationDto, user: user });
    return { message: 'Tạo đăng ký tiêm thành công' };
  }

  findAll() {
    return `This action returns all vaccineRegistrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccineRegistration`;
  }

  update(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return `This action updates a #${id} vaccineRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccineRegistration`;
  }
}
