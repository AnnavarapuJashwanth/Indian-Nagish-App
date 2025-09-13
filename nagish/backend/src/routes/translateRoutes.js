import express from "express";
import { translateText } from "../controllers/translateController.js";

const router = express.Router();

// POST route (main translation API)
router.post("/", translateText);

// Optional GET route for testing in browser
router.get("/", (req, res) => {
  res.send("Translate API is working 🚀 (use POST with { text, target })");
});

export default router;
