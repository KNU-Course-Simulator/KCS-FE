import React from "react";

type TabProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 font-medium border-b-2 ${
      isActive
        ? "border-red-700 text-red-700"
        : "border-transparent text-gray-600 hover:text-gray-800"
    }`}
  >
    {children}
  </button>
);
