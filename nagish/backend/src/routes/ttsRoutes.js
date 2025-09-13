import express from "express";
import { textToSpeechHandler } from "../controllers/ttsController.js";

const router = express.Router();

// POST /api/tts
router.post("/", textToSpeechHandler);

// Optional GET route for testing in browser
router.get("/", (req, res) => {
  res.send("TTS API is working 🚀 (use POST /api/tts with { text })");
});

export default router;
