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
import { AuthGuard } from '@nestjs/passport';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // POST /wishes - Create a new wish
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createWishDto: CreateWishDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.wishesService.create(userId, createWishDto);
  }

  // GET /wishes/last - Retrieve the latest wishes
  @UseGuards(AuthGuard('jwt'))
  @Get('last')
  async findLast(): Promise<any> {
    return this.wishesService.findLast();
  }

  // GET /wishes/top - Retrieve the top wishes
  @UseGuards(AuthGuard('jwt'))
  @Get('top')
  async findTop(): Promise<any> {
    return this.wishesService.findTop();
  }

  // GET /wishes/:id - Retrieve a wish by ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.wishesService.findOne(id);
  }

  // PATCH /wishes/:id - Update a wish by ID
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<any> {
    return this.wishesService.updateOne(id, updateWishDto);
  }

  // DELETE /wishes/:id - Remove a wish by ID
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async removeOne(@Param('id') id: number): Promise<void> {
    return this.wishesService.removeOne(id);
  }

  // POST /wishes/:id/copy - Copy a wish by ID
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Request() req): Promise<any> {
    const userId = req.user.id;
    return this.wishesService.copyWish(id, userId);
  }
}
