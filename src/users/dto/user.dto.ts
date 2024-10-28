import {
  IsInt,
  IsString,
  IsUrl,
  IsEmail,
  Length,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WishDto } from 'src/wishes/dto/wish.dto';
import { WishlistDto } from 'src/wishlists/dto/wish-list.dto';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 64)
  username: string;

  @IsString()
  @Length(1, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @ValidateNested({ each: true })
  @Type(() => WishDto)
  wishes: WishDto[];

  @ValidateNested({ each: true })
  @Type(() => WishDto)
  offers: WishDto[];

  @ValidateNested({ each: true })
  @Type(() => WishlistDto)
  wishlists: WishlistDto[];
}
