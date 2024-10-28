import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.wishesService.create(userId, createWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('last')
  async findLast(): Promise<any> {
    return this.wishesService.findLast();
  }

  @UseGuards(JwtAuthGuard)
  @Get('top')
  async findTop(): Promise<any> {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<any> {
    return this.wishesService.updateOne(id, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(@Param('id') id: number): Promise<void> {
    return this.wishesService.removeOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Request() req): Promise<any> {
    const userId = req.user.id;
    return this.wishesService.copyWish(id, userId);
  }
}
