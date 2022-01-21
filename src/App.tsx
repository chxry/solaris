import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Bar, Calculator, NotFound, Home } from "./components";
import "./locale";

const App = () => {
  const { t } = useTranslation();

  return (
    <main className="w-screen h-screen flex flex-col bg-polar-1 text-snow-0 font-body">
      <Bar />
      <div className="flex-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
