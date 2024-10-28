import {
  IsInt,
  IsString,
  IsUrl,
  IsNumber,
  Min,
  IsDateString,
  Length,
} from 'class-validator';

export class WishPartialDto {
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
}
