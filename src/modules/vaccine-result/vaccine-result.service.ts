import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaccineResultDto } from './dto/create-vaccine-result.dto';
import { VaccineResult } from './entities/vaccine-result.entity';
import { VaccineRegistrationsService } from '@modules/vaccine-registrations/vaccine-registrations.service';
import { VaccinationSitesService } from '@modules/vaccination-sites/vaccination-sites.service';
import { VaccineService } from '@modules/vaccines/vaccine.service';
import { PagingDto } from '@src/common/dto/paging.dto';
import { PagingResponse } from '@src/common/type/pagingResponse.class';

@Injectable()
export class VaccineResultService {
  constructor(
    @InjectRepository(VaccineResult)
    private vaccineResultRepository: Repository<VaccineResult>,
    private vaccineRegistrationsService: VaccineRegistrationsService,
    private vaccinationSitesService: VaccinationSitesService,
    private vaccine: VaccineService,
  ) {}
  async create(createVaccineResultDto: CreateVaccineResultDto) {
    const vaccineRegistration = await this.vaccineRegistrationsService.findOne(
      createVaccineResultDto.vaccineRegistrationId,
    );
    const vaccinationSite = await this.vaccinationSitesService.findOneById(
      createVaccineResultDto.vaccinationSiteId,
    );

    const vaccine = await this.vaccine.findOne(
      createVaccineResultDto.vaccineId,
    );
    await this.vaccineResultRepository
      .createQueryBuilder()
      .insert()
      .into(VaccineResult)
      .values({
        ...createVaccineResultDto,
        vaccineRegistration,
        vaccinationSite,
        vaccine,
      })
      .execute();
    await this.vaccineRegistrationsService.updateVaccineResult(
      createVaccineResultDto.vaccineRegistrationId,
    );
    return {
      message: 'Thêm kết quả tiêm thành công',
    };
  }

  async findOne(id: number) {
    const vaccineResult = await this.vaccineResultRepository.findOne({
      where: { id: id },
    });
    if (!vaccineResult)
      throw new NotFoundException('Không tìm thấy kết quả tiêm!');
    return vaccineResult;
  }

  async findAll(pagingDto: PagingDto) {
    const limit = pagingDto.limit || 5;
    const page = pagingDto.page || 1;
    const skip = (page - 1) * limit;

    const [vaccineResults, count] =
      await this.vaccineResultRepository.findAndCount({
        relations: {
          vaccinationSite: true,
          vaccineRegistration: true,
          vaccine: true,
        },
        take: limit,
        skip: skip,
      });
    return new PagingResponse(vaccineResults, count, page, limit);
  }
}
