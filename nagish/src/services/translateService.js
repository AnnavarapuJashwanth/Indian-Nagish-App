import axios from "axios";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/translate`;

export const translateText = async (text, target = "hi") => {
  try {
    const res = await axios.post(API_URL, { text, target });
    return res.data.translatedText;
  } catch (err) {
    console.error("Translate API error:", err.response?.data || err.message);
    throw err;
  }
};
