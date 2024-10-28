import {
  IsString,
  IsUrl,
  IsNumber,
  Min,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateWishDto {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  name?: string;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;
}
