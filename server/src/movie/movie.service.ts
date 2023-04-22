import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, movieDocument } from 'src/schema/movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto, UpdateMovieDto } from 'src/dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly model: Model<movieDocument>,
  ) {}

  async findPathId(): Promise<Movie[]> {
    return await this.model.find({}, { _id: 1 }).exec();
  }
  async findAll(): Promise<Movie[]> {
    return await this.model
      .find()
      .populate('user', { name: 1, image: 1 })
      .populate('category', { title: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Movie> {
    return await this.model
      .findById(id)
      .populate('user', { name: 1, image: 1 })
      .populate('category', { title: 1 })
      .exec();
  }
  async findByUser(user: string): Promise<Movie[]> {
    return await this.model
      .find({ user: user })
      .populate('user', { name: 1, image: 1 })
      .populate('category', { title: 1 })
      .exec();
  }

  async search(title: string): Promise<Movie[]> {
    return await this.model
      .find({ title: { $regex: '.*' + title + '.*', $options: 'i' } })
      .populate('user', { name: 1, image: 1 })
      .populate('category', { title: 1 })
      .exec();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return await new this.model(createMovieDto).save();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return await this.model.findByIdAndUpdate(id, updateMovieDto).exec();
  }

  async delete(id: string): Promise<Movie> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
