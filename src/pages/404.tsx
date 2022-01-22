import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import goose from "../assets/404_goose.png";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center flex-col md:flex-row">
      <img src={goose} className="w-96" />
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-bold">404</h1>
        <p className="text-3xl">{t("404.not found")}</p>
        <a
          className="text-xl underline cursor-pointer transition-colors hover:text-frost-2"
          onClick={() => navigate("/")}
        >
          {t("404.go home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
