export interface VaultEntry {
  website: string;
  version: number;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface VaultState {
  entries: Record<string, VaultEntry>;
}