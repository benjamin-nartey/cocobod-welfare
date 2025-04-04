"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  File,
  FilterIcon,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { exportToExcel } from "@/lib/exportToExcel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  drawalDialogComponent?: React.ReactNode;
  drawalEditComponent?: React.ReactNode;
  isOpenAddVisitor?: boolean;
  isOpenEditVisitor?: boolean;
  withSearchFilter?: boolean;
  withExcelExport?: boolean;
  exportFileName?: string; // Add
}

export function DataTableDefault<TData, TValue>({
  columns,
  data,
  drawalDialogComponent,
  drawalEditComponent,
  isOpenEditVisitor,
  withSearchFilter,
  withExcelExport,
  exportFileName = "loan-report",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleExport = (): void => {
    try {
      // Get the current data based on filters
      const dataToExport = table
        .getFilteredRowModel()
        .rows.map((row) => row.original);

      // Call the export function with the proper file name
      exportToExcel(dataToExport, exportFileName || "loan-requests");
    } catch (error) {
      console.error("Error in handleExport:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2">
        {withSearchFilter && (
          <div>
            <Input
              placeholder="Filter Name..."
              value={(table.getState()?.globalFilter as string) ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="max-w-sm bg-white shadow-sm rounded-3xl"
            />
          </div>
        )}

        {withExcelExport && (
          <div className="flex justify-center items-center gap-4 mr-2">
            <Popover>
              <PopoverTrigger>
                <FilterIcon className="text-zinc-400 hover:text-orangeAccent cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <form>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox className="" id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Approved
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox className="" id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        pending
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox className="" id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Review
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox className="" id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Department
                      </label>
                    </div>
                    <Button
                      className="bg-orangeAccent hover:bg-orangeAccent/75"
                      type="submit"
                    >
                      Filter
                    </Button>
                  </div>
                </form>
              </PopoverContent>
            </Popover>
            <Button
              onClick={handleExport}
              className="bg-zinc-400 hover:bg-orangeAccent"
              type="button"
            >
              <File /> Export to excel
            </Button>
          </div>
        )}

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto shadow-sm">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black" align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
        {drawalDialogComponent && drawalDialogComponent}
        {isOpenEditVisitor && drawalEditComponent}
      </div>

      <div className="rounded-md border shadow-sm">
        <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHeader className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-black" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => (
                <TableRow
                  className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="relative flex items-center justify-end py-4 ">
        {/* <div className="flex-1 text-sm text-muted-foreground ">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}

        <div className="flex items-center">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </>
  );
}
