import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";

export const aiGemini = async (prompt: string) => {

  const ai = new GoogleGenAI({});

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: prompt,
  })

  return interaction.output_text
};
