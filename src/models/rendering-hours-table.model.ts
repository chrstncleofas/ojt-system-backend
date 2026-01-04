import { Schema, model, Document } from 'mongoose';

export interface IRenderingHoursTable {
  course: string;
  required_hours: number;
}

export interface IRenderingHoursTableDocument extends IRenderingHoursTable, Document {}

const RenderingHoursTableSchema = new Schema<IRenderingHoursTableDocument>({
  course: { type: String, required: true, unique: true },
  required_hours: { type: Number, required: true },
});

export default model<IRenderingHoursTableDocument>(
  'RenderingHoursTable',
  RenderingHoursTableSchema
);
