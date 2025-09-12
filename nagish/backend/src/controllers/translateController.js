import { TranslationServiceClient } from "@google-cloud/translate";

const translateClient = new TranslationServiceClient();

export const translateText = async (req, res) => {
  try {
    const { text, target } = req.body;

    if (!text || !target) {
      return res.status(400).json({ error: "Text and target language are required" });
    }

    const [response] = await translateClient.translateText({
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: target,
    });

    res.json({ translatedText: response.translations[0].translatedText });
  } catch (error) {
    console.error("🛑 Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};
