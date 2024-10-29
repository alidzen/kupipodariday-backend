import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), forwardRef(() => WishesModule)],
  controllers: [OffersController],
  providers: [OffersService],
  exports: [TypeOrmModule],
})
export class OffersModule {}
