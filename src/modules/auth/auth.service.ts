import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    const match = await bcrypt.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(
      'Thông tin đăng nhập không chính xác!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(user: any) {
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
