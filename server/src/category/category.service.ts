import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCateDto, UpdateCateDto } from 'src/dto/category.dto';
import { Category, categoryDocument } from 'src/schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<categoryDocument>,
  ) {}
  async findAll(): Promise<Category[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    return await this.model.findById(id).exec();
  }

  async create(createCateDto: CreateCateDto): Promise<Category> {
    return await new this.model(createCateDto).save();
  }

  async update(id: string, updateCateDto: UpdateCateDto): Promise<Category> {
    return await this.model.findByIdAndUpdate(id, updateCateDto).exec();
  }
  async updateMovieInCate(cateId: string, movieId: string) {
    const category = await this.model.findById(cateId);
    category.movie.push(movieId);
    await this.model.findByIdAndUpdate(cateId, category);
  }

  async delete(id: string): Promise<Category> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async deleteMovieInCate(cateId: string, movieId: string) {
    await this.model.updateOne({ _id: cateId }, { $pull: { movie: movieId } });
  }
}
