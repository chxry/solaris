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
        "rounded-md bg-polar-0 font-bold flex items-center transition hover:bg-frost-2 hover:scale-[1.01]" +
        (large ? " p-2 text-2xl" : " p-1") +
        (right ? " absolute bottom-1.5 right-1.5" : "")
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
