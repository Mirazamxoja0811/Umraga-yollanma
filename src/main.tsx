import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import "./fonts.css";
import "./styles.css";
import "./components/agency.css";
import "./typography.css";
import "./components/enhancements.css";
import "./global-fixes.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
