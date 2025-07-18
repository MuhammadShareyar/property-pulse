import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", "true");

  if (connected) {
    console.log("MongoDB is connected!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;