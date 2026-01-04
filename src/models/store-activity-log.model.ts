import { Schema, model, Document, Types } from 'mongoose';
import { IStoreActivityLog } from '../interfaces/store-activity-log.interface';

export interface IStoreActivityLogDocument extends Omit<IStoreActivityLog, 'user'>, Document {
  user: Types.ObjectId;
}

const StoreActivityLogSchema = new Schema<IStoreActivityLogDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  first_name: { type: String },
  last_name: { type: String },
  position: { type: String },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  description: { type: String },
  ip_address: { type: String },
});

export default model<IStoreActivityLogDocument>('StoreActivityLog', StoreActivityLogSchema);
