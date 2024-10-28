import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(createOfferDto: CreateOfferDto, userId: number): Promise<Offer> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: userId },
    });
    const wish = await this.wishesRepository.findOneOrFail({
      where: { id: createOfferDto.itemId },
    });

    const offer = this.offersRepository.create({
      ...createOfferDto,
      user: user,
      item: wish,
    });

    return this.offersRepository.save(offer);
  }

  findAll(): Promise<Offer[]> {
    return this.offersRepository.find({
      relations: { user: true, item: true },
    });
  }

  findOne(id: number): Promise<Offer> {
    return this.offersRepository.findOneBy({
      id: id,
    });
  }

  async update(
    id: number,
    updateOfferDto: Partial<CreateOfferDto>,
  ): Promise<Offer> {
    await this.offersRepository.update(id, updateOfferDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.offersRepository.delete(id);
  }
}
