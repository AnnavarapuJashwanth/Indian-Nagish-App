import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import sttRoutes from "./routes/sttRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",            // Local Vite dev
      "http://localhost:5174",            // Local Vite dev (alt port)
      "http://localhost:5175",            // Local Vite dev (alt port)
      "https://nagishapp4297.netlify.app" // Deployed frontend on Netlify
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Body parser (use express.json)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ API Routes
app.use("/api/stt", sttRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/translate", translateRoutes);

// ✅ Health check routes
app.get("/", (req, res) => {
  res.send("🌍 API is running! Available base: /api");
});

app.get("/api", (req, res) => {
  res.json({
    message: "🌍 API is running!",
    endpoints: {
      stt: "/api/stt (POST /transcribe)",
      tts: "/api/tts (POST /)",
      translate: "/api/translate (POST /)",
    },
  });
});

export default app;
