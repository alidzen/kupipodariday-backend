import { IsInt, IsString, IsUrl, IsDateString, Length } from 'class-validator';

export class UserPublicProfileResponseDto {
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

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
