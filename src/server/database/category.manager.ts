import { prisma } from "../config/db.js";
import { DatabaseException } from "../exceptions/DatabaseException.js";

type TCreateCategory = {
  name: string;
  code: string;
};

export default class CategoryManager {
  private categoryModel: (typeof prisma)["category"];

  constructor() {
    this.categoryModel = prisma.category;
  }

  async create(data: TCreateCategory) {
    return this.categoryModel
      .create({
        data: {
          name: data.name,
          code: data.code,
        },
      })
      .catch((error) => {
        throw new DatabaseException("Error creating category", error);
      });
  }

  async findByCode(code?: string) {
    return this.categoryModel.findUnique({
      where: {
        code: code,
      },
    });
  }

  async getAllWithQuestionsCount(name?: string) {
    return this.categoryModel.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        },
      },
      include: {
        _count: {
          select: {
            question: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
    });
  }

  async getAll () {
    return this.categoryModel.findMany()
  }
}
