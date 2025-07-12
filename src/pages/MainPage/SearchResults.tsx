// src/components/SearchResults/SearchResults.tsx
import React from "react";
import { Button } from "../../components/Button/Button";
import { Table } from "../../components/Table/Table";
import { TableRow } from "../../components/Table/TableRow";

export interface SearchResultItem {
  code: string;
  name: string;
  section: string;
  category: string;
  credits: number;
  time: string;
  limit: number;
  enrolled: number;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  onApply: (item: SearchResultItem) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onApply,
}) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-2 mb-16 container mx-auto">
      <h2 className="mb-2 font-medium text-gray-700">
        검색 결과 {results.length}건
      </h2>
      <Table
        headers={[
          "신청",
          "교과목코드",
          "교과목명",
          "분반",
          "교과구분",
          "학점",
          "강의시간",
          "제한인원",
          "수강인원",
        ]}
      >
        {results.map((c) => (
          <TableRow
            key={c.code}
            cells={[
              <Button
                key="apply"
                className="bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => onApply(c)}
              >
                신청
              </Button>,
              c.code,
              c.name,
              c.section,
              c.category,
              String(c.credits),
              c.time,
              String(c.limit),
              String(c.enrolled),
            ]}
          />
        ))}
      </Table>
    </div>
  );
};
