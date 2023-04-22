import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/schema/movie.schema';

export class CreateCateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateCateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  movie: string[];
}
