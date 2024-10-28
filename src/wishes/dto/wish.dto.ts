// WishDto.ts
import {
  IsInt,
  IsString,
  IsUrl,
  IsNumber,
  Min,
  IsDateString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OfferDto } from 'src/offers/dto/offer.dto';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

export class WishDto {
  @IsInt()
  id: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsString()
  @Length(1, 250)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  raised: number;

  @IsInt()
  copied: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  @ValidateNested()
  @Type(() => UserPublicProfileResponseDto)
  owner: UserPublicProfileResponseDto;

  @ValidateNested({ each: true })
  @Type(() => OfferDto)
  offers: OfferDto[];
}
