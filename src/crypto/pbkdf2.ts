import { encodeUtf8 } from "./utf8";

const ITERATIONS = 310_000;

export async function deriveMasterKey(
  masterPassword: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const material = await crypto.subtle.importKey(
    "raw",
    encodeUtf8(masterPassword),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: ITERATIONS,
      salt,
    },
    material,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function deriveBits(
  masterPassword: string,
  salt: Uint8Array,
  bits: number,
): Promise<Uint8Array> {
  const material = await crypto.subtle.importKey(
    "raw",
    encodeUtf8(masterPassword),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const result = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: ITERATIONS,
      salt,
    },
    material,
    bits,
  );

  return new Uint8Array(result);
}