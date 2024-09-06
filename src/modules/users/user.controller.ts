import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guard/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '@src/common/decorator/roles.decorator';
import { Role } from '@src/common/enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { PagingUserDto } from './dto/paging-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: PagingUserDto) {
    return this.userService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findProfileByUser(@Req() req) {
    const user = req.user;
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneByAdmin(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const isAdmin: boolean = req.user.role === Role.Admin;
    if (isAdmin) {
      return this.userService.findOneById(id);
    }
    throw new HttpException(
      'Quyền truy cập bị hạn chế',
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const userId: number = req.user.id;
    const isAdmin: boolean = req.user.role === Role.Admin;
    const isUser: boolean = req.user.role === Role.User;

    if (isAdmin || (isUser && userId === id))
      return this.userService.updateUser(id, updateUserDto);

    throw new HttpException(
      'Quyền truy cập bị hạn chế',
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
