import React, { useState, useEffect } from 'react';
import { submissionService } from '../../services/submissionService';
import type { VisitBooking, PrayerSubmission, EventRsvpSubmission } from '../../services/submissionService';
import { excelService } from '../../services/excelService';
import { Modal } from '../common/Modal';
import { 
  Users, 
  Calendar, 
  Heart, 
  Trash2, 
  Clock, 
  Mail, 
  Phone, 
  Baby, 
  Send,
  FileSpreadsheet,
  RefreshCw,
  Check,
  Download,
  Database
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'visits' | 'prayers' | 'rsvps' | 'setup'>('visits');
  const [visits, setVisits] = useState<VisitBooking[]>([]);
  const [prayers, setPrayers] = useState<PrayerSubmission[]>([]);
  const [rsvps, setRsvps] = useState<EventRsvpSubmission[]>([]);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const loadData = () => {
    setVisits(submissionService.getVisits());
    setPrayers(submissionService.getPrayers());
    setRsvps(submissionService.getRsvps());
  };

  const handleDownloadExcel = () => {
    excelService.downloadWorkbook(visits, `JCLS_Visit_Bookings_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleSyncExcel = async () => {
    setIsSyncing(true);
    const ok = await excelService.syncAllToServer(visits);
    setIsSyncing(false);
    if (ok) {
      setSyncNotice('Excel repository (data/JCLS_Visit_Bookings.xlsx) updated successfully with zero duplicates!');
      setTimeout(() => setSyncNotice(null), 4500);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }

    const handleUpdate = () => loadData();
    window.addEventListener('jcls_submissions_updated', handleUpdate);
    return () => window.removeEventListener('jcls_submissions_updated', handleUpdate);
  }, [isOpen]);

  if (!isOpen) return null;

  const exportVisitsToCsv = () => {
    if (visits.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Party Size', 'Kids Ministry Needed', 'Special Requests', 'Booked At', 'Status'];
    const rows = visits.map(v => [
      v.id,
      `"${v.name}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.serviceName}"`,
      `"${v.partySize}"`,
      v.hasKids ? 'Yes' : 'No',
      `"${(v.specialRequests || '').replace(/"/g, '""')}"`,
      `"${v.submittedAt}"`,
      v.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jcls_visit_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalGuests = visits.reduce((acc, curr) => {
    const num = parseInt(curr.partySize) || 1;
    return acc + num;
  }, 0);

  const welcomedCount = visits.filter(v => v.status === 'welcomed').length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="space-y-6">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Host & Leadership Console
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-neutral-900 mt-1">
              Guest List & Ministry Submissions
            </h2>
            <p className="text-xs text-neutral-500">
              Manage visitors who clicked "Plan Your Visit", view prayer requests, and track event RSVPs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs cursor-pointer"
              title="Download Microsoft Excel (.xlsx) file with all booking details"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <button
              onClick={exportVisitsToCsv}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors shadow-xs cursor-pointer"
              title="Export as CSV text file"
            >
              <Download className="w-3.5 h-3.5 text-neutral-600" />
              <span>CSV</span>
            </button>
            <button
              onClick={loadData}
              title="Refresh submissions"
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-neutral-800">
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
              Total Bookings
            </span>
            <span className="font-serif text-2xl font-normal text-neutral-900">
              {visits.length}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 block">
              Est. Total Guests
            </span>
            <span className="font-serif text-2xl font-normal text-amber-900">
              {totalGuests}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800 block">
              Welcomed Guests
            </span>
            <span className="font-serif text-2xl font-normal text-emerald-900">
              {welcomedCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/80">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-800 block">
              Prayer Requests
            </span>
            <span className="font-serif text-2xl font-normal text-purple-900">
              {prayers.length}
            </span>
          </div>
        </div>

        {/* Automated Excel Data Repository Banner */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-neutral-900">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-neutral-900">
                  Automated Excel Repository:
                </span>
                <code className="text-[11px] bg-white px-2 py-0.5 rounded-md font-mono text-emerald-900 border border-emerald-300 font-bold">
                  data/JCLS_Visit_Bookings.xlsx
                </code>
              </div>
              <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                Every new visit booking is automatically recorded and organized into this file without duplicating entries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSyncExcel}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-medium transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Force re-sync of all bookings to Excel file on disk"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Disk File'}</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Download Microsoft Excel workbook (.xlsx)"
            >
              <Download className="w-3 h-3 text-emerald-200" />
              <span>Download .xlsx</span>
            </button>
          </div>
        </div>

        {syncNotice && (
          <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'visits'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Visit Bookings ({visits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'prayers'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Prayer Requests ({prayers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rsvps')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'rsvps'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Event RSVPs ({rsvps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 ml-auto ${
              activeTab === 'setup'
                ? 'bg-amber-100 text-amber-900 font-semibold border border-amber-300'
                : 'text-amber-800 hover:bg-amber-50'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Email & Sheets Setup</span>
          </button>
        </div>

        {/* Tab 1: Visit Bookings */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {visits.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No visit bookings yet. Submit a test visit via the "Plan Your Visit" button to see it here!
              </div>
            ) : (
              <div className="space-y-3">
                {visits.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 sm:p-5 rounded-2xl border border-neutral-200 bg-white hover:border-amber-400/80 transition-all shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-neutral-950">
                          {booking.name}
                        </h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          booking.status === 'welcomed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : booking.status === 'assigned'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {booking.status === 'welcomed' ? '✓ Welcomed' : booking.status === 'assigned' ? 'Host Assigned' : 'New Guest'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Booked: {booking.submittedAt}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <div>
                        <strong className="text-neutral-900 block">Service:</strong>
                        <span>{booking.serviceName}</span>
                      </div>

                      <div>
                        <strong className="text-neutral-900 block">Group Size:</strong>
                        <span>{booking.partySize}</span>
                        {booking.hasKids && (
                          <span className="ml-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                            <Baby className="w-3 h-3" /> Kids Check-in
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-neutral-800">
                          <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <a href={`tel:${booking.phone}`} className="hover:underline">{booking.phone || 'No phone provided'}</a>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-800">
                          <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <a href={`mailto:${booking.email}`} className="hover:underline truncate">{booking.email}</a>
                        </div>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <p className="text-xs text-neutral-600 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                        "Note from guest: {booking.specialRequests}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-neutral-500 uppercase">Change Status:</span>
                        <select
                          value={booking.status}
                          onChange={(e) => submissionService.updateVisitStatus(booking.id, e.target.value as any)}
                          className="text-xs py-1 px-2.5 rounded-lg border border-neutral-200 bg-white font-medium cursor-pointer"
                        >
                          <option value="new">New</option>
                          <option value="assigned">Host Assigned</option>
                          <option value="welcomed">Welcomed</option>
                        </select>
                      </div>

                      <button
                        onClick={() => submissionService.deleteVisit(booking.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1 text-xs transition-colors cursor-pointer"
                        title="Remove booking"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Prayer Requests */}
        {activeTab === 'prayers' && (
          <div className="space-y-4">
            {prayers.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No prayer requests submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {prayers.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                          {prayer.category}
                        </span>
                        <span className="text-xs font-medium text-neutral-500">
                          from <strong>{prayer.name || 'Anonymous'}</strong>
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">{prayer.submittedAt}</span>
                    </div>

                    <p className="text-sm text-neutral-800 leading-relaxed font-light">
                      "{prayer.request}"
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                      <span>Confidentiality: <strong>{prayer.confidentiality === 'pastoral' ? 'Pastoral Staff Only' : 'Intercession Team'}</strong></span>
                      {prayer.contact && <span>Contact: <strong>{prayer.contact}</strong></span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Event RSVPs */}
        {activeTab === 'rsvps' && (
          <div className="space-y-4">
            {rsvps.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No event registrations recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {rsvps.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="p-4 rounded-2xl border border-neutral-200 bg-white shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-serif text-lg font-normal text-neutral-950">{rsvp.name}</h4>
                      <p className="text-xs text-neutral-500">
                        Event: <strong className="text-neutral-800">{rsvp.eventTitle}</strong> • {rsvp.tickets} ticket(s)
                      </p>
                      <p className="text-xs text-neutral-400">{rsvp.email} • {rsvp.submittedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Email / Sheets Integration Guide */}
        {activeTab === 'setup' && (
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-4 text-xs sm:text-sm text-neutral-800">
            <h3 className="font-serif text-xl font-normal text-neutral-950 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-700" />
              How to Receive Instant Email / Phone Notifications
            </h3>
            <p className="leading-relaxed">
              Right now, all bookings are stored directly inside your browser's persistent database and visible on this <strong>Host & Guest Console</strong> (or exportable to CSV).
            </p>
            <p className="leading-relaxed">
              To have an instant notification delivered to your church's email (e.g. <code>pastor@jclschurch.org</code> or your Gmail) whenever a visitor submits:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Option A: Formspree (Easiest — 2 Minutes):</strong>
                <br />Sign up at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">formspree.io</a> (free tier gives 50 submissions/month), create a form, and paste your endpoint into <code>churchData.ts</code>. Formspree will automatically email you every time someone books!
              </li>
              <li>
                <strong>Option B: Google Sheets Webhook (Free & Unlimited):</strong>
                <br />Connect a simple Google Apps Script that automatically appends every booking into a live Google Sheet spreadsheet shared with your Sunday welcoming committee.
              </li>
              <li>
                <strong>Option C: EmailJS:</strong>
                <br />Directly sends formatted HTML emails to your pastoral inbox from the frontend without needing a backend server.
              </li>
            </ol>

            {/* Automated Excel Data Repository Explanation */}
            <div className="p-4 rounded-xl bg-white border border-neutral-200/90 space-y-2 mt-4">
              <h4 className="font-serif text-base font-medium text-neutral-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Automated Excel File Storage (data/JCLS_Visit_Bookings.xlsx)
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Whenever any visitor fills out "Plan Your Visit" on the website, the system automatically writes or updates your local Excel repository file at <code>data/JCLS_Visit_Bookings.xlsx</code>.
              </p>
              <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
                <li><strong>No Duplicates:</strong> Entries are checked by unique Booking ID and visitor details. Re-submitting or updating a booking updates the existing row in-place rather than adding duplicate rows.</li>
                <li><strong>Comprehensive Reference Fields:</strong> Guest Name, Email, Phone, Chosen Service & Time, Party Size, Kids Ministry Needs, Special Notes, Date & Time Booked, and Status.</li>
                <li><strong>Ready for Microsoft Excel:</strong> You can open <code>data/JCLS_Visit_Bookings.xlsx</code> directly on your computer in Microsoft Excel, Google Sheets, or Apple Numbers at any time for your welcoming committee's reference.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Click anywhere outside or press Esc to close.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </Modal>
  );
};
