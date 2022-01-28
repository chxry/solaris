import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CalculatorIcon } from "@heroicons/react/solid";

import { NAME } from "../util";
import { Button } from "../components";
import markus from "../assets/markus-winkler-unsplash.jpg";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex relative">
        <img src={markus} className="flex-1 h-96 md:h-128 object-cover" />
        <p className="absolute bottom-0 text-sm bg-black bg-opacity-40 rounded-tr-md p-0.5">
          {t("attribute photo", {
            author: "Markus Winkler",
            platform: "Unsplash",
          })}
        </p>
        <div className="absolute bottom-0 top-0 left-0 right-0 bg-black bg-opacity-50 p-8 md:p-32 space-y-1">
          <h1 className="text-4xl md:text-7xl font-display font-extrabold">
            {t("home.welcome to", { name: NAME })}
          </h1>
          <h2 className="text-xl md:text-3xl">{t("common.tagline")}</h2>
          <Button large onClick={() => navigate("/planner")}>
            <CalculatorIcon className="h-8 mr-2" />
            {t("home.start")}
          </Button>
        </div>
      </div>
      <div className="text-xl md:text-2xl m-4 md:m-12">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold">
          {t("home.why.why", { name: NAME })}
        </h1>
        <p>• {t("home.why.1")}</p>
        <p>• {t("home.why.2")}</p>
        <p>• {t("home.why.3")}</p>
        <p>• {t("home.why.4")}</p>
      </div>
    </>
  );
};

export default Home;
