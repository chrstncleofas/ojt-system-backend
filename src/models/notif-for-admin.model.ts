import { Schema, model, Document, Types } from 'mongoose';

export interface INotifForAdmin {
  student: string;
  nameOfStudent: string;
  message: string;
  is_read?: boolean;
  document_name: string;
  created_at: Date;
}

export interface INotifForAdminDocument extends Omit<INotifForAdmin, 'student'>, Document {
  student: Types.ObjectId;
}

const NotifForAdminSchema = new Schema<INotifForAdminDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  nameOfStudent: { type: String, required: true },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  document_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export default model<INotifForAdminDocument>('NotifForAdmin', NotifForAdminSchema);
