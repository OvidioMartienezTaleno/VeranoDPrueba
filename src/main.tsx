import React from "react";
import ReactDOM from "react-dom/client";
import "./components/i18n";
import App from "./App";

// Usamos createRoot en lugar de render
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
