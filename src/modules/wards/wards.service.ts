import { Ward } from '@modules/import-excel/entities/ward.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';

@Injectable()
export class WardsService {
  constructor(
    @InjectRepository(Ward)
    private wardsRepository: Repository<Ward>,
  ) {}

  async findAll(pagingDto: PagingDto) {
    const limit: number = pagingDto.limit || 10;
    const page: number = pagingDto.page || 1;
    const skip: number = limit * (page - 1);
    const [wards, count] = await this.wardsRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return new PagingResponse(wards, count, page, limit);
  }

  async findAllByDistrictId(districtId: number) {
    const [wards] = await this.wardsRepository.findAndCount({
      where: { districtId: districtId },
    });
    return wards;
  }

  async findOne(id: number) {
    const ward = await this.wardsRepository.findOne({
      where: { id: id },
    });
    if (!ward) throw new NotFoundException('Không tìm thấy huyện!');
    return ward;
  }
}
