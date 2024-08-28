import fs from "fs";
import path from "path";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { generateUUID } from "./uuidGenerator";
import { apiKey } from "./config";

interface SaveImageResult {
  tempFilePath: string;
  fileName: string;
  mimeType: string;
}

interface UploadFileResponse {
  file: {
    uri: string;
  };
}

const fileManager = new GoogleAIFileManager(apiKey);

export function saveImage(base64Image: string): SaveImageResult {
  const buffer = Buffer.from(base64Image.split(",")[1], "base64");
  const fileName = `${generateUUID()}.png`;
  const tempFilePath = path.join(__dirname, fileName);

  fs.writeFileSync(tempFilePath, buffer);

  return { tempFilePath, fileName, mimeType: "image/png" };
}

export function deleteImage(tempFilePath: string): void {
  fs.unlinkSync(tempFilePath);
}

export async function uploadImage(
  tempFilePath: string,
  fileName: string,
  mimeType: string
): Promise<UploadFileResponse> {
  const response = await fileManager.uploadFile(tempFilePath, {
    mimeType,
    displayName: fileName,
  });

  return response as UploadFileResponse;
}
