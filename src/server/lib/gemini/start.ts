import Cron from "croner";
import {
  generateQuestionPrompt,
  getQuestionSchemaFromRaw,
} from "./prompts/generate-question.js";
import { QuestionManager } from "../../database/question.manager.js";
import CategoryManager from "../../database/category.manager.js";

export async function startGeminiQuestionPolls() {
  const questionRepository = new QuestionManager();
  const categoriesRepository = new CategoryManager();

  const categories = await categoriesRepository.getAll();

  const job = Cron("*/20 * * * * *", async () => {
    try {
      const selectedCategory = await pickRandomCategory(categories);

      const content = await generateQuestionPrompt(selectedCategory.name);

      const textRaw = content.response.text();

      const jsonToSchema = getQuestionSchemaFromRaw(textRaw);

      await questionRepository.create({
        ...jsonToSchema,
        categoryId: selectedCategory.id,
      });
    } catch (error) {
      console.error(error);
    }
  });
}

function pickRandomCategory<T>(categories: T[]) {
  return new Promise<T>((resolve) => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    resolve(categories[randomIndex]);
  });
}
