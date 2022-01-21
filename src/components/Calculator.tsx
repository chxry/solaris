import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/solid";

import { Input } from ".";

const Calculator = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [shading, setShading] = useState(20);
  const [direction, setDirection] = useState(0);
  let sectionDefault = {
    width: 1000,
    height: 1000,
    gradient: 30,
  };
  const [currentSection, setCurrentSection] = useState(sectionDefault);

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">{t("calculator.project.title")}:</h1>
      <Input
        label={t("common.latitude")}
        unit="°"
        desc={t("calculator.project.latitude")}
        value={latitude}
        describe={() =>
          latitude > 0
            ? t("geo.northern")
            : latitude < 0
            ? t("geo.southern")
            : t("geo.equator")
        }
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          Math.abs(n) <= 90 && setLatitude(n);
        }}
      />
      <Input
        label={t("common.shading")}
        unit="%"
        desc={t("calculator.project.shading")}
        value={shading}
        describe={() =>
          shading < 20
            ? t("adjs.little")
            : shading < 60
            ? t("adjs.modest")
            : shading < 80
            ? t("adjs.significant")
            : shading !== 100
            ? t("adjs.heavy")
            : t("adjs.full")
        }
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          n >= 0 && n <= 100 && setShading(n);
        }}
      />
      <Input
        label={t("common.direction")}
        unit="°"
        desc={t("calculator.project.direction")}
        value={direction}
        describe={() => {
          let directions = [
            t("geo.n"),
            t("geo.ne"),
            t("geo.e"),
            t("geo.se"),
            t("geo.s"),
            t("geo.sw"),
            t("geo.w"),
            t("geo.nw"),
          ];
          return directions[Math.round(direction / 45) % 8];
        }}
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          n >= 0 && n <= 360 && setDirection(n);
        }}
      />
      <h1 className="text-2xl font-bold">{t("calculator.roof.title")}:</h1>
      <div className="bg-polar-3 p-2 rounded-t-md w-256 border-b-2 border-polar-0">
        <h2 className="font-bold text-xl">{t("calculator.roof.roof sections")}:</h2>
      </div>
      {sections.map((section, i) => (
        <div
          className="w-256 p-2 bg-polar-3 border-b-2 border-polar-0 text-lg"
          key={i}
        >
          <span className="font-bold">{i + 1}: </span>
          <span className="font-bold">{t("common.dimensions")}: </span>
          {section.width}×{section.height}mm
          <span className="font-bold"> - {t("common.area")}:</span>
          {section.width * section.height}mm²
          <span className="font-bold"> - {t("common.gradient")}: </span>
          {section.gradient}°
        </div>
      ))}
      <div className="flex w-256 bg-polar-3 p-2 rounded-b-md">
        <Input
          label={t("common.width")}
          unit="mm"
          value={currentSection.width}
          onChange={(e) => {
            let n = parseFloat(e.target.value);
            n >= 0 && setCurrentSection({ ...currentSection, ...{ width: n } });
          }}
        />
        <Input
          label={t("common.height")}
          unit="mm"
          value={currentSection.height}
          onChange={(e) => {
            let n = parseFloat(e.target.value);
            n >= 0 &&
              setCurrentSection({ ...currentSection, ...{ height: n } });
          }}
        />
        <Input
          label={t("common.gradient")}
          unit="°"
          value={currentSection.gradient}
          onChange={(e) => {
            let n = parseFloat(e.target.value);
            n >= 0 &&
              n <= 90 &&
              setCurrentSection({ ...currentSection, ...{ gradient: n } });
          }}
        />
        <button
          className="ml-auto p-1 rounded-md bg-polar-0 font-bold flex items-center transition-colors hover:bg-frost-2"
          onClick={() => {
            setSections([...sections, currentSection]);
            setCurrentSection(sectionDefault);
          }}
        >
          <PlusIcon className="h-6 mr-1" />
          {t("calculator.roof.add section")}
        </button>
      </div>
    </div>
  );
};

export default Calculator;
