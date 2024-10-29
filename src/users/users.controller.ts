import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOwn(@Request() req): Promise<Omit<User, 'password'>> {
    const userId = req.user.id;
    const user = await this.usersService.findOne({ id: userId });
    const { password: _, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const userId = req.user.id;
    const user = await this.usersService.updateOne(userId, updateUserDto);
    const { password: _, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  async getOwnWishes(@Request() req): Promise<any> {
    const userId = req.user.id;
    const wishes = await this.usersService.getWishesByUserId(userId);
    return wishes;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const { password: _, email: _email, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  async getWishes(@Param('username') username: string): Promise<any> {
    return this.usersService.getWishesByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto): Promise<any> {
    return this.usersService.findMany(findUsersDto.query);
  }
}
