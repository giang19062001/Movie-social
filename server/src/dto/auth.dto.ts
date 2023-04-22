import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class CreateAuthDto {
  @ApiProperty()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsString()
  refreshToken: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;
}

export class UpdateAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
