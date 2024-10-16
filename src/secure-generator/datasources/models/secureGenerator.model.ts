import { SecurityLevelParams } from "../../domain/entities/params/securityLevel.params.js";
import {
  SecurePasswordResponse,
  SecurityClassification
} from "../../domain/entities/responses/securePassword.response.js";
import { SecureGeneratorRepository } from "../../domain/repositories/secureGenerator.repository.js";

export class SecureGeneratorModel extends SecureGeneratorRepository {
  private generateTraditionalString(chars: string, length: number): string {
    let password = "";

    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }

  private generateLowSecurityString(length: number): string {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return this.generateTraditionalString(chars, length);
  }

  private generateMediumSecurityString(length: number): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    return this.generateTraditionalString(chars, length);
  }

  private generateHighSecurityString(length: number): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";

    return this.generateTraditionalString(chars, length);
  }

  private generateVeryHighSecurityString(length: number): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
    let password = "";

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_-+=";

    password += lower.charAt(Math.floor(Math.random() * lower.length));
    password += upper.charAt(Math.floor(Math.random() * upper.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  }

  generateSecureString(
    securityLevel: SecurityLevelParams
  ): SecurePasswordResponse {
    const { length } = securityLevel;

    if (length < 8)
      throw new Error("The password must be at least 8 characters long");

    if (length > 255)
      throw new Error("The password must be at most 255 characters long");

    const securityLevelClassification =
      this.comprobateSecurityLevel(securityLevel);

    if (securityLevelClassification === "low")
      return {
        secureString: this.generateLowSecurityString(length),
        securityLevel: securityLevelClassification
      };

    if (securityLevelClassification === "medium")
      return {
        secureString: this.generateMediumSecurityString(length),
        securityLevel: securityLevelClassification
      };

    if (securityLevelClassification === "high")
      return {
        secureString: this.generateHighSecurityString(length),
        securityLevel: securityLevelClassification
      };

    if (securityLevelClassification === "very-high")
      return {
        secureString: this.generateVeryHighSecurityString(length),
        securityLevel: securityLevelClassification
      };

    throw new Error("Invalid security level");
  }

  comprobateSecurityLevel(
    securityLevel: SecurityLevelParams
  ): SecurityClassification {
    const {
      includeLowercase,
      includeNumbers,
      includeSymbols,
      includeUppercase,
      length
    } = securityLevel;

    if (!includeLowercase)
      throw new Error("The password must include lowercase characters");

    if (!includeUppercase)
      throw new Error("The password must include uppercase characters");

    if (
      length >= 8 &&
      length < 12 &&
      includeUppercase &&
      includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      return "low";
    }

    if (
      length >= 12 &&
      length < 16 &&
      includeUppercase &&
      includeLowercase &&
      includeNumbers &&
      !includeSymbols
    ) {
      return "medium";
    }

    if (
      length >= 16 &&
      length < 20 &&
      includeUppercase &&
      includeLowercase &&
      includeNumbers &&
      includeSymbols
    ) {
      return "high";
    }

    if (
      length >= 20 &&
      length < 256 &&
      includeUppercase &&
      includeLowercase &&
      includeNumbers &&
      includeSymbols
    ) {
      return "very-high";
    }

    throw new Error("Invalid security level");
  }
}
