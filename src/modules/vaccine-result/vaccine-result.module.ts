import { VaccinationSitesModule } from '@modules/vaccination-sites/vaccination-sites.module';
import { VaccineRegistrationsModule } from '@modules/vaccine-registrations/vaccine-registrations.module';
import { VaccineModule } from '@modules/vaccines/vaccine.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineResult } from './entities/vaccine-result.entity';
import { VaccineResultController } from './vaccine-result.controller';
import { VaccineResultService } from './vaccine-result.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccineResult]),
    VaccineRegistrationsModule,
    VaccinationSitesModule,
    VaccineModule,
  ],
  controllers: [VaccineResultController],
  providers: [VaccineResultService],
})
export class VaccineResultModule {}
