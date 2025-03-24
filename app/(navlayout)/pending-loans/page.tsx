import React from "react";
import PendingLoansTable from "./pending-loans-table";
import { fetchData } from "@/app/lib/fetchData";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

enum EmployeeTypeEnum {
  JUNIOR = "JUNIOR",
  SENIOR = "SENIOR",
  MANAGEMENT = "MANAGEMENT",
}
enum EmployeeStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export default async function PendingLoans() {
  //   const url = `${BASE_URL}/loans/pending-request`;
  //   const cookieStore = await cookies();
  //   const accessToken = cookieStore.get("accessToken")?.value;
  //   const data = (await fetchData(url, accessToken)) as LoansRequestProps;

  const loanRequests: AllLoanRequestProps[] = Array.from(
    { length: 20 },
    (_, index) => {
      const id = (index + 1).toString();
      const loanTypes = [
        "Personal Loan",
        "Home Loan",
        "Car Loan",
        "Education Loan",
      ];
      const statuses = ["Approved", "Pending", "Rejected"];
      const employeeTypes = [
        EmployeeTypeEnum.JUNIOR,
        EmployeeTypeEnum.SENIOR,
        EmployeeTypeEnum.MANAGEMENT,
      ];
      const employeeStatuses = [
        EmployeeStatusEnum.ACTIVE,
        EmployeeStatusEnum.INACTIVE,
      ];
      const randomDate = (start: Date, end: Date) =>
        new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );

      return {
        id,
        loanType: loanTypes[index % loanTypes.length],
        status: statuses[index % statuses.length],
        createdAt: randomDate(new Date("2024-01-01"), new Date("2024-03-01")),
        updatedAt: randomDate(new Date("2024-03-02"), new Date("2024-03-31")),
        employee: {
          id: `E${id}`,
          hireDate: randomDate(new Date("2015-01-01"), new Date("2023-01-01")),
          employeeType: employeeTypes[index % employeeTypes.length],
          staffNumber: 1000 + index,
          updatedAt: new Date(),
          createdAt: new Date(),
          user: {
            id: `U${id}`,
            name: `Employee ${id}`,
            email: `employee${id}@example.com`,
            status: employeeStatuses[index % employeeStatuses.length],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        comments:
          index % 3 === 0
            ? { id: `C${id}`, message: `Comment for loan ${id}` }
            : null,
        approvalStage: {
          id: `AP${id}`,
          type: ["Initial Review", "Final Approval", "Final Review"][index % 3],
          createdAt: randomDate(new Date("2024-01-01"), new Date("2024-03-01")),
          updatedAt: new Date(),
          approvers: [
            {
              id: `A${id}`,
              action: statuses[index % statuses.length],
              meta: [`Meta info for approver ${id}`],
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      };
    }
  );

  return (
    <div className="w-full bg-[#f1ebe6] rounded-3xl p-2">
      <PendingLoansTable data={loanRequests} />
    </div>
  );
}
