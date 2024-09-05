import { prisma } from "../config/db.js";
import { DatabaseException } from "../exceptions/DatabaseException.js";

export default class VoteManager {
  private voteModel: (typeof prisma)["vote"];

  constructor() {
    this.voteModel = prisma.vote;
  }

  async create(voterId:string, optionId: string) {
    return this.voteModel
      .create({
        data: {
          voterId: voterId,
          optionId: optionId,
        },
      })
      .catch((error) => {
        throw new DatabaseException("Failed to create vote", error);
      });
  }

  async findByVoteridAndQuestionId(voterId: string, questionId: string) {
    return this.voteModel
      .findFirst({
        where: {
          voterId: voterId,
          option: {
            questionId: questionId,
          }
        },
      })
      .catch((error) => {
        throw new DatabaseException("Failed to find vote", error);
      });
  }

  async update (voterId: string, voteId: string, optionId: string) {
    return this.voteModel
      .update({
        where: {
            id: voteId
        },
        data: {
          voterId: voterId,
          optionId: optionId,
        },
      })
      .catch((error) => {
        throw new DatabaseException("Failed to update vote", error);
      });
  }

  async findVoterVotes (voterId: string) {
    return this.voteModel
      .findMany({
        where: {
          voterId: voterId,
          isActive: true
        }
      })
      .catch((error) => {
        throw new DatabaseException("Failed to find voter votes", error);
      });
  }
}
