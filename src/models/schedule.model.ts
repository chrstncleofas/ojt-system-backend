import { Schema, model, Document, Types } from 'mongoose';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface ISchedule {
  student: string;
  day: DayOfWeek;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface IScheduleDocument extends Omit<ISchedule, 'student'>, Document {
  student: Types.ObjectId;
}

const ScheduleSchema = new Schema<IScheduleDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export default model<IScheduleDocument>('Schedule', ScheduleSchema);
