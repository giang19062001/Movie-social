import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  image: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  })
  movie: string[];

  @Prop({
    type: [String],
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles: Role[];

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: string;

  _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
