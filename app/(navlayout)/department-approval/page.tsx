import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepartmentApprovalTable from "./department-approval-table";
import { fetchData } from "@/lib/fetchData";
import { cookies } from "next/headers";
import { LoanRequestByDepartmentProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function DepartmentApproval() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const url = `${BASE_URL}/loans/department`;
  const allDepartmentsLoanRequest = (await fetchData(
    url,
    accessToken
  )) as LoanRequestByDepartmentProps[];
  return (
    <div className="">
      <Tabs defaultValue={allDepartmentsLoanRequest[0]?.loanType} className="">
        <TabsList className="flex items-end justify-start gap-2 bg-transparent border-b-2 border-b-gray-400/40 rounded-none p-0">
          {allDepartmentsLoanRequest.map((loan, id) => (
            <TabsTrigger key={id} value={loan.loanType}>
              {loan.loanType}
            </TabsTrigger>
          ))}
        </TabsList>
        {allDepartmentsLoanRequest.map((loan, id) => (
          <TabsContent key={id} value={loan.loanType}>
            <Card className="bg-[#f1ebe6]">
              <CardHeader>
                <CardDescription className="sr-only">
                  Make changes to your carLoan here. Click save when you done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <DepartmentApprovalTable
                  data={[
                    ...loan.departments.map((department) => ({
                      ...department,
                      loanType: loan.loanType,
                    })),
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
