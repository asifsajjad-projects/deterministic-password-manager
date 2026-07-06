import { useState } from "react";
import { useVault } from "../context/VaultContext";
import {
  syncExport,
  syncImport,
} from "../storage/sync";

export default function Settings() {
  const { masterPassword } = useVault();
  const [status, setStatus] = useState("");

  async function exportVault() {
    await syncExport(masterPassword);
    setStatus("Exported successfully");
  }

  async function importVault() {
    await syncImport(masterPassword);
    setStatus("Imported successfully");
  }

  return (
    <div>
      <h2>Settings</h2>

      <button onClick={exportVault}>
        Export Vault
      </button>

      <button onClick={importVault}>
        Import Vault
      </button>

      <p>{status}</p>
    </div>
  );
}