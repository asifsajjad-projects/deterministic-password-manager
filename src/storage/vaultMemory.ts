import { VaultState } from "./vaultTypes";

export const emptyVault: VaultState = {
  entries: {},
};

let state: VaultState = emptyVault;

export function getVault(): VaultState {
  return state;
}

export function setVault(v: VaultState) {
  state = v;
}

export function upsertEntry(entry: VaultState["entries"][string]) {
  state.entries[entry.website] = entry;
}