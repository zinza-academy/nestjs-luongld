import { DistrictsService } from '@modules/districts/districts.service';
import { District } from '@modules/import-excel/entities/district.entity';
import { Province } from '@modules/import-excel/entities/province.entity';
import { Ward } from '@modules/import-excel/entities/ward.entity';
import { ProvincesService } from '@modules/provinces/provinces.service';
import { WardsService } from '@modules/wards/wards.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Province, District, Ward])],
  controllers: [UserController],
  providers: [UserService, ProvincesService, DistrictsService, WardsService],
  exports: [UserService],
})
export class UserModule {}
