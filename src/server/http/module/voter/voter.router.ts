import { FastifyInstance } from "fastify";
import { VoterController } from "./voter.controller.js";

export async function setupVoterHttpRouter (fastify: FastifyInstance) {

    const controller = new VoterController();

    async function postRoutes () {
        fastify.post("/", controller.handleVoter)
    }

    await postRoutes();
}