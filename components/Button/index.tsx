import React, { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  className = "",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-black text-white rounded-full border-0 font-semibold py-2 px-6 flex items-center focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};
