import { Schema, model, Document } from 'mongoose';
import { IAnnouncement } from '../interfaces/announcement.interface';

export interface IAnnouncementDocument extends IAnnouncement, Document {}

const AnnouncementSchema = new Schema<IAnnouncementDocument>(
  {
    title: { type: String, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

export default model<IAnnouncementDocument>('Announcement', AnnouncementSchema);
