import { ManagerRepository } from "../domain/repositories/manager.repository.js";

export class EncryptAESPasswordUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  execute(password: string, masterKey: string) {
    return this.managerRepository.cipherPassword(password, masterKey);
  }
}
