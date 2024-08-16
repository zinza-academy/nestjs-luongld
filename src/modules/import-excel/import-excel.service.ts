import { Injectable } from '@nestjs/common';
import { ProvinceType } from './types/province.type';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { Ward } from './entities/ward.entity';
import { DistrictType } from './types/district.type';
import { WardType } from './types/ward.type';

@Injectable()
export class ImportExcelService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
  ) {}

  async importProvince(provinceImportData: ProvinceType[]) {
    const dataSize = provinceImportData.length;
    const pagingSize = 1000;
    for (let i = 0; i < dataSize; i += pagingSize) {
      const data = provinceImportData.slice(i, i + pagingSize);

      await this.provinceRepository.insert(data);
    }
    console.log('Import province success!');
  }

  async importDistrict(districtImportData: DistrictType[]) {
    const dataSize = districtImportData.length;
    const pagingSize = 1000;

    for (let i = 0; i < dataSize; i += pagingSize) {
      const data = districtImportData.slice(i, i + pagingSize);
      const districtInsert = data.map(async (district) => {
        const province = await this.provinceRepository.findOne({
          where: { id: district.provinceId },
        });
        return {
          ...district,
          province,
        };
      });
      await this.districtRepository.insert(await Promise.all(districtInsert));
    }
    console.log('Import district success!');
  }

  async importWard(wardImportData: WardType[]) {
    const dataSize = wardImportData.length;
    const pagingSize = 1000;

    for (let i = 0; i < dataSize; i += pagingSize) {
      const data = wardImportData.slice(i, i + pagingSize);
      const wardInsert = data.map(async (ward) => {
        const province = await this.provinceRepository.findOne({
          where: { id: ward.provinceId },
        });
        const district = await this.districtRepository.findOne({
          where: { id: ward.districtId },
        });
        return {
          ...ward,
          province,
          district,
        };
      });

      await this.wardRepository.insert(await Promise.all(wardInsert));
    }
    console.log('Import ward success!');
  }

  async findAllProvince() {
    const province = await this.provinceRepository.find();
    return province;
  }
}
