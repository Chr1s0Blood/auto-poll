import { GoogleGenerativeAI } from "@google/generative-ai";
import { appEnv } from "../../config/env.js";

const genAI = new GoogleGenerativeAI(appEnv.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({ model: appEnv.GEMINI_MODEL });