import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CateSchema, Category } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CateSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
