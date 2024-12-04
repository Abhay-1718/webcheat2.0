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
const corsOptions = {
  origin: process.env.ORIGIN || 'http://localhost:5173',  // Use ORIGIN from env, with fallback
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log("server running at port : " + port);
});
