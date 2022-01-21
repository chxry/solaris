import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CalculatorIcon } from "@heroicons/react/solid";

import { NAME } from "../config";
import image from "../assets/image.jpg";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-12 pb-0">{children}</div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Section>
        <img
          src={image}
          alt="solar panel on house"
          className="h-96 mr-12 rounded-xl"
        />
        <div>
          <h1 className="text-6xl font-bold">
            {t("home.welcome to", { name: NAME })}
          </h1>
          <h2 className="text-2xl my-1">{t("home.tagline")}</h2>
          <button
            className="p-2 text-2xl font-bold rounded-lg bg-polar-0 transition-colors hover:bg-frost-2 flex items-center"
            onClick={() => navigate("/calculator")}
          >
            <CalculatorIcon className="h-8 mr-2" />
            {t("home.start")}
          </button>
        </div>
      </Section>
      <Section>
        <div className="text-2xl">
          <h1 className="text-5xl font-bold">Why Solaris?</h1>
          <p>• Calculates the most panel positioning.</p>
          <p>• Estimages costs over time.</p>
          <p>• Factors latitude, direction and more.</p>
        </div>
        <div className="w-2/6"></div>
      </Section>
    </>
  );
};

export default Home;
