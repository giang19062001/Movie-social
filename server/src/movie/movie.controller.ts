import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from 'src/dto/movie.dto';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { MessageSuccess } from 'src/helper/messageSuccess.enum';

@ApiTags('movie')
@ApiCookieAuth()
@Controller('movie')
export class MovieController {
  constructor(
    private readonly service: MovieService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}
  @Get()
  async index() {
    return await this.service.findAll();
  }
  @Get('path')
  async findPath() {
    return await this.service.findPathId();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Get('/search/:title')
  async search(@Param('title') title: string) {
    return await this.service.search(title);
  }

  @Get('/user/:user')
  async findByUser(@Param('user') user: string) {
    return await this.service.findByUser(user);
  }

  @Post()
  @ApiBody({
    type: CreateMovieDto,
  })
  @UseGuards(AccessTokenGuard)
  async create(@Body() createMovieDto: CreateMovieDto) {
    try {
      const movie = await this.service.create(createMovieDto);
      await this.userService.updateMovieInUser(
        createMovieDto.user,
        movie._id.toString(),
      );
      await this.categoryService.updateMovieInCate(
        createMovieDto.category,
        movie._id.toString(),
      );
      return MessageSuccess.AddMovie;
    } catch (error) {
      throw new BadRequestException({
        cause: error,
      });
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateMovieDto,
  })
  @UseGuards(AccessTokenGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.service.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: string) {
    const movie = await this.service.findOne(id);
    await this.service.delete(id);
    await this.categoryService.deleteMovieInCate(movie.category, id);
    await this.userService.deleteMovieInUser(movie.user, id);
    return await this.service.findAll();
  }
}
