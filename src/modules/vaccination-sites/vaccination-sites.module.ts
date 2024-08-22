import { Module } from '@nestjs/common';
import { VaccinationSitesService } from './vaccination-sites.service';
import { VaccinationSitesController } from './vaccination-sites.controller';

@Module({
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService],
})
export class VaccinationSitesModule {}
