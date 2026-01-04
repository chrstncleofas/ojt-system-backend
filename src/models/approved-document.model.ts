import { Schema, model, Document, Types } from 'mongoose';

export interface IApprovedDocument {
  nameOfDocs: string;
  student: string;
  approved_file: string;
  approved_date: Date;
  score?: number;
}

export interface IApprovedDocumentDocument extends Omit<IApprovedDocument, 'student'>, Document {
  student: Types.ObjectId;
}

const ApprovedDocumentSchema = new Schema<IApprovedDocumentDocument>({
  nameOfDocs: { type: String, required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  approved_file: { type: String, required: true },
  approved_date: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
});

export default model<IApprovedDocumentDocument>('ApprovedDocument', ApprovedDocumentSchema);
