// // "use client";

// // import {
// //   ColumnDef,
// //   ColumnFiltersState,
// //   SortingState,
// //   flexRender,
// //   getCoreRowModel,
// //   getFilteredRowModel,
// //   getPaginationRowModel,
// //   getSortedRowModel,
// //   useReactTable,
// //   VisibilityState,
// // } from "@tanstack/react-table";

// // import { Check, ChevronsUpDown } from "lucide-react";

// // import { cn } from "@/lib/utils";

// // import {
// //   Command,
// //   CommandEmpty,
// //   CommandGroup,
// //   CommandInput,
// //   CommandItem,
// //   CommandList,
// // } from "@/components/ui/command";

// // import {
// //   DropdownMenu,
// //   DropdownMenuCheckboxItem,
// //   DropdownMenuContent,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";

// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";

// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Button } from "@/components/ui/button";
// // import React, { useEffect, useState, FormEvent } from "react";
// // import { Input } from "@/components/ui/input";
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   ChevronsLeft,
// //   ChevronsRight,
// //   File,
// //   FilterIcon,
// // } from "lucide-react";

// // import { exportToExcel } from "@/lib/exportToExcel";
// // import { fetchData } from "@/lib/fetchData";
// // import { GenericAttributeProps } from "@/types";
// // import { checkUserPermission } from "@/lib/checkUserPermissions";
// // import { PERMISSIONS } from "@/lib/constants/permissions";

// // interface DataTableProps<TData, TValue> {
// //   columns: ColumnDef<TData, TValue>[];
// //   data: TData[];
// //   drawalDialogComponent?: React.ReactNode;
// //   drawalEditComponent?: React.ReactNode;
// //   isOpenAddVisitor?: boolean;
// //   isOpenEditVisitor?: boolean;
// //   withSearchFilter?: boolean;
// //   withExcelExport?: boolean;
// //   exportFileName?: string; // Add
// // }

// // interface DepartmentValueProps {
// //   value: string;
// //   label: string;
// // }

// // interface DepartmentDataProps {
// //   data: GenericAttributeProps[];
// // }

// // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// // export function DataTableDefault<TData, TValue>({
// //   columns,
// //   data,
// //   drawalDialogComponent,
// //   drawalEditComponent,
// //   isOpenEditVisitor,
// //   withSearchFilter,
// //   withExcelExport,
// //   exportFileName = "loan-report",
// // }: DataTableProps<TData, TValue>) {
// //   const [open, setOpen] = React.useState(false);
// //   const [value, setValue] = React.useState("");
// //   const [sorting, setSorting] = useState<SortingState>([]);
// //   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

// //   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

// //   const [rowSelection, setRowSelection] = useState({});

// //   const [departmentsValue, setDepartmentsValue] = useState<
// //     DepartmentValueProps[]
// //   >([]);

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     onSortingChange: setSorting,
// //     getSortedRowModel: getSortedRowModel(),
// //     onColumnFiltersChange: setColumnFilters,
// //     getFilteredRowModel: getFilteredRowModel(),
// //     onColumnVisibilityChange: setColumnVisibility,
// //     onRowSelectionChange: setRowSelection,
// //     state: {
// //       sorting,
// //       columnFilters,
// //       columnVisibility,
// //       rowSelection,
// //     },
// //   });

// //   const getDepartmentData = async () => {
// //     const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
// //     const accessToken = await TokeResponse.json();

// //     const departmentData: DepartmentDataProps = (await fetchData(
// //       `${BASE_URL}/departments`,
// //       accessToken?.value
// //     )) as DepartmentDataProps;

// //     const newObj = departmentData.data.map((data) => {
// //       const obj: DepartmentValueProps = {
// //         value: data.id,
// //         label: data.name,
// //       };
// //       return obj;
// //     });

// //     setDepartmentsValue(newObj);
// //   };

// //   useEffect(() => {
// //     getDepartmentData();
// //   }, []);

// //   console.log({ departmentsValue });

// //   const handleExport = (): void => {
// //     try {
// //       // Get the current data based on filters
// //       const dataToExport = table
// //         .getFilteredRowModel()
// //         .rows.map((row) => row.original);

