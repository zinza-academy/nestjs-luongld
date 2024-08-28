import { Module } from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { VaccinationSitesController } from './vaccination-sites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationSite } from './entities/vaccination-site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationSite])],
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService],
  exports: [VaccinationSitesService],
})
export class VaccinationSitesModule {}
