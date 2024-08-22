import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PagingResponse } from '@src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';
import { VaccinationSite } from './entities/vaccination-site.entity';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteService: Repository<VaccinationSite>,
  ) {}

  async findAll(pagingVaccinationSiteDto: PagingVaccinationSiteDto) {
    const page = +pagingVaccinationSiteDto.page || 1;
    const limit = +pagingVaccinationSiteDto.limit || 5;
    const skip = (page - 1) * limit;
    const [vaccinationSites, count] =
      await this.vaccinationSiteService.findAndCount({
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

  // update(id: number, updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
  //   return `This action updates a #${id} vaccinationSite`;
  // }
}