// //       // Call the export function with the proper file name
// //       exportToExcel(dataToExport, exportFileName || "loan-requests");
// //     } catch (error) {
// //       console.error("Error in handleExport:", error);
// //     }
// //   };

// //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();

// //     const userUrl = `${BASE_URL}/user/me`;
// //     const params = new URLSearchParams();
// //     params.append("status", "SIGNED");
// //     params.append("departmentId", value)

// //     const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
// //     const accessToken = await TokeResponse.json();

// //     const userData = (await fetchData(userUrl, accessToken)) as UserProps;

// //     const canGetAllLoans = checkUserPermission(userData, PERMISSIONS.GET_LOANS);

// //     const loanUrl = canGetAllLoans
// //       ? `${BASE_URL}/loans?${params}`
// //       : `${BASE_URL}/loans/requests/me?${params}`;

// //     try {
// //       const response = await fetch(loanUrl as string, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       });
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="flex items-center justify-between gap-2 mb-2">
// //         {withSearchFilter && (
// //           <div>
// //             <Input
// //               placeholder="Filter Name..."
// //               value={(table.getState()?.globalFilter as string) ?? ""}
// //               onChange={(event) => table.setGlobalFilter(event.target.value)}
// //               className="max-w-sm bg-white shadow-sm rounded-3xl"
// //             />
// //           </div>
// //         )}

// //         {withExcelExport && (
// //           <div className="flex justify-center items-center gap-4 mr-2">
// //             <Popover>
// //               <PopoverTrigger>
// //                 <FilterIcon className="text-orangeAccent hover:text-orangeAccent/75 cursor-pointer" />
// //               </PopoverTrigger>
// //               <PopoverContent>
// //                 <form>
// //                   <div className="flex flex-col gap-4">
// //                     <Popover open={open} onOpenChange={setOpen}>
// //                       <PopoverTrigger className="rounded-3xl" asChild>
// //                         <Button
// //                           variant="outline"
// //                           role="combobox"
// //                           aria-expanded={open}
// //                           className="w-full justify-between"
// //                         >
// //                           {value
// //                             ? departmentsValue.find(
// //                                 (department) => department.value === value
// //                               )?.label
// //                             : "Select department..."}
// //                           <ChevronsUpDown className="opacity-50" />
// //                         </Button>
// //                       </PopoverTrigger>
// //                       <PopoverContent className="w-full p-0">
// //                         <Command>
// //                           <CommandInput
// //                             placeholder="Search department..."
// //                             className="h-9"
// //                           />
// //                           <CommandList>
// //                             <CommandEmpty>No department found.</CommandEmpty>
// //                             <CommandGroup>
// //                               {departmentsValue.map((department) => (
// //                                 <CommandItem
// //                                   key={department.value}
// //                                   value={department.value}
// //                                   onSelect={(currentValue) => {
// //                                     setValue(
// //                                       currentValue === value ? "" : currentValue
// //                                     );
// //                                     setOpen(false);
// //                                   }}
// //                                 >
// //                                   {department.label}
// //                                   <Check
// //                                     className={cn(
// //                                       "ml-auto",
// //                                       value === department.value
// //                                         ? "opacity-100"
// //                                         : "opacity-0"
// //                                     )}
// //                                   />
// //                                 </CommandItem>
// //                               ))}
// //                             </CommandGroup>
// //                           </CommandList>
// //                         </Command>
// //                       </PopoverContent>
// //                     </Popover>
// //                     <Button
// //                       className="bg-orangeAccent hover:bg-orangeAccent/75"
// //                       type="submit"
// //                     >
// //                       Filter
// //                     </Button>
// //                   </div>
// //                 </form>
// //               </PopoverContent>
// //             </Popover>
// //             <Button
// //               onClick={handleExport}
// //               className="bg-orangeAccent hover:bg-orangeAccent/75"
// //               type="button"
// //             >
// //               <File /> Export to excel
// //             </Button>
// //           </div>
// //         )}

