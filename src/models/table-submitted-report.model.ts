import { Schema, model, Document, Types } from 'mongoose';

export interface ITableSubmittedReport {
  student: string;
  date_submitted: Date;
  report_file?: string;
}

export interface ITableSubmittedReportDocument
  extends Omit<ITableSubmittedReport, 'student'>,
    Document {
  student: Types.ObjectId;
}

const TableSubmittedReportSchema = new Schema<ITableSubmittedReportDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  date_submitted: { type: Date, default: Date.now },
  report_file: { type: String },
});

export default model<ITableSubmittedReportDocument>(
  'TableSubmittedReport',
  TableSubmittedReportSchema
);
