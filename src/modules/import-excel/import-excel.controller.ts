import { Controller, Get } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';

@Controller('import-excel')
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) {}

  @Get()
  async findAll() {
    return await this.importExcelService.findAllProvince();
  }
}
