import Cron from "croner";
import {
  generateQuestionPrompt,
  getQuestionSchemaFromRaw,
} from "./prompts/generate-question.js";
import { QuestionManager } from "../../database/question.manager.js";

export async function startGeminiQuestionPolls() {

    const questionRepository = new QuestionManager()

    const job = Cron("*/30 * * * * *", async () => {
    const content = await generateQuestionPrompt();

    const textRaw = content.response.text();

    const jsonToSchema = getQuestionSchemaFromRaw(textRaw);

    await questionRepository.create(jsonToSchema)
  });

}
