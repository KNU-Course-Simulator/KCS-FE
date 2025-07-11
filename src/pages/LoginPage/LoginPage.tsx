import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [studentNo, setStudentNo] = useState("");
  const [systemId, setSystemId] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"수강신청" | "변경">("수강신청");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출 후 인증 처리
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="bg-[#79695A] pl-10 p-8 flex justify-between items-start">
          <div>
            <div className="w-8 h-[2px] bg-white mb-2" />
            <h1 className="text-white text-2xl font-bold leading-tight">
              온라인
              <br />
              신청
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* 학번 */}
          <div>
            <label
              htmlFor="studentNo"
              className="block text-[#79695A] font-medium mb-1"
            >
              학번
            </label>
            <input
              id="studentNo"
              type="text"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              placeholder=""
              required
              className="w-full h-12 border border-gray-300 px-4 focus:outline-none"
            />
          </div>

          {/* 시스템 ID */}
          <div>
            <label
              htmlFor="systemId"
              className="block text-[#79695A] font-medium mb-1"
            >
              통합정보시스템 ID
            </label>
            <input
              id="systemId"
              type="text"
              value={systemId}
              onChange={(e) => setSystemId(e.target.value)}
              placeholder=""
              required
              className="w-full h-12 border border-gray-300 px-4 focus:outline-none"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="block text-[#79695A] font-medium mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
              className="w-full h-12 border border-gray-300 px-4 focus:outline-none"
            />
          </div>

          {/* Mode */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center text-[#79695A] font-medium">
              <input
                type="radio"
                name="mode"
                value="수강신청"
                checked={mode === "수강신청"}
                onChange={() => setMode("수강신청")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">수강신청</span>
            </label>
            <label className="flex items-center text-[#79695A] font-medium">
              <input
                type="radio"
                name="mode"
                value="변경"
                checked={mode === "변경"}
                onChange={() => setMode("변경")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">변경</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-800 transition"
          >
            로그인
          </button>

          {/* Helpers */}
          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:underline">
              학번/통합정보시스템 ID 찾기
            </a>
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
