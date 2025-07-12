// src/components/Tab/Tab.tsx
import React from "react";

type TabProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      relative
      py-2 px-4 font-medium
      ${
        isActive
          ? "text-red-600 bg-white border border-gray-400 border-b-0 -mb-px rounded-t-md"
          : "bg-gray-200 text-gray-600 rounded-t-md border font-semilight border-transparent hover:text-gray-800"
      }
    `}
  >
    {children}
  </button>
);
