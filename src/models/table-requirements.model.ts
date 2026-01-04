import { Schema, model, Document } from 'mongoose';

export interface ITableRequirements {
  nameOfFile: string;
  document: string; // URL or path
  upload_date: Date;
}

export interface ITableRequirementsDocument extends ITableRequirements, Document {}

const TableRequirementsSchema = new Schema<ITableRequirementsDocument>({
  nameOfFile: { type: String, required: true },
  document: { type: String, required: true },
  upload_date: { type: Date, default: Date.now },
});

export default model<ITableRequirementsDocument>('TableRequirements', TableRequirementsSchema);
