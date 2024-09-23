import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected Successfully"))
  .catch((error) => console.log("Connection failed:", error));

export default mongoose;
