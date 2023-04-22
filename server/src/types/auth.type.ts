import { Role } from 'src/schema/user.schema';

export type JwtPayload = {
  sub: string;
  email: string;
  roles: Role[];
  auth?: string;
  accessToken?: string;
  refreshToken?: string;
};
