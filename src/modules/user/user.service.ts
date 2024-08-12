import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id: id })
      .execute();

    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new HttpException('Người dùng không tồn tại', 400);
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: id })
      .execute();

    return user;
  }
}
