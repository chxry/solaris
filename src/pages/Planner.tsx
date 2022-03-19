import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  PlusIcon,
  TrashIcon,
  ArrowSmRightIcon,
  ExclamationIcon,
  StarIcon,
} from "@heroicons/react/solid";

import { Section, Overview, calculate } from "../calc";
import { Input, Button } from "../components";
import panels from "../assets/panels.json";

enum Page {
  location,
  finance,
  roof,
  overview,
}

const Error = ({ msg }: { msg: string }) => {
  return (
    <span className="flex items-center text-red text-xl font-bold">
      <ExclamationIcon className="h-8 mr-2" />
      {msg}
    </span>
  );
};

const NavButton = ({
  onClick,
  selected,
  children,
}: {
  onClick: () => void;
  selected?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={
        "p-2 md:p-4 border-b-2 md:border-r-2 md:border-b-0 border-polar-0 transition-colors hover:bg-frost-2" +
        (selected ? " bg-polar-2" : "")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const planner = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(Page.location);
  // location
  const [latitude, setLatitude] = useState(0);
  const [shading, setShading] = useState(20);
  const [direction, setDirection] = useState(0);
  // finance
  const [energyUsage, setEnergyUsage] = useState(3100);
  const [energyCost, setEnergyCost] = useState(16);
  const [seg, setSeg] = useState(5.5);
  // roof
  let sectionDefault = {
    width: 1,
    height: 1,
  };
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSection, setCurrentSection] = useState(sectionDefault);
  // overview
  const [currentPanel, setCurrentPanel] = useState(0);
  const [bestPanel, setBestPanel] = useState(null);
  const [overviews, setOverviews] = useState<Overview[]>([]);

  useEffect(() => {
    let info = {
      latitude,
      shading,
      direction,
      energyUsage,
      energyCost,
      seg,
      sections,
    };
    let o = [...overviews];
    let best = null;
    panels.panels.forEach((panel, i) => {
      o[i] = calculate(info, panel);
      if (o[i].roiTime > 0) {
        best = best ? (o[i].roiTime < o[best].roiTime ? i : best) : i;
      }
    });
    setBestPanel(best);
    setOverviews(o);
  }, [latitude, shading, direction, energyUsage, energyCost, seg, sections]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:border-b-2 border-polar-0">
        {Object.keys(Page).map(
          (p, i) =>
            isNaN(p as any) && (
              <NavButton
                key={p}
                selected={page === Page[p]}
                onClick={() => setPage(Page[p])}
              >
                {i - 3}. {t("planner." + p + ".title")}
              </NavButton>
            )
        )}
      </div>
      <div className="m-4">
        <h1 className="text-4xl font-bold mb-2">
          {t("planner." + Page[page] + ".title")}:
        </h1>
        {page === Page.location ? (
          <>
            <Input
              label={t("common.latitude")}
              unit="°"
              desc={t("planner.location.latitude")}
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
              desc={t("planner.location.shading")}
              value={shading}
              describe={() =>
                shading === 0
                  ? t("adjs.none")
                  : shading < 20
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
              desc={t("planner.location.direction")}
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
        ) : page === Page.finance ? (
          <div className="flex flex-col lg:flex-row">
            <div className="w-256">
              <Input
                label={t("common.energy usage")}
                unit="kWh"
                desc={t("planner.finance.energy usage")}
                value={energyUsage}
                describe={() => ""}
                onChange={(e) => {
                  let n = parseFloat(e.target.value);
                  n >= 0 && setEnergyUsage(n);
                }}
              />
              <Input
                label={t("common.energy cost")}
                unit="p"
                desc={t("planner.finance.energy cost")}
                value={energyCost}
                describe={() => ""}
                onChange={(e) => {
                  let n = parseFloat(e.target.value);
                  n >= 0 && setEnergyCost(n);
                }}
              />
              <Input
                label={t("common.seg")}
                unit="p"
                desc={t("planner.finance.seg")}
                value={seg}
                describe={() => ""}
                onChange={(e) => {
                  let n = parseFloat(e.target.value);
                  n >= 0 && setSeg(n);
                }}
              />
            </div>
            <div className="text-md">
              <h1 className="text-xl font-bold">
                {t("planner.finance.seg info")}
              </h1>
              <p>{t("planner.finance.seg desc")}</p>
              <h1 className="text-xl font-bold pt-4">
                {t("planner.finance.energy info")}
              </h1>
              <p>{t("planner.finance.energy desc")}</p>
            </div>
          </div>
        ) : page === Page.roof ? (
          <div className="bg-polar-3 rounded-lg p-0 text-xl mb-2 divide-y-2 divide-polar-1 w-full md:w-208">
            {sections.map((section, i) => (
              <div
                className="flex flex-wrap items-start md:items-center flex-col md:flex-row p-2 relative"
                key={i}
              >
                <span>
                  <span className="font-bold whitespace-pre">
                    {i + 1 + " - " + t("common.dimensions")}:
                  </span>
                  {section.width}×{section.height}m
                </span>
                <span>
                  <span className="font-bold whitespace-pre">
                    {" - " + t("common.area")}:
                  </span>
                  {section.width * section.height}m²
                </span>
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
            <div className="flex flex-wrap items-start md:items-center flex-col md:flex-row p-2 relative space-y-1">
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
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row text-xl">
            <div className="flex flex-wrap w-full lg:w-1/2 text-lg">
              <h2 className="text-2xl font-bold w-full">
                {t("planner.overview.panels")}:
              </h2>
              {panels.panels.map((panel, i) => (
                <div
                  key={i}
                  className={
                    "relative w-full m-2 lg:w-40 h-40 bg-polar-2 rounded-lg p-2 pr-6 cursor-pointer transition hover:scale-105 hover:bg-frost-2 select-none" +
                    (currentPanel === i ? " bg-polar-3" : "")
                  }
                  onClick={() => setCurrentPanel(i)}
                >
                  {i === bestPanel && (
                    <div className="absolute top-0 right-0 bg-polar-3 text-yellow rounded-tr-lg rounded-bl-lg p-0.5">
                      <StarIcon className="h-8" />
                    </div>
                  )}
                  <h1 className="text-xl font-bold">{panel.name}</h1>
                  <p>
                    {t("common.area")}: {panel.width}×{panel.height}m
                  </p>
                  <p>
                    {t("common.price")}: £{panel.initialCost}
                  </p>
                </div>
              ))}
            </div>
            <div className="my-4 h-[2px] w-auto lg:my-0 lg:mx-4 lg:w-[2px] lg:h-auto bg-polar-0"></div>
            <div>
              <h2 className="text-2xl font-bold">
                {t("planner.overview.overview")}:
              </h2>
              {sections.length > 0 ? (
                <>
                  <p>
                    {t("planner.overview.roof area", {
                      area: overviews[currentPanel].roofArea,
                    })}
                  </p>
                  {overviews[currentPanel].panelCount > 0 ? (
                    <>
                      <Trans
                        i18nKey="planner.overview.panel area"
                        values={{
                          area: overviews[currentPanel].panelArea,
                          count: overviews[currentPanel].panelCount,
                          efficiency: overviews[currentPanel].spaceEfficiency,
                        }}
                        t={t}
                        components={[
                          <span
                            className={
                              overviews[currentPanel].spaceEfficiency < 65
                                ? "text-red"
                                : overviews[currentPanel].spaceEfficiency < 85
                                ? "text-orange"
                                : "text-green"
                            }
                          ></span>,
                        ]}
                      />
                      <p>
                        {t("planner.overview.initial cost", {
                          cost: overviews[currentPanel].initialCost,
                        })}
                      </p>
                      <p>
                        {t("planner.overview.labor cost", {
                          cost: overviews[currentPanel].installCost,
                        })}
                      </p>
                      <p>
                        {t("planner.overview.estimated energy", {
                          energy: overviews[currentPanel].estimatedEnergy,
                          efficiency: overviews[currentPanel].efficiency,
                        })}
                      </p>
                      <p>
                        {t("planner.overview.annual energy", {
                          energy: overviews[currentPanel].annualEnergy,
                        })}
                      </p>
                      {overviews[currentPanel].profits > 0 ? (
                        <>
                          <p>
                            {t("planner.overview.annual profits", {
                              profit:
                                overviews[currentPanel].profits.toFixed(2),
                            })}
                          </p>
                          <p>
                            <span className="flex">
                              {t("planner.overview.return on investment", {
                                roi: overviews[currentPanel].roiTime,
                              })}
                              {currentPanel === bestPanel && (
                                <span className="text-yellow flex items-center">
                                  (<StarIcon className="h-6" />
                                  {t("planner.overview.fastest roi", {
                                    roi: overviews[currentPanel].roiTime,
                                  })}
                                  )
                                </span>
                              )}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p>
                          {t("planner.overview.annual savings", {
                            saving: -overviews[currentPanel].profits.toFixed(2),
                          })}
                        </p>
                      )}
                    </>
                  ) : (
                    <Error msg={t("planner.overview.error no space")} />
                  )}
                </>
              ) : (
                <Error msg={t("planner.overview.error no sections")} />
              )}
            </div>
          </div>
        )}
        {page !== Page.overview && (
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
