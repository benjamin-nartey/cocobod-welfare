import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepartmentApprovalTable from "./department-approval-table";

const allDepartmentsLoanRequest: LoanRequestByDepartmentProps[] = [
  {
    loanType: "CAR",
    departments: [
      {
        name: "ITD",
        id: "2ww2ehbv3bbga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HR",
        id: "2ww2ehbv3bbchxv",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finnce",
        id: "2ww2ehbv3bbmjasn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Accounts",
        id: "2ww2ehbv3bbvs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Civil Works",
        id: "2ww2ehbv3bbhvsna",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    loanType: "STUDIES",
    departments: [
      {
        name: "ITD",
        id: "2ww2ehbv3bbga",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HR",
        id: "2ww2ehbv3bbchxv",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Finnce",
        id: "2ww2ehbv3bbmjasn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Accounts",
        id: "2ww2ehbv3bbvs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Civil Works",
        id: "2ww2ehbv3bbhvsna",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

export default function DepartmentApproval() {
  return (
    <div className="">
      <Tabs defaultValue={allDepartmentsLoanRequest[0].loanType} className="">
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
                <DepartmentApprovalTable data={loan.departments} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
        {/* <TabsContent value="studiesLoan">
          <Card className="bg-[#f1ebe6]">
            <CardHeader>
              <CardDescription className="sr-only">
                Make changes to your carLoan here. Click save when you done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <DepartmentApprovalTable data={allDepartments} />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
