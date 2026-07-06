const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function toBase62(bytes: Uint8Array): string {
  let result = "";

  for (const b of bytes) {
    result += ALPHABET[b % ALPHABET.length];
  }

  return result;
}