import mongoose from "mongoose";

let cached = global.mongoose || { conn: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(process.env.MONGODB_URI);
  return cached.conn;
};

export default connectDB;
