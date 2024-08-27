import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '../db/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { ImportExcelModule } from './modules/import-excel/import-excel.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { VaccinationSitesModule } from './modules/vaccination-sites/vaccination-sites.module';
import { VaccineRegistrationsModule } from './modules/vaccine-registrations/vaccine-registrations.module';
import { VaccineModule } from './modules/vaccines/vaccine.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { WardsModule } from './modules/wards/wards.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(options),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: `Luongld <${process.env.EMAIL_USERNAME}>`,
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    UserModule,
    ImportExcelModule,
    AuthModule,
    VaccinationSitesModule,
    VaccineRegistrationsModule,
    VaccineModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
