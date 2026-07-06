export interface PasswordPolicy {
  length: number;
  requireUpper: boolean;
  requireLower: boolean;
  requireDigits: boolean;
  requireSymbols: boolean;
}

export const DEFAULT_POLICY: PasswordPolicy = {
  length: 15,
  requireUpper: true,
  requireLower: true,
  requireDigits: true,
  requireSymbols: true,
};

export const PASSWORD_ALGORITHM_VERSION = 1;