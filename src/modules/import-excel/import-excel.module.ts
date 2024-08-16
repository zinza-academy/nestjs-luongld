import { Module } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { ImportExcelController } from './import-excel.controller';
import { importExcelCommands } from './commands';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entities/province.entity';
import { District } from './entities/district.entity';
import { Ward } from './entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [ImportExcelController],
  providers: [ImportExcelService, ...importExcelCommands],
  exports: [...importExcelCommands],
})
export class ImportExcelModule {}
