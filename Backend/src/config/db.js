import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 🌿 MongoDB Connection Function
const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL is not defined in .env');
    }

    console.log('🌿 Attempting MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ 🌐 🗄️ MongoDB connected successfully 🎉');
    // console.log(`→_→ MongoDB URL: ${process.env.MONGO_URL}`);
    console.log('→_→ MongoDB Connection Options:', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', {
      name: err.name,
      message: err.message,
      code: err.code || 'N/A',
    });

    process.exit(1);
  }
};

export default connectToDatabase;