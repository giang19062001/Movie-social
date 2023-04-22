import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type movieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  _id: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
