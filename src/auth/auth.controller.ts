import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto): Promise<any> {
    const token = await this.authService.signin(signinUserDto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return token;
  }
}
