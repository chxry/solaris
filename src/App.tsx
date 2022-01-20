import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotFound } from "./components";

const App = () => {
  return (
    <main className="w-screen h-screen flex flex-col bg-polar-1 text-snow-2 font-body">
      <div className="w-full p-2 bg-polar-0 text-xl flex">
        <h1 className="text-snow-0 font-bold mr-2">Solaris</h1>v0.1
      </div>
      <div className="flex-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>hi</h1>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

export default App;
