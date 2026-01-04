import { Schema, model, Document, Types } from 'mongoose';
import { ITimeLog } from '../interfaces/time-log.interface';

export interface ITimeLogDocument extends Omit<ITimeLog, 'student'>, Document {
  student: Types.ObjectId;
}

const TimeLogSchema = new Schema<ITimeLogDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  action: { type: String, enum: ['IN', 'OUT', 'LUNCH IN', 'LUNCH OUT'], required: true },
  timestamp: { type: Date, default: Date.now },
  image: { type: String },
});

export default model<ITimeLogDocument>('TimeLog', TimeLogSchema);
