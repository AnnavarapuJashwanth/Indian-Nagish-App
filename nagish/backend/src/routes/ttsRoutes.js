import express from "express";
import { textToSpeechHandler } from "../controllers/ttsController.js";

const router = express.Router();
router.post("/", textToSpeechHandler);

export default router;
