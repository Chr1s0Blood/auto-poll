import Fastify from "fastify";
import cors from "@fastify/cors";
import chalk from "chalk";
import { appEnv } from "./server/config/env.js";
import { UnauthorizedException } from "./server/exceptions/UnauthorizedException.js";
import { BaseException } from "./server/exceptions/BaseException.js";
import { setupHttpRoutes } from "./server/http/routes.js";

export const app = Fastify();

await app.register(cors, {
  credentials: true,
  allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  origin: (origin, cb) => {
    const splittedOrigins = appEnv.ALLOWED_ORIGINS.split(",").map((v) =>
      v.trim()
    );

    if (splittedOrigins.includes(origin || "")) {
      cb(null, true);
      return;
    }

    cb(new UnauthorizedException("Not allowed origin", "error"), false);
  },
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof BaseException) {
    const statusCode = error.statusCode || 500;
    return reply
      .status(statusCode)
      .send({ message: error.message, status: error.message, statusCode });
  }

  reply.status(500).send({ error: "Internal server error" });
});

await setupHttpRoutes(app);

const PORT = appEnv.PORT;

try {
  await app.listen({ port: PORT });
  console.log(chalk.gray(`Server running on port ${appEnv.PORT} 🤖`));
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
