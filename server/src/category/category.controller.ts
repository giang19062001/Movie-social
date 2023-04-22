import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCateDto, UpdateCateDto } from 'src/dto/category.dto';
import RoleGuard from 'src/auth/guard/authorization.guard';
import { Role } from 'src/schema/user.schema';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';

@ApiTags('category')
@ApiCookieAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}
  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(AccessTokenGuard)
  @ApiBody({
    type: CreateCateDto,
  })
  async create(@Body() createCateDto: CreateCateDto) {
    return await this.service.create(createCateDto);
  }

  @Put(':id')
  @UseGuards(RoleGuard(Role.Admin))
  @UseGuards(AccessTokenGuard)
  @ApiBody({
    type: UpdateCateDto,
  })
  async update(@Param('id') id: string, @Body() updateCateDto: UpdateCateDto) {
    return await this.service.update(id, updateCateDto);
  }
}
