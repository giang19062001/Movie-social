import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<userDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.model
      .find({}, { password: 0, accessToken: 0, refreshToken: 0 })
      .exec();
  }
  async findById(id: string): Promise<User> {
    return await this.model.findById(id).populate('movie').exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.model(createUserDto);
    return createdUser.save();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  async updateAuth(id: string, auth: string) {
    return await this.model
      .findByIdAndUpdate(id, { image: '', auth: auth }, { new: true })
      .exec();
  }
  async updateRefreshToken(
    id: string,
    accessToken: string,
    refreshToken: string,
  ) {
    await this.model
      .findByIdAndUpdate(id, {
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
      .exec();
  }

  async updateMovieInUser(userId: string, movieId: string) {
    const user = await this.model.findById(userId);
    user.movie.push(movieId);
    await this.model.findByIdAndUpdate(userId, user);
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async deleteMovieInUser(userId: string, movieId: string) {
    await this.model.updateOne({ _id: userId }, { $pull: { movie: movieId } });
  }
}
