import { FastifyInstance } from "fastify";
import { VoteController } from "./vote.controller.js";

export async function setupVoteHttpRouter (fastify: FastifyInstance) {

    const controller = new VoteController();

    async function postRoutes () {
        fastify.post("/", controller.handleVote)
    }

    await postRoutes();
}