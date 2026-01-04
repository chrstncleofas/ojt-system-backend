import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';

dotenv.config({ path: '.env.local' });

async function main() {
  const SOURCE = process.env.SOURCE_MONGO_URI;
  const TARGET = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!SOURCE) {
    console.error('Missing SOURCE_MONGO_URI in environment. Set this to the tkms connection string.');
    process.exit(1);
  }
  if (!TARGET) {
    console.error('Missing target MONGODB_URI in environment.');
    process.exit(1);
  }

  console.log('Source:', SOURCE.replace(/(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/, '$1$2:***@'));
  console.log('Target:', TARGET.replace(/(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/, '$1$2:***@'));

  // Define schema identical to pending-application.model.ts
  const PendingSchema = new Schema({
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
  }, { timestamps: true });

  const sourceConn = await mongoose.createConnection(SOURCE, { dbName: undefined });
  const targetConn = await mongoose.createConnection(TARGET, { dbName: undefined });

  const SourceModel = sourceConn.model('PendingApplication', PendingSchema, 'pendingapplications');
  const TargetModel = targetConn.model('PendingApplication', PendingSchema, 'pendingapplications');

  try {
    const docs = await SourceModel.find().lean();
    console.log(`Found ${docs.length} documents in source pendingapplications.`);

    let copied = 0;
    for (const doc of docs) {
      const exists = await TargetModel.findOne({
        $or: [
          { pendingEmail: doc.pendingEmail },
          { pendingStudentId: doc.pendingStudentId },
          { pendingUsername: doc.pendingUsername },
        ],
      }).lean();

      if (exists) continue;

      const toInsert = { ...doc } as any;
      delete toInsert._id; // let Mongo generate a new _id

      try {
        await TargetModel.create(toInsert);
        copied += 1;
      } catch (err) {
        console.error('Failed to insert document:', err);
      }
    }

    console.log(`Copied ${copied} documents to target pendingapplications.`);
  } finally {
    await sourceConn.close();
    await targetConn.close();
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
