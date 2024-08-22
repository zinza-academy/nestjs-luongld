import { Injectable } from '@nestjs/common';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinationSite } from './entities/vaccination-site.entity';
import { Repository } from 'typeorm';
import { PagingResponse } from '@src/common/type/pagingResponse.class';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSite)
    private vaccinationSiteService: Repository<VaccinationSite>,
  ) {}

  create(createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return 'This action adds a new vaccinationSite';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} vaccinationSite`;
  }

  update(id: number, updateVaccinationSiteDto: UpdateVaccinationSiteDto) {
    return `This action updates a #${id} vaccinationSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} vaccinationSite`;
  }
}
