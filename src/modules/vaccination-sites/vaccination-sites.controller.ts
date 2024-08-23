import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@src/common/decorator/roles.decorator';
import { Role } from '@src/common/enum/role.enum';
import { CreateVaccinationSiteDto } from './dto/create-vaccination-site.dto';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';
import { UpdateVaccinationSiteDto } from './dto/update-vaccination-site.dto';
import { VaccinationSitesService } from './vaccination-sites.service';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
    return this.vaccinationSitesService.create(createVaccinationSiteDto);
  }

  @Post('get-all-vaccination-site')
  findAll(@Body() pagingVaccinationSiteDto: PagingVaccinationSiteDto) {
    return this.vaccinationSitesService.findAll(pagingVaccinationSiteDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  ) {
    return this.vaccinationSitesService.update(id, updateVaccinationSiteDto);
  }
}
