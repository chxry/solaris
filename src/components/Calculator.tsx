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
        label={t("latitude")}
        unit="°"
        desc={t("latitude_desc")}
        value={latitude}
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          Math.abs(n) <= 90 && setLatitude(n);
        }}
      />
      <Input
        label={t("shading")}
        unit="%"
        desc={t("shading_desc")}
        value={shading}
        describe={() =>
          shading < 20
            ? t("little")
            : shading < 60
            ? t("modest")
            : shading < 80
            ? t("significant")
            : shading !== 100
            ? t("heavy")
            : t("full")
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
