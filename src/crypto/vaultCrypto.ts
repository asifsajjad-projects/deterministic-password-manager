import { encodeUtf8, decodeUtf8 } from "./utf8";
import { deriveMasterKey } from "./pbkdf2";
import { base64ToBytes, bytesToBase64 } from "./base64";

export interface EncryptedVaultFile {
  version: 1;
  salt: string;
  iv: string;
  data: string;
}

function toBytes(b64: string) {
  return base64ToBytes(b64);
}

function fromBytes(bytes: Uint8Array) {
  return bytesToBase64(bytes);
}

export async function encryptVault(params: {
  masterPassword: string;
  vault: unknown;
}): Promise<EncryptedVaultFile> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

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
    salt: fromBytes(salt),
    iv: fromBytes(iv),
    data: fromBytes(new Uint8Array(ciphertext)),
  };
}

export async function decryptVault(params: {
  masterPassword: string;
  file: EncryptedVaultFile;
}): Promise<any> {
  const salt = toBytes(params.file.salt);
  const iv = toBytes(params.file.iv);
  const data = toBytes(params.file.data);

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