import { SecurityLevelParams } from "../entities/params/securityLevel.params.js";
import {
  SecurePasswordResponse,
  SecurityClassification
} from "../entities/responses/securePassword.response.js";

export abstract class SecureGeneratorRepository {
  abstract generateSecureString(
    securityLevel: SecurityLevelParams
  ): SecurePasswordResponse;

  abstract comprobateSecurityLevel(
    securityLevel: SecurityLevelParams
  ): SecurityClassification;
}
