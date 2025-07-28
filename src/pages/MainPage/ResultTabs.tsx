import React from "react";
import { Tab } from "../../components/Tab/Tab";

interface ResultTabsProps {
  current: "search" | "package";
  onChange: (tab: "search" | "package") => void;
}

export const ResultTabs: React.FC<ResultTabsProps> = ({
  current,
  onChange,
}) => (
  <div className="mt-4 flex border-b border-gray-400">
    <Tab isActive={current === "search"} onClick={() => onChange("search")}>
      과목 검색
    </Tab>
    <Tab isActive={current === "package"} onClick={() => onChange("package")}>
      담은 과목 목록
    </Tab>
  </div>
);
