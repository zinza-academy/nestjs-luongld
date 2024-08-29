import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '@modules/import-excel/entities/province.entity';
import { District } from '@modules/import-excel/entities/district.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [DistrictsController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
