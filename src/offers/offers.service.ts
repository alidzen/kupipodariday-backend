import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async findAll(): Promise<Offer[]> {
    return await this.offerRepository.find({
      relations: ['user', 'item'],
    });
  }

  async create(userId: number, createOfferDto: CreateOfferDto): Promise<Offer> {
    const wish = await this.wishRepository.findOne({
      where: { id: createOfferDto.itemId },
    });
    if (!wish) throw new NotFoundException('Wish not found');

    if (wish.owner.id === userId) {
      throw new ForbiddenException('You cannot contribute to your own wish.');
    }

    const newTotal = wish.raised + createOfferDto.amount;
    if (newTotal > wish.price) {
      throw new ForbiddenException(
        `Your contribution exceeds the remaining amount required. Maximum allowable contribution: ${
          wish.price - wish.raised
        }.`,
      );
    }
    const offer = this.offerRepository.create({
      ...createOfferDto,
      user: { id: userId },
      item: wish,
    });

    const savedOffer = await this.offerRepository.save(offer);
    wish.raised += createOfferDto.amount;
    await this.wishRepository.save(wish);

    return savedOffer;
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });
    if (!offer) throw new NotFoundException('Offer not found');
    return offer;
  }
}
