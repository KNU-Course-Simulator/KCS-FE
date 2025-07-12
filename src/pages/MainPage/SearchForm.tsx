import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";

interface SearchFormProps {
  courseCode: string;
  captcha: string;
  onCourseChange: (val: string) => void;
  onCaptchaChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSearch: () => void;
}

// 캡차용 문자 집합 (0, O, 1, I 제외)
const CHAR_SET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// 랜덤 문자열 생성 함수
function generateCaptcha(length = 4): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length));
  }
  return result;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  courseCode,
  captcha,
  onCourseChange,
  onCaptchaChange,
  onSearch,
}) => {
  const [captchaText, setCaptchaText] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 컴포넌트 마운트 시 초기 캡차 생성
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  // 캡차 새로고침
  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    onCaptchaChange("");
    setIsConfirmed(false);
  };

  // 확인 버튼 핸들러 (캡차 검증)
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (captcha.toUpperCase() !== captchaText) {
      alert("자동입력방지문자가 일치하지 않습니다.");
      refreshCaptcha();
      return;
    }
    setIsConfirmed(true);
  };

  // 조회 버튼 핸들러
  const handleSearchClick = () => {
    if (isConfirmed) {
      onSearch();
    }
  };

  return (
    <div>
      {/* 검색 폼 */}
      <div className="container mt-6 mx-auto border-t border-t-gray-600 border-b-2 border-b-gray-300">
        <form onSubmit={handleConfirm}>
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
                    onChange={(e) => onCourseChange(e.target.value)}
                    required
                    className="w-full h-10 border rounded px-3 border-gray-300 focus:outline-none"
                  />
                </td>

                {/* 캡차 표시 */}
                <td className="w-1/12 bg-gray-100 text-red-600 font-medium text-center">
                  <span className="text-sm whitespace-nowrap">
                    자동입력방지문자
                    <br />
                    (텍스트 4자리) *
                  </span>
                </td>
                <td className="w-2/12 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className="font-mono text-lg bg-gray-200 px-2 py-1 cursor-pointer select-none"
                      onClick={refreshCaptcha}
                      title="클릭해서 새로고침"
                    >
                      {captchaText}
                    </span>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        refreshCaptcha();
                      }}
                    >
                      ↻
                    </Button>
                  </div>
                </td>

                {/* 문자 입력 + 버튼들 */}
                <td className="w-1/12 bg-gray-100 text-red-600 font-medium text-center">
                  <span className="text-sm">문자 입력 *</span>
                </td>
                <td className="w-full px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <input
                      id="captcha"
                      type="text"
                      value={captcha}
                      onChange={(e) => onCaptchaChange(e.target.value)}
                      required
                      className="w-3/12 h-10 border border-gray-300 rounded-l px-3 focus:outline-none"
                    />

                    {/* 확인 버튼 */}
                    <Button
                      type="submit"
                      className="h-10 bg-red-600 text-white px-4 rounded border border-gray-300"
                    >
                      확인
                    </Button>

                    {/* 일치 안내 문구 */}
                    {isConfirmed && (
                      <span className="text-green-600 text-sm whitespace-nowrap">
                        자동입력방지가 일치합니다.
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="container mx-auto mt-4 flex justify-end">
        <Button
          variant="secondary"
          onClick={handleSearchClick}
          disabled={!isConfirmed}
          className="h-10 text-white px-4 rounded border border-gray-300"
        >
          조회
        </Button>
      </div>
    </div>
  );
};
