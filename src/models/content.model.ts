import { Schema, model, Document } from 'mongoose';
import { IContent } from '../interfaces/content.interface';

export interface IContentDocument extends IContent, Document {}

const ContentSchema = new Schema<IContentDocument>({
  nameOfContent: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  uploadDate: { type: Date, default: Date.now },
});

export default model<IContentDocument>('Content', ContentSchema);
