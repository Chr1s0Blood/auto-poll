
import { modelPoll } from "../main.js";
import { IQuestionShemaFromRaw } from '../interfaces/main.interface.js';

const promptContent = "Gere um título para uma votação e quatro opções de resposta. Seja criativo e aleatório!"

export function generateQuestionPrompt() {
    return modelPoll.generateContent(promptContent)
}

export function getQuestionSchemaFromRaw (rawJson: string): IQuestionShemaFromRaw {

    const parsedJson = JSON.parse(rawJson)

    return parsedJson

}