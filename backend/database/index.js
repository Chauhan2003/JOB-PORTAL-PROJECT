import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection established");
  } catch (err) {
    console.log("Database connection error: " + err.message);
  }
};

export default dbConnection;
