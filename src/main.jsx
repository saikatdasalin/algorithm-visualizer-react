import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { useAppStore } from "./store/useAppStore";
import appLogo from "./assets/logo.png";

useAppStore.getState().initializeTheme();

const favicon = document.querySelector("link[rel='icon']") ?? document.createElement("link");
favicon.setAttribute("rel", "icon");
favicon.setAttribute("type", "image/png");
favicon.setAttribute("href", appLogo);
if (!favicon.parentNode) {
  document.head.appendChild(favicon);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "rgba(15, 23, 42, 0.95)",
            color: "#e2e8f0",
            border: "1px solid rgba(56, 189, 248, 0.35)",
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
