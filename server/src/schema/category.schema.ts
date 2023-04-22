import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type categoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  })
  movie: string[];

  _id: string;
}

export const CateSchema = SchemaFactory.createForClass(Category);
