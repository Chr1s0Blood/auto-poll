import { prisma } from "../config/db.js"
import { DatabaseException } from "../exceptions/DatabaseException.js"


interface VoterDTO {
    code: string
    country: string
    state: string
}

export default class VoterManager {

    private voterModel: (typeof prisma['voter'])

    constructor () {
        this.voterModel = prisma.voter
    }

    async create (data: VoterDTO) {

        return this.voterModel.create({
            data: {
                code: data.code,
                country: data.country,
                state: data.state
            }
        }).catch((error) => {
            throw new DatabaseException("Error creating voter", error)
        })

    }

    async findByCode (code: string) {

        return this.voterModel.findUnique({
            where: {
                code,
                isActive: true
            }
        }).catch((error) => {
            throw new DatabaseException("Error finding voter", error)
        })

    }

}