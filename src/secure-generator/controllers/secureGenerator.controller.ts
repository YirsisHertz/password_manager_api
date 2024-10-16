import { FastifyReply, FastifyRequest } from "fastify";
import { SecureGeneratorAdapter } from "../adapters/secureGenerator.adapter.js";
import { SecureGeneratorModel } from "../datasources/models/secureGenerator.model.js";
import { SecurityClassification } from "../domain/entities/responses/securePassword.response.js";
import { GenerateSecurePasswordUseCase } from "../usecases/generateSecurePassword.usecase.js";

interface RequestBody {
  length: number;
  level: SecurityClassification;
}

const secureGeneratorModel = new SecureGeneratorModel();

export class SecureGeneratorController {
  public async generateSecureString(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const { length, level } = request.body as RequestBody;

      const securityLevelParams =
        SecureGeneratorAdapter.securityLevelParamsAdapter({
          level,
          length
        });

      const { secureString, securityLevel } = new GenerateSecurePasswordUseCase(
        secureGeneratorModel
      ).execute(securityLevelParams);

      return reply.send({ secureString, securityLevel });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    }
  }

  public async generateSecureStringDisposable(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const length = 20;
      const level = "high";

      const securityLevelParams =
        SecureGeneratorAdapter.securityLevelParamsAdapter({
          level,
          length
        });

      const { secureString } = new GenerateSecurePasswordUseCase(
        secureGeneratorModel
      ).execute(securityLevelParams);

      return reply.send({ secureString, securityLevel: level });
    } catch (error: any) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
