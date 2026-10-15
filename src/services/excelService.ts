import * as XLSX from 'xlsx';
import type { VisitBooking } from './submissionService';

export interface ExcelRepositoryStatus {
  exists: boolean;
  filePath?: string;
  relativeFilePath?: string;
  totalBookings: number;
  fileSizeBytes?: number;
  lastModified?: string | null;
}

export const EXCEL_COLUMNS = [
  { key: 'Booking ID', width: 20 },
  { key: 'Guest Full Name', width: 28 },
  { key: 'Email Address', width: 32 },
  { key: 'Contact / Mobile No.', width: 22 },
  { key: 'Service / Gathering', width: 36 },
  { key: 'Gathering Time', width: 22 },
  { key: 'Party Size (Estimated)', width: 22 },
  { key: 'Kids Ministry Check-In', width: 22 },
  { key: 'Special Requests / Notes', width: 40 },
  { key: 'Date & Time Booked', width: 26 },
  { key: 'Booking Status', width: 20 },
  { key: 'Last Synced (UTC)', width: 24 }
];

/**
 * Normalizes a VisitBooking object into standard Excel row format
 */
export function formatBookingForExcel(booking: VisitBooking) {
  let gatheringTime = 'Sunday Morning';
  if (booking.serviceName && booking.serviceName.includes('(')) {
    const match = booking.serviceName.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      gatheringTime = match[1];
    }
  }

  return {
    'Booking ID': booking.id,
    'Guest Full Name': booking.name.trim(),
    'Email Address': booking.email.trim().toLowerCase(),
    'Contact / Mobile No.': booking.phone?.trim() || 'N/A',
    'Service / Gathering': booking.serviceName.trim(),
    'Gathering Time': gatheringTime,
    'Party Size (Estimated)': String(booking.partySize || '1'),
    'Kids Ministry Check-In': booking.hasKids ? 'Yes (Requested)' : 'No',
    'Special Requests / Notes': booking.specialRequests?.trim() || 'None',
    'Date & Time Booked': booking.submittedAt,
    'Booking Status': (booking.status || 'new').toUpperCase(),
    'Last Synced (UTC)': new Date().toISOString()
  };
}

/**
 * Client-Side Excel Service for automated synchronization and generation
 */
export const excelService = {
  /**
   * Automatically synchronizes a newly booked visit with the server Excel repository.
   * Ensures the record is appended or updated without creating duplicate entries.
   */
  async syncBookingToServer(booking: VisitBooking): Promise<boolean> {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });
      return response.ok;
    } catch {
      // In offline / static preview mode, client-side fallback continues seamlessly
      return false;
    }
  },

  /**
   * Syncs all existing bookings to the server Excel repository to ensure complete consistency
   */
  async syncAllToServer(bookings: VisitBooking[]): Promise<boolean> {
    try {
      const response = await fetch('/api/bookings/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookings)
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  /**
   * Checks current server Excel file repository status
   */
  async getStatus(): Promise<ExcelRepositoryStatus | null> {
    try {
      const response = await fetch('/api/bookings/excel-status');
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Downloads the Excel repository directly from the browser as a genuine .xlsx workbook.
   * Deduplicates entries before writing to ensure complete data integrity.
   */
  downloadWorkbook(bookings: VisitBooking[], filename: string = 'JCLS_Visit_Bookings.xlsx') {
    // 1. Deduplicate bookings by ID or composite key (email + date)
    const uniqueMap = new Map<string, VisitBooking>();
    for (const b of bookings) {
      const key = b.id || `${b.email}_${b.submittedAt}_${b.serviceName}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, b);
      }
    }

    const rows = Array.from(uniqueMap.values()).map(formatBookingForExcel);

    // 2. Build worksheet with explicit column headers & widths
    const worksheet = XLSX.utils.json_to_sheet(rows, {
      header: EXCEL_COLUMNS.map(c => c.key)
    });

    worksheet['!cols'] = EXCEL_COLUMNS.map(c => ({ wch: c.width }));

    // 3. Build workbook and trigger instant browser download
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visit Bookings');

    XLSX.writeFile(workbook, filename);
  }
};
