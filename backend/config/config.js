import mongoose from 'mongoose';
import 'colors';

//connect DB function;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected ${conn.connection.host}`.bgYellow);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
