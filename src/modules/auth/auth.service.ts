import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOneByName(signInDto.userName);

    const match = await bcrypt.compare(signInDto.password, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(
      'Thông tin đăng nhập không chính xác!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto);
    const payload = { id: user.id, username: user.userName };
    const jwtOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      secret: process.env.ACCESS_TOKEN_SECRET,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, jwtOptions),
    };
  }
}
