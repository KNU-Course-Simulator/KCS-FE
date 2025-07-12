import React from "react";
import { Tab } from "../../components/Tab/Tab";

interface ResultTabsProps {
  current: "results" | "package";
  onChange: (tab: "results" | "package") => void;
}

export const ResultTabs: React.FC<ResultTabsProps> = ({
  current,
  onChange,
}) => (
  <div className="mt-4 flex border-b border-gray-400">
    <Tab isActive={current === "results"} onClick={() => onChange("results")}>
      과목 검색
    </Tab>
    <Tab isActive={current === "package"} onClick={() => onChange("package")}>
      꾸러미 신청목록
    </Tab>
  </div>
);
