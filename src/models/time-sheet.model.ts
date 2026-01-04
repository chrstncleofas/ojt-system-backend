import { Schema, model, Document, Types } from 'mongoose';

export interface ITimeSheet {
  student: string;
  week_start_date: Date;
  score?: number;
  submitted_file: string;
}

export interface ITimeSheetDocument extends Omit<ITimeSheet, 'student'>, Document {
  student: Types.ObjectId;
}

const TimeSheetSchema = new Schema<ITimeSheetDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  week_start_date: { type: Date, required: true },
  score: { type: Number, default: 0 },
  submitted_file: { type: String, required: true },
});

export default model<ITimeSheetDocument>('TimeSheet', TimeSheetSchema);
