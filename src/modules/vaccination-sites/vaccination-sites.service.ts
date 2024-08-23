import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';
import { VaccinationSite } from './entities/vaccination-site.entity';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteService: Repository<VaccinationSite>,
  ) {}

  async findAll(pagingVaccinationSiteDto: PagingVaccinationSiteDto) {
    const page = pagingVaccinationSiteDto.page || 1;
    const limit = pagingVaccinationSiteDto.limit || 5;
    const skip = (page - 1) * limit;

    const whereOptions: any = {};
    if (pagingVaccinationSiteDto.provinceId) {
      whereOptions.provinceId = pagingVaccinationSiteDto.provinceId;
      if (pagingVaccinationSiteDto.districtId) {
        whereOptions.districtId = pagingVaccinationSiteDto.districtId;
        if (pagingVaccinationSiteDto.wardId)
          whereOptions.wardId = pagingVaccinationSiteDto.wardId;
      }
    }

    const [vaccinationSites, count] =
      await this.vaccinationSiteService.findAndCount({
        where: whereOptions,
        relations: ['province', 'district', 'ward'],
        skip: skip,
        take: limit,
      });

    return new PagingResponse(vaccinationSites, count, page, limit);
  }

  async findOneById(id: number): Promise<VaccinationSite> {
    const vaccinationSite = await this.vaccinationSiteService.findOne({
      where: {
        id: id,
      },
    });
    if (!vaccinationSite)
      throw new NotFoundException('Không tìm thấy điểm tiêm');
    return vaccinationSite;
  }

  async create(createVaccinationSiteDto: CreateVaccinationSiteDto) {
    const vaccinationSite = await this.vaccinationSiteService.findOne({
      where: {
        vaccinationSiteName: createVaccinationSiteDto.vaccinationSiteName,
      },
    });
    if (vaccinationSite)
      throw new NotFoundException('Tên điểm tiêm đã tồn tại');
    await this.vaccinationSiteService
      .createQueryBuilder()
      .insert()
      .into(VaccinationSite)
      .values(createVaccinationSiteDto)
      .execute();
    return {
      message: 'Tạo điểm tiêm vắc xin thành công',
    };
  }

  async update(id: number, updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    const vaccinationSite = await this.findOneById(id);
    await this.vaccinationSiteService
      .createQueryBuilder()
      .update(VaccinationSite)
      .set(updateVaccinationSiteDto)
      .where('id = :id', { id: id })
      .execute();

    return vaccinationSite;
  }
}
