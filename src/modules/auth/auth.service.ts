import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(userName: string, pass: string) {
    const user = await this.userService.findOneByName(userName);
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.userName };

    const jwtOptions = {
      expiresIn: '30m',
      secret: process.env.SECRET_KEY,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, jwtOptions),
    };
  }
}
