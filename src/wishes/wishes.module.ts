import { Module } from '@nestjs/common';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from 'src/offers/offers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), OffersModule],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService, TypeOrmModule],
})
export class WishesModule {}
