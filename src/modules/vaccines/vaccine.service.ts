import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { Vaccine } from './entities/vaccine.entity';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private vaccinationService: Repository<Vaccine>,
  ) {}
  async create(createVaccineDto: CreateVaccineDto) {
    const vaccine = await this.vaccinationService.findOne({
      where: { vaccineName: createVaccineDto.vaccineName },
    });
    if (vaccine) throw new NotFoundException('Vaccine đã tồn tại!');
    await this.vaccinationService
      .createQueryBuilder()
      .insert()
      .into(Vaccine)
      .values(createVaccineDto)
      .execute();
    return {
      message: 'Tạo vaccine thành công!',
    };
  }
  async findOne(id: number) {
    const vaccine = await this.vaccinationService.findOne({
      where: { id: id },
    });
    if (!vaccine) throw new NotFoundException('Vaccine không tìm thấy');
    return vaccine;
  }

  async findAll(pagingDto: PagingDto) {
    const limit = pagingDto.limit || 10;
    const page = pagingDto.page || 1;
    const skip = (page - 1) * limit;

    const [vaccines, count] = await this.vaccinationService.findAndCount({
      take: limit,
      skip: skip,
    });
    return new PagingResponse(vaccines, count, page, limit);
  }
}
