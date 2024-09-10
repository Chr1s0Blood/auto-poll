import { FastifyReply, FastifyRequest } from "fastify";
import CustomResponse from "../../response.js";
import CategoryService from "../../../services/category.service.js";

const categoryService = new CategoryService();
export class CategoryController {
  constructor() {}

  async getAllWithQuestionsCount(req: FastifyRequest, reply: FastifyReply) {
    const { name = "" } = req.query as {
      name?: string;
    };

    const result = await categoryService.getAllWithQuestionsCount(name);

    const response = new CustomResponse({
      statusCode: 200,
      status: "success",
      data: result,
    }).toObj();

    return reply.status(response.statusCode).send(response);
  }

  
}