// //         {/* <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <Button variant="outline" className="ml-auto shadow-sm">
// //               Columns
// //             </Button>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent className="bg-white text-black" align="end">
// //             {table
// //               .getAllColumns()
// //               .filter((column) => column.getCanHide())
// //               .map((column) => {
// //                 return (
// //                   <DropdownMenuCheckboxItem
// //                     key={column.id}
// //                     className="capitalize"
// //                     checked={column.getIsVisible()}
// //                     onCheckedChange={(value) =>
// //                       column.toggleVisibility(!!value)
// //                     }
// //                   >
// //                     {column.id}
// //                   </DropdownMenuCheckboxItem>
// //                 );
// //               })}
// //           </DropdownMenuContent>
// //         </DropdownMenu> */}
// //         {drawalDialogComponent && drawalDialogComponent}
// //         {isOpenEditVisitor && drawalEditComponent}
// //       </div>

// //       <div className="rounded-md border shadow-sm">
// //         <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //           <TableHeader className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
// //             {table.getHeaderGroups().map((headerGroup) => (
// //               <TableRow key={headerGroup.id}>
// //                 {headerGroup.headers.map((header) => {
// //                   return (
// //                     <TableHead className="font-black" key={header.id}>
// //                       {header.isPlaceholder
// //                         ? null
// //                         : flexRender(
// //                             header.column.columnDef.header,
// //                             header.getContext()
// //                           )}
// //                     </TableHead>
// //                   );
// //                 })}
// //               </TableRow>
// //             ))}
// //           </TableHeader>
// //           <TableBody>
// //             {table?.getRowModel().rows?.length ? (
// //               table?.getRowModel().rows?.map((row) => (
// //                 <TableRow
// //                   className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
// //                   key={row.id}
// //                   data-state={row.getIsSelected() && "selected"}
// //                 >
// //                   {row.getVisibleCells().map((cell) => (
// //                     <TableCell key={cell.id}>
// //                       {flexRender(
// //                         cell.column.columnDef.cell,
// //                         cell.getContext()
// //                       )}
// //                     </TableCell>
// //                   ))}
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell
// //                   colSpan={columns.length}
// //                   className="h-24 text-center"
// //                 >
// //                   No results.
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </div>

// //       <div className="relative flex items-center justify-end py-4 ">
// //         {/* <div className="flex-1 text-sm text-muted-foreground ">
// //           {table.getFilteredSelectedRowModel().rows.length} of{" "}
// //           {table.getFilteredRowModel().rows.length} row(s) selected.
// //         </div> */}

// //         <div className="flex items-center">
// //           <Button
// //             variant="outline"
// //             className="hidden h-8 w-8 p-0 lg:flex"
// //             onClick={() => table.setPageIndex(0)}
// //             disabled={!table.getCanPreviousPage()}
// //           >
// //             <span className="sr-only">Go to first page</span>
// //             <ChevronsLeft />
// //           </Button>
// //           <Button
// //             variant="outline"
// //             className="h-8 w-8 p-0"
// //             onClick={() => table.previousPage()}
// //             disabled={!table.getCanPreviousPage()}
// //           >
// //             <span className="sr-only">Go to previous page</span>
// //             <ChevronLeft />
// //           </Button>
// //           <Button
// //             variant="outline"
// //             className="h-8 w-8 p-0"
// //             onClick={() => table.nextPage()}
// //             disabled={!table.getCanNextPage()}
// //           >
// //             <span className="sr-only">Go to next page</span>
// //             <ChevronRight />
// //           </Button>
// //           <Button
// //             variant="outline"
// //             className="hidden h-8 w-8 p-0 lg:flex"
// //             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// //             disabled={!table.getCanNextPage()}
// //           >
// //             <span className="sr-only">Go to last page</span>
// //             <ChevronsRight />
// //           </Button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";

// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import React, { useEffect, useState, FormEvent } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   File,
//   FilterIcon,
// } from "lucide-react";

// import { exportToExcel } from "@/lib/exportToExcel";
// import { fetchData } from "@/lib/fetchData";
// import { GenericAttributeProps, UserProps } from "@/types";
// import { checkUserPermission } from "@/lib/checkUserPermissions";
// import { PERMISSIONS } from "@/lib/constants/permissions";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   drawalDialogComponent?: React.ReactNode;
//   drawalEditComponent?: React.ReactNode;
//   isOpenAddVisitor?: boolean;
//   isOpenEditVisitor?: boolean;
//   withSearchFilter?: boolean;
//   withExcelExport?: boolean;
//   exportFileName?: string;
// }

