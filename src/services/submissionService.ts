import { excelService } from './excelService';

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
  status: 'new' | 'assigned' | 'welcomed';
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

const STORAGE_KEYS = {
  VISITS: 'jcls_visit_bookings',
  PRAYERS: 'jcls_prayer_submissions',
  RSVPS: 'jcls_event_rsvps'
};

// Initial realistic demonstration bookings so the user can immediately see how the dashboard works
const INITIAL_VISIT_BOOKINGS: VisitBooking[] = [
  {
    id: 'visit-1',
    name: 'Maria Clarissa Santos',
    email: 'maria.santos@gmail.com',
    phone: '+63 917 555 4321',
    serviceName: 'Sunday Morning Worship Celebration (9:00 AM)',
    partySize: '3 – 4 people (Family)',
    hasKids: true,
    specialRequests: 'First time visiting. We have a 6-year-old child who would love to join Kids Ministry.',
    submittedAt: new Date(Date.now() - 3600000 * 4).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    status: 'new'
  },
  {
    id: 'visit-2',
    name: 'Kevin Paolo Reyes',
    email: 'kevin.reyes@workmail.ph',
    phone: '+63 928 444 8899',
    serviceName: 'Afternoon Fellowship & Youth Praise (3:00 PM)',
    partySize: '2 people',
    hasKids: false,
    specialRequests: 'Invited by a coworker for #JCLSYoungPro fellowship.',
    submittedAt: new Date(Date.now() - 3600000 * 18).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
    status: 'assigned'
  }
];

export const submissionService = {
  // --- VISIT BOOKINGS ---
  getVisits(): VisitBooking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(INITIAL_VISIT_BOOKINGS));
        // Automatically sync initial bookings to Excel repository
        excelService.syncAllToServer(INITIAL_VISIT_BOOKINGS).catch(() => {});
        return INITIAL_VISIT_BOOKINGS;
      }
      const parsed = JSON.parse(data);
      return parsed;
    } catch {
      return INITIAL_VISIT_BOOKINGS;
    }
  },

  addVisit(booking: Omit<VisitBooking, 'id' | 'submittedAt' | 'status'>): VisitBooking {
    const visits = this.getVisits();
    const newBooking: VisitBooking = {
      ...booking,
      id: 'visit-' + Date.now(),
      submittedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'new'
    };
    const updated = [newBooking, ...visits];
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
      window.dispatchEvent(new Event('jcls_submissions_updated'));
      // Automatically record in the Excel repository without duplicate entries
      excelService.syncBookingToServer(newBooking).catch(err => {
        console.warn('[Excel Repository Sync]', err);
      });
    } catch (e) {
      console.error('Error saving visit booking:', e);
    }
    return newBooking;
  },

  updateVisitStatus(id: string, status: VisitBooking['status']) {
    const visits = this.getVisits();
    let updatedBooking: VisitBooking | null = null;
    const updated = visits.map(v => {
      if (v.id === id) {
        updatedBooking = { ...v, status };
        return updatedBooking;
      }
      return v;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
      window.dispatchEvent(new Event('jcls_submissions_updated'));
      if (updatedBooking) {
        // Update existing record in Excel file without duplicating
        excelService.syncBookingToServer(updatedBooking).catch(() => {});
      }
    } catch (e) {
      console.error(e);
    }
  },

  deleteVisit(id: string) {
    const visits = this.getVisits();
    const updated = visits.filter(v => v.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(updated));
      window.dispatchEvent(new Event('jcls_submissions_updated'));
    } catch (e) {
      console.error(e);
    }
  },

  // --- PRAYER REQUESTS ---
  getPrayers(): PrayerSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRAYERS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addPrayer(prayer: Omit<PrayerSubmission, 'id' | 'submittedAt' | 'isRead'>): PrayerSubmission {
    const prayers = this.getPrayers();
    const newPrayer: PrayerSubmission = {
      ...prayer,
      id: 'prayer-' + Date.now(),
      submittedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      isRead: false
    };
    const updated = [newPrayer, ...prayers];
    try {
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(updated));
      window.dispatchEvent(new Event('jcls_submissions_updated'));
    } catch (e) {
      console.error(e);
    }
    return newPrayer;
  },

  // --- EVENT RSVPS ---
  getRsvps(): EventRsvpSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RSVPS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addRsvp(rsvp: Omit<EventRsvpSubmission, 'id' | 'submittedAt'>): EventRsvpSubmission {
    const rsvps = this.getRsvps();
    const newRsvp: EventRsvpSubmission = {
      ...rsvp,
      id: 'rsvp-' + Date.now(),
      submittedAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    };
    const updated = [newRsvp, ...rsvps];
    try {
      localStorage.setItem(STORAGE_KEYS.RSVPS, JSON.stringify(updated));
      window.dispatchEvent(new Event('jcls_submissions_updated'));
    } catch (e) {
      console.error(e);
    }
    return newRsvp;
  }
};
