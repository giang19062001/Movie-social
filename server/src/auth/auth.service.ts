import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { CreateAuthDto, LoginAuthDto, UpdateAuthDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role, User } from 'src/schema/user.schema';
import { MessageError } from 'src/helper/messageError.enum';
import { MessageSuccess } from 'src/helper/messageSuccess.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, authDocument } from 'src/schema/auth.schema';
import { JwtPayload } from 'src/types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly model: Model<authDocument>,
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException(MessageError.ExistedUser);
    }

    const passwordHash = await bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: passwordHash,
    });
    const auth = await this.createAuth({
      accessToken: '',
      refreshToken: '',
      user: newUser._id,
    });
    const user = await this.usersService.updateAuth(newUser._id, auth._id);
    return user;
  }

  async signIn(data: LoginAuthDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException(MessageError.NonExistedUser);
    const passwordMatches = await bcrypt.compareSync(
      data.password,
      user.password,
    );
    if (!passwordMatches)
      throw new BadRequestException(MessageError.WrongPassword);
    const tokens = await this.getTokens(
      user._id,
      user.email,
      user.roles,
      user.auth,
    );
    const updateAuthDto: UpdateAuthDto = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    await this.updateRefreshToken(user, updateAuthDto);
    const dataUser = { user: user, tokens: tokens };
    return dataUser;
  }

  async logout(user: JwtPayload) {
    await this.model
      .findByIdAndUpdate(user.auth, {
        accessToken: '',
        refreshToken: '',
      })
      .exec();
  }

  async updateRefreshToken(user: User, updateAuthDto: UpdateAuthDto) {
    await this.model.findByIdAndUpdate(user.auth, updateAuthDto);
  }

  async getAccessToken(id: string) {
    return await this.model.findById(id, { accessToken: 1 }).exec();
  }

  async getTokens(userId: string, email: string, roles: Role[], auth: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          roles: roles,
          auth: auth,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '10h',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email: email, roles: roles, auth: auth },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    const auth = await this.model.findById(user.auth);
    if (!user || !auth.refreshToken)
      throw new ForbiddenException(MessageError.NonRefreshToken);
    if (auth.refreshToken !== refreshToken)
      throw new ForbiddenException(MessageError.NotEqualRefreshToken);
    const tokens = await this.getTokens(
      user._id,
      user.email,
      user.roles,
      user.auth,
    );
    const updateAuthDto: UpdateAuthDto = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    await this.updateRefreshToken(user, updateAuthDto);
    return tokens;
  }
  async createAuth(createAuthDto: CreateAuthDto) {
    const createdUser = await new this.model(createAuthDto);
    return createdUser.save();
  }
}
