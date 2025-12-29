import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
