import { Schema, model, Document } from 'mongoose';
import { IRenderingHours } from '../interfaces/rendering-hours.interface';

export interface IRenderingHoursDocument extends IRenderingHours, Document {}

const RenderingHoursSchema = new Schema<IRenderingHoursDocument>({
  course: { type: String, unique: true, required: true },
  required_hours: { type: Number, required: true },
});

export default model<IRenderingHoursDocument>('RenderingHours', RenderingHoursSchema);
