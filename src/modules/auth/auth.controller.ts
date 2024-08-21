import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Auth } from './enum/auth.enum';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(signInDto);
    res.cookie(Auth.ACCESS_TOKEN, access_token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Auth.ACCESS_TOKEN);
    return 'logout success';
  }

  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const message = await this.authService.forgotPassword(forgotPasswordDto);
    return {
      message: message,
    };
  }
}
