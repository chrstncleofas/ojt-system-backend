import { Schema, model, Document } from 'mongoose';
import { IRequirement } from '../interfaces/requirement.interface';

export interface IRequirementDocument extends IRequirement, Document {}

const RequirementSchema = new Schema<IRequirementDocument>({
  nameOfFile: { type: String, required: true },
  document: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

export default model<IRequirementDocument>('Requirement', RequirementSchema);
