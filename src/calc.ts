import { HOURSPERYEAR, round } from "./util";

interface Info {
  latitude: number;
  shading: number;
  direction: number;
  energyUsage: number;
  energyCost: number;
  seg: number;
  sections: Section[];
}

interface Section {
  width: number;
  height: number;
}

interface Panel {
  name: string;
  width: number;
  height: number;
  maxEnergy: number;
  initialCost: number;
  installCost: number;
}

export interface Overview {
  roofArea: number;
  panelCount: number;
  panelArea: number;
  spaceEfficiency: number;
  initialCost: number;
  efficiency: number;
  estimatedEnergy: number;
  profits: number;
  annualEnergy: number;
  roiTime: number;
  installCost: number;
}

export const calculate = (info: Info, panel: Panel): Overview => {
  let roofArea = 0;
  info.sections.forEach((s) => (roofArea += s.height * s.width));

  let panelCount = 0;
  info.sections.forEach(
    (s) =>
      (panelCount +=
        Math.floor(s.width / panel.width) * Math.floor(s.height / panel.height))
  );

  let panelArea = panel.width * panel.height * panelCount;
  let spaceEfficiency = (panelArea / roofArea) * 100;
  let initialCost = panel.initialCost * panelCount;
  let installCost = panel.installCost * panelCount;
  let efficiency = Math.max(
    90 -
      info.shading -
      Math.abs(info.latitude) / 2 -
      Math.abs((info.latitude > 0 ? 180 : 0) - info.direction) / 8,
    0
  );
  let estimatedEnergy = (efficiency / 100) * panelCount * panel.maxEnergy;
  let annualEnergy = estimatedEnergy * HOURSPERYEAR;
  // if profits is negative that means savings
  let profits =
    (annualEnergy > info.energyUsage
      ? (annualEnergy - info.energyUsage) * info.seg
      : info.energyUsage - annualEnergy * info.energyCost) / 100;
  let roitime = (initialCost + installCost) / profits;
  return {
    roofArea,
    panelCount,
    panelArea: round(panelArea),
    spaceEfficiency: round(spaceEfficiency),
    initialCost,
    installCost,
    efficiency: round(efficiency),
    estimatedEnergy: round(estimatedEnergy),
    profits,
    annualEnergy: round(annualEnergy),
    roiTime: round(roitime),
  };
};
