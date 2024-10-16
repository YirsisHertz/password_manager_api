export abstract class ManagerRepository {
  abstract cipherPassword(password: string, masterKey: string): string;

  abstract decipherPassword(
    encryptedPassword: string,
    masterKey: string
  ): string;

  abstract storePasswordSecurely(password: string, masterKey: string): string;

  abstract retrivedPassword(
    encryptedPassword: string,
    masterKey: string,
    salt: string
  ): string;
}
