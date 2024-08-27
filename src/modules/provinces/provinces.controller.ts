import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PagingDto } from '@src/common/dto/paging.dto';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Get()
  findAll(@Query() pagingDto: PagingDto) {
    return this.provincesService.findAll(pagingDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.provincesService.findOne(id);
  }
}
