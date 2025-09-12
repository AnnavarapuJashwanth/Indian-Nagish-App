// backend/routes/sttRoutes.js
import express from 'express';
import { speechToText } from '../controllers/sttController.js';

const router = express.Router();

// POST /api/stt/transcribe
router.post('/transcribe', speechToText);

export default router;