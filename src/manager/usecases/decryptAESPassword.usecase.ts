import { ManagerRepository } from "../domain/repositories/manager.repository.js";

export class DecryptAESPasswordUseCase {
  constructor(private readonly managerRepository: ManagerRepository) {}

  execute(encryptedPassword: string, masterKey: string) {
    return this.managerRepository.decipherPassword(
      encryptedPassword,
      masterKey
    );
  }
}
