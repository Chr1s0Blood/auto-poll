
import { modelPoll } from "../main.js";
import { IQuestionShemaFromRaw } from '../interfaces/main.interface.js';

const promptContent = "Gere um título para uma votação e APENAS três opções de resposta. Seja criativo e aleatório (Mas mantendo o sentido)! (Em português brasileiro!). Evite temas perigosos, adultos (como sexo e relacionados), odio, etc."

export function generateQuestionPrompt() {
    return modelPoll.generateContent(promptContent)
}

export function getQuestionSchemaFromRaw (rawJson: string): IQuestionShemaFromRaw {

    const parsedJson = JSON.parse(rawJson)

    return parsedJson

}