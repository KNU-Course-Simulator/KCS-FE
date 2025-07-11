import React, { useState, useEffect } from "react";
import { TopBar } from "../../components/TopBar/TopBar";
import { Button } from "../../components/Button/Button";
//import { InputField } from "../../components/InputField/InputField";
import { Tab } from "../../components/Tab/Tab";
import { Table } from "../../components/Table/Table";
import { TableRow } from "../../components/Table/TableRow";

interface Course {
  code: string;
  name: string;
  credits: number;
  time: string;
}

interface PackageItem {
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

  useEffect(() => {
    const nick = localStorage.getItem("nickname") || "홍길동";
    setNickname(nick);
  }, []);

  const refreshCaptcha = () => setCaptchaImage(`/api/captcha?${Date.now()}`);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 후 결과 탭으로 전환
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

  return (
    <div className="min-h-screen">
      <TopBar nickname={nickname} />
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center">
          <img
            src="/assets/logo_cut.png"
            alt="Header"
            className="w-12 object-cover"
          />
          <h1 className="font-bold ml-3 text-xl text-gray-600">경북대학교</h1>
        </div>
        <h1 className="font-bold text-lg text-gray-800">수강신청</h1>
      </div>

      {/* 사용자 정보 */}
      <div className="container mx-auto">
        <table className="table-fixed w-full bg-white border-t border-t-gray-500 border-b-2 border-b-gray-300 text-center">
          <tbody>
            <tr>
              {[
                { label: "학번", value: "" },
                { label: "성명", value: nickname },
                { label: "소속", value: "" },
                { label: "수강신청가능학점", value: "" },
                { label: "수강신청학점", value: "" },
              ].map(({ label, value }, i) => (
                <React.Fragment key={i}>
                  <td className="w-1/6 bg-gray-100 text-sm py-2 font-medium whitespace-nowrap">
                    {label}
                  </td>
                  <td className="w-1/4 px-2 py-2 text-left font-light whitespace-nowrap">
                    {value}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* 강좌번호 + 자동입력방지문자 입력 폼 */}
      <div className="container mt-6 mx-auto border-t border-t-gray-600 border-b-2 border-b-gray-300">
        <form onSubmit={handleSearch}>
          <table className="table-fixed w-auto bg-white border-collapse">
            <tbody>
              <tr className="items-center">
                {/* 강좌번호 */}
                <td className="w-1/12 bg-gray-100 text-red-600 font-medium text-center">
                  <span className="text-sm">
                    강좌번호
                    <br />
                    (11자리) *
                  </span>
                </td>
                <td className="pl-2 pr-2 py-3 w-2/12">
                  <input
                    id="courseCode"
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                    className="w-full h-10 border rounded-[3px] px-3 border-gray-300 focus:outline-none"
                  />
                </td>

                {/* 자동입력방지문자 (이미지) */}
                <td className="w-1/12 bg-gray-100 text-red-600 font-medium text-center">
                  <span className="text-sm whitespace-nowrap">
                    자동입력방지문자 <br />
                    (오른쪽 이미지 4자리) *
                  </span>
                </td>
                <td className="w-2/12 px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={captchaImage}
                      alt="captcha"
                      className="w-8/12 h-10"
                    />
                    <Button
                      variant="primary"
                      className="ml-2 rounded-md"
                      onClick={(e) => {
                        e.preventDefault();
                        refreshCaptcha();
                      }}
                    >
                      ↻
                    </Button>
                  </div>
                </td>

                {/* 캡차 입력 + 확인 버튼 */}
                <td className="w-1/12 bg-gray-100 text-red-600 font-medium text-center">
                  <span className="text-sm">자동입력방지문자 입력 *</span>
                </td>
                <td className="w-full px-4 py-3 items-center">
                  <input
                    id="captcha"
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    required
                    className="leading-none w-3/12 h-10 rounded-l-[3px] border-r-0 border border-gray-300 px-3 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    className="leading-none -ml-px h-10 bg-red-600 text-white rounded-r-md border border-gray-300"
                  >
                    확인
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {/* Tabs */}
      <div className="container mx-auto mt-6">
        <div className="flex space-x-4 border-b">
          <Tab isActive={tab === "results"} onClick={() => setTab("results")}>
            과목 검색
          </Tab>
          <Tab isActive={tab === "package"} onClick={() => setTab("package")}>
            꾸러미 신청목록
          </Tab>
        </div>

        {/* Content */}
        {tab === "results" ? (
          searchResults.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow mt-4">
              <Table headers={["교과목코드", "교과목명", "학점", "강의시간"]}>
                {searchResults.map((c) => (
                  <TableRow
                    key={c.code}
                    cells={[c.code, c.name, String(c.credits), c.time]}
                  />
                ))}
              </Table>
            </div>
          )
        ) : (
          <div className="bg-white p-6 rounded-lg shadow mt-4">
            <Table
              headers={[
                "No.",
                "신청",
                "교과목코드",
                "교과목명",
                "분반",
                "교과구분",
                "학점",
                "강의시간",
                "제한인원",
                "수강인원",
                "신청클릭수",
              ]}
            >
              {dummyPackage.map((p, i) => (
                <TableRow
                  key={p.code}
                  cells={[
                    String(i + 1),
                    <Button key="btn" onClick={() => {}}>
                      신청
                    </Button>,
                    p.code,
                    p.name,
                    p.section,
                    p.category,
                    String(p.credits),
                    p.time,
                    String(p.limit),
                    String(p.enrolled),
                    "0",
                  ]}
                />
              ))}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
