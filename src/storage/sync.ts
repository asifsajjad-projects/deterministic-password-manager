import {
  encryptVault,
  decryptVault,
  EncryptedVaultFile,
} from "../crypto/vaultCrypto";

import {
  getVault,
  setVault,
} from "./vaultMemory";

import {
  writeVaultFile,
  readVaultFile,
} from "./fileSystem";

import {
  saveVaultCache,
  loadVaultCache,
} from "./indexedDb";

export async function syncExport(masterPassword: string) {
  const vault = getVault();

  const encrypted = await encryptVault({
    masterPassword,
    vault,
  });

  await writeVaultFile(encrypted);
  await saveVaultCache(encrypted);
}

export async function syncImport(masterPassword: string) {
  const file = await readVaultFile();

  const decrypted = await decryptVault({
    masterPassword,
    file,
  });

  setVault(decrypted);
  await saveVaultCache(file);
}

export async function autoLoad(masterPassword: string) {
  const cached = await loadVaultCache();

  if (!cached) return;

  const decrypted = await decryptVault({
    masterPassword,
    file: cached as EncryptedVaultFile,
  });

  setVault(decrypted);
}