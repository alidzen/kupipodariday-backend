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

  @Get('last')
  async findLast(): Promise<any> {
    return this.wishesService.findLast();
  }

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
    @Request() req,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<any> {
    const userId = req.user.id;

    return this.wishesService.updateOne(id, userId, updateWishDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(@Request() req, @Param('id') id: number): Promise<void> {
    const userId = req.user.id;
    return this.wishesService.removeOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Request() req): Promise<any> {
    const userId = req.user.id;
    return this.wishesService.copyWish(id, userId);
  }
}
