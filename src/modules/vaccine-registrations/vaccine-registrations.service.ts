import { UserService } from '@modules/user/user.service';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { VaccineRegistration } from './entities/vaccine-registration.entity';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';

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
