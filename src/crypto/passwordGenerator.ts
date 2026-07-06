import { deriveSiteSeed } from "./passwordKdf";
import { CHARSETS } from "./constants";
import { PasswordPolicy } from "../types/password";

const ALL =
  CHARSETS.upper +
  CHARSETS.lower +
  CHARSETS.digits +
  CHARSETS.symbols;

/**
 * Deterministic fast password generator (NO loops, NO async inside loops)
 */
export async function generatePassword(params: {
  masterPassword: string;
  website: string;
  version: number;
  policy: PasswordPolicy;
}): Promise<string> {
  const seed = await deriveSiteSeed(params);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    seed
  );

  const bytes = new Uint8Array(hashBuffer);

  const result: string[] = [];

  // deterministic mapping (NO await loops)
  let index = 0;

  const pick = (set: string, b: number) =>
    set[b % set.length];

  // guaranteed character classes
  result.push(pick(CHARSETS.upper, bytes[index++]));
  result.push(pick(CHARSETS.lower, bytes[index++]));
  result.push(pick(CHARSETS.digits, bytes[index++]));

  if (params.policy.requireSymbols) {
    result.push(pick(CHARSETS.symbols, bytes[index++]));
  }

  while (result.length < params.policy.length) {
    result.push(pick(ALL, bytes[index % bytes.length]));
    index++;
  }

  // fast deterministic shuffle (Fisher-Yates, sync)
  for (let i = result.length - 1; i > 0; i--) {
    const j = bytes[i % bytes.length] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, params.policy.length).join("");
}