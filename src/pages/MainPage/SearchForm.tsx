import React from "react";
import { Button } from "../../components/Button/Button";

interface SearchFormProps {
  courseCode: string;
  captcha: string;
  captchaImage: string;
  onCourseChange: (val: string) => void;
  onCaptchaChange: (val: string) => void;
  onRefreshCaptcha: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  courseCode,
  captcha,
  captchaImage,
  onCourseChange,
  onCaptchaChange,
  onRefreshCaptcha,
  onSubmit,
}) => (
  <div>
    <div className="container mt-6 mx-auto border-t border-t-gray-600 border-b-2 border-b-gray-300">
      <form onSubmit={onSubmit}>
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
                    className="ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      onRefreshCaptcha();
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
                  onChange={(e) => onCaptchaChange(e.target.value)}
                  required
                  className="leading-none w-3/12 h-10 rounded-l-[3px] border-r-0 border border-gray-300 px-3 focus:outline-none"
                />
                <Button
                  type="submit"
                  className="leading-none -ml-px h-10 bg-red-600 text-white rounded-r-md rounded-l-none border border-gray-300"
                >
                  확인
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
    <div className="container mx-auto mt-4 flex justify-end">
      <Button
        variant="secondary"
        // onClick={() => {
        //   setSearchResults([]);
        // }}
      >
        조회
      </Button>
    </div>
  </div>
);
