import { pbkdf2Sync, randomBytes } from "node:crypto";

import { KeyDerivatorRepository } from "../../domain/repositories/keyDerivator.repository.js";

export class KeyDerivatorModel extends KeyDerivatorRepository {
  deriveKey(password: string, salt: string): string {
    const key = pbkdf2Sync(password, salt, 1000, 64, "sha256");

    return key.toString("hex");
  }

  generateSalt(): string {
    return randomBytes(16).toString("hex");
  }
}
