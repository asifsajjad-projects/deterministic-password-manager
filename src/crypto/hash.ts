import { encodeUtf8 } from "./utf8";

export async function sha256(
  value: string,
): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encodeUtf8(value),
  );

  return new Uint8Array(digest);
}