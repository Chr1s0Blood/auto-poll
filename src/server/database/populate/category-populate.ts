import slugify from "slugify";
import { CATEGORIES_ARR } from "../../constants/categories.js";
import CategoryManager from "../category.manager.js";
import chalk from "chalk";

export async function populateQuestionCategories() {
  const categoryRepository = new CategoryManager();

  for (const category of CATEGORIES_ARR) {
    const code = slugify.default(category, { lower: true, trim: true });

    const exist = await categoryRepository.findByCode(code);

    if (!exist) {
      await categoryRepository.create({ name: category, code });
    }
  }

  console.log(chalk.blue("Categories populated!"));
}
