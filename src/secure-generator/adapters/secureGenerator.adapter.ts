import { SecurityLevelParams } from "../domain/entities/params/securityLevel.params.js";
import { SecurityClassification } from "../domain/entities/responses/securePassword.response.js";

interface SecurityLevelParamsInput {
  level: SecurityClassification;
  length: number;
}

export class SecureGeneratorAdapter {
  static securityLevelParamsAdapter({
    level,
    length
  }: SecurityLevelParamsInput): SecurityLevelParams {
    if (level === "low") {
      if (length < 8 || length > 12)
        throw new Error("Invalid length for low security level: 8-12");

      return {
        includeLowercase: true,
        includeNumbers: false,
        includeSymbols: false,
        includeUppercase: true,
        length
      };
    }

    if (level === "medium") {
      if (length < 12 || length > 16)
        throw new Error("Invalid length for medium security level: 12-16");

      return {
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
        includeUppercase: true,
        length
      };
    }

    if (level === "high") {
      if (length < 16 || length > 20)
        throw new Error("Invalid length for high security level: 16-20");

      return {
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        includeUppercase: true,
        length
      };
    }

    if (level === "very-high") {
      if (length < 20 || length > 255)
        throw new Error("Invalid length for very-high security level: 20-255");

      return {
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        includeUppercase: true,
        length
      };
    }

    throw new Error("Invalid security level");
  }
}
