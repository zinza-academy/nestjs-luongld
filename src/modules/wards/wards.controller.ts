import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WardsService } from './wards.service';
import { PagingDto } from '@src/common/dto/paging.dto';

@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}
  @Get()
  findAll(@Query() pagingDto: PagingDto) {
    return this.wardsService.findAll(pagingDto);
  }

  @Get(':id/district')
  findAllByDistrictId(@Param('id', ParseIntPipe) id: number) {
    return this.wardsService.findAllByDistrictId(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wardsService.findOne(id);
  }
}
