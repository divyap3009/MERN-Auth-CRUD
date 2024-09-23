import express from "express";
import "./config/db.js";
import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/post", PostRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
