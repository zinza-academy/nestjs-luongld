import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from './types/mailOptions';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailerService,
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

  async register(signUpDto: SignUpDto) {
    const user = await this.userRepository.findOne({
      where: [
        { userName: signUpDto.userName },
        { citizenId: signUpDto.citizenId },
        { email: signUpDto.email },
      ],
    });
    if (user)
      throw new HttpException(
        'Số CCCD/CMT hoặc email hoặc tên người dùng đã tồn tại ',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(signUpDto.password, 10);
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({ ...signUpDto, password: hashPassword })
      .execute();
    return {
      message: 'register success',
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });
    if (!user)
      throw new HttpException(
        'Người dùng không tồn tại',
        HttpStatus.BAD_REQUEST,
      );

    const resetPasswordToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.RESET_TOKEN_SECRET,
        expiresIn: process.env.RESET_TOKEN_EXPIRE,
      },
    );

    const mailOptions: MailOptions = {
      to: forgotPasswordDto.email,
      subject: 'Đặt lại mật khẩu',
      username: user.userName,
      resetPasswordUrl: `${process.env.BASE_URL}/validate-reset-token?token=${resetPasswordToken}`,
    };
    await this.sendMailForgotPassword(mailOptions);

    return 'Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn';
  }

  async sendMailForgotPassword(mailOptions: MailOptions) {
    await this.mailService.sendMail({
      to: mailOptions.to,
      subject: mailOptions.subject,
      template: './reset-password',
      context: {
        username: mailOptions.username,
        resetPasswordUrl: mailOptions.resetPasswordUrl,
      },
    });
  }

  async validateResetPasswordToken(token: string): Promise<boolean> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.RESET_TOKEN_SECRET,
      });
      if (decoded) return true;
    } catch (error) {
      return false;
    }
  }
}
