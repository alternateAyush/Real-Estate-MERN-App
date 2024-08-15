import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter, authRouter } from "./routes/index.js";
dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
// app.use(bodyParser.json({limit:"30mb",extended:true}));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error.";
  const success = false;
  return res.status(statusCode).json({ statusCode, message, success });
});
const db_connection = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(db_connection)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Sever running on port ", PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB error:", err);
  });
