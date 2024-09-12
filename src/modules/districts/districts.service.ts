import { District } from '@modules/import-excel/entities/district.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  async findAll(pagingDto: PagingDto) {
    const limit: number = pagingDto.limit || 10;
    const page: number = pagingDto.page || 1;
    const skip: number = limit * (page - 1);
    const [districts, count] = await this.districtRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return new PagingResponse(districts, count, page, limit);
  }

  async findAllByProvinceId(provinceId: number) {
    const district = await this.districtRepository.find({
      where: { provinceId: provinceId },
    });
    return district;
  }

  async findOne(id: number) {
    const district = await this.districtRepository.findOne({
      where: { id: id },
    });
    if (!district) throw new NotFoundException('Không tìm thấy tỉnh');
    return district;
  }
}
