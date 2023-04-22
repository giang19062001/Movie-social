import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from 'src/dto/auth.dto';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { RefreshTokenGuard } from './guard/refreshToken.guard';
import { JwtPayload } from 'src/types/auth.type';
import { Response } from 'express';
import { MessageSuccess } from 'src/helper/messageSuccess.enum';

@Controller('auth')
@ApiTags('auth')
@ApiCookieAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signin(
    @Body() body: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.signIn(body);
    response.cookie('accessToken', data.tokens.accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });
    response.cookie('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });
    response.send(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(req['user']);
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    return MessageSuccess.Logout;
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const user: JwtPayload = req['user'];
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
