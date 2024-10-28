import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(userId: number, createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: { id: userId },
    });
    return await this.wishRepository.save(wish);
  }

  async findLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }

  async findTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { raised: 'DESC' },
      take: 10,
    });
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!wish) throw new NotFoundException('Wish not found');
    return wish;
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    const wish = await this.findOne(id);
    if (!wish) throw new NotFoundException('Wish not found');

    if (wish.offers.length > 0) {
      delete updateWishDto.price;
      delete updateWishDto.description;
    }

    await this.wishRepository.update(id, updateWishDto);
    return this.findOne(id);
  }

  async removeOne(id: number, userId: number): Promise<void> {
    const result = await this.wishRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Wish not found');
    }
  }

  async copyWish(wishId: number, userId: number): Promise<Wish> {
    const originalWish = await this.findOne(wishId);
    if (originalWish.owner.id === userId) {
      throw new ConflictException('You already have this wish');
    }
    const copiedWish = this.wishRepository.create({
      ...originalWish,
      owner: { id: userId },
      raised: 0,
      copied: originalWish.copied + 1,
    });
    return await this.wishRepository.save(copiedWish);
  }
}
