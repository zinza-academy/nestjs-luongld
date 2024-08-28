import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateVaccineResultDto } from './dto/create-vaccine-result.dto';
import { VaccineResultService } from './vaccine-result.service';
import { PagingDto } from '@src/common/dto/paging.dto';

@Controller('vaccine-result')
export class VaccineResultController {
  constructor(private readonly vaccineResultService: VaccineResultService) {}

  @Post()
  create(@Body() createVaccineResultDto: CreateVaccineResultDto) {
    return this.vaccineResultService.create(createVaccineResultDto);
  }

  @Get()
  findAll(@Body() pagingDto: PagingDto) {
    return this.vaccineResultService.findAll(pagingDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineResultService.findOne(id);
  }
}
