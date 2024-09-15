import { FastifyInstance } from "fastify";
import { QuestionController } from "./question.controller.js";

export async function setupQuestionHttpRouter (fastify: FastifyInstance) {

    const controller = new QuestionController();

    async function getRoutes () {
        fastify.get("/", controller.getQuestions)
        fastify.get("/:id", controller.findQuestionById)
        fastify.get("/random", controller.getRandomQuestion)
        fastify.get("/me", controller.getVoterQuestions)
    }

    await getRoutes();
}