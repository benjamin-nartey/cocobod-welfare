

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
      
    
      'Loan Type': item.loanType || '',
      Status: item.status || '',
      
      
      Comments: item.comments?.message || '',
      
      
    
    }));

    // Create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Loan Requests');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    
  
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
}