import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config();

// Import models
import User from '../models/user.model';
import Announcement from '../models/announcement.model';
import RenderingHoursTable from '../models/rendering-hours-table.model';
import TableRequirements from '../models/table-requirements.model';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGO = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!MONGO) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGO);
    console.log('✅ Connected to MongoDB');

    console.log('\n🌱 Seeding database...\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Student.deleteMany({});
    // await Announcement.deleteMany({});

    // Create admin user
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        email: 'admin@ojt.com',
        password: hashedPassword,
        position: 'Admin',
      });
      console.log('✅ Admin user created (username: admin, password: admin123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create coordinator user
    const existingCoordinator = await User.findOne({ username: 'coordinator' });
    if (!existingCoordinator) {
      const hashedPassword = await bcrypt.hash('coordinator123', 10);
      await User.create({
        username: 'coordinator',
        email: 'coordinator@ojt.com',
        password: hashedPassword,
        position: 'Coordinator',
      });
      console.log('✅ Coordinator user created (username: coordinator, password: coordinator123)');
    } else {
      console.log('ℹ️  Coordinator user already exists');
    }

    // Create sample announcement
    const existingAnnouncements = await Announcement.countDocuments();
    if (existingAnnouncements === 0) {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      await Announcement.create({
        title: 'Welcome to OJT Management System',
        description:
          'This is your OJT Management System. Please check announcements regularly for updates.',
        startDate: today,
        endDate: nextMonth,
        status: 'active',
      });
      console.log('✅ Sample announcement created');
    } else {
      console.log('ℹ️  Announcements already exist');
    }

    // Seed RenderingHoursTable
    const existingHours = await RenderingHoursTable.countDocuments();
    if (existingHours === 0) {
      await RenderingHoursTable.create([
        { course: 'BS Information Technology', required_hours: 486 },
        { course: 'BS Computer Science', required_hours: 486 },
      ]);
      console.log('✅ Rendering hours table seeded');
    } else {
      console.log('ℹ️  Rendering hours table already exists');
    }

    // Seed TableRequirements
    const existingRequirements = await TableRequirements.countDocuments();
    if (existingRequirements === 0) {
      const requirements = [
        'Internship Application Form',
        'Parent Consent',
        'Notice of Acceptance / MOA',
        'Endorsement Letter',
        'Internship Contract Agreement',
        'Medical Certificate',
        'Evaluation Form',
        'Progress Report',
        'Internship Time Sheet',
        'Internship Exit Survey',
        'Student Performance Evaluation',
        'Supporting Document of Time Sheet',
        'Supporting Document of Progress Report',
      ];
      for (const req of requirements) {
        await TableRequirements.create({
          nameOfFile: req,
          document: `/requirements/${req.replace(/\s+/g, '_').toLowerCase()}.pdf`, // placeholder path
        });
      }
      console.log('✅ Table requirements seeded');
    } else {
      console.log('ℹ️  Table requirements already exist');
    }

    console.log('\n🎉 Database seeding complete!');
    console.log('\n📝 Login Credentials:');
    console.log('   Admin:');
    console.log('     Username: admin');
    console.log('     Password: admin123');
    console.log('   Coordinator:');
    console.log('     Username: coordinator');
    console.log('     Password: coordinator123');

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
