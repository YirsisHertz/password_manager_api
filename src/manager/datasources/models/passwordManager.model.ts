import crypto from "crypto-js";

import { ManagerRepository } from "../../domain/repositories/manager.repository.js";

export class PasswordManagerModel extends ManagerRepository {
  cipherPassword(password: string, masterKey: string): string {
    return crypto.AES.encrypt(password, masterKey).toString();
  }

  decipherPassword(encryptedPassword: string, masterKey: string): string {
    const bytes = crypto.AES.decrypt(encryptedPassword, masterKey);
    return bytes.toString(crypto.enc.Utf8);
  }

  storePasswordSecurely(password: string, masterKey: string): string {
    throw new Error("Method not implemented.");
  }

  retrivedPassword(
    encryptedPassword: string,
    masterKey: string,
    salt: string
  ): string {
    throw new Error("Method not implemented.");
  }
}
