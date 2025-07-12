import React from "react";

interface UserInfoProps {
  studentNo?: string;
  name: string;
  department?: string;
  availableCredits?: number;
  appliedCredits?: number;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  studentNo = "",
  name,
  department = "",
  availableCredits = 0,
  appliedCredits = 0,
}) => {
  const rows = [
    { label: "학번", value: studentNo },
    { label: "성명", value: name },
    { label: "소속", value: department },
    { label: "수강신청가능학점", value: String(availableCredits) },
    { label: "수강신청학점", value: String(appliedCredits) },
  ];

  return (
    <div className="">
      <table className="table-fixed w-full bg-white border-t border-t-gray-500 border-b-2 border-b-gray-300 text-center">
        <tbody>
          <tr>
            {rows.map(({ label, value }, i) => (
              <React.Fragment key={i}>
                <td className="w-1/6 bg-gray-100 text-sm py-2 font-medium">
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
  );
};
