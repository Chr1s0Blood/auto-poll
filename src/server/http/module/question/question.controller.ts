import { FastifyReply, FastifyRequest } from "fastify";
import QuestionService from "../../../services/question.service.js";
import CustomResponse from "../../response.js";

const questionService = new QuestionService();
export class QuestionController {
  constructor() {}

  async getQuestions(req: FastifyRequest, reply: FastifyReply) {
    const { page = 1, pageSkip = 10 } = req.query as {
      page?: number;
      pageSkip?: number;
    };

    const result = await questionService.getQuestions({ page, pageSkip });

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: result,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }

  async findQuestionById (req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };

    const voterCode = req.cookies.voter;

    const result = await questionService.findQuestionById(id, voterCode);

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: result,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }

  async getRandomQuestion (req: FastifyRequest, reply: FastifyReply) {

    const voterCode = req.cookies?.voter;

    const result = await questionService.getRandomQuestion(voterCode);

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: result,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }
}
