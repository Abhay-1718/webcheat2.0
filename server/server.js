import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
connectDB();

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log("server running at port : " + port);
});
