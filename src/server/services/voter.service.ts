import VoterManager from "../database/voter.manager.js";
import { BadRequestException } from "../exceptions/BadRequestException.js";
import { getCountry, getStateProvince } from "../utils/country.js";
import { genNanoId } from "../utils/nanoid.js";

interface VoterCreatePayload {
  country: string;
  state: string;
}

export default class VoterService {
  private voterRepository: VoterManager;

  constructor() {
    this.voterRepository = new VoterManager();
  }

  async create(data: Partial<VoterCreatePayload>) {
    if (!data.country || !data.state) {
      throw new BadRequestException(
        "O país e o seu estado é nesseário!",
        "COUNTRY OR STATE NOT SUBMITTED"
      );
    }

    const countryData = getCountry(data.country);

    if (!countryData) {
      throw new BadRequestException("País inválido!", "INVALID COUNTRY");
    }

    const stateData = getStateProvince(data.country, data.state);

    if (!stateData) {
      throw new BadRequestException("Estado inválido!", "INVALID STATE");
    }

    const code = genNanoId();

    const voter = await this.voterRepository.create({
      code: code,
      country: data.country,
      state: data.state,
    });

    return voter;
  }

  async getVoterByCode(code?: string) {
    if (!code) {
      throw new BadRequestException(
        "Código inválido!",
        "INVALID CODE - NOT SUBMITTED"
      );
    }

    const voter = await this.voterRepository.findByCode(code);

    return voter;
  }
}