// interface DepartmentValueProps {
//   value: string;
//   label: string;
// }

// interface DepartmentDataProps {
//   data: GenericAttributeProps[];
// }

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export function DataTableDefault<TData, TValue>({
//   columns,
//   data: initialData,
//   drawalDialogComponent,
//   drawalEditComponent,
//   isOpenEditVisitor,
//   withSearchFilter,
//   withExcelExport,
//   exportFileName = "loan-report",
// }: DataTableProps<TData, TValue>) {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = useState({});
//   const [data, setData] = useState<TData[]>(initialData);

//   const [departmentsValue, setDepartmentsValue] = useState<
//     DepartmentValueProps[]
//   >([]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   const getDepartmentData = async () => {
//     const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
//     const accessToken = await TokeResponse.json();

//     const departmentData: DepartmentDataProps = (await fetchData(
//       `${BASE_URL}/departments`,
//       accessToken?.value
//     )) as DepartmentDataProps;

//     const newObj = departmentData.data.map((data) => {
//       const obj: DepartmentValueProps = {
//         value: data.id,
//         label: data.name,
//       };
//       return obj;
//     });

//     setDepartmentsValue(newObj);
//   };

//   useEffect(() => {
//     getDepartmentData();
//   }, []);

//   useEffect(() => {
//     // Reset the table data when initialData changes (from parent component)
//     setData(initialData);
//   }, [initialData]);

//   const handleExport = (): void => {
//     try {
//       // Get the current data based on filters
//       const dataToExport = table
//         .getFilteredRowModel()
//         .rows.map((row) => row.original);

//       // Call the export function with the proper file name
//       exportToExcel(dataToExport, exportFileName || "loan-requests");
//     } catch (error) {
//       console.error("Error in handleExport:", error);
//     }
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!value) {
//       // If no department is selected, revert to initial data
//       setData(initialData);
//       return;
//     }

//     try {
//       const userUrl = `${BASE_URL}/user/me`;
//       const params = new URLSearchParams();
//       params.append("status", "SIGNED");
//       params.append("departmentId", value);

//       const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
//       const accessToken = await TokeResponse.json();

//       const userData = (await fetchData(
//         userUrl,
//         accessToken?.value
//       )) as UserProps;

//       const canGetAllLoans = checkUserPermission(
//         userData,
//         PERMISSIONS.GET_LOANS
//       );

//       const loanUrl = canGetAllLoans
//         ? `${BASE_URL}/loans?${params}`
//         : `${BASE_URL}/loans/requests/me?${params}`;

//       const response = await fetch(loanUrl as string, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken?.value}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error fetching filtered data: ${response.statusText}`);
//       }

//       const filteredData = await response.json();

//       // Update the table data with the filtered results
//       setData(filteredData.data as TData[]);

//       // Reset to first page after filtering
//       table.setPageIndex(0);
//     } catch (error) {
//       console.error("Error filtering data:", error);
//       // Optionally show an error message to the user
//     } finally {

//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between gap-2 mb-2">
//         {withSearchFilter && (
//           <div>
//             <Input
//               placeholder="Filter Name..."
//               value={
//                 (table.getState().columnFilters.find((f) => f.id === "name")
//                   ?.value as string) ?? ""
//               }
//               onChange={(event) =>
//                 table.getColumn("name")?.setFilterValue(event.target.value)
//               }
//               className="max-w-sm bg-white shadow-sm rounded-3xl"
//             />
//           </div>
//         )}

//         {withExcelExport && (
//           <div className="flex justify-center items-center gap-4 mr-2">
//             <Popover>
//               <PopoverTrigger>
//                 <FilterIcon className="text-orangeAccent hover:text-orangeAccent/75 cursor-pointer" />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <form onSubmit={handleSubmit}>
//                   <div className="flex flex-col gap-4">
//                     <Popover open={open} onOpenChange={setOpen}>
//                       <PopoverTrigger className="rounded-3xl" asChild>
//                         <Button
//                           variant="outline"
//                           role="combobox"
//                           aria-expanded={open}
//                           className="w-full justify-between"
//                         >
//                           {value
//                             ? departmentsValue.find(
//                                 (department) => department.value === value
//                               )?.label
//                             : "Select department..."}
//                           <ChevronsUpDown className="opacity-50" />
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-full p-0">
//                         <Command>
//                           <CommandInput
//                             placeholder="Search department..."
//                             className="h-9"
//                           />
//                           <CommandList>
//                             <CommandEmpty>No department found.</CommandEmpty>
//                             <CommandGroup>
//                               {departmentsValue.map((department) => (
//                                 <CommandItem
//                                   key={department.value}
//                                   value={department.value}
//                                   onSelect={(currentValue) => {
//                                     setValue(
//                                       currentValue === value ? "" : currentValue
//                                     );
//                                     setOpen(false);
//                                   }}
//                                 >
//                                   {department.label}
//                                   <Check
//                                     className={cn(
//                                       "ml-auto",
//                                       value === department.value
//                                         ? "opacity-100"
//                                         : "opacity-0"
//                                     )}
//                                   />
//                                 </CommandItem>
//                               ))}
//                             </CommandGroup>
//                           </CommandList>
//                         </Command>
//                       </PopoverContent>
//                     </Popover>
//                     <Button
//                       className="bg-orangeAccent hover:bg-orangeAccent/75"
//                       type="submit"
//                     >
//                       Filter
//                     </Button>
//                   </div>
//                 </form>
//               </PopoverContent>
//             </Popover>
//             <Button
//               onClick={handleExport}
//               className="bg-orangeAccent hover:bg-orangeAccent/75"
//               type="button"
//             >
//               <File /> Export to excel
//             </Button>
//           </div>
//         )}

//         {drawalDialogComponent && drawalDialogComponent}
//         {isOpenEditVisitor && drawalEditComponent}
//       </div>

//       <div className="rounded-md border shadow-sm">
//         <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <TableHeader className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead className="font-black" key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table?.getRowModel().rows?.length ? (
//               table?.getRowModel().rows?.map((row) => (
//                 <TableRow
//                   className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="relative flex items-center justify-end py-4 ">
//         <div className="flex items-center">
//           <Button
//             variant="outline"
//             className="hidden h-8 w-8 p-0 lg:flex"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <span className="sr-only">Go to first page</span>
//             <ChevronsLeft />
//           </Button>
//           <Button
//             variant="outline"
//             className="h-8 w-8 p-0"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             <span className="sr-only">Go to previous page</span>
//             <ChevronLeft />
//           </Button>
//           <Button
//             variant="outline"
//             className="h-8 w-8 p-0"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             <span className="sr-only">Go to next page</span>
//             <ChevronRight />
//           </Button>
//           <Button
//             variant="outline"
//             className="hidden h-8 w-8 p-0 lg:flex"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//           >
//             <span className="sr-only">Go to last page</span>
//             <ChevronsRight />
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }

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

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
import React, { useEffect, useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  File,
  FilterIcon,
} from "lucide-react";

import { exportToExcel } from "@/lib/exportToExcel";
import { fetchData } from "@/lib/fetchData";
import { GenericAttributeProps, UserProps } from "@/types";
import { checkUserPermission } from "@/lib/checkUserPermissions";
import { PERMISSIONS } from "@/lib/constants/permissions";
import { DatePickerWithRange } from "./DateRangePicker";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  drawalDialogComponent?: React.ReactNode;
  drawalEditComponent?: React.ReactNode;
  isOpenAddVisitor?: boolean;
  isOpenEditVisitor?: boolean;
  withSearchFilter?: boolean;
  withExcelExport?: boolean;
  exportFileName?: string;
}

