import { Province } from '@modules/import-excel/entities/province.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingDto } from '@src/common/dto/paging.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  async findAll() {
    const [provinces] = await this.provinceRepository.findAndCount({});
    return provinces;
  }

  async findOne(id: number) {
    const province = await this.provinceRepository.findOne({
      where: { id: id },
    });
    if (!province) throw new NotFoundException('Không tìm thấy tỉnh!');
    return province;
  }
}
