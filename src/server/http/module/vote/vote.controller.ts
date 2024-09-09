import { FastifyReply, FastifyRequest } from "fastify";
import CustomResponse from "../../response.js";
import VoteService from "../../../services/vote.service.js";
import { TVoteCreatePayload } from "../../../payload/vote.payload.js";

const voteService = new VoteService();
export class VoteController {
  constructor() {}

  async handleVote(req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as Partial<TVoteCreatePayload>;

    const vote = await voteService.handleVote(body);

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: vote,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }
}
