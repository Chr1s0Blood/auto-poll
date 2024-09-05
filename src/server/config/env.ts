import { cleanEnv, port, str } from "envalid";

export const appEnv = cleanEnv(process.env,{
    PORT: port({
        default: 3000,
        desc: "The port that the server should listen on."
    }),
    NODE_ENV: str({
        default: "development",
        choices: ["development", "production"]
    }),
    GEMINI_API_KEY: str({
        desc: "The API key for the Gemini API."
    }),
    GEMINI_MODEL: str({
        default: "gemini-1.5-flash",
        desc: "The model to use for the Gemini API."
    }),
    DATABASE_URL: str({
        desc: "The URL for the database."
    }),
    ALLOWED_ORIGINS: str()
})