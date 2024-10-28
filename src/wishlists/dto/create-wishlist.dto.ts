import { IsString, IsUrl, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  name: string;

  @IsUrl()
  image: string;

  @IsArray()
  @ArrayNotEmpty()
  itemsId: number[];
}
