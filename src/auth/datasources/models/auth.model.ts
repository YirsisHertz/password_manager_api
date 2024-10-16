import bcrypt from "bcrypt";

import { AuthRepository } from "../../domain/repositories/auth.repository.js";

export class AuthModel extends AuthRepository {
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  }

  comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  login(email: string, password: string): string {
    throw new Error("Method not implemented.");
  }

  register(email: string, password: string): string {
    throw new Error("Method not implemented.");
  }

  generateToken(email: string): string {
    throw new Error("Method not implemented.");
  }

  verifyToken(token: string): string {
    throw new Error("Method not implemented.");
  }

  decodeToken(token: string): string {
    throw new Error("Method not implemented.");
  }

  refreshToken(token: string): string {
    throw new Error("Method not implemented.");
  }
}
