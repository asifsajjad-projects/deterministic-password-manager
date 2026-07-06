import { encodeUtf8, decodeUtf8 } from "./utf8";
import { deriveMasterKey } from "./pbkdf2";
import { base64ToBytes, bytesToBase64 } from "./base64";

export interface EncryptedVaultFile {
  version: 1;
  salt: string;
  iv: string;
  data: string;
}

export async function encryptVault(params: {
  masterPassword: string;
  vault: unknown;
}): Promise<EncryptedVaultFile> {
  const salt = crypto.getRandomValues(
    new Uint8Array(16)
  ) as Uint8Array<ArrayBuffer>;

  const iv = crypto.getRandomValues(
    new Uint8Array(12)
  ) as Uint8Array<ArrayBuffer>;

  const key = await deriveMasterKey(
    params.masterPassword,
    salt
  );

  const plaintext = encodeUtf8(
    JSON.stringify(params.vault)
  );

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );

  return {
    version: 1,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(
      new Uint8Array(ciphertext)
    ),
  };
}

export async function decryptVault(params: {
  masterPassword: string;
  file: EncryptedVaultFile;
}): Promise<any> {
  const salt = base64ToBytes(params.file.salt);
  const iv = base64ToBytes(params.file.iv);
  const data = base64ToBytes(params.file.data);

  const key = await deriveMasterKey(
    params.masterPassword,
    salt
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return JSON.parse(decodeUtf8(decrypted));
}