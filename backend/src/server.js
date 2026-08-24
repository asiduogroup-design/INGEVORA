import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/environment.js";
import { verifyDatabaseConnection } from "./config/database.js";
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { serviceRoutes } from "./routes/serviceRoutes.js";
import { serviceRequestRoutes } from "./routes/serviceRequestRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { aiRoutes } from "./routes/aiRoutes.js";
import { pricingRoutes } from "./routes/pricingRoutes.js";
import { testimonialRoutes } from "./routes/testimonialRoutes.js";
import { paymentRoutes } from "./routes/paymentRoutes.js";
import { stripeWebhook } from "./controllers/paymentController.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

// Stripe webhook signature verification requires the raw request body.
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "INGEVORA API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai-updates", aiRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(env.port, async () => {
  console.log(`INGEVORA API running on http://localhost:${env.port}`);
  try {
    await verifyDatabaseConnection();
  } catch (error) {
    console.warn(`MySQL connection not verified: ${error.message}`);
  }
});
