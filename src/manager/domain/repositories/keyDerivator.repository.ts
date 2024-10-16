export abstract class KeyDerivatorRepository {
  abstract deriveKey(password: string, salt: string): string;
  abstract generateSalt(): string;
}
