import { UserService } from '@modules/user/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
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
      .values({ ...createVaccineRegistrationDto, user: user })
      .execute();
    return { message: 'Tạo đăng ký tiêm thành công' };
  }

  async findAllByUser(userId: number, pagingDto: PagingDto) {
    const limit = pagingDto.limit || 5;
    const page = pagingDto.page || 1;
    const skip = (page - 1) * limit;

    const [registrations, count] =
      await this.vaccinationRegistrationService.findAndCount({
        where: { id: userId },
        take: limit,
        skip: skip,
      });
    return new PagingResponse(registrations, count, page, limit);
  }

  async findAllByAdmin(pagingDto: PagingDto) {
    const limit = pagingDto.limit || 5;
    const page = pagingDto.page || 1;
    const skip = (page - 1) * limit;

    const [registrations, count] =
      await this.vaccinationRegistrationService.findAndCount({
        take: limit,
        skip: skip,
      });
    return new PagingResponse(registrations, count, page, limit);
  }

  async findOne(id: number) {
    const registration = await this.vaccinationRegistrationService.findOne({
      where: { id: id },
    });
    if (!registration)
      throw new NotFoundException('Không tìm thấy lịch đăng ký tiêm');
    return registration;
  }

  async update(
    id: number,
    updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    const registration = await this.findOne(id);
    await this.vaccinationRegistrationService
      .createQueryBuilder()
      .update(VaccineRegistration)
      .set(updateVaccineRegistrationDto)
      .where('id = :id', { id: id })
      .execute();
    return registration;
  }
}
