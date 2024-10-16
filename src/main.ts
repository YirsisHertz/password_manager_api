import Fastify from "fastify";

import cors from "@fastify/cors";
import { passwordManagerRoutes } from "./core/routes/passwordManager.routes.js";
import { secureGeneratorRoutes } from "./core/routes/secureGenerator.routes.js";

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {});

// await fastify.register(fastifyJwt, {
//   secret: process.env.JWT_SECRET
// } as any);

// fastify.register(postgresPlugin);

fastify.register(secureGeneratorRoutes, {
  prefix: "/secure-generator"
});
fastify.register(passwordManagerRoutes, {
  prefix: "/manager"
});

await fastify.listen({
  port: +(process.env.PORT || 3000)
});
