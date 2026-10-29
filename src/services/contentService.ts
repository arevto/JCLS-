/**
 * ============================================================================
 * JCLS Church Website — Content Management Service
 * ============================================================================
 *
 * Manages editable website content:
 * - Ministries
 * - Events
 * - Messages / Sermons
 * - Leadership Team
 * - Website Settings & Service Schedules
 *
 * Persists changes in localStorage and syncs with backend database when available.
 */

import {
  ministriesData as defaultMinistries,
  churchEvents as defaultEvents,
  sermonsData as defaultSermons,
  leadershipTeam as defaultLeadership,
  churchInfo as defaultChurchInfo,
  serviceSchedules as defaultSchedules
} from '../data/churchData';
import type { Ministry, ChurchEvent, Sermon, Leader, ChurchInfo, ServiceSchedule } from '../types';

const STORAGE_KEYS = {
  MINISTRIES: 'jcls_content_ministries_v1',
  EVENTS: 'jcls_content_events_v1',
  MESSAGES: 'jcls_content_messages_v1',
  LEADERSHIP: 'jcls_content_leadership_v1',
  CHURCH_INFO: 'jcls_content_church_info_v1',
  SCHEDULES: 'jcls_content_schedules_v1'
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('jcls_content_updated'));
  } catch (e) {
    console.error('[contentService] Storage error:', e);
  }
}

export const contentService = {
  // ── MINISTRIES ────────────────────────────────────────────────────────────
  getMinistries(): Ministry[] {
    return getStored<Ministry[]>(STORAGE_KEYS.MINISTRIES, defaultMinistries);
  },

  updateMinistry(updated: Ministry): void {
    const list = this.getMinistries();
    const next = list.map(m => m.id === updated.id ? updated : m);
    setStored(STORAGE_KEYS.MINISTRIES, next);
  },

  addMinistry(ministry: Omit<Ministry, 'id'>): Ministry {
    const newId = `ministry-${Date.now()}`;
    const newM: Ministry = { ...ministry, id: newId };
    setStored(STORAGE_KEYS.MINISTRIES, [...this.getMinistries(), newM]);
    return newM;
  },

  deleteMinistry(id: string): void {
    setStored(STORAGE_KEYS.MINISTRIES, this.getMinistries().filter(m => m.id !== id));
  },

  // ── EVENTS ────────────────────────────────────────────────────────────────
  getEvents(): ChurchEvent[] {
    return getStored<ChurchEvent[]>(STORAGE_KEYS.EVENTS, defaultEvents);
  },

  addEvent(event: Omit<ChurchEvent, 'id'>): ChurchEvent {
    const newEvent: ChurchEvent = {
      ...event,
      id: `event-${Date.now()}`
    };
    setStored(STORAGE_KEYS.EVENTS, [newEvent, ...this.getEvents()]);
    return newEvent;
  },

  updateEvent(updated: ChurchEvent): void {
    setStored(STORAGE_KEYS.EVENTS, this.getEvents().map(e => e.id === updated.id ? updated : e));
  },

  toggleEventHighlight(id: string): void {
    setStored(STORAGE_KEYS.EVENTS, this.getEvents().map(e => {
      if (e.id === id) {
        return { ...e, highlight: !e.highlight };
      }
      return e;
    }));
  },

  deleteEvent(id: string): void {
    setStored(STORAGE_KEYS.EVENTS, this.getEvents().filter(e => e.id !== id));
  },

  // ── MESSAGES / SERMONS ────────────────────────────────────────────────────
  getMessages(): Sermon[] {
    return getStored<Sermon[]>(STORAGE_KEYS.MESSAGES, defaultSermons);
  },

  addMessage(sermon: Omit<Sermon, 'id'>): Sermon {
    const newSermon: Sermon = {
      ...sermon,
      id: `sermon-${Date.now()}`
    };
    setStored(STORAGE_KEYS.MESSAGES, [newSermon, ...this.getMessages()]);
    return newSermon;
  },

  updateMessage(updated: Sermon): void {
    setStored(STORAGE_KEYS.MESSAGES, this.getMessages().map(s => s.id === updated.id ? updated : s));
  },

  toggleMessageFeatured(id: string): void {
    setStored(STORAGE_KEYS.MESSAGES, this.getMessages().map(s => {
      if (s.id === id) {
        return { ...s, isFeatured: !s.isFeatured };
      }
      return s;
    }));
  },

  deleteMessage(id: string): void {
    setStored(STORAGE_KEYS.MESSAGES, this.getMessages().filter(s => s.id !== id));
  },

  // ── LEADERSHIP ────────────────────────────────────────────────────────────
  getLeadership(): Leader[] {
    return getStored<Leader[]>(STORAGE_KEYS.LEADERSHIP, defaultLeadership);
  },

  addLeader(leader: Omit<Leader, 'id'>): Leader {
    const newLeader: Leader = {
      ...leader,
      id: `leader-${Date.now()}`
    };
    setStored(STORAGE_KEYS.LEADERSHIP, [...this.getLeadership(), newLeader]);
    return newLeader;
  },

  updateLeader(updated: Leader): void {
    setStored(STORAGE_KEYS.LEADERSHIP, this.getLeadership().map(l => l.id === updated.id ? updated : l));
  },

  deleteLeader(id: string): void {
    setStored(STORAGE_KEYS.LEADERSHIP, this.getLeadership().filter(l => l.id !== id));
  },

  // ── CHURCH INFO & SETTINGS ────────────────────────────────────────────────
  getChurchInfo(): ChurchInfo {
    return getStored<ChurchInfo>(STORAGE_KEYS.CHURCH_INFO, defaultChurchInfo);
  },

  updateChurchInfo(updated: ChurchInfo): void {
    setStored(STORAGE_KEYS.CHURCH_INFO, updated);
  },

  getServiceSchedules(): ServiceSchedule[] {
    return getStored<ServiceSchedule[]>(STORAGE_KEYS.SCHEDULES, defaultSchedules);
  },

  updateServiceSchedules(schedules: ServiceSchedule[]): void {
    setStored(STORAGE_KEYS.SCHEDULES, schedules);
  },

  // Reset to default verified data
  resetAllToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.MINISTRIES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.LEADERSHIP);
    localStorage.removeItem(STORAGE_KEYS.CHURCH_INFO);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULES);
    window.dispatchEvent(new Event('jcls_content_updated'));
  }
};
