// src/pages/MainPage/index.tsx
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { UserInfo } from "./UserInfo";
import { SearchForm } from "./SearchForm";
import { ResultTabs } from "./ResultTabs";
import { PackageList } from "./PackageList";
import { RegistrationList } from "./RegistrationList";
import type { RegistrationItem } from "./RegistrationList";
import { Footer } from "./Footer";

// 타입 정의 (필요 시 별도 파일로 분리)
export interface Course {
  code: string;
  name: string;
  credits: number;
  time: string;
}

export interface PackageItem {
  code: string;
  name: string;
  section: string;
  category: string;
  credits: number;
  time: string;
  limit: number;
  enrolled: number;
}

const dummyPackage: PackageItem[] = [
  {
    code: "CLTR0058",
    name: "자원봉사활동",
    section: "001",
    category: "교양",
    credits: 3,
    time: "수 13:00~14:00, 토 14:00~15:00",
    limit: 50,
    enrolled: 0,
  },
  {
    code: "ELEC0241",
    name: "전자장치",
    section: "001",
    category: "전공",
    credits: 3,
    time: "화 09:00~10:30, 목 15:00~16:30",
    limit: 70,
    enrolled: 0,
  },
  {
    code: "CLTR0657",
    name: "생활배드민턴",
    section: "003",
    category: "교양",
    credits: 1,
    time: "화 13:00~14:00, 화 14:00~15:00",
    limit: 30,
    enrolled: 1,
  },
  {
    code: "ELEC0243",
    name: "회로이론1",
    section: "007",
    category: "전공",
    credits: 3,
    time: "화 10:30~12:00, 목 13:30~15:00",
    limit: 70,
    enrolled: 0,
  },
];

const MainPage: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [tab, setTab] = useState<"package" | "results">("package");
  const [courseCode, setCourseCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("/assets/1.png");
  const [searchResults, setSearchResults] = useState<Course[]>([]);

  const [registrationList, setRegistrationList] = useState<RegistrationItem[]>(
    []
  );

  useEffect(() => {
    const nick = localStorage.getItem("nickname") || "홍길동";
    setNickname(nick);
  }, []);

  const refreshCaptcha = () => setCaptchaImage(`/api/captcha?${Date.now()}`);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 백엔드 API 호출
    setSearchResults([
      {
        code: courseCode,
        name: "예시강의명",
        credits: 3,
        time: "월 10:00~12:00",
      },
    ]);
    setTab("results");
  };

  const handleRemove = (code: string) => {
    setRegistrationList((list) => list.filter((item) => item.code !== code));
  };

  const handleCategoryChange = (code: string, newCat: string) => {
    setRegistrationList((list) =>
      list.map((item) =>
        item.code === code ? { ...item, category: newCat } : item
      )
    );
  };

  return (
    <div className="min-h-screen">
      <Header nickname={nickname} subTitle="아님" />
      <div className="container mx-auto">
        <UserInfo
          studentNo="202123456"
          name={nickname}
          department="IT대학 전자공학부"
          availableCredits={23}
          appliedCredits={9}
        />
        <SearchForm
          courseCode={courseCode}
          captcha={captcha}
          captchaImage={captchaImage}
          onCourseChange={setCourseCode}
          onCaptchaChange={setCaptcha}
          onRefreshCaptcha={refreshCaptcha}
          onSubmit={handleSearch}
        />
        <ResultTabs current={tab} onChange={setTab} />
        {tab === "results" ? (
          searchResults.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow mt-4">
              <h2 className="mb-4 text-gray-700">
                검색 결과 {searchResults.length}건
              </h2>
              {/* 결과 테이블 구현 */}
            </div>
          )
        ) : (
          <PackageList items={dummyPackage} />
        )}
        <RegistrationList
          items={registrationList}
          onRemove={handleRemove}
          onCategoryChange={handleCategoryChange}
        />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
