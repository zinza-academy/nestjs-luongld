import { Province } from '@modules/import-excel/entities/province.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  async findAll(pagingDto: PagingDto) {
    const limit: number = pagingDto.limit || 10;
    const page: number = pagingDto.page || 1;
    const skip: number = limit * (page - 1);
    const [provinces, count] = await this.provinceRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return new PagingResponse(provinces, count, page, limit);
  }

  async findOne(id: number) {
    const province = await this.provinceRepository.findOne({
      where: { id: id },
    });
    if (!province) throw new NotFoundException('Không tìm thấy tỉnh!');
    return province;
  }
}
