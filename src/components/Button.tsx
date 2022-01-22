import React from "react";

const Button = ({
  large,
  right,
  onClick,
  children,
}: {
  large?: boolean;
  right?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={
        "rounded-md bg-polar-0 font-bold flex items-center transition-colors hover:bg-frost-2 " +
        (large ? "p-2 text-2xl" : "p-1") +
        (right ? " ml-auto" : "")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
