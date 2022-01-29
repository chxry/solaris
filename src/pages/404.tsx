import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center flex-col ">
      <h1 className="text-[12rem] text-bold font-extrabold font-display hover:animate-pulse">
        404
      </h1>
      <p className="text-4xl">{t("404.not found")}</p>
      <a
        className="text-3xl underline cursor-pointer transition-colors hover:text-frost-2 pt-4 "
        onClick={() => navigate("/")}
      >
        {t("404.go home")}
      </a>
    </div>
  );
};

export default NotFound;
