import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config();

// Import all models to register schemas
import User from '../models/user.model';
import Student from '../models/student.model';
import Announcement from '../models/announcement.model';
import TimeLog from '../models/time-log.model';
import SubmittedRequirement from '../models/submitted-requirement.model';
import Grade from '../models/grade.model';
import Notification from '../models/notification.model';
import Content from '../models/content.model';
import Requirement from '../models/requirement.model';
import RenderingHours from '../models/rendering-hours.model';
import StoreActivityLog from '../models/store-activity-log.model';
import PendingApplication from '../models/pending-application.model';
import Schedule from '../models/schedule.model';
import ApprovedDocument from '../models/approved-document.model';
import ReturnToRevisionDocument from '../models/return-to-revision-document.model';
import TableSubmittedReport from '../models/table-submitted-report.model';
import TimeSheet from '../models/time-sheet.model';
import NotifForAdmin from '../models/notif-for-admin.model';
import RenderingHoursTable from '../models/rendering-hours-table.model';
import TableRequirements from '../models/table-requirements.model';

async function initDatabase() {
  try {
    // Connect to MongoDB
    const MONGO = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!MONGO) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO);
    console.log('✅ Connected to MongoDB');

    // Get all model names
    const models = [
      { name: 'User', model: User },
      { name: 'Student', model: Student },
      { name: 'Announcement', model: Announcement },
      { name: 'TimeLog', model: TimeLog },
      { name: 'SubmittedRequirement', model: SubmittedRequirement },
      { name: 'Grade', model: Grade },
      { name: 'Notification', model: Notification },
      { name: 'Content', model: Content },
      { name: 'Requirement', model: Requirement },
      { name: 'RenderingHours', model: RenderingHours },
      { name: 'StoreActivityLog', model: StoreActivityLog },
      { name: 'PendingApplication', model: PendingApplication },
      { name: 'Schedule', model: Schedule },
      { name: 'ApprovedDocument', model: ApprovedDocument },
      { name: 'ReturnToRevisionDocument', model: ReturnToRevisionDocument },
      { name: 'TableSubmittedReport', model: TableSubmittedReport },
      { name: 'TimeSheet', model: TimeSheet },
      { name: 'NotifForAdmin', model: NotifForAdmin },
      { name: 'RenderingHoursTable', model: RenderingHoursTable },
      { name: 'TableRequirements', model: TableRequirements },
    ];

    console.log('\n📦 Initializing collections...\n');

    // Create collections (indexes will be created automatically)
    for (const { name, model } of models) {
      try {
        await model.createCollection();
        console.log(`✅ ${name} collection initialized`);
      } catch (error: any) {
        if (error.code === 48) {
          // Collection already exists
          console.log(`ℹ️  ${name} collection already exists`);
        } else {
          console.error(`❌ Error creating ${name} collection:`, error.message);
        }
      }
    }

    console.log('\n🎉 Database initialization complete!');
    console.log('\n📊 Collections in database:');

    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach((col) => {
      console.log(`   - ${col.name}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initDatabase();
