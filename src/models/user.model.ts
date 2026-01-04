import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    position: { type: String, default: 'Coordinator' },
    reset_token: { type: String, default: null },
  },
  { timestamps: true }
);

export default model<IUserDocument>('User', UserSchema);
