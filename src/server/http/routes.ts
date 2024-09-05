import type{ FastifyInstance } from "fastify";
import { setupQuestionHttpRouter } from "./module/question/question.router.js";

export async function setupHttpRoutes (app: FastifyInstance) {

    app.register(setupQuestionHttpRouter, {
        prefix: "/questions"
    })

}