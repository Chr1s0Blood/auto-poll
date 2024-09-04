import express from "express";
import { appEnv } from "./config/env.js";
import { generateQuestionPrompt } from "./lib/gemini/prompts/generate-question.js";

const App = express()

App.use(express.json())
App.use(express.urlencoded({ extended: true }))

const PORT = appEnv


const result = await generateQuestionPrompt()

App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})