import { Controller } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';

@Controller('import-excel')
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) {}
}
