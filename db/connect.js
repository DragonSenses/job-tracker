import mongoose from 'mongoose';

const connectDB = (URL) => {
  return mongoose.connect(URL);
}

export default connectDB