interface DepartmentValueProps {
  value: string;
  label: string;
}

interface DepartmentDataProps {
  data: GenericAttributeProps[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function DataTableDefault<TData, TValue>({
  columns,
  data: initialData,
  drawalDialogComponent,
  drawalEditComponent,
  isOpenEditVisitor,
  withSearchFilter,
  withExcelExport,
  exportFileName = "loan-report",
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);
  const [filterPopoverOpen, setFilterPopoverOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<TData[]>(initialData);
  const [errMsg, setErrMsg] = useState("");

  const [departmentsValue, setDepartmentsValue] = useState<
    DepartmentValueProps[]
  >([]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const [currentUserData, setCurrentUserData] = useState<UserProps | null>(
    null
  );

  console.log("from", date?.from);
  console.log("to", date?.to);

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

  console.log(
    "issss",
    currentUserData?.roles.some((role) => ["Director HR"].includes(role.name))
  );

  const getDepartmentData = async () => {
    const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
    const accessToken = await TokeResponse.json();

    const departmentData: DepartmentDataProps = (await fetchData(
      `${BASE_URL}/departments`,
      accessToken?.value
    )) as DepartmentDataProps;

    const newObj = departmentData.data.map((data) => {
      const obj: DepartmentValueProps = {
        value: data.id,
        label: data.name,
      };
      return obj;
    });

    setDepartmentsValue(newObj);
  };

  useEffect(() => {
    getDepartmentData();
  }, []);

  useEffect(() => {
    // Reset the table data when initialData changes (from parent component)
    setData(initialData);
  }, [initialData]);

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

  const fetchCurrentUser = async () => {
    const userUrl = `${BASE_URL}/user/me`;

    const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
    const accessToken = await TokeResponse.json();

    const userData = (await fetchData(
      userUrl,
      accessToken?.value
    )) as UserProps;

    setCurrentUserData(userData);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrMsg("");

    try {
      if (
        !value &&
        !!currentUserData?.roles.some((role) =>
          ["Director HR"].includes(role.name)
        )
      ) {
        throw new Error("Please select department");
      }

      const canGetAllLoans = checkUserPermission(
        currentUserData as UserProps,
        PERMISSIONS.GET_LOANS
      );

      const params = new URLSearchParams();
      params.append("status", "SIGNED");
      params.append(
        "departmentId",
        currentUserData?.roles.some((role) =>
          ["Director HR"].includes(role.name)
        )
          ? value
          : (currentUserData?.employee?.departmentId as string)
      );
      params.append("from", date?.from ? format(date.from, "yyyy-MM-dd") : "");
      params.append("to", date?.to ? format(date.to, "yyyy-MM-dd") : "");

      const loanUrl = canGetAllLoans
        ? `${BASE_URL}/loans?${params}`
        : `${BASE_URL}/loans/requests/me?${params}`;

      const TokeResponse = await fetch("/api/get-cookie?name=accessToken");
      const accessToken = await TokeResponse.json();

      const response = await fetch(loanUrl as string, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching filtered data: ${response.statusText}`);
      }

      const filteredData = await response.json();

      // Update the table data with the filtered results
      setData(filteredData.data as TData[]);

      // Reset to first page after filtering
      table.setPageIndex(0);
      setFilterPopoverOpen(false);
    } catch (error) {
      setErrMsg(`${error}`);
    } finally {
      setValue("");
      setDate({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-2">
        {withSearchFilter && (
          <div>
            <Input
              placeholder="Filter Name..."
              value={
                (table.getState().columnFilters.find((f) => f.id === "name")
                  ?.value as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-white shadow-sm rounded-3xl"
              id="filterName"
              name="filterName"
            />
          </div>
        )}

        {withExcelExport && (
          <div className="flex justify-center items-center gap-4 mr-2">
            <Popover
              open={filterPopoverOpen}
              onOpenChange={setFilterPopoverOpen}
            >
              <PopoverTrigger>
                <FilterIcon className="text-orangeAccent hover:text-orangeAccent/75 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    {currentUserData?.roles.some((role) =>
                      ["Director HR"].includes(role.name)
                    ) && (
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger className="rounded-3xl" asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {value
                              ? departmentsValue.find(
                                  (department) => department.value === value
                                )?.label
                              : "Select department..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search department..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No department found.</CommandEmpty>
                              <CommandGroup>
                                {departmentsValue.map((department) => (
                                  <CommandItem
                                    key={department.value}
                                    value={department.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    {department.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === department.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}

                    <DatePickerWithRange date={date} setDate={setDate} />

                    <span className="text-sm text-red-500">{errMsg}</span>
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
              className="bg-orangeAccent hover:bg-orangeAccent/75"
              type="button"
            >
              <File /> Export to excel
            </Button>
          </div>
        )}

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
