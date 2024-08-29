import { GoogleGenerativeAI } from "@google/generative-ai";
import { apiKey } from "./config";
import { extractMeasureValue } from "./extractor";

interface GenerateContentResponse {
  response: {
    text: () => string;
  };
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function processImage(
  fileUri: string,
  mimeType: string
): Promise<number> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt =
    "Please extract the number found in the image. It may include decimal points. Provide the result as a number with up to two decimal places, if applicable.";

  try {
    const generatedContent: GenerateContentResponse = await model.generateContent(
      [{ fileData: { mimeType, fileUri } }, { text: prompt }]
    );

    const extractedText = generatedContent.response.text().trim();
    console.log("Extracted text:", extractedText);
    
    const measureValue = extractMeasureValue(extractedText);
    console.log("Parsed measure value:", measureValue);

    return measureValue;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process the image.");
  }
}
