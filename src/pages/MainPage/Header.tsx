// src/pages/MainPage/Header.tsx
import React from "react";
import { TopBar } from "../../components/TopBar/TopBar";

interface HeaderProps {
  nickname: string;
  universityName?: string;
  pageTitle?: string;
  subTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  nickname,
  universityName = "경북대학교",
  pageTitle = "수강신청",
  subTitle = "",
}) => (
  <>
    <TopBar nickname={nickname} />
    <div className="container mx-auto flex items-center justify-between py-3">
      <div className="flex items-center">
        <img
          src="/assets/logo_cut.png"
          alt="Header"
          className="w-12 object-cover filter brightness-0"
        />
        <h1 className="font-bold ml-3 text-xl text-gray-600">
          {universityName}
        </h1>
        {subTitle && (
          <span className="ml-1 text-sm font-semibold pt-1 text-gray-600">
            {subTitle}
          </span>
        )}
      </div>
      <h1 className="font-bold text-lg text-gray-800">
        {pageTitle}
        {subTitle && (
          <span className="ml-1 text-sm font-semibold pt-1 text-gray-800">
            연습
          </span>
        )}
      </h1>
    </div>
  </>
);
