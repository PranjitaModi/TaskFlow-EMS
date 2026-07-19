import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log("Ready State:", mongoose.connection.readyState);

    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    return false;
  }
};

export default connectDB;