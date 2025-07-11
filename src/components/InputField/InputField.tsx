import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  className = "",
  ...rest
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-[#79695A] font-medium">
      {label}
    </label>
    <input
      id={id}
      className={`w-full h-12 border border-gray-300 px-4 focus:outline-none ${className}`}
      {...rest}
    />
  </div>
);
