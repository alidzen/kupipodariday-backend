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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<any> {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.wishlistsService.create(userId, createWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.wishlistsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.wishlistsService.updateOne(id, userId, updateWishlistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(@Request() req, @Param('id') id: number): Promise<void> {
    const userId = req.user.id;
    return this.wishlistsService.removeOne(id, userId);
  }
}
