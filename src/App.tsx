import React from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Bar, Calculator, NotFound } from "./components";
import "./locale";

const App = () => {
  const { t } = useTranslation();

  return (
    <main className="w-screen h-screen flex flex-col bg-polar-1 text-snow-0 font-body">
      <Bar />
      <div className="flex-1">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="m-4 text-2xl font-bold">{t("welcome")}</h1>
              }
            />
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
