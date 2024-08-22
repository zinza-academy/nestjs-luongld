import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@src/common/decorator/roles.decorator';
import { Role } from '@src/common/enum/role.enum';
import { PagingVaccinationSiteDto } from './dto/paging-vaccination-site.dto';
import { VaccinationSitesService } from './vaccination-sites.service';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(
    private readonly vaccinationSitesService: VaccinationSitesService,
  ) {}

  @Get()
  findAll(@Query() pagingVaccinationSiteDto: PagingVaccinationSiteDto) {
    return this.vaccinationSitesService.findAll(pagingVaccinationSiteDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccinationSitesService.findOneById(id);
  }

  // @Post()
  // create(@Body() createVaccinationSiteDto: CreateVaccinationSiteDto) {
  //   return this.vaccinationSitesService.create(createVaccinationSiteDto);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateVaccinationSiteDto: UpdateVaccinationSiteDto,
  // ) {
  //   return this.vaccinationSitesService.update(+id, updateVaccinationSiteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vaccinationSitesService.remove(+id);
  // }
}
