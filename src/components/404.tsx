import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-9xl text-bold">404</h1>
      <p className="text-3xl">Page not found.</p>
      <a
        className="text-xl underline cursor-pointer transition-colors hover:text-frost-2"
        onClick={() => navigate("/")}
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
