import { FastifyInstance } from "fastify";
import { CategoryController } from "./category.controller.js";

export async function setupCategoryHttpRouter (fastify: FastifyInstance) {

    const controller = new CategoryController();

    async function getRoutes () {
        fastify.get("/", controller.getAllWithQuestionsCount)
    }

    await getRoutes();
}