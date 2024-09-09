import VoteManager from "../database/vote.manager.js";
import VoterManager from "../database/voter.manager.js";
import { BadRequestException } from "../exceptions/BadRequestException.js";
import { TVoteCreatePayload } from "../payload/vote.payload.js";

export default class VoteService {
  private voteRepository: VoteManager;
  private voterRepository: VoterManager;

  constructor() {
    this.voteRepository = new VoteManager();
    this.voterRepository = new VoterManager();
  }

  async handleVote(voteData: TVoteCreatePayload) {
    if (!voteData.voterCode) {
      throw new BadRequestException("Código inválido!", "NOT SUBMITTED");
    }

    if (!voteData.questionId) {
      throw new BadRequestException("Questão inválida!", "NOT SUBMITTED");
    }

    if (!voteData.optionId) {
      throw new BadRequestException("Opção inválida!", "NOT SUBMITTED");
    }

    const voter = await this.voterRepository.findByCode(voteData.voterCode);

    if (!voter) {
      throw new BadRequestException("Código inválido!", "VOTER NOT FOUND");
    }

    const alreadyVoted = await this.voteRepository.findByVoterIdAndQuestionId(
      voter.id,
      voteData.questionId
    );

    if (alreadyVoted) {
      if (alreadyVoted.optionId === voteData.optionId) {
        return alreadyVoted;
      }

      const vote = await this.voteRepository.update(
        voter.id,
        alreadyVoted.id,
        voteData.optionId
      );

      return vote;
    }

    const vote = await this.voteRepository.create(voter.id, voteData.optionId);

    return vote;
  }
}
