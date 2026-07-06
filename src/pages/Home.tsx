import { useState } from "react";
import { generatePassword } from "../crypto/passwordGenerator";
import { useVault } from "../context/VaultContext";

export default function Home() {
  const { masterPassword } = useVault();

  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");

  async function handleGenerate() {
    const result = await generatePassword({
      masterPassword,
      website,
      version: 1,
      policy: {
        length: 15,
        requireUpper: true,
        requireLower: true,
        requireDigits: true,
        requireSymbols: true,
      },
    });

    setPassword(result);
  }

  async function copy() {
    await navigator.clipboard.writeText(password);
  }

  return (
    <div>
      <h2>Generate Password</h2>

      <input
        placeholder="Website (e.g. github.com)"
        value={website}
        onChange={(e) =>
          setWebsite(e.target.value)
        }
        style={{ padding: 10, width: 300 }}
      />

      <br />
      <br />

      <button onClick={handleGenerate}>
        Generate
      </button>

      <br />
      <br />

      {password && (
        <>
          <code>{password}</code>
          <br />
          <br />
          <button onClick={copy}>Copy</button>
        </>
      )}
    </div>
  );
}