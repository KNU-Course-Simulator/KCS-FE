import React from "react";
import { Button } from "../../components/Button/Button";
import { Table } from "../../components/Table/Table";
import { TableRow } from "../../components/Table/TableRow";

interface PackageListProps {
  items: PackageItem[];
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

export const PackageList: React.FC<PackageListProps> = ({ items }) => (
  <div className="bg-white rounded-lg mt-4">
    <p className="mb-1 text-gray-700 font-medium">
      담은 과목 신청 목록 {items.length}건
    </p>
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
      {items.map((p, i) => (
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
);
