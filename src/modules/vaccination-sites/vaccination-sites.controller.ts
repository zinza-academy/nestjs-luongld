import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  // @Post()
  // create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
  //   return this.vaccinationSitesService.create(createVaccinationSiteDto);
  // }

  @Get()
  findAll(@Query() pagingVaccinationSiteDto: PagingVaccinationSiteDto) {
    return this.vaccinationSitesService.findAll(pagingVaccinationSiteDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.findOneById(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  // ) {
  //   return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vaccinationSitesService.remove(+id);
  // }
}
