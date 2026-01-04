import { Schema, model, Document, Types } from 'mongoose';
import { ISubmittedRequirement } from '../interfaces/submitted-requirement.interface';

export interface ISubmittedRequirementDocument
  extends Omit<ISubmittedRequirement, 'student'>,
    Document {
  student: Types.ObjectId;
}

const SubmittedRequirementSchema = new Schema<ISubmittedRequirementDocument>({
  nameOfDocs: { type: String, required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  submitted_file: { type: String, required: true },
  submission_date: { type: Date, default: Date.now },
  due_date: { type: Date, default: Date.now },
});

export default model<ISubmittedRequirementDocument>(
  'SubmittedRequirement',
  SubmittedRequirementSchema
);
