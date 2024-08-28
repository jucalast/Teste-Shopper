import { config } from "dotenv";
config();

export const apiKey: string = process.env.GEMINI_API_KEY as string;
if (!apiKey) {
  throw new Error("API key is not defined");
}
