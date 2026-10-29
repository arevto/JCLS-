import { excelService } from './excelService';

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface VisitBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceName: string;
  partySize: string;
  hasKids: boolean;
  specialRequests?: string;
  submittedAt: string;
  status: 'new' | 'assigned' | 'welcomed' | 'archived';
}

export interface PrayerSubmission {
  id: string;
  name?: string;
  contact?: string;
  category: string;
  request: string;
  confidentiality: 'pastoral' | 'prayer-team';
  submittedAt: string;
  isRead: boolean;
  status: 'new' | 'in-progress' | 'completed' | 'archived';
}

export interface EventRsvpSubmission {
  id: string;
  eventTitle: string;
  name: string;
  email: string;
  tickets: string;
  note?: string;
  submittedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'in-progress' | 'contacted' | 'completed' | 'archived';
  isRead: boolean;
}

export interface MinistryConnection {
  id: string;
  name: string;
  email: string;
  phone?: string;
  ministry: string;
  message?: string;
  consentGiven: boolean;
  submittedAt: string;
  status: 'new' | 'in-progress' | 'contacted' | 'completed' | 'archived';
  isRead: boolean;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  VISITS: 'jcls_visit_bookings_v2',
  PRAYERS: 'jcls_prayer_submissions_v2',
  RSVPS: 'jcls_event_rsvps_v2',
  CONTACT_INQUIRIES: 'jcls_contact_inquiries_v1',
  MINISTRY_CONNECTIONS: 'jcls_ministry_connections_v1'
};

// ─── Helper ───────────────────────────────────────────────────────────────────

const formatDate = () =>
  new Date().toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' });

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function getFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

function setToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('jcls_submissions_updated'));
  } catch (e) {
    console.error('[submissionService] Storage error:', e);
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const submissionService = {

  // ── VISIT BOOKINGS ──────────────────────────────────────────────────────────

  getVisits(): VisitBooking[] {
    return getFromStorage<VisitBooking>(STORAGE_KEYS.VISITS, []);
  },

  addVisit(booking: Omit<VisitBooking, 'id' | 'submittedAt' | 'status'>): VisitBooking {
    const newBooking: VisitBooking = {
      ...booking,
      id: generateId('visit'),
      submittedAt: formatDate(),
      status: 'new'
    };
    const updated = [newBooking, ...this.getVisits()];
    setToStorage(STORAGE_KEYS.VISITS, updated);
    // Sync to Excel (best-effort)
    excelService.syncBookingToServer(newBooking).catch(err => {
      console.warn('[Excel Sync]', err);
    });
    return newBooking;
  },

  updateVisitStatus(id: string, status: VisitBooking['status']) {
    const visits = this.getVisits();
    let updated: VisitBooking | null = null;
    const newList = visits.map(v => {
      if (v.id === id) {
        updated = { ...v, status };
        return updated;
      }
      return v;
    });
    setToStorage(STORAGE_KEYS.VISITS, newList);
    if (updated) {
      excelService.syncBookingToServer(updated).catch(() => {});
    }
  },

  deleteVisit(id: string) {
    setToStorage(STORAGE_KEYS.VISITS, this.getVisits().filter(v => v.id !== id));
  },

  // ── PRAYER REQUESTS ─────────────────────────────────────────────────────────

  getPrayers(): PrayerSubmission[] {
    return getFromStorage<PrayerSubmission>(STORAGE_KEYS.PRAYERS, []);
  },

  addPrayer(prayer: Omit<PrayerSubmission, 'id' | 'submittedAt' | 'isRead' | 'status'>): PrayerSubmission {
    const newPrayer: PrayerSubmission = {
      ...prayer,
      id: generateId('prayer'),
      submittedAt: formatDate(),
      isRead: false,
      status: 'new'
    };
    setToStorage(STORAGE_KEYS.PRAYERS, [newPrayer, ...this.getPrayers()]);
    return newPrayer;
  },

  updatePrayerStatus(id: string, status: PrayerSubmission['status']) {
    setToStorage(STORAGE_KEYS.PRAYERS, this.getPrayers().map(p =>
      p.id === id ? { ...p, status, isRead: true } : p
    ));
  },

  deletePrayer(id: string) {
    setToStorage(STORAGE_KEYS.PRAYERS, this.getPrayers().filter(p => p.id !== id));
  },

  // ── EVENT RSVPs ─────────────────────────────────────────────────────────────

  getRsvps(): EventRsvpSubmission[] {
    return getFromStorage<EventRsvpSubmission>(STORAGE_KEYS.RSVPS, []);
  },

  addRsvp(rsvp: Omit<EventRsvpSubmission, 'id' | 'submittedAt'>): EventRsvpSubmission {
    const newRsvp: EventRsvpSubmission = {
      ...rsvp,
      id: generateId('rsvp'),
      submittedAt: formatDate()
    };
    setToStorage(STORAGE_KEYS.RSVPS, [newRsvp, ...this.getRsvps()]);
    return newRsvp;
  },

  // ── CONTACT INQUIRIES ───────────────────────────────────────────────────────

  getContactInquiries(): ContactInquiry[] {
    return getFromStorage<ContactInquiry>(STORAGE_KEYS.CONTACT_INQUIRIES, []);
  },

  addContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'submittedAt' | 'status' | 'isRead'>): ContactInquiry {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: generateId('contact'),
      submittedAt: formatDate(),
      status: 'new',
      isRead: false
    };
    setToStorage(STORAGE_KEYS.CONTACT_INQUIRIES, [newInquiry, ...this.getContactInquiries()]);
    return newInquiry;
  },

  updateContactStatus(id: string, status: ContactInquiry['status']) {
    setToStorage(STORAGE_KEYS.CONTACT_INQUIRIES, this.getContactInquiries().map(c =>
      c.id === id ? { ...c, status, isRead: true } : c
    ));
  },

  deleteContactInquiry(id: string) {
    setToStorage(STORAGE_KEYS.CONTACT_INQUIRIES, this.getContactInquiries().filter(c => c.id !== id));
  },

  // ── MINISTRY CONNECTIONS ────────────────────────────────────────────────────

  getMinistryConnections(): MinistryConnection[] {
    return getFromStorage<MinistryConnection>(STORAGE_KEYS.MINISTRY_CONNECTIONS, []);
  },

  addMinistryConnection(connection: Omit<MinistryConnection, 'id' | 'submittedAt' | 'status' | 'isRead'>): MinistryConnection {
    const newConnection: MinistryConnection = {
      ...connection,
      id: generateId('connect'),
      submittedAt: formatDate(),
      status: 'new',
      isRead: false
    };
    setToStorage(STORAGE_KEYS.MINISTRY_CONNECTIONS, [newConnection, ...this.getMinistryConnections()]);
    return newConnection;
  },

  updateMinistryConnectionStatus(id: string, status: MinistryConnection['status']) {
    setToStorage(STORAGE_KEYS.MINISTRY_CONNECTIONS, this.getMinistryConnections().map(c =>
      c.id === id ? { ...c, status, isRead: true } : c
    ));
  },

  deleteMinistryConnection(id: string) {
    setToStorage(STORAGE_KEYS.MINISTRY_CONNECTIONS, this.getMinistryConnections().filter(c => c.id !== id));
  }
};
