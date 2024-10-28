import {
  IsInt,
  IsString,
  IsUrl,
  IsDateString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';
import { WishPartialDto } from './wish-partial.dto';

export class WishlistDto {
  @IsInt()
  id: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  @IsString()
  @Length(0, 250)
  name: string;

  @IsUrl()
  image: string;

  @ValidateNested()
  @Type(() => UserPublicProfileResponseDto)
  owner: UserPublicProfileResponseDto;

  @ValidateNested({ each: true })
  @Type(() => WishPartialDto)
  items: WishPartialDto[];
}
