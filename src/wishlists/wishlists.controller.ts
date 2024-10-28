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
import { AuthGuard } from '@nestjs/passport';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<any> {
    return this.wishlistsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.wishlistsService.create(userId, createWishlistDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.wishlistsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<any> {
    return this.wishlistsService.updateOne(id, updateWishlistDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async removeOne(@Param('id') id: number): Promise<void> {
    return this.wishlistsService.removeOne(id);
  }
}
