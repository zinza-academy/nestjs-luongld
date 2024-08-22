import { Injectable } from '@nestjs/common';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';

@Injectable()
export class VaccinationSitesService {
  create(createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return 'This action adds a new vaccinationSite';
  }

  findAll() {
    return `This action returns all vaccinationSites`;
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
