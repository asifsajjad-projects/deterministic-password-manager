import React from "react";
import ReactDOM from "react-dom/client";
import { updateSW } from "./pwa";

import App from "./App";
import { VaultProvider } from "./context/VaultContext";

updateSW();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <VaultProvider>
      <App />
    </VaultProvider>
  </React.StrictMode>
);