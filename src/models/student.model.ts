import { Schema, model, Document, Types } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

export interface IStudentDocument extends Omit<IStudent, 'userRef' | 'student'>, Document {
  userRef: Types.ObjectId;
}

const StudentSchema = new Schema<IStudentDocument>(
  {
    userRef: { type: Schema.Types.ObjectId, ref: 'User' },
    studentId: { type: String, unique: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    prefix: { type: String },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    number: { type: String },
    course: { type: String },
    year: { type: String },
    image: { type: String }, // URL or path
    nameOfSupervisor: { type: String },
    hteAddress: { type: String },
    contactNumber: { type: String },
    department: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Plain text for now, but should hash
    status: { type: String, default: 'Active' },
    archivedStudents: { type: String, default: 'NotArchive' },
    resetToken: { type: String },
  },
  { timestamps: true }
);

export default model<IStudentDocument>('Student', StudentSchema);
