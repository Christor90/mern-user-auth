import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoBD connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.getMaxListeners(1);
  }
};
