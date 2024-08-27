import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from '@modules/import-excel/entities/province.entity';
import { District } from '@modules/import-excel/entities/district.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [WardsController],
  providers: [WardsService],
})
export class WardsModule {}
