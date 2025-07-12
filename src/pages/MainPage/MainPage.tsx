// src/pages/MainPage/index.tsx
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { UserInfo } from "./UserInfo";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { ResultTabs } from "./ResultTabs";
import { PackageList } from "./PackageList";
import { RegistrationList } from "./RegistrationList";
import type { RegistrationItem } from "./RegistrationList";
import type { SearchResultItem } from "./SearchResults";
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
];

const MainPage: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [tab, setTab] = useState<"search" | "package">("search");
  const [courseCode, setCourseCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [registrationList, setRegistrationList] = useState<RegistrationItem[]>(
    []
  );

  useEffect(() => {
    const nick = localStorage.getItem("nickname") || "홍길동";
    setNickname(nick);
  }, []);

  const dummyCourses: SearchResultItem[] = [
    {
      code: "COMP217006",
      name: "컴퓨터프로그래밍",
      section: "001",
      category: "전공필수",
      credits: 3,
      time: "월 10:00~12:00",
      limit: 60,
      enrolled: 45,
    },
    // 추가 과목이 필요하면 여기에…
  ];

  const handleSearch = () => {
    const results = dummyCourses.filter(
      (c) => c.code === courseCode.toUpperCase()
    );
    if (results.length === 0) {
      alert("검색 결과가 없습니다.");
    }
    setSearchResults(results);
    setTab("search");
  };

  const handleApply = (item: SearchResultItem) => {
    // 중복 방지
    if (!registrationList.some((r) => r.code === item.code)) {
      const reg: RegistrationItem = {
        code: item.code,
        name: item.name,
        section: item.section,
        category: item.category,
        credits: item.credits,
        time: item.time,
        limit: item.limit,
        enrolled: item.enrolled,
      };
      setRegistrationList((prev) => [...prev, reg]);
    }
    // 탭 자동 전환
    setTab("package");
  };

  const handleRemove = (code: string) =>
    setRegistrationList((prev) => prev.filter((r) => r.code !== code));

  // 교과구분 변경
  const handleCategoryChange = (code: string, cat: string) =>
    setRegistrationList((prev) =>
      prev.map((r) => (r.code === code ? { ...r, category: cat } : r))
    );

  return (
    <div className="min-h-screen">
      <Header nickname={nickname} subTitle="아님" />

      <div className="container mx-auto px-4">
        {/* 사용자 정보 */}
        <UserInfo
          studentNo="202123456"
          name={nickname}
          department="IT대학 전자공학부"
          availableCredits={23}
          appliedCredits={9}
        />

        {/* 검색 폼 */}
        <SearchForm
          courseCode={courseCode}
          captcha={captcha}
          onCourseChange={setCourseCode}
          onCaptchaChange={setCaptcha}
          onSubmit={() => {}}
          onSearch={handleSearch}
        />

        {/* 탭 */}
        <ResultTabs current={tab} onChange={setTab} />

        {/* 검색 또는 패키지 내용 */}
        {tab === "search" ? (
          <SearchResults results={searchResults} onApply={handleApply} />
        ) : (
          <PackageList items={dummyPackage} />
        )}

        {/* 수강신청목록 (항상 표시) */}
        <div className="mt-6">
          <RegistrationList
            items={registrationList}
            onRemove={handleRemove}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
