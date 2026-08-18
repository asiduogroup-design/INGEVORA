import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "INGEVORA API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`INGEVORA API running on http://localhost:${PORT}`);
});