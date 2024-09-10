import { prisma } from "../config/db.js";
import { DatabaseException } from "../exceptions/DatabaseException.js";
import { TQuestionShemaWithCategory } from "../lib/gemini/interfaces/main.interface.js";

export class QuestionManager {
  private questionModel: (typeof prisma)["question"];

  constructor() {
    this.questionModel = prisma.question;
  }

  async create(data: TQuestionShemaWithCategory) {
    return this.questionModel
      .create({
        data: {
          title: data.title,
          categoryId: data.categoryId,
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
        throw new DatabaseException("Error getting questions", error);
      });
  }

  async findQuestionById(id: string) {
    return this.questionModel
      .findUnique({
        where: {
          id: id,
        },
        include: {
          category: true,
          options: {
            orderBy: {
              name: "asc",
            },
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
        throw new DatabaseException("Error getting question by id", error);
      });
  }

  async getRandomQuestion(voterId: string, categoryId?: string) {
    const count = await this.questionModel.count({
      where: {
        isActive: true,
        ...(categoryId && {
          categoryId: categoryId,
        }),
        options: {
          none: {
            vote: {
              some: {
                voterId: voterId,
              },
            },
          },
        },
      },
    });

    const index = Math.random() * count;
    return this.questionModel
      .findMany({
        where: {
          isActive: true,
          ...(categoryId && {
            categoryId: categoryId,
          }),
          options: {
            none: {
              vote: {
                some: {
                  voterId: voterId,
                },
              },
            },
          },
        },
        skip: index,
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
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
        throw new DatabaseException("Error getting question", error);
      });
  }
}
