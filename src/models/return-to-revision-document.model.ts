import { Schema, model, Document, Types } from 'mongoose';

export interface IReturnToRevisionDocument {
  nameOfDocs: string;
  student: string;
  revision_file: string;
  return_date: Date;
  revision_reason: string;
}

export interface IReturnToRevisionDocumentDocument
  extends Omit<IReturnToRevisionDocument, 'student'>,
    Document {
  student: Types.ObjectId;
}

const ReturnToRevisionDocumentSchema = new Schema<IReturnToRevisionDocumentDocument>({
  nameOfDocs: { type: String, required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  revision_file: { type: String, required: true },
  return_date: { type: Date, default: Date.now },
  revision_reason: { type: String, required: true },
});

export default model<IReturnToRevisionDocumentDocument>(
  'ReturnToRevisionDocument',
  ReturnToRevisionDocumentSchema
);
