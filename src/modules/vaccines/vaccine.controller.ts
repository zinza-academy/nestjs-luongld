import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { VaccineService } from './vaccine.service';
import { PagingDto } from '@src/common/dto/paging.dto';

@Controller('vaccines')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccineService.create(createVaccineDto);
  }

  @Get()
  findAll(@Body() pagingDto: PagingDto) {
    return this.vaccineService.findAll(pagingDto);
  }
}
