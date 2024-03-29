import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(app);