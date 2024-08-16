import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '../db/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ImportExcelModule } from './modules/import-excel/import-excel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(options),
    UserModule,
    ImportExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
