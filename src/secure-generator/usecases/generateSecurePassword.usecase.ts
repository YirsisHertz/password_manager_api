import { SecurityLevelParams } from "../domain/entities/params/securityLevel.params.js";
import { SecureGeneratorRepository } from "../domain/repositories/secureGenerator.repository.js";

export class GenerateSecurePasswordUseCase {
  constructor(
    private readonly secureGeneratorRepository: SecureGeneratorRepository
  ) {}

  execute(params: SecurityLevelParams) {
    return this.secureGeneratorRepository.generateSecureString(params);
  }
}
