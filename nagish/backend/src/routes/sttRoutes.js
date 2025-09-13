import express from "express";
import { speechToText } from "../controllers/sttController.js";

const router = express.Router();

// POST /api/stt/transcribe
router.post("/transcribe", speechToText);

// Optional GET route for testing in browser
router.get("/", (req, res) => {
  res.send("STT API is working 🚀 (use POST /api/stt/transcribe)");
});

export default router;
