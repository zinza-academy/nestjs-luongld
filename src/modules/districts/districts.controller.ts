import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { PagingDto } from '@src/common/dto/paging.dto';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}
  @Get()
  findAll(@Query() pagingDto: PagingDto) {
    return this.districtsService.findAll(pagingDto);
  }

  @Get(':id/province')
  findAllByProvinceId(@Param('id', ParseIntPipe) provinceId: number) {
    return this.districtsService.findAllByProvinceId(provinceId);
  }
}
