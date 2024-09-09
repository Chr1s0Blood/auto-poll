import { FastifyReply, FastifyRequest } from "fastify";
import CustomResponse from "../../response.js";
import VoterService from "../../../services/voter.service.js";
import { fastifyCookie } from "@fastify/cookie";
import { ONE_DAY_IN_SECONDS } from "../../../constants/time.js";

const voterService = new VoterService();
export class VoterController {
  constructor() {}

  async handleVoter(req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as {
      code?: string;
      country?: string;
      state?: string;
    };

    const voterCode = body.code || reply.cookies?.voter;

    if (voterCode) {
      const voter = await voterService.getVoterByCode(body.code);

      if (voter) {
        reply.header(
          "set-cookie",
          fastifyCookie.serialize("voter", voterCode, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            priority: "high",
            maxAge: ONE_DAY_IN_SECONDS * 200, // 7.2k days :D
          })
        );

        const response = new CustomResponse({
          statusCode: 200,
          status: "success",
          data: voter,
        }).toObj();
        return reply.status(response.statusCode).send(response);
      }
    }

    const result = await voterService.create(body);

    reply.header(
      "set-cookie",
      fastifyCookie.serialize("voter", result.code, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        priority: "high",
        maxAge: ONE_DAY_IN_SECONDS * 4000, // 4k days :D
      })
    );

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: result,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }
}
