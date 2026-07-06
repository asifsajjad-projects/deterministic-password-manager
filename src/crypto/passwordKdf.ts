import { encodeUtf8 } from "./utf8";

/**
 * We derive a site-specific seed using PBKDF2.
 * This seed is then used as deterministic randomness.
 */
export async function deriveSiteSeed(params: {
  masterPassword: string;
  website: string;
  version: number;
}): Promise<Uint8Array> {
  const { masterPassword, website, version } = params;

  const salt = encodeUtf8(`${website}:${version}`);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encodeUtf8(masterPassword),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: 250_000,
      salt,
    },
    keyMaterial,
    512
  );

  return new Uint8Array(bits);
}