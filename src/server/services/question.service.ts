import CategoryManager from "../database/category.manager.js";
import { QuestionManager } from "../database/question.manager.js";
import { TPaginationConfig } from "../database/types.js";
import VoteManager from "../database/vote.manager.js";
import VoterManager from "../database/voter.manager.js";
import { UnauthorizedException } from "../exceptions/UnauthorizedException.js";

export default class QuestionService {
  private questionRepository: QuestionManager;
  private voteRepository: VoteManager;
  private voterRepository: VoterManager;
  private categoryRepository: CategoryManager;

  constructor() {
    this.questionRepository = new QuestionManager();
    this.voteRepository = new VoteManager();
    this.voterRepository = new VoterManager();
    this.categoryRepository = new CategoryManager();
  }

  async getQuestions({ page = 1, pageSkip = 10 }) {
    const questions = await this.questionRepository.getQuestions(
      page,
      pageSkip
    );

    const lastQuestion = await this.questionRepository.findLastQuestion();

    const returnQuestions = {
      questions,
      last: lastQuestion,
    };

    return returnQuestions;
  }

  async findQuestionById(id: string, voterCode?: string) {
    let question = await this.questionRepository.findQuestionById(id);

    if (voterCode && question) {
      let voter = await this.voterRepository.findByCode(voterCode);

      if (voter) {
        const alreadyVoted =
          await this.voteRepository.findByVoterIdAndQuestionId(
            voter.id,
            question.id
          );

        if (alreadyVoted) {
          Object.defineProperty(question, "chosenOptionId", {
            value: alreadyVoted.optionId,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      }
    }

    return question;
  }

  async getRandomQuestion(voterCode?: string, categoryCode?: string) {
    if (!voterCode) {
      throw new UnauthorizedException(
        "Registro não encontrado!",
        "Voter code is missing"
      );
    }

    const voter = await this.voterRepository.findByCode(voterCode);

    if (!voter) {
      throw new UnauthorizedException(
        "Registro não encontrado!",
        "Voter not found"
      );
    }

    const category = await this.categoryRepository.findByCode(categoryCode);

    const question = await this.questionRepository.getRandomQuestion(
      voter.id,
      category?.id
    );

    return question[0];
  }

  async getQuestionsByVoter(
    { page, pageSize }: TPaginationConfig,
    voterCode?: string,
    title?: string
  ) {
    if (!voterCode) {
      throw new UnauthorizedException(
        "Registro não encontrado!",
        "Voter code is missing"
      );
    }

    const voter = await this.voterRepository.findByCode(voterCode);

    if (!voter) {
      throw new UnauthorizedException(
        "Registro não encontrado!",
        "Voter not found"
      );
    }

    const totalQuestionsVotedByVoter =
      await this.questionRepository.getTotalCountQuestionsVotedByVoterId(
        voter.id
      );

    const questions = await this.questionRepository.getQuestionsByVoter(
      voter.id,
      {
        page,
        pageSize,
      },
      title
    );

    for (const question of questions) {
      const alreadyVoted = await this.voteRepository.findByVoterIdAndQuestionId(
        voter.id,
        question.id
      );

      if (alreadyVoted) {
        Object.defineProperty(question, "chosenOptionId", {
          value: alreadyVoted.optionId,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    }

    return {
      totalQuestionsVotedByVoter,
      questions,
    };
  }
}
