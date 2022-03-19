import React from "react";

const Button = ({
  large,
  onClick,
  children,
}: {
  large?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={
        "rounded-md bg-polar-0 font-bold flex items-center transition hover:bg-frost-2 hover:scale-[1.01] select-none" +
        (large ? " p-2 text-2xl" : " p-1")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
