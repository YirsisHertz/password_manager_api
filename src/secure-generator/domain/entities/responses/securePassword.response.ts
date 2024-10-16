export type SecurityClassification = "low" | "medium" | "high" | "very-high";

export interface SecurePasswordResponse {
  secureString: string;
  securityLevel: SecurityClassification;
}
