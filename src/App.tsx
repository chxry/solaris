import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Bar, Planner, NotFound, Home } from "./components";
import { NAME, VERSION } from "./config";
import "./locale";

const App = () => {
  const { t } = useTranslation();

  return (
    <main className="w-screen h-screen flex flex-col bg-polar-1 text-snow-0 font-body">
      <div className="flex-1">
        <BrowserRouter>
          <Bar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

console.log(`${NAME} v${VERSION} - React ${React.version}`);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
