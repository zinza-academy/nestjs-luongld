import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@src/common/decorator/roles.decorator';
import { PagingDto } from '@src/common/dto/paging.dto';
import { Role } from '@src/common/enum/role.enum';
import { CreateVaccineResultDto } from './dto/create-vaccine-result.dto';
import { VaccineResultService } from './vaccine-result.service';

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

  @Get('statistics')
  getVaccineStatistics() {
    return this.vaccineResultService.getVaccineStatistics();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  findAllByUser(@Req() req, @Body() pagingDto: PagingDto) {
    const userId = req.user.id;
    return this.vaccineResultService.findAllByUser(userId, pagingDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineResultService.findOne(id);
  }
}
