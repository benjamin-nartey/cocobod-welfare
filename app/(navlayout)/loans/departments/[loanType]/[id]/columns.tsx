"use client";

import React, {  useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AllLoanRequestProps } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const useColumns = (): ColumnDef<AllLoanRequestProps>[] => {
  const [selectedLoan, setSelectedLoan] = useState<AllLoanRequestProps | null>(
    null
  );

  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter()

  const handleApproveClick = (loan: AllLoanRequestProps, action: string) => {
    setSelectedLoan(loan);
    setSelectedAction(action);

    setIsOpenAlertDialog(true);
  };

  console.log({ comments });
  return [
    {
      accessorKey: "employeeName",
      header: () => <div className="">Name</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original.employee;
        return <div>{data?.user?.name}</div>;
      },
    },
    {
      accessorKey: "employeeEmail",
      header: () => <div className="">Email</div>,
      cell: ({ row }) => {
        const data = row.original.employee; //row.getValue("employee") as EmployeeProps;
        return <div>{data?.user?.email}</div>;
      },
    },
    {
      accessorKey: "employeeId",
      header: () => <div className="">Staff ID</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original.employee;
        return <div>{data?.staffNumber}</div>;
      },
    },
    {
      accessorKey: "employeeType",
      header: () => <div className="">Employee Type</div>,
      cell: ({ row }) => {
        // const data = row.getValue("employee") as EmployeeProps;
        const data = row.original?.employee;
        return <div>{data?.employeeType}</div>;
      },
    },
    { accessorKey: "loanType", header: "Loan type" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const getStatusStyles = (status: string) => {
          switch (status.toLowerCase()) {
            case "signed":
              return "bg-green-100 text-green-800 px-3 py-1 rounded-full";
            case "approve":
              return "bg-amber-100 text-amber-800 px-3 py-1 rounded-full";
            case "review":
              return "bg-red-100 text-red-800 px-3 py-1 rounded-full";
            case "confirm":
              return "bg-[#2DCCFF]/20 text-[#000] px-3 py-1 rounded-full";
            case "recommend":
              return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full";
            case "acknowledge":
              return "bg-violet-100 text-violet-800 px-3 py-1 rounded-full";
            case "started":
              return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full";
            default:
              return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full";
          }
        };

        return (
          <div className={`inline-block capitalize ${getStatusStyles(status)}`}>
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "comments",
      header: () => <div className="">Comments</div>,
      cell: ({ row }) => {
        // const comments = row.getValue("comments") as CommentsProps;
        const comments = row.original.comments;
        return <div>{comments?.message}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const loan = row.original;

        const handleApprove = async (loanId: string, action: string) => {
          setLoading(true);
          try {
            const currentComments = textareaRef.current?.value || "";
            setComments(currentComments);

            const payload = {
              action,
            };
            console.log({ payload });

            const TokeResponse = await fetch(
              "/api/get-cookie?name=accessToken"
            );
            const accessToken = await TokeResponse.json();

            const response = await fetch(
              `${BASE_URL}/loans/approve/${loanId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken?.value}`,
                },
                body: JSON.stringify(
                  payload.action === "APPROVE"
                    ? payload
                    : { ...payload, comments: currentComments }
                ),
              }
            );

            if (response.ok) {
              toast("Loan approved successfully");
              setIsOpenAlertDialog(false);
              router.refresh();
            }
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };

        return (
          <>
            <AlertDialog open={isOpenAlertDialog}>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {selectedAction === "APPROVE"
                      ? `Are you sure you want approve the ${selectedLoan?.loanType
                          .replaceAll("_", " ")
                          .toLowerCase()} loan requested by ${
                          selectedLoan?.employee?.user?.name
                        }?. Once approved cannot be undone at this stage`
                      : `Clicking on review will forward this request back to ${selectedLoan?.employee?.user?.name} for a review. You can choose to add your comment below`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                {selectedAction === "REVIEW" && (
                  <div>
                    <Textarea
                      className="bg-[#fff] rounded-3xl p-4 focus:outline-none focus:ring-0"
                      rows={6}
                      placeholder="Add your comments here..."
                      name="comments"
                      ref={textareaRef}
                    />
                  </div>
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setIsOpenAlertDialog(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="text-white bg-orangeAccent hover:bg-orangeAccent/75"
                    onClick={() => {
                      if (selectedLoan) {
                        handleApprove(
                          loan.id,
                          `${
                            selectedAction === "APPROVE" ? "APPROVE" : "REVIEW"
                          }`
                        );
                      }
                    }}
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : selectedAction === "APPROVE"
                      ? "Approve"
                      : "Review"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleApproveClick(loan, "APPROVE")}
                >
                  Approve
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleApproveClick(loan, "REVIEW")}
                >
                  Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];
};

export default useColumns;
