import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon, TrashIcon, ArrowSmRightIcon } from "@heroicons/react/solid";

import { Input, Button } from "../components";

enum Page {
  project,
  roof,
  panels,
}

const planner = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(Page.project);
  const [latitude, setLatitude] = useState(0);
  const [shading, setShading] = useState(20);
  const [direction, setDirection] = useState(0);
  const [sections, setSections] = useState([]);
  let sectionDefault = {
    width: 3,
    height: 3,
    gradient: 30,
  };
  const [currentSection, setCurrentSection] = useState(sectionDefault);

  return (
    <>
      <div className="w-full flex border-b-2 border-polar-0">
        {Object.keys(Page).map(
          (p, i) =>
            isNaN(p as any) && (
              <button
                key={p}
                className={
                  "p-4 border-r-2 border-polar-0 transition-colors hover:bg-frost-2" +
                  (page === Page[p] ? " bg-polar-2" : "")
                }
                onClick={() => setPage(Page[p])}
              >
                {i - 2}. {t("planner." + p + ".title")}
              </button>
            )
        )}
      </div>
      <div className="m-4">
        <h1 className="text-4xl font-bold mb-2">
          {t("planner." + Page[page] + ".title")}:
        </h1>
        {page === Page.project ? (
          <>
            <Input
              label={t("common.latitude")}
              unit="°"
              desc={t("planner.project.latitude")}
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
              desc={t("planner.project.shading")}
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
              desc={t("planner.project.direction")}
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
                setDirection(n < 0 ? 360 : n % 360);
              }}
            />
          </>
        ) : page === Page.roof ? (
          <>
            <div className="bg-polar-3 p-2 rounded-t-md w-256 border-b-2 border-polar-0">
              <h2 className="font-bold text-xl">
                {t("planner.roof.roof sections")}:
              </h2>
            </div>
            {sections.map((section, i) => (
              <div
                className="w-256 p-2 bg-polar-3 border-b-2 border-polar-0 text-lg flex items-center"
                key={i}
              >
                <span className="font-bold">{i + 1}: </span>
                <span className="font-bold">{t("common.dimensions")}: </span>
                {section.width}×{section.height}m
                <span className="font-bold"> - {t("common.area")}:</span>
                {section.width * section.height}m²
                <span className="font-bold"> - {t("common.gradient")}: </span>
                {section.gradient}°
                <Button
                  right
                  onClick={() => {
                    console.log(i);
                    let arr = [...sections];
                    arr.splice(i, 1);
                    setSections(arr);
                  }}
                >
                  <TrashIcon className="h-6" />
                </Button>
              </div>
            ))}
            <div className="flex w-256 bg-polar-3 p-2 rounded-b-md">
              <Input
                label={t("common.width")}
                unit="m"
                value={currentSection.width}
                onChange={(e) => {
                  let n = parseFloat(e.target.value);
                  n > 0 &&
                    setCurrentSection({ ...currentSection, ...{ width: n } });
                }}
              />
              <Input
                label={t("common.height")}
                unit="m"
                value={currentSection.height}
                onChange={(e) => {
                  let n = parseFloat(e.target.value);
                  n > 0 &&
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
                    setCurrentSection({
                      ...currentSection,
                      ...{ gradient: n },
                    });
                }}
              />
              <Button
                right
                onClick={() => {
                  setSections([...sections, currentSection]);
                  setCurrentSection(sectionDefault);
                }}
              >
                <PlusIcon className="h-6 mr-1" />
                {t("planner.roof.add section")}
              </Button>
            </div>
            <h2 className="my-1 text-xl">
              {t("planner.roof.total")}:
              {(() => {
                let area = 0;
                sections.forEach((s) => (area += s.height * s.width));
                return " " + area;
              })()}
              m²
            </h2>
          </>
        ) : (
          <h1>TODO</h1>
        )}
        {page !== Page.panels && (
          <Button large onClick={() => setPage(page + 1)}>
            <ArrowSmRightIcon className="h-8 mr-1" />
            {t("planner.next step")}
          </Button>
        )}
      </div>
    </>
  );
};

export default planner;
