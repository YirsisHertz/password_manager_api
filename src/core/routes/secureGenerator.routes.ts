import { FastifyInstance } from "fastify";

import { SecureGeneratorController } from "../../secure-generator/controllers/secureGenerator.controller.js";

export const secureGeneratorRoutes = async (fastify: FastifyInstance) => {
  const secureGeneratorController = new SecureGeneratorController();

  fastify.post("/generate", secureGeneratorController.generateSecureString);
  fastify.post(
    "/disposable",
    secureGeneratorController.generateSecureStringDisposable
  );
};
