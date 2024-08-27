import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineRegistration } from './entities/vaccine-registration.entity';
import { VaccineRegistrationsController } from './vaccine-registrations.controller';
import { VaccineRegistrationsService } from './vaccine-registrations.service';
import { UserModule } from '@modules/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistration]), UserModule],
  controllers: [VaccineRegistrationsController],
  providers: [VaccineRegistrationsService],
})
export class VaccineRegistrationsModule {}
