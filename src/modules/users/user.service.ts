import { DistrictsService } from '@modules/districts/districts.service';
import { ProvincesService } from '@modules/provinces/provinces.service';
import { WardsService } from '@modules/wards/wards.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PagingResponse } from 'src/common/type/pagingResponse.class';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PagingUserDto } from './dto/paging-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private provincesService: ProvincesService,
    private districtsService: DistrictsService,
    private wardsService: WardsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { userName: createUserDto.userName },
    });
    if (user) throw new HttpException('Tên người dùng đã tồn tại', 400);
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const province = await this.provincesService.findOne(
      createUserDto.provinceId,
    );
    const district = await this.districtsService.findOne(
      createUserDto.districtId,
    );
    const ward = await this.wardsService.findOne(createUserDto.wardId);

    await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        ...createUserDto,
        password: hashPassword,
        province,
        district,
        ward,
      })
      .execute();
    return { message: 'create user success!' };
  }

  async findAll(query: PagingUserDto) {
    const limit: number = +query.limit || 5;
    const page: number = +query.page || 1;
    const skip: number = limit * (page - 1);
    const [users, count] = await this.usersRepository.findAndCount({
      relations: ['province', 'district', 'ward'],
      skip: skip,
      take: limit,
    });
    return new PagingResponse(users, count, page, limit);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['province', 'district', 'ward'],
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    return user;
  }

  async findOneByName(userName: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { userName: userName },
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) throw new HttpException('Email không tồn tại', 400);
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateUserDto })
      .where('id = :id', { id: id })
      .execute();

    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneById(id);
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: id })
      .execute();
    return user;
  }
}
