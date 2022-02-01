import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";

import { Bar } from "./components";
import { Planner, NotFound, Home } from "./pages";
import { NAME, VERSION, initFirebase } from "./util";
import "./locale";

const App = () => {
  return (
    <main className="w-screen min-h-screen flex flex-col bg-polar-1 text-snow-0 font-body">
      <HashRouter>
        <Bar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </main>
  );
};

initFirebase();
console.log(
  `${NAME} v${VERSION} - React ${React.version} - ${process.env.NODE_ENV}`
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
