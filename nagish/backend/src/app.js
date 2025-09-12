import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import sttRoutes from "./routes/sttRoutes.js";
import ttsRoutes from "./routes/ttsRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

const app = express();
connectDB();

// ✅ CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",            // local Vite dev
    "https://nagishapp4297.netlify.app" // deployed frontend on Netlify
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Body parser
app.use(bodyParser.json({ limit: "50mb" }));

// ✅ Routes
app.use("/api/stt", sttRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/translate", translateRoutes);

app.get("/", (req, res) => {
  res.send("🌍 API is running! Use /api/stt, /api/tts, or /api/translate");
});

export default app;
