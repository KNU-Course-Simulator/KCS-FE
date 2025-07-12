// src/pages/MainPage/RegistrationList.tsx
import React from "react";
import { Button } from "../../components/Button/Button";
import { Table } from "../../components/Table/Table";
import { TableRow } from "../../components/Table/TableRow";

export interface RegistrationItem {
  code: string;
  name: string;
  section: string;
  category: string; // 현재 선택된 교과구분
  credits: number;
  time: string;
}

interface RegistrationListProps {
  items: RegistrationItem[];
  onRemove: (code: string) => void;
  onCategoryChange: (code: string, newCategory: string) => void;
}

export const RegistrationList: React.FC<RegistrationListProps> = ({
  items,
  onRemove,
  onCategoryChange,
}) => (
  <div className="mt-6 mb-12">
    <p className="mb-2 text-gray-700 font-medium">
      수강신청목록 {items.length}건
    </p>
    <Table
      headers={[
        "No.",
        "삭제",
        "교과목코드",
        "교과목명",
        "분반",
        "교과구분",
        "학점",
        "재이수년도",
        "재이수학기",
        "강의시간",
      ]}
    >
      {items.map((item, idx) => (
        <TableRow
          key={item.code}
          cells={[
            String(idx + 1),
            <Button
              key="remove"
              variant="primary"
              className="py-1 px-2 text-sm"
              onClick={() => onRemove(item.code)}
            >
              삭제
            </Button>,
            item.code,
            item.name,
            item.section,
            <select
              key="category"
              value={item.category}
              onChange={(e) => onCategoryChange(item.code, e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="교양">교양</option>
              <option value="전공">전공</option>
              <option value="전공필수">전공필수</option>
            </select>,
            String(item.credits),
            /* 연도 입력 필드는 생략하거나 필요시 e.g. <input> */
            "",
            "",
            item.time,
          ]}
        />
      ))}
    </Table>
  </div>
);
