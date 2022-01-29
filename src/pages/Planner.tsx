import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  PlusIcon,
  TrashIcon,
  ArrowSmRightIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

import { truncate } from "../util";
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

const planner = () => {
  const { t } = useTranslation();
  // change it back once done to FUCKING RETARD PAGE.LOCATION
  const [page, setPage] = useState(Page.finance);
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
    gradient: 30,
  };
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(sectionDefault);
  // overview
  const [currentPanel, setCurrentPanel] = useState(0);
  const [overview, setOverview] = useState({
    roofArea: 0,
    panelCount: 0,
    panelArea: 0,
    spaceEfficiency: 0,
    initialCost: 0,
    efficiency: 0,
    estimatedEnergy: 0,
    profits: 0,
    annualEnergy: 0,
  });

  useEffect(() => {
    let panel = panels.panels[currentPanel];
    let roofArea = 0;
    sections.forEach((s) => (roofArea += s.height * s.width));

    let panelCount = 0;
    sections.forEach(
      (s) =>
        (panelCount +=
          Math.floor(s.width / panel.width) *
          Math.floor(s.height / panel.height))
    );

    let panelArea = panel.width * panel.height * panelCount;
    let spaceEfficiency = (panelArea / roofArea) * 100;
    let initialCost = panelCount * panel.initialCost;

    let efficiency = Math.max(
      90 -
        shading -
        Math.abs(latitude) / 2 -
        Math.abs((latitude > 0 ? 180 : 0) - direction) / 8,
      0
    );
    //todo use gradient + reminder convert p to £ + all money .tofixed
    let estimatedEnergy = (efficiency / 100) * panelCount * panel.maxEnergy;
    let annualEnergy = estimatedEnergy * 8760;
    let profits = ((annualEnergy - energyUsage) * seg) / 100;
    setOverview({
      roofArea,
      panelCount,
      panelArea: truncate(panelArea),
      spaceEfficiency: truncate(spaceEfficiency),
      initialCost,
      efficiency: truncate(efficiency),
      estimatedEnergy: truncate(estimatedEnergy),
      profits,
      annualEnergy: truncate(annualEnergy),
    });
  }, [
    latitude,
    shading,
    direction,
    energyUsage,
    energyCost,
    seg,
    sections,
    currentPanel,
  ]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:border-b-2 border-polar-0">
        {Object.keys(Page).map(
          (p, i) =>
            isNaN(p as any) && (
              <button
                key={p}
                className={
                  "p-2 md:p-4 border-b-2 md:border-r-2 md:border-b-0 border-polar-0 transition-colors hover:bg-frost-2" +
                  (page === Page[p] ? " bg-polar-2" : "")
                }
                onClick={() => setPage(Page[p])}
              >
                {i - 3}. {t("planner." + p + ".title")}
              </button>
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
          <div className="flex flex-wrap items-start flex-col md:flex-row p-2 relative">
            <div className="basis-4/12">
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
            <div className="basis-4/12">
              <h1 className="text-2xl font-bold">
                What is the Smart Export Guarantee?
              </h1>
              <p className="text-lg">
                The Smart Export Guarantee is a government mandated scheme that
                provides a way for your excess solar energy to be exported to
                the national grid and recieving payment from electricity
                suppliers, Providing certain criteria have been met.{" "}
              </p>
              <h1 className="text-2xl font-bold pt-4">
                What are the criteria?
              </h1>
              <p className="text-lg">
                There are no requirements abou what kind of photovoltaic system
                you need to be able to export the solar energy, as long as less
                than 5Mw of electricity is generated. You do still need to
                certify your solar installation through the MCS.
              </p>
              <h1 className="text-2xl font-bold pt-4">
                How do i find my energy usage?
              </h1>
              <p className="text-lg">
                You can find your energy usage on your energy suppliers annual
                bill. Or if that is not an option you can look at your
                daily/monthly usage on your energy meter and calculate the
                amount in a year.
              </p>
              <h1 className="text-2xl font-bold pt-4">
                How do I find my Energy Cost?
              </h1>
              <p className="text-lg">
                You can usually find your energy cost on your energy suppliers
                website.
              </p>
            </div>
          </div>
        ) : page === Page.roof ? (
          <div className="bg-polar-3 rounded-lg p-0 text-xl mb-2 divide-y-2 divide-polar-1">
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
                <span>
                  <span className="font-bold whitespace-pre">
                    {" - " + t("common.gradient")}:
                  </span>
                  {section.gradient}°
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
                    "w-full m-2 lg:w-36 h-36 bg-polar-2 rounded-lg p-2 cursor-pointer transition hover:scale-105 hover:bg-frost-2" +
                    (currentPanel === i ? " bg-polar-3" : "")
                  }
                  onClick={() => setCurrentPanel(i)}
                >
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
                      area: overview.roofArea,
                    })}
                  </p>
                  {overview.panelCount > 0 ? (
                    <>
                      <Trans
                        i18nKey="planner.overview.panel area"
                        values={{
                          area: overview.panelArea,
                          count: overview.panelCount,
                          efficiency: overview.spaceEfficiency,
                        }}
                        t={t}
                        components={[
                          <span
                            className={
                              overview.spaceEfficiency < 65
                                ? "text-red"
                                : overview.spaceEfficiency < 85
                                ? "text-yellow"
                                : "text-green"
                            }
                          ></span>,
                        ]}
                      />
                      <p>
                        {t("planner.overview.initial cost", {
                          cost: overview.initialCost,
                        })}
                      </p>
                      <p>
                        {t("planner.overview.estimated energy", {
                          energy: overview.estimatedEnergy,
                          efficiency: overview.efficiency,
                        })}
                      </p>
                      <p>Annual Energy: {overview.annualEnergy}kWh</p>
                      <p>Profits: £{overview.profits.toFixed(2)}</p>
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
