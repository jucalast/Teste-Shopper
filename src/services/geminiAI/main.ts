import { saveImage, deleteImage, uploadImage } from "./fileManager";
import { processImage } from "./imageProcessor";
import { extractMeasureValue } from "./extractor";
import { generateUUID } from "./uuidGenerator";

interface UploadFileResponse {
  file: {
    uri: string;
  };
}

export async function handleImageUpload(base64Image: string): Promise<{
  imageUrl: string;
  measureValue: number;
  measureUuid: string;
}> {
  try {
    const { tempFilePath, fileName, mimeType } = saveImage(base64Image);

    console.log("Uploading image with MIME type:", mimeType);
    console.log("File name:", fileName);

    const uploadResponse: UploadFileResponse = await uploadImage(
      tempFilePath,
      fileName,
      mimeType
    );
    console.log("Upload response:", uploadResponse);

    deleteImage(tempFilePath);

    const fileUri = uploadResponse.file.uri;
    const extractedText = await processImage(fileUri, mimeType);
    console.log("Extracted text:", extractedText);

    const measureValue = extractMeasureValue(extractedText);
    console.log("Parsed measure value:", measureValue);

    return {
      imageUrl: fileUri,
      measureValue,
      measureUuid: generateUUID(),
    };
  } catch (error: unknown) {
    console.error("Error handling image upload:", error);

    if (error instanceof Error) {
      throw new Error(`Error handling image upload: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during image upload.");
    }
  }
}
