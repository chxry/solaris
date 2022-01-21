import React, { useState } from "react";

import { Input } from ".";

const Calculator = () => {
  const [sections, setSections] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [shading, setShading] = useState(20);

  return (
    <div className="m-4">
      <Input
        label="Latitude"
        unit="°"
        desc="The latitude of the your building."
        value={latitude}
        onChange={(e) => {
          let n = parseFloat(e.target.value);
          Math.abs(n) <= 90 && setLatitude(n);
        }}
      />
      <Input
        label="Shading"
        unit="%"
        desc="How much cover obstructs your roof."
        value={shading}
        describe={() =>
          shading < 20
            ? "Very little"
            : shading < 60
            ? "Modest"
            : shading < 80
            ? "Significant"
            : shading !== 100
            ? "Heavy"
            : "Fully covered"
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
