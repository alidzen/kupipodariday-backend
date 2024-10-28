import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async findOwn(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.usersService.findOne({ id: userId });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  async update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.usersService.updateOne(userId, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me/wishes')
  async getOwnWishes(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.usersService.getWishesByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<any> {
    return this.usersService.findOneByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username/wishes')
  async getWishes(@Param('username') username: string): Promise<any> {
    return this.usersService.getWishesByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('find')
  async findMany(@Body() findUsersDto: FindUsersDto): Promise<any> {
    return this.usersService.findMany(findUsersDto.query);
  }
}
