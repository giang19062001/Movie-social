import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { MessageError } from 'src/helper/messageError.enum';
import { JwtPayload } from 'src/types/auth.type';
//strategy có chức năng giải nén

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AccessTokenStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'accessToken' in req.cookies) {
      console.log('req.cookies', req.cookies);
      return req.cookies.accessToken;
    }
    return null;
  }
  async validate(req: Request, payload: JwtPayload) {
    const cookie = req.get('Cookie').replace('accessToken=', '').trim();
    const auth = await this.authService.getAccessToken(payload.auth);

    const accessToken = cookie.slice(0, cookie.indexOf(';')).trim();
    if (accessToken !== auth.accessToken) {
      throw new ForbiddenException(MessageError.NotEqualAccessToken);
    }
    console.log('access token guard', payload);
    return payload;
  }
}
