import React, { ChangeEventHandler } from "react";

const Input = ({
  label,
  unit,
  desc,
  value,
  describe,
  onChange,
}: {
  label: string;
  unit: string;
  desc: string;
  describe?: () => string;
  value: any;

  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <span className="flex items-center flex-wrap text-xl mt-2">
        <label className="mr-4 font-bold">{label}:</label>
        <input
          type="number"
          className="p-1 bg-polar-2 rounded-l-md focus:outline-none transition-colors focus:bg-polar-3 w-24"
          value={value}
          onChange={(e) => onChange(e)}
        />
        <div className="p-1 bg-polar-0 rounded-r-md mr-2">{unit}</div>
        {describe && <p className="text-lg">{describe()}</p>}
      </span>
      <p className="mb-2">{desc}</p>
    </>
  );
};

export default Input;
