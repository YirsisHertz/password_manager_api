import { KeyDerivatorRepository } from "../domain/repositories/keyDerivator.repository.js";

export class CreateSaltUseCase {
  constructor(private keyDerivatorRepository: KeyDerivatorRepository) {}

  public execute() {
    return this.keyDerivatorRepository.generateSalt();
  }
}
