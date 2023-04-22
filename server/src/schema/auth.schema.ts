import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type authDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: false })
  accessToken: string;

  @Prop({ required: false })
  refreshToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  _id: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
