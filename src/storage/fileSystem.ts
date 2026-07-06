import {
  EncryptedVaultFile,
} from "../crypto/vaultCrypto";

let fileHandle: FileSystemFileHandle | null = null;

export async function pickVaultFile(): Promise<void> {
  // @ts-ignore
  fileHandle = await window.showSaveFilePicker({
    suggestedName: "vault.enc",
    types: [
      {
        description: "Encrypted Vault",
        accept: {
          "application/octet-stream": [".enc"],
        },
      },
    ],
  });
}

export async function writeVaultFile(
  data: EncryptedVaultFile
) {
  if (!fileHandle) {
    await pickVaultFile();
  }

  const writable = await fileHandle!.createWritable();

  await writable.write(
    JSON.stringify(data, null, 2)
  );

  await writable.close();
}

export async function readVaultFile() {
  if (!fileHandle) {
    // @ts-ignore
    [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Encrypted Vault",
          accept: {
            "application/octet-stream": [".enc"],
          },
        },
      ],
    });
  }

  const file = await fileHandle!.getFile();
  return JSON.parse(await file.text());
}