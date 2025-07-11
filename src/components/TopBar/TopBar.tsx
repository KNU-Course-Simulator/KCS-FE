import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

export interface TopBarProps {
  nickname: string;
  currentLang?: string;
  onLangChange?: (lang: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  nickname,
  currentLang = "한국어",
  onLangChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-red-700 text-white px-4 py-2 flex justify-end items-center space-x-4 text-sm">
      <select
        value={currentLang}
        onChange={(e) => onLangChange?.(e.target.value)}
        className="bg-red-700 focus:outline-none"
      >
        <option>한국어</option>
        <option>ENGLISH</option>
      </select>
      <span>{nickname}</span>
      <Button variant="text" onClick={() => navigate("/login")}>
        로그아웃
      </Button>
    </div>
  );
};
