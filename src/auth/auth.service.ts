import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const existingUser = await this.usersService.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return { id: user.id, username: user.username, email: user.email };
  }

  async signin(
    signinUserDto: SigninUserDto,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(signinUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(
    signinUserDto: SigninUserDto,
  ): Promise<User | null> {
    const user = await this.usersService.findOne({
      username: signinUserDto.username,
    });
    if (user && (await bcrypt.compare(signinUserDto.password, user.password))) {
      return user;
    }
    return null;
  }
}
