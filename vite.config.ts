import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import * as xlsxModule from 'xlsx';

const XLSX = (xlsxModule as any).default || xlsxModule;

const DATA_DIR = path.resolve(process.cwd(), 'data');
const EXCEL_FILE_PATH = path.join(DATA_DIR, 'JCLS_Visit_Bookings.xlsx');

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

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readBookingsFromExcel(): any[] {
  ensureDataDirectory();
  if (!fs.existsSync(EXCEL_FILE_PATH)) return [];
  try {
    const buffer = fs.readFileSync(EXCEL_FILE_PATH);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) return [];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('[Excel Repository] Error reading Excel file:', err);
    return [];
  }
}

function writeBookingsToExcel(rows: any[]) {
  ensureDataDirectory();
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: EXCEL_COLUMNS.map(c => c.key)
  });
  worksheet['!cols'] = EXCEL_COLUMNS.map(c => ({ wch: c.width }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Visit Bookings');
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
}

function normalizeBookingRow(booking: any) {
  let gatheringTime = 'Sunday Morning';
  if (booking.serviceName && typeof booking.serviceName === 'string' && booking.serviceName.includes('(')) {
    const match = booking.serviceName.match(/\(([^)]+)\)/);
    if (match && match[1]) {
      gatheringTime = match[1];
    }
  }

  return {
    'Booking ID': String(booking.id || `visit-${Date.now()}`),
    'Guest Full Name': String(booking.name || '').trim(),
    'Email Address': String(booking.email || '').trim().toLowerCase(),
    'Contact / Mobile No.': String(booking.phone || 'N/A').trim(),
    'Service / Gathering': String(booking.serviceName || 'Sunday Main Celebration Service').trim(),
    'Gathering Time': gatheringTime,
    'Party Size (Estimated)': String(booking.partySize || '1'),
    'Kids Ministry Check-In': booking.hasKids ? 'Yes (Requested)' : 'No',
    'Special Requests / Notes': String(booking.specialRequests || 'None').trim(),
    'Date & Time Booked': String(booking.submittedAt || new Date().toLocaleString('en-US')),
    'Booking Status': String(booking.status || 'new').toUpperCase(),
    'Last Synced (UTC)': new Date().toISOString()
  };
}

function recordBookingInExcel(bookingInput: any) {
  ensureDataDirectory();
  const currentRows = readBookingsFromExcel();
  const newRow = normalizeBookingRow(bookingInput);

  let updated = false;
  const deduplicatedRows = currentRows.map(row => {
    const sameId = row['Booking ID'] && row['Booking ID'] === newRow['Booking ID'];
    const sameGuestAndDate = (
      row['Email Address'] && 
      row['Email Address'] === newRow['Email Address'] &&
      row['Date & Time Booked'] === newRow['Date & Time Booked']
    );

    if (sameId || sameGuestAndDate) {
      updated = true;
      return {
        ...row,
        ...newRow,
        'Booking ID': row['Booking ID'] || newRow['Booking ID'],
        'Last Synced (UTC)': new Date().toISOString()
      };
    }
    return row;
  });

  if (!updated) {
    deduplicatedRows.unshift(newRow);
  }

  writeBookingsToExcel(deduplicatedRows);

  return {
    success: true,
    action: updated ? 'updated_existing' : 'inserted_new',
    bookingId: newRow['Booking ID'],
    totalBookings: deduplicatedRows.length,
    filePath: EXCEL_FILE_PATH,
    fileName: 'JCLS_Visit_Bookings.xlsx'
  };
}

function syncAllBookingsToExcel(bookings: any[]) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return { success: true, count: 0 };
  }
  let result: any = null;
  for (const b of bookings) {
    result = recordBookingInExcel(b);
  }
  return result;
}

function getExcelRepositoryStatus() {
  ensureDataDirectory();
  const exists = fs.existsSync(EXCEL_FILE_PATH);
  let totalBookings = 0;
  let fileSizeBytes = 0;
  let lastModified: string | null = null;

  if (exists) {
    try {
      const stats = fs.statSync(EXCEL_FILE_PATH);
      fileSizeBytes = stats.size;
      lastModified = stats.mtime.toISOString();
      const rows = readBookingsFromExcel();
      totalBookings = rows.length;
    } catch (e) {
      console.error(e);
    }
  }

  return {
    exists,
    filePath: EXCEL_FILE_PATH,
    relativeFilePath: 'data/JCLS_Visit_Bookings.xlsx',
    totalBookings,
    fileSizeBytes,
    lastModified
  };
}

function excelBookingsPlugin(): Plugin {
  return {
    name: 'vite-plugin-excel-bookings',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // GET /api/bookings/excel-status
        if (url === '/api/bookings/excel-status' && req.method === 'GET') {
          const status = getExcelRepositoryStatus();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(status));
          return;
        }

        // GET /api/bookings/download-excel
        if (url === '/api/bookings/download-excel' && req.method === 'GET') {
          if (!fs.existsSync(EXCEL_FILE_PATH)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Excel file not found yet.' }));
            return;
          }
          const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH);
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename="JCLS_Visit_Bookings.xlsx"');
          res.end(fileBuffer);
          return;
        }

        // GET /api/bookings
        if (url === '/api/bookings' && req.method === 'GET') {
          const rows = readBookingsFromExcel();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(rows));
          return;
        }

        // POST /api/bookings
        if (url === '/api/bookings' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const result = recordBookingInExcel(data);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid JSON payload', details: err?.message }));
            }
          });
          return;
        }

        // POST /api/bookings/batch
        if (url === '/api/bookings/batch' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const result = syncAllBookingsToExcel(data);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid JSON payload', details: err?.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), excelBookingsPlugin()],
});
