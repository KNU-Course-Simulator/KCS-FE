import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "text";
};

// Tailwind 클래스 맵
const variantClasses = {
  primary: "bg-red-700 hover:bg-red-800 font-light text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 font-light text-white",
  outline: "border border-red-700 text-red-700 hover:bg-red-100",
  text: "text-white-700 hover:underline",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
