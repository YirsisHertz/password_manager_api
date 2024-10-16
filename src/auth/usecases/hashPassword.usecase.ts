import { AuthRepository } from "../domain/repositories/auth.repository.js";

export class HashPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(password: string) {
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters long");

    if (password.length > 255)
      throw new Error("Password must be at most 255 characters long");

    return this.authRepository.hashPassword(password);
  }
}
