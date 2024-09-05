import { FastifyInstance } from "fastify";
import { QuestionController } from "./question.controller.js";

export async function setupQuestionHttpRouter (fastify: FastifyInstance) {

    const controller = new QuestionController();

    async function getRoutes () {
        fastify.get("/", controller.home)
    }

    await getRoutes();
}