import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateVaccineResultDto } from './dto/create-vaccine-result.dto';
import { VaccineResultService } from './vaccine-result.service';
import { PagingDto } from '@src/common/dto/paging.dto';
import { Roles } from '@src/common/decorator/roles.decorator';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import { Role } from '@src/common/enum/role.enum';

@Controller('vaccine-result')
export class VaccineResultController {
  constructor(private readonly vaccineResultService: VaccineResultService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createVaccineResultDto: CreateVaccineResultDto) {
    return this.vaccineResultService.create(createVaccineResultDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Body() pagingDto: PagingDto) {
    return this.vaccineResultService.findAll(pagingDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineResultService.findOne(id);
  }
}
