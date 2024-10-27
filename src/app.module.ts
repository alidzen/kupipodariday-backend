import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { WishesController } from './wishes/wishes.controller';
import { WishlistsController } from './wishlists/wishlists.controller';
import { OffersController } from './offers/offers.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [],
      migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      synchronize: true, // TRUE - dev mode only
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],

  controllers: [
    AppController,
    UsersController,
    WishesController,
    WishlistsController,
    OffersController,
  ],
  providers: [UsersService],
})
export class AppModule {}
