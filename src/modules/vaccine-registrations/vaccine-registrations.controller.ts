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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@src/common/decorator/roles.decorator';
import { PagingDto } from '@src/common/dto/paging.dto';
import { Role } from '@src/common/enum/role.enum';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { VaccineRegistrationsService } from './vaccine-registrations.service';

@Controller('vaccine-registrations')
export class VaccineRegistrationsController {
  constructor(
    private readonly vaccineRegistrationsService: VaccineRegistrationsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createVaccineRegistrationDto: CreateVaccineRegistrationDto,
    @Req() req,
  ) {
    const userId: number = req.user.id;
    return this.vaccineRegistrationsService.create(
      userId,
      createVaccineRegistrationDto,
    );
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  findAllByUser(@Query() pagingDto: PagingDto, @Req() req) {
    const userId: number = req.user.id;
    return this.vaccineRegistrationsService.findAllByUser(userId, pagingDto);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAllByAdmin(@Query() pagingDto: PagingDto) {
    return this.vaccineRegistrationsService.findAllByAdmin(pagingDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineRegistrationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return this.vaccineRegistrationsService.update(
      id,
      updateVaccineRegistrationDto,
    );
  }
}
