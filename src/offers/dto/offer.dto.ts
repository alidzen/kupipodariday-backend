import {
  IsInt,
  IsNumber,
  IsBoolean,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';
import { WishDto } from 'src/wishes/dto/wish.dto';

export class OfferDto {
  @IsInt()
  id: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @ValidateNested()
  @Type(() => WishDto)
  item: WishDto;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
