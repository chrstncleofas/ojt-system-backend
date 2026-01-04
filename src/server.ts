import dotenv from 'dotenv';
// Load .env.local first (if present), then fallback to other env files
dotenv.config({ path: '.env.local' });
dotenv.config();

import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;
// Support both MONGO_URI and MONGODB_URI from env file
// Prefer MONGO_URI, then MONGODB_URI
const MONGO =
  process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ojt_system';

mongoose
  .connect(MONGO)
  .then(() => {
    // Log masked connection info and actual DB name to verify which DB is used
    const masked = MONGO.replace(/(mongodb(?:\+srv)?:\/\/)([^:]+):([^@]+)@/, '$1$2:***@');
    console.log('Mongo connection string (masked):', masked);
    console.log(
      'Connected to MongoDB - database:',
      mongoose.connection?.db?.databaseName || 'unknown'
    );
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
