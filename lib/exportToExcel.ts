// // lib/exportToExcel.ts

// import * as XLSX from 'xlsx';

// // Define proper types that avoid using 'any'
// export type ExportableValue = string | number | boolean | Date | null | undefined;
// export type ExportableRecord = Record<string, ExportableValue>;
// export type ExportableData = ExportableRecord[];

// /**
//  * Exports data to an Excel file
//  * @param data Array of objects to export
//  * @param fileName Name of the file without extension
//  */
// export function exportToExcel<T extends ExportableData>(data: T, fileName: string = 'exported-data'): void {
//   // Create a new workbook
//   const workbook: XLSX.WorkBook = XLSX.utils.book_new();

//   // Convert data to worksheet
//   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

//   // Add the worksheet to the workbook
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

//   // Generate Excel file and trigger download
//   XLSX.writeFile(workbook, `${fileName}.xlsx`);
// }

// lib/exportToExcel.ts

// import * as XLSX from "xlsx";

// // Define proper types that avoid using 'any'
// export type ExportableValue =
//   | string
//   | number
//   | boolean
//   | Date
//   | null
//   | undefined;
// export type ExportableRecord = Record<string, ExportableValue>;
// export type ExportableData = ExportableRecord[];

// /**
//  * Exports data to an Excel file
//  * @param data Array of objects to export
//  * @param fileName Name of the file without extension
//  */
// export function exportToExcel<T>(
//   data: T[],
//   fileName: string = "exported-data"
// ): void {
//   // Create a new workbook
//   const workbook: XLSX.WorkBook = XLSX.utils.book_new();

//   // Convert data to worksheet
//   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

//   // Add the worksheet to the workbook
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

//   // Generate Excel file and trigger download
//   XLSX.writeFile(workbook, `${fileName}.xlsx`);
// }

// lib/exportToExcel.ts

// import * as XLSX from 'xlsx';

// /**
//  * Simple function to export data to Excel
//  * @param data The data to export
//  * @param fileName Name of the file without extension
//  */
// export function exportToExcel<T>(
//   data: T[],
//   fileName: string = 'exported-data'
// ): void {
//   try {
//     // Create a new workbook
//     const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
//     // Convert data to worksheet
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
//     // Generate Excel file and trigger download
//     XLSX.writeFile(workbook, `${fileName}.xlsx`);
    
//     console.log('Excel export successful');
//   } catch (error) {
//     console.error('Error exporting to Excel:', error);
//   }
// }

// lib/exportToExcel.ts

import * as XLSX from 'xlsx';
import { AllLoanRequestProps } from "@/types";

/**
 * Exports loan request data to Excel
 * @param data The loan request data to export
 * @param fileName Name of the file without extension
 */
export function exportToExcel(
  data: AllLoanRequestProps[],
  fileName: string = 'loan-requests'
): void {
  try {
    // Transform the data to flatten nested properties
    const exportData = data.map(item => ({
      // Employee information
      Name: item.employee?.user?.name || '',
      Email: item.employee?.user?.email || '',
      'Staff ID': item.employee?.staffNumber || '',
      'Employee Type': item.employee?.employeeType || '',
      
      // Loan information
      'Loan Type': item.loanType || '',
      Status: item.status || '',
      
      // Comments
      Comments: item.comments?.message || '',
      
      // Add any other fields you want to export
    
    }));

    // Create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Loan Requests');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    
    console.log('Excel export successful');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
}