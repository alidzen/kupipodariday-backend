import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({
      relations: ['items', 'user'],
    });
  }

  async create(
    userId: number,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create({
      ...createWishlistDto,
      user: { id: userId },
      items: createWishlistDto.itemsId.map((id) => ({ id })),
    });
    return await this.wishlistRepository.save(wishlist);
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['items', 'user'],
    });
    if (!wishlist) throw new NotFoundException('Wishlist not found');
    return wishlist;
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    // TODO: fix save wish list
    if (updateWishlistDto.itemsId) {
      // Fetch full Wish entities by itemsId using wishRepository
      const items = await this.wishRepository.findByIds(
        updateWishlistDto.itemsId,
      );

      if (items.length !== updateWishlistDto.itemsId.length) {
        throw new NotFoundException('Some wishes were not found');
      }

      wishlist.items = items; // Assign full Wish entities to items
    }
    await this.wishlistRepository.save({ ...wishlist, ...updateWishlistDto });
    return this.findOne(id);
  }

  async removeOne(id: number): Promise<void> {
    const result = await this.wishlistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Wishlist not found');
    }
  }
}
