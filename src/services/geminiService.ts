import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is not defined");
}

const fileManager = new GoogleAIFileManager(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);


export async function uploadImage(
  base64Image: string
): Promise<{ imageUrl: string; measureValue: number; measureUuid: string }> {
  try {
    const buffer = Buffer.from(base64Image.split(",")[1], "base64");
    const mimeType = "image/png";
    const fileName = `${uuidv4()}.png`;
    const tempFilePath = path.join(__dirname, fileName);

    fs.writeFileSync(tempFilePath, buffer);

    console.log("Uploading image with MIME type:", mimeType);
    console.log("File name:", fileName);

    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      displayName: fileName,
    });
    console.log("Upload response:", uploadResponse);

    fs.unlinkSync(tempFilePath);

    const fileUri = uploadResponse.file.uri;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = "Please extract the meter reading as a number from the provided image.";
    console.log("Prompt sent to AI model:", prompt);

    const generatedContent = await model.generateContent([
      { fileData: { mimeType, fileUri } },
      { text: prompt },
    ]);

    console.log("Generated content:", generatedContent);

    // Ensure extractedText is a string
    const extractedText = generatedContent.response.text();
    console.log("Extracted text:", extractedText);

    // Extract and parse the number from the text
    const match = extractedText.match(/(\d+)/);
    const measureValue = match ? parseInt(match[0], 10) : 0;
    console.log("Parsed measure value:", measureValue);

    return {
      imageUrl: fileUri,
      measureValue,
      measureUuid: uuidv4(),
    };
  } catch (error: unknown) {
    console.error("Error uploading image:", error);

    if (error instanceof Error) {
      throw new Error(`Error uploading image: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during image upload.");
    }
  }
}
