import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  Req,
  Put,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/user.dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import RoleGuard from 'src/auth/guard/authorization.guard';
import { Role } from 'src/schema/user.schema';
import { JwtPayload } from 'src/types/auth.type';
import { MessageError } from 'src/helper/messageError.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@ApiCookieAuth()
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(AccessTokenGuard)
  async index() {
    return await this.service.findAll();
  }
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user: JwtPayload = req['user'];
    if (user.sub !== id) {
      throw new ForbiddenException(MessageError.NotEqualAccessToken);
    }
    const userById = await this.findById(id);
    if (!file) {
      return await this.service.update(id, {
        ...updateUserDto,
        image: userById.image,
      });
    } else {
      return await this.service.update(id, {
        ...updateUserDto,
        image: file.filename,
      });
    }
  }
}
