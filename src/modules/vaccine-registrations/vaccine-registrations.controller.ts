import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration.dto';
import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration.dto';
import { VaccineRegistrationsService } from './vaccine-registrations.service';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import { Roles } from '@src/common/decorator/roles.decorator';
import { Role } from '@src/common/enum/role.enum';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccineRegistrationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccineRegistrationDto: UpdateVaccineRegistrationDto,
  ) {
    return this.vaccineRegistrationsService.update(
      +id,
      updateVaccineRegistrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccineRegistrationsService.remove(+id);
  }
}
