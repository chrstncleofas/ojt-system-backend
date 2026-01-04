import { Schema, model, Document } from 'mongoose';

export interface IPendingApplication {
  pendingStudentId: string;
  pendingFirstname: string;
  pendingMiddlename?: string;
  pendingLastname: string;
  pendingPrefix?: string;
  pendingEmail: string;
  pendingAddress: string;
  pendingNumber: string;
  pendingCourse: string;
  pendingYear?: string;
  pendingImage?: string;
  pendingUsername: string;
  nameOfSupervisor?: string;
  hteAddress?: string;
  contactNumber?: string;
  department?: string;
  pendingPassword: string;
  statusApplication?: string;
  pendingStatusArchive?: string;
}

export interface IPendingApplicationDocument extends IPendingApplication, Document {}

const PendingApplicationSchema = new Schema<IPendingApplicationDocument>(
  {
    pendingStudentId: { type: String, unique: true },
    pendingFirstname: { type: String, required: true },
    pendingMiddlename: { type: String },
    pendingLastname: { type: String, required: true },
    pendingPrefix: { type: String },
    pendingEmail: { type: String, required: true, unique: true },
    pendingAddress: { type: String, required: true },
    pendingNumber: { type: String, required: true },
    pendingCourse: { type: String, required: true },
    pendingYear: { type: String },
    pendingImage: { type: String },
    pendingUsername: { type: String, required: true, unique: true },
    nameOfSupervisor: { type: String },
    hteAddress: { type: String },
    contactNumber: { type: String },
    department: { type: String },
    pendingPassword: { type: String, required: true },
    statusApplication: { type: String, default: 'PendingApplication' },
    pendingStatusArchive: { type: String, default: 'NotArchive' },
  },
  { timestamps: true }
);

export default model<IPendingApplicationDocument>('PendingApplication', PendingApplicationSchema);
