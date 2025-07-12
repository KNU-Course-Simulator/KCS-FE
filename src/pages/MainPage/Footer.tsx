// src/components/Footer/Footer.tsx
import React from "react";

export const Footer: React.FC = () => (
  <footer className="container mx-auto mt-28 mb-20">
    <hr className="border-gray-300" />
    <p className="mt-4 text-red-600 font-medium">주의사항</p>
    <p className="mt-2 text-gray-500 text-md">
      위 페이지는 본 교의 수강신청 연습용이며, 실제 대학교 시스템과 무관합니다
    </p>
    <p className="mt-2 text-gray-500 text-sm">
      문의사항 및 개선 제안은 언제든지
      <a
        href="mailto:lee980605@knu.ac.kr"
        className="text-blue-300 underline hover:text-blue-500"
      >
        lee980605@knu.ac.kr
      </a>
      로 보내주세요.
    </p>
    <p className="mt-1 text-gray-500 text-sm">
      소스 코드를 둘러보고 싶으신 분은
      <a
        href="https://github.com/not-pnu/sugang"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 underline hover:text-blue-500"
      >
        GitHub 레포지토리
      </a>
      를 확인해보세요!
    </p>
  </footer>
);
