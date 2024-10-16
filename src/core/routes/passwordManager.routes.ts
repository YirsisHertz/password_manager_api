import { FastifyInstance } from "fastify";
import { PasswordManagerController } from "../../manager/controllers/passwordManager.controller.js";

export const passwordManagerRoutes = (fastify: FastifyInstance) => {
  const passwordManagerController = new PasswordManagerController();

  // fastify.post("/generate-salt", passwordManagerController.generateSalt);
  fastify.post("/derivate-key", passwordManagerController.derivateKey);
  fastify.post("/encrypt", passwordManagerController.cipherPassword);
  fastify.post("/decrypt", passwordManagerController.decipherPassword);
};
