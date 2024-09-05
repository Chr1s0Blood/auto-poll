import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { appEnv } from "../../config/env.js";

const genAI = new GoogleGenerativeAI(appEnv.GEMINI_API_KEY);

export const modelPoll = genAI.getGenerativeModel({
  model: appEnv.GEMINI_MODEL,
  generationConfig: {
    temperature: 2.0,
    maxOutputTokens: 80,
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        title: {
          type: SchemaType.STRING,
          description: "The title of the poll",
        },
        options: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.STRING,
          },
          description: "The options for the poll",
        },
      },
    },
  },
});
