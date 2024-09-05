import { prisma } from "../config/db.js";
import { DatabaseException } from "../exceptions/DatabaseException.js";
import { IQuestionShemaFromRaw } from "../lib/gemini/interfaces/main.interface.js";


export class QuestionManager {
  private questionModel: (typeof prisma)["question"];

  constructor() {
    this.questionModel = prisma.question;
  }

  async create(data: IQuestionShemaFromRaw) {
    return this.questionModel
      .create({
        data: {
          title: data.title,
          options: {
            createMany: {
              data: data.options.map((option) => {
                return {
                  name: option,
                };
              }),
            },
          },
        },
      })
      .catch((error) => {
        throw new DatabaseException("Error creating question", error);
      });
  }

  async findLastQuestion() {
    return this.questionModel
      .findFirst({
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          options: {
            include: {
              _count: {
                select: {
                  vote: {
                    where: { isActive: true },
                  },
                },
              },
            },
          },
        },
      })
      .catch((error) => {
        throw new DatabaseException("Error finding last question", error);
      });
  }

  async getQuestions(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    return await this.questionModel
      .findMany({
        where: {
          isActive: true,
        },
        skip: skip,
        take: pageSize,
        include: {
          options: {
            include: {
              _count: {
                select: {
                  vote: {
                    where: { isActive: true },
                  },
                },
              },
            },
          },
        },
      })
      .catch((error) => {
        throw new DatabaseException("Error getting questions", error);
      });
  }
}
