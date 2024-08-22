import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  @Post()
  create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @Get()
  findAll() {
    return this.vaccinationSitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationSitesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationSitesService.remove(+id);
  }
}
