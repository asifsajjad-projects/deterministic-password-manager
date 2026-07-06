import { useVault } from "../context/VaultContext";

export default function Vault() {
  const { vault } = useVault();

  return (
    <div>
      <h2>Vault</h2>

      {Object.values(vault.entries).length === 0 && (
        <p>No entries yet</p>
      )}

      <ul>
        {Object.values(vault.entries).map((e) => (
          <li key={e.website}>
            <b>{e.website}</b>
            <br />
            version: {e.version}
          </li>
        ))}
      </ul>
    </div>
  );
}