import CategoryManager from "../database/category.manager.js";

export default class CategoryService {
    private categoryRepository: CategoryManager;

    constructor () {
        this.categoryRepository = new CategoryManager();
    }

    async getAllWithQuestionsCount (name?: string) {

        const categories = await this.categoryRepository.getAllWithQuestionsCount(name);

        return categories

    }

}