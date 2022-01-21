import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from ".";

const Calculator = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [shading, setShading] = useState(20);

  return (
    <div className="m-4">
      <Input
        label={t("calculator.latitude")}
        unit="°"
        desc={t("calculator.latitude desc")}
        value={latitude}
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          Math.abs(n) <= 90 && setLatitude(n);
        }}
      />
      <Input
        label={t("calculator.shading")}
        unit="%"
        desc={t("calculator.shading desc")}
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
    </div>
  );
};

export default Calculator;
