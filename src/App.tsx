import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Vault from "./pages/Vault";
import Settings from "./pages/Settings";
import { useVault } from "./context/VaultContext";

export default function App() {
  const { masterPassword, setMasterPassword } = useVault();
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Unlock Vault</h2>

        <input
          type="password"
          placeholder="Master password"
          value={masterPassword}
          onChange={(e) =>
            setMasterPassword(e.target.value)
          }
          style={{ padding: 10, width: 300 }}
        />

        <br />
        <br />

        <button onClick={() => setUnlocked(true)}>
          Unlock
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/deterministic-password-manager/">
    <div style={{ padding: 20 }}>
      <Home />
      <hr />
      <Vault />
      <hr />
      <Settings />
    </div>
    </BrowserRouter>
  );
}