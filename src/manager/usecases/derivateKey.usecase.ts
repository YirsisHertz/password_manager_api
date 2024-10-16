import { KeyDerivatorRepository } from "../domain/repositories/keyDerivator.repository.js";

export class DerivateKeyUseCase {
  constructor(private keyDerivatorRepository: KeyDerivatorRepository) {}

  public execute(password: string, salt: string) {
    return this.keyDerivatorRepository.deriveKey(password, salt);
  }
}
