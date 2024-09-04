import { model } from "../main.js";

const promptContent = "Com base nas principais notícias dos últimos 7 dias, gere um título para uma votação e quatro opções de resposta."

export function generateQuestionPrompt() {
    return model.generateContent(promptContent)
}
