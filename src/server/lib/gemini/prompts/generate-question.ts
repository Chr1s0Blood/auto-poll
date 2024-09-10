import { modelPoll } from "../main.js";
import { TQuestionShemaFromRaw } from "../interfaces/main.interface.js";

function getPrompt(category: string) {
  return `Gere um título para uma votação e APENAS três opções de resposta. Seja criativo e que seja da categoria ${category}! (Mas mantendo o sentido)! (Em português brasileiro!). Evite temas perigosos, adultos (como sexo e relacionados), odio, etc.`;
}

export function generateQuestionPrompt(category: string) {
  return modelPoll.generateContent(getPrompt(category));
}

export function getQuestionSchemaFromRaw(
  rawJson: string
): TQuestionShemaFromRaw {
  const parsedJson = JSON.parse(rawJson);

  return parsedJson;
}
