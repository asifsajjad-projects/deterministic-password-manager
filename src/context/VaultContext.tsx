import React, { createContext, useContext, useState } from "react";
import { VaultState } from "../storage/vaultTypes";
import { emptyVault } from "../storage/vaultMemory";

interface VaultContextType {
  vault: VaultState;
  setVault: (v: VaultState) => void;
  masterPassword: string;
  setMasterPassword: (v: string) => void;
}

const VaultContext = createContext<VaultContextType | null>(null);

export function VaultProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vault, setVault] = useState<VaultState>(emptyVault);
  const [masterPassword, setMasterPassword] = useState("");

  return (
    <VaultContext.Provider
      value={{
        vault,
        setVault,
        masterPassword,
        setMasterPassword,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("VaultProvider missing");
  return ctx;
}