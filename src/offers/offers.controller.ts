import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // GET /offers - Retrieve all offers
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<any> {
    return this.offersService.findAll();
  }

  // POST /offers - Create a new offer
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<any> {
    const userId = req.user.id;
    return this.offersService.create(userId, createOfferDto);
  }

  // GET /offers/:id - Retrieve a specific offer by ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.offersService.findOne(id);
  }
}
