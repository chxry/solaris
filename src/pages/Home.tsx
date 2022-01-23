import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CalculatorIcon } from "@heroicons/react/solid";

import { NAME } from "../config";
import { Image, Button } from "../components";
import manny from "../assets/manny_becerra_unsplash.jpg";
import jeremy from "../assets/jeremy_bezanger_unsplash.jpg";

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center flex-wrap justify-center">{children}</div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Section>
        <Image
          src={manny}
          alt="row of solar panels"
          author="Manny Becerra"
          platform="Unsplash"
        />
        <div>
          <h1 className="text-6xl font-bold">
            {t("home.welcome to", { name: NAME })}
          </h1>
          <h2 className="text-2xl my-1">{t("common.tagline")}</h2>
          <Button large onClick={() => navigate("/planner")}>
            <CalculatorIcon className="h-8 mr-2" />
            {t("home.start")}
          </Button>
        </div>
      </Section>
      <Section>
        <div className="text-2xl w-2/5">
          <h1 className="text-5xl font-bold">
            {t("home.why.why", { name: NAME })}
          </h1>
          <p>• {t("home.why.1")}</p>
          <p>• {t("home.why.2")}</p>
          <p>• {t("home.why.3")}</p>
          <p>• {t("home.why.4")}</p>
        </div>
        <Image
          src={jeremy}
          alt="houses with solar panels"
          author="Jeremy Bezanger"
          platform="Unsplash"
        />
      </Section>
    </>
  );
};

export default Home;
