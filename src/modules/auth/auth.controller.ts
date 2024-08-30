import { UpdatePasswordDto } from '@modules/users/dto/update-password.dto';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
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
    const { access_token, user } = await this.authService.login(signInDto);
    res.cookie(Auth.ACCESS_TOKEN, access_token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    return { access_token, user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(Auth.ACCESS_TOKEN);
    return { message: 'logout success' };
  }

  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const message = await this.authService.forgotPassword(forgotPasswordDto);
    return {
      message,
    };
  }

  @Get('validate-reset-token')
  async validateResetPasswordToken(@Body('token') token: string) {
    return this.authService.validateResetPasswordToken(token);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() req) {
    const userId: number = req.user.id;
    return this.authService.updatePassword(userId, updatePasswordDto);
  }
}
