import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CalculatorIcon } from "@heroicons/react/solid";

import { NAME } from "../config";
import { Image } from ".";
import image from "../assets/manny_becerra_unsplash.jpg";
import lol from "../assets/jeremy_bezanger_unsplash.jpg";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center flex-wrap justify-center p-12 pb-0">
      {children}
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Section>
        <Image
          src={image}
          alt="row of solar panels"
          author="Manny Becerra"
          platform="Unsplash"
        />
        <div>
          <h1 className="text-6xl font-bold">
            {t("home.welcome to", { name: NAME })}
          </h1>
          <h2 className="text-2xl my-1">{t("common.tagline")}</h2>
          <button
            className="p-2 text-2xl font-bold rounded-lg bg-polar-0 transition-colors hover:bg-frost-2 flex items-center"
            onClick={() => navigate("/planner")}
          >
            <CalculatorIcon className="h-8 mr-2" />
            {t("home.start")}
          </button>
        </div>
      </Section>
      <Section>
        <div className="text-2xl">
          <h1 className="text-5xl font-bold">
            {t("home.why", { name: NAME })}
          </h1>
          <p>• Calculates the most efficient panel positioning.</p>
          <p>• Estimates costs over time.</p>
          <p>• Factors latitude, direction and more.</p>
        </div>
        <Image
          src={lol}
          alt="houses with solar panels"
          author="Jeremy Bezanger"
          platform="Unsplash"
        />
      </Section>
    </>
  );
};

export default Home;
