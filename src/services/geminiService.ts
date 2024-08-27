import { GoogleAIFileManager, GoogleGenerativeAI } from "@google/generative-ai/server";
import { config } from "dotenv";
import { v4 as uuidv4 } from 'uuid';

config();

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function uploadImage(base64Image: string): Promise<{ imageUrl: string; measureValue: number; measureUuid: string }> {
  const buffer = Buffer.from(base64Image, 'base64');
  const mimeType = "image/jpeg"; // Assumindo JPEG como formato padrão, você pode ajustar conforme necessário
  const fileName = `${uuidv4()}.jpg`;

  const uploadResponse = await fileManager.uploadFile(buffer, {
    mimeType,
    displayName: fileName,
  });

  const fileUri = uploadResponse.file.uri;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = "Extract the meter reading from the image.";
  
  const generatedContent = await model.generateContent([
    { fileData: { mimeType, fileUri } },
    { text: prompt },
  ]);

  const measureValue = parseInt(generatedContent.response.text(), 10); // Parseando o valor numérico da resposta

  return {
    imageUrl: fileUri,
    measureValue,
    measureUuid: uuidv4()
  };
}
