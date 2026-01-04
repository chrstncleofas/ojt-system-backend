import { Schema, model, Document, Types } from 'mongoose';
import { IGrade } from '../interfaces/grade.interface';

export interface IGradeDocument extends Omit<IGrade, 'student'>, Document {
  student: Types.ObjectId;
}

const GradeSchema = new Schema<IGradeDocument>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    evaluation: { type: Number },
    docs: { type: Number },
    oral_interview: { type: Number },
    final_grade: { type: Number },
    status: { type: String, default: 'No Remarks' },
  },
  { timestamps: true }
);

export default model<IGradeDocument>('Grade', GradeSchema);
