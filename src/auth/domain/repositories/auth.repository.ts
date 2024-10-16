export abstract class AuthRepository {
  abstract hashPassword(password: string): string;
  abstract comparePassword(password: string, hashedPassword: string): boolean;
  abstract login(email: string, password: string): string;
  abstract register(email: string, password: string): string;
  abstract generateToken(email: string): string;
  abstract verifyToken(token: string): string;
  abstract decodeToken(token: string): string;
  abstract refreshToken(token: string): string;
}
