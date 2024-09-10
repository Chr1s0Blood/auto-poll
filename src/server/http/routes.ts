import type{ FastifyInstance } from "fastify";
import { setupQuestionHttpRouter } from "./module/question/question.router.js";
import { setupVoterHttpRouter } from "./module/voter/voter.router.js";
import { setupVoteHttpRouter } from "./module/vote/vote.router.js";
import { setupCategoryHttpRouter } from "./module/category/category.router.js";

export async function setupHttpRoutes (app: FastifyInstance) {

    app.register(setupQuestionHttpRouter, {
        prefix: "/questions"
    })

    app.register(setupVoterHttpRouter, {
        prefix: "/voters"
    })

    app.register(setupVoteHttpRouter, {
        prefix: "/votes"
    })

    app.register(setupCategoryHttpRouter, {
        prefix: "/categories"
    })

}