import { Schema, model, Document, Types } from 'mongoose';
import { INotification } from '../interfaces/notification.interface';

export interface INotificationDocument extends Omit<INotification, 'student'>, Document {
  student: Types.ObjectId;
}

const NotificationSchema = new Schema<INotificationDocument>({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default model<INotificationDocument>('Notification', NotificationSchema);
