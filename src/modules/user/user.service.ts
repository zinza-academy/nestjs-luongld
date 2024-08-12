import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PagingUserDto } from './dto/paging-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PagingResponse } from 'src/common/type/pagingResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { userName: createUserDto.userName },
    });
    if (user) throw new HttpException('Tên người dùng đã tồn tại', 400);
    await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
    return user;
  }

  async findAll(query: PagingUserDto) {
    const limit: number = +query.limit || 5;
    const page: number = +query.page || 1;
    const skip: number = limit * (page - 1);
    const [users, count] = await this.usersRepository.findAndCount({
      skip: skip,
      take: limit,
    });
    return new PagingResponse(users, count, page, limit);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
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
