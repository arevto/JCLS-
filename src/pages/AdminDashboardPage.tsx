import React, { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { submissionService } from '../services/submissionService';
import type { VisitBooking, PrayerSubmission, ContactInquiry, MinistryConnection } from '../services/submissionService';
import { contentService } from '../services/contentService';
import type { Ministry, ChurchEvent, Sermon, Leader, ChurchInfo } from '../types';
import { churchInfo as initialChurchInfo } from '../data/churchData';
import {
  LayoutDashboard, Users, Calendar, Heart, Mail, LogOut,
  RefreshCw, Trash2, Clock, Menu, X, ChevronDown,
  BookOpen, Sparkles, Play, Shield, Settings, Plus, Edit2,
  Database, ExternalLink, Save, CheckCircle2
} from 'lucide-react';

export type AdminSection =
  | 'overview'
  | 'connections'
  | 'visits'
  | 'prayer'
  | 'contact'
  | 'ministries'
  | 'events'
  | 'messages'
  | 'leadership'
  | 'settings';

interface AdminDashboardPageProps {
  onLogout: () => void;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    new: 'bg-amber-100 text-amber-800 border-amber-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    archived: 'bg-neutral-100 text-neutral-500 border-neutral-200',
    welcomed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    assigned: 'bg-blue-100 text-blue-800 border-blue-200',
    'prayer-team': 'bg-purple-100 text-purple-800 border-purple-200',
    pastoral: 'bg-rose-100 text-rose-800 border-rose-200'
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${map[status] || 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard: React.FC<{ label: string; value: number; color: string; icon: React.ReactNode }> = ({
  label, value, color, icon
}) => (
  <div className={`p-5 rounded-2xl border ${color} flex items-center justify-between`}>
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</div>
      <div className="font-serif text-3xl font-normal">{value}</div>
    </div>
    <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center">
      {icon}
    </div>
  </div>
);

// ─── Select Status ────────────────────────────────────────────────────────────
function StatusSelect<T extends string>({
  value,
  options,
  onChange
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (val: T) => void;
}) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="text-xs font-medium pl-2.5 pr-7 py-1 rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 focus:outline-none focus:border-neutral-900 cursor-pointer appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2 top-2 pointer-events-none" />
    </div>
  );
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [section, setSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [notification, setNotification] = useState<string | null>(null);

  // Submissions State
  const [visits, setVisits] = useState<VisitBooking[]>([]);
  const [prayers, setPrayers] = useState<PrayerSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [connections, setConnections] = useState<MinistryConnection[]>([]);

  // Content Management State
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [messages, setMessages] = useState<Sermon[]>([]);
  const [leadership, setLeadership] = useState<Leader[]>([]);
  const [settingsChurchInfo, setSettingsChurchInfo] = useState<ChurchInfo>(initialChurchInfo);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Editing state
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadAll = useCallback(() => {
    // Submissions
    setVisits(submissionService.getVisits());
    setPrayers(submissionService.getPrayers());
    setContacts(submissionService.getContactInquiries());
    setConnections(submissionService.getMinistryConnections());

    // Content
    setMinistries(contentService.getMinistries());
    setEvents(contentService.getEvents());
    setMessages(contentService.getMessages());
    setLeadership(contentService.getLeadership());
    setSettingsChurchInfo(contentService.getChurchInfo());

    setLastRefreshed(new Date());
  }, []);

  useEffect(() => {
    loadAll();
    const handleSubmissionsUpdate = () => loadAll();
    const handleContentUpdate = () => loadAll();
    window.addEventListener('jcls_submissions_updated', handleSubmissionsUpdate);
    window.addEventListener('jcls_content_updated', handleContentUpdate);
    return () => {
      window.removeEventListener('jcls_submissions_updated', handleSubmissionsUpdate);
      window.removeEventListener('jcls_content_updated', handleContentUpdate);
    };
  }, [loadAll]);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  // Counts
  const newVisits = visits.filter(v => v.status === 'new').length;
  const newPrayers = prayers.filter(p => p.status === 'new').length;
  const newContacts = contacts.filter(c => c.status === 'new').length;
  const newConnections = connections.filter(c => c.status === 'new').length;

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'connections', label: 'Visitor Connections', icon: <Users className="w-4 h-4" />, badge: newConnections },
    { id: 'visits', label: 'Planned Visits', icon: <Calendar className="w-4 h-4" />, badge: newVisits },
    { id: 'prayer', label: 'Prayer Requests', icon: <Heart className="w-4 h-4" />, badge: newPrayers },
    { id: 'contact', label: 'Contact Inquiries', icon: <Mail className="w-4 h-4" />, badge: newContacts },
    { id: 'ministries', label: 'Ministries', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'messages', label: 'Messages / Sermons', icon: <Play className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Shield className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-900 text-white">
      {/* Brand */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/images/church-logo.png" alt="JCLS" className="w-8 h-8 rounded-full object-contain bg-black/40 p-0.5 border border-amber-400/30" />
          <div>
            <div className="font-serif text-sm font-semibold text-white leading-tight">JCLS Admin</div>
            <div className="text-[11px] text-amber-300/80 font-mono">PostgreSQL Dashboard</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1.5">
          Visitor Submissions
        </div>
        {navItems.slice(0, 5).map(item => (
          <button
            key={item.id}
            onClick={() => { setSection(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
              section === item.id
                ? 'bg-amber-400 text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge ? (
              <span className="text-[10px] font-bold bg-amber-500 text-neutral-950 rounded-full w-4 h-4 flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
          </button>
        ))}

        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 pt-4 pb-1.5">
          Content Management
        </div>
        {navItems.slice(5).map(item => (
          <button
            key={item.id}
            onClick={() => { setSection(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
              section === item.id
                ? 'bg-amber-400 text-neutral-950 font-semibold shadow-xs'
                : 'text-neutral-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-neutral-900 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900 shadow-2xl transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-4 right-4 text-white">
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-neutral-200 min-h-screen sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-neutral-600 hover:bg-neutral-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-lg sm:text-xl font-normal text-neutral-900 capitalize">
              {section.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Synced {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </span>
            <button
              onClick={() => { loadAll(); showNotification('Refreshed latest submissions and content'); }}
              className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Refresh Records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">

          {/* 1. OVERVIEW SECTION */}
          {section === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">Church Dashboard Overview</h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Real-time summary of congregation connections, visitor bookings, prayer needs, and website content.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Visitor Connections"
                  value={connections.length}
                  color="bg-purple-50 border-purple-200 text-purple-950"
                  icon={<Users className="w-5 h-5 text-purple-600" />}
                />
                <StatCard
                  label="Planned Visits"
                  value={visits.length}
                  color="bg-amber-50 border-amber-200 text-amber-950"
                  icon={<Calendar className="w-5 h-5 text-amber-600" />}
                />
                <StatCard
                  label="Prayer Requests"
                  value={prayers.length}
                  color="bg-rose-50 border-rose-200 text-rose-950"
                  icon={<Heart className="w-5 h-5 text-rose-600" />}
                />
                <StatCard
                  label="Contact Inquiries"
                  value={contacts.length}
                  color="bg-blue-50 border-blue-200 text-blue-950"
                  icon={<Mail className="w-5 h-5 text-blue-600" />}
                />
              </div>

              {/* Quick Actions & Database Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Activity Card */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <h3 className="text-sm font-semibold text-neutral-900">Recent Submissions</h3>
                    <button onClick={() => setSection('connections')} className="text-xs text-amber-700 hover:underline">
                      View all
                    </button>
                  </div>

                  {connections.length === 0 && visits.length === 0 && prayers.length === 0 ? (
                    <div className="py-8 text-center text-xs text-neutral-400">
                      No visitor submissions received yet. Test by submitting a form on the public site!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {connections.slice(0, 3).map(c => (
                        <div key={c.id} className="p-3 rounded-xl bg-neutral-50 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-neutral-900">{c.name}</span>
                            <span className="text-neutral-500 ml-2">joined {c.ministry}</span>
                          </div>
                          <StatusBadge status={c.status} />
                        </div>
                      ))}
                      {visits.slice(0, 3).map(v => (
                        <div key={v.id} className="p-3 rounded-xl bg-neutral-50 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-neutral-900">{v.name}</span>
                            <span className="text-neutral-500 ml-2">planning visit ({v.serviceName})</span>
                          </div>
                          <StatusBadge status={v.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Database & Architecture Card */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                    <Database className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-semibold text-neutral-900">PostgreSQL Status</h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Service:</span>
                      <span className="font-mono text-emerald-700 font-semibold">PostgreSQL 18 (Running)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Local Port:</span>
                      <span className="font-mono text-neutral-700">5432</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Database:</span>
                      <span className="font-mono text-neutral-700">jcls_church</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Migration File:</span>
                      <span className="font-mono text-neutral-700">db/schema.sql</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 leading-relaxed">
                    Local PostgreSQL service is active on your Windows system. To execute full schema migrations:
                    <div className="mt-1.5 p-2 bg-neutral-900 text-amber-300 font-mono rounded text-[10px]">
                      node db/setup.js
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. VISITOR CONNECTIONS SECTION */}
          {section === 'connections' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-light text-neutral-900">Ministry Visitor Connections</h2>
                  <p className="text-xs text-neutral-500">Visitors who registered interest or volunteered for church ministries.</p>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, ministry..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white w-full sm:w-64 focus:outline-none focus:border-amber-500"
                />
              </div>

              {connections.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-2">
                  <Users className="w-10 h-10 text-neutral-300 mx-auto" />
                  <div className="text-sm font-semibold text-neutral-700">No Ministry Connections Yet</div>
                  <p className="text-xs text-neutral-400">Visitor submissions from ministry cards will appear here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Visitor</th>
                          <th className="py-3 px-4">Ministry</th>
                          <th className="py-3 px-4">Contact</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {connections
                          .filter(c => searchQuery ? (
                            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.ministry.toLowerCase().includes(searchQuery.toLowerCase())
                          ) : true)
                          .map(c => (
                            <tr key={c.id} className="hover:bg-neutral-50/50">
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-neutral-900">{c.name}</div>
                                {c.message && <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{c.message}</div>}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-amber-800">{c.ministry}</td>
                              <td className="py-3.5 px-4 text-neutral-600">
                                <div>{c.email}</div>
                                {c.phone && <div className="text-[11px] text-neutral-400">{c.phone}</div>}
                              </td>
                              <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{c.submittedAt}</td>
                              <td className="py-3.5 px-4">
                                <StatusSelect
                                  value={c.status}
                                  options={[
                                    { value: 'new', label: 'New' },
                                    { value: 'in-progress', label: 'In Progress' },
                                    { value: 'contacted', label: 'Contacted' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'archived', label: 'Archived' }
                                  ]}
                                  onChange={newStatus => {
                                    submissionService.updateMinistryConnectionStatus(c.id, newStatus);
                                    showNotification(`Updated status to ${newStatus}`);
                                  }}
                                />
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm('Delete this connection record?')) {
                                      submissionService.deleteMinistryConnection(c.id);
                                      showNotification('Record deleted');
                                    }
                                  }}
                                  className="text-neutral-400 hover:text-rose-600 p-1"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. PLANNED VISITS SECTION */}
          {section === 'visits' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-light text-neutral-900">Planned Church Visits</h2>
                  <p className="text-xs text-neutral-500">Upcoming guests who used the "Plan Your Visit" form.</p>
                </div>
                <input
                  type="text"
                  placeholder="Search guests..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white w-full sm:w-64 focus:outline-none focus:border-amber-500"
                />
              </div>

              {visits.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-2">
                  <Calendar className="w-10 h-10 text-neutral-300 mx-auto" />
                  <div className="text-sm font-semibold text-neutral-700">No Planned Visits Yet</div>
                  <p className="text-xs text-neutral-400">Guest bookings will appear here and sync to JCLS_Visit_Bookings.xlsx.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Guest</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Party Size</th>
                          <th className="py-3 px-4">Kids Ministry</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {visits.map(v => (
                          <tr key={v.id} className="hover:bg-neutral-50/50">
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-neutral-900">{v.name}</div>
                              <div className="text-neutral-500 text-[11px]">{v.email} • {v.phone}</div>
                              {v.specialRequests && <div className="text-neutral-400 text-[10px] italic mt-0.5">Note: {v.specialRequests}</div>}
                            </td>
                            <td className="py-3.5 px-4 text-neutral-700">{v.serviceName}</td>
                            <td className="py-3.5 px-4 text-neutral-700">{v.partySize} person(s)</td>
                            <td className="py-3.5 px-4">
                              {v.hasKids ? (
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Yes</span>
                              ) : (
                                <span className="text-[10px] text-neutral-400">No</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusSelect
                                value={v.status}
                                options={[
                                  { value: 'new', label: 'New' },
                                  { value: 'assigned', label: 'Host Assigned' },
                                  { value: 'welcomed', label: 'Welcomed' },
                                  { value: 'archived', label: 'Archived' }
                                ]}
                                onChange={newStatus => {
                                  submissionService.updateVisitStatus(v.id, newStatus);
                                  showNotification(`Visit status updated`);
                                }}
                              />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  if (confirm('Delete this visit booking?')) {
                                    submissionService.deleteVisit(v.id);
                                    showNotification('Visit deleted');
                                  }
                                }}
                                className="text-neutral-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. PRAYER REQUESTS SECTION (Strictly Confidential) */}
          {section === 'prayer' && (
            <div className="space-y-6 max-w-6xl">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
                <div>
                  <strong>Pastoral Confidentiality Notice:</strong> Prayer requests are strictly private and accessible only to authorized church leaders. Never publish or disclose prayer details.
                </div>
                <Shield className="w-5 h-5 text-rose-600 shrink-0" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-light text-neutral-900">Confidential Prayer Requests</h2>
                  <p className="text-xs text-neutral-500">Petitions and praise reports submitted through the Prayer page.</p>
                </div>
              </div>

              {prayers.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-2">
                  <Heart className="w-10 h-10 text-neutral-300 mx-auto" />
                  <div className="text-sm font-semibold text-neutral-700">No Prayer Requests Submitted</div>
                  <p className="text-xs text-neutral-400">New prayer petitions will appear here under pastoral privacy.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {prayers.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900 text-sm">{p.name || 'Anonymous'}</span>
                          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            {p.category}
                          </span>
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                            {p.confidentiality === 'pastoral' ? 'Pastoral Only' : 'Prayer Team'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusSelect
                            value={p.status}
                            options={[
                              { value: 'new', label: 'New' },
                              { value: 'in-progress', label: 'Praying / In Progress' },
                              { value: 'completed', label: 'Answered / Completed' },
                              { value: 'archived', label: 'Archived' }
                            ]}
                            onChange={newStatus => {
                              submissionService.updatePrayerStatus(p.id, newStatus);
                              showNotification(`Updated status`);
                            }}
                          />
                          <button
                            onClick={() => {
                              if (confirm('Delete this prayer request?')) {
                                submissionService.deletePrayer(p.id);
                                showNotification('Prayer request deleted');
                              }
                            }}
                            className="text-neutral-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-serif whitespace-pre-wrap">
                        "{p.request}"
                      </p>

                      <div className="text-[11px] text-neutral-400 pt-2 flex items-center justify-between">
                        <span>Submitted: {p.submittedAt}</span>
                        {p.contact && <span>Contact: {p.contact}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. CONTACT INQUIRIES SECTION */}
          {section === 'contact' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">General Contact Inquiries</h2>
                <p className="text-xs text-neutral-500">Inquiries and messages sent via the Contact Us form.</p>
              </div>

              {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-2">
                  <Mail className="w-10 h-10 text-neutral-300 mx-auto" />
                  <div className="text-sm font-semibold text-neutral-700">No Contact Inquiries Yet</div>
                  <p className="text-xs text-neutral-400">Messages sent from the Contact page will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map(c => (
                    <div key={c.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                        <div>
                          <span className="font-semibold text-neutral-900 text-sm">{c.name}</span>
                          <span className="text-xs text-neutral-500 ml-2">({c.email} {c.phone ? `• ${c.phone}` : ''})</span>
                          {c.topic && <span className="ml-2 text-[10px] font-semibold bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">{c.topic}</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusSelect
                            value={c.status}
                            options={[
                              { value: 'new', label: 'New' },
                              { value: 'in-progress', label: 'In Progress' },
                              { value: 'contacted', label: 'Contacted' },
                              { value: 'completed', label: 'Completed' },
                              { value: 'archived', label: 'Archived' }
                            ]}
                            onChange={newStatus => {
                              submissionService.updateContactStatus(c.id, newStatus);
                              showNotification(`Updated status`);
                            }}
                          />
                          <button
                            onClick={() => {
                              if (confirm('Delete this inquiry?')) {
                                submissionService.deleteContactInquiry(c.id);
                                showNotification('Inquiry deleted');
                              }
                            }}
                            className="text-neutral-400 hover:text-rose-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                        {c.message}
                      </p>

                      <div className="text-[11px] text-neutral-400 pt-1">
                        Received: {c.submittedAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. MINISTRIES CONTENT MANAGEMENT */}
          {section === 'ministries' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">Ministries Management</h2>
                <p className="text-xs text-neutral-500">Manage meeting schedules, descriptions, and audiences for the 6 church ministries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ministries.map(m => (
                  <div key={m.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          {m.category}
                        </span>
                        <button
                          onClick={() => setEditingMinistry(m)}
                          className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                      <h3 className="font-serif text-lg font-normal text-neutral-900">{m.name}</h3>
                      <p className="text-xs text-neutral-500 italic">{m.tagline}</p>
                      <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">{m.description}</p>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                      <div><strong>Schedule:</strong> {m.schedule}</div>
                      <div><strong>Audience:</strong> {m.audience}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Ministry Modal */}
              {editingMinistry && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b pb-3">
                      <h3 className="font-serif text-lg">Edit {editingMinistry.name}</h3>
                      <button onClick={() => setEditingMinistry(null)}><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="font-semibold block mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingMinistry.tagline}
                          onChange={e => setEditingMinistry({ ...editingMinistry, tagline: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Meeting Schedule</label>
                        <input
                          type="text"
                          value={editingMinistry.schedule}
                          onChange={e => setEditingMinistry({ ...editingMinistry, schedule: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Audience</label>
                        <input
                          type="text"
                          value={editingMinistry.audience}
                          onChange={e => setEditingMinistry({ ...editingMinistry, audience: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Description</label>
                        <textarea
                          rows={4}
                          value={editingMinistry.description}
                          onChange={e => setEditingMinistry({ ...editingMinistry, description: e.target.value })}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-3 border-t">
                      <button onClick={() => setEditingMinistry(null)} className="px-4 py-2 border rounded-lg text-xs">
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          contentService.updateMinistry(editingMinistry);
                          setEditingMinistry(null);
                          showNotification('Ministry updated successfully');
                        }}
                        className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. EVENTS CONTENT MANAGEMENT */}
          {section === 'events' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-light text-neutral-900">Events Management</h2>
                  <p className="text-xs text-neutral-500">Only authorized administrators can publish, edit, or archive church events.</p>
                </div>
                <button
                  onClick={() => setIsAddingEvent(true)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold flex items-center gap-2 hover:bg-neutral-800 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Event Title</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Time & Location</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {events.map(ev => (
                        <tr key={ev.id} className="hover:bg-neutral-50/50">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-neutral-900">{ev.title}</div>
                            <div className="text-[11px] text-neutral-500 line-clamp-1">{ev.description}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono whitespace-nowrap">{ev.dateDisplay}</td>
                          <td className="py-3.5 px-4 text-neutral-600">
                            <div>{ev.time}</div>
                            <div className="text-[11px] text-neutral-400">{ev.location}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 px-2 py-0.5 rounded capitalize">
                              {ev.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => setEditingEvent(ev)}
                              className="text-neutral-500 hover:text-neutral-900 p-1"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete event "${ev.title}"?`)) {
                                  contentService.deleteEvent(ev.id);
                                  showNotification('Event removed');
                                }
                              }}
                              className="text-neutral-400 hover:text-rose-600 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add / Edit Event Modal */}
              {(isAddingEvent || editingEvent) && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b pb-3">
                      <h3 className="font-serif text-lg">{isAddingEvent ? 'Create Church Event' : 'Edit Event'}</h3>
                      <button onClick={() => { setIsAddingEvent(false); setEditingEvent(null); }}><X className="w-4 h-4" /></button>
                    </div>
                    {/* Event Form */}
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                        const isoDate = (form.elements.namedItem('isoDate') as HTMLInputElement).value;
                        const dateDisplay = (form.elements.namedItem('dateDisplay') as HTMLInputElement).value;
                        const time = (form.elements.namedItem('time') as HTMLInputElement).value;
                        const location = (form.elements.namedItem('location') as HTMLInputElement).value;
                        const category = (form.elements.namedItem('category') as HTMLSelectElement).value as ChurchEvent['category'];
                        const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

                        if (isAddingEvent) {
                          contentService.addEvent({
                            title, isoDate, dateDisplay, time, location, category, description,
                            image: '/images/church-thanksgiving.jpg',
                            registrationRequired: false,
                            highlight: true
                          });
                          showNotification('Event created successfully');
                        } else if (editingEvent) {
                          contentService.updateEvent({
                            ...editingEvent,
                            title, isoDate, dateDisplay, time, location, category, description
                          });
                          showNotification('Event updated successfully');
                        }
                        setIsAddingEvent(false);
                        setEditingEvent(null);
                      }}
                      className="space-y-3 text-xs"
                    >
                      <div>
                        <label className="font-semibold block mb-1">Event Title *</label>
                        <input name="title" defaultValue={editingEvent?.title || ''} required className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold block mb-1">ISO Date (YYYY-MM-DD) *</label>
                          <input name="isoDate" type="date" defaultValue={editingEvent?.isoDate || '2026-11-22'} required className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Date Display Text *</label>
                          <input name="dateDisplay" defaultValue={editingEvent?.dateDisplay || 'Sunday, November 22, 2026'} required className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold block mb-1">Time *</label>
                          <input name="time" defaultValue={editingEvent?.time || '9:00 AM – 1:00 PM'} required className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="font-semibold block mb-1">Category</label>
                          <select name="category" defaultValue={editingEvent?.category || 'service'} className="w-full px-3 py-2 border rounded-lg bg-white">
                            <option value="service">Service</option>
                            <option value="conference">Conference</option>
                            <option value="fellowship">Fellowship</option>
                            <option value="youth">Youth</option>
                            <option value="prayer">Prayer</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Location *</label>
                        <input name="location" defaultValue={editingEvent?.location || 'JCLS Main Sanctuary, 71 Hills Street, Batasan Hills'} required className="w-full px-3 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Description *</label>
                        <textarea name="description" rows={3} defaultValue={editingEvent?.description || ''} required className="w-full p-2 border rounded-lg" />
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t">
                        <button type="button" onClick={() => { setIsAddingEvent(false); setEditingEvent(null); }} className="px-4 py-2 border rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-neutral-900 text-white rounded-lg">Save Event</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 8. MESSAGES / SERMONS CONTENT MANAGEMENT */}
          {section === 'messages' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">Sermons & Messages</h2>
                <p className="text-xs text-neutral-500">Manage verified sermon video archives, sermon series, and scripture references.</p>
              </div>

              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Sermon Title</th>
                        <th className="py-3 px-4">Speaker</th>
                        <th className="py-3 px-4">Passage</th>
                        <th className="py-3 px-4">Series</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {messages.map(s => (
                        <tr key={s.id} className="hover:bg-neutral-50/50">
                          <td className="py-3.5 px-4 font-semibold text-neutral-900">
                            {s.title}
                            {s.isFeatured && (
                              <span className="ml-2 text-[10px] font-bold uppercase bg-amber-400 text-neutral-950 px-2 py-0.5 rounded">
                                Featured
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-neutral-700">{s.speaker}</td>
                          <td className="py-3.5 px-4 font-mono text-amber-800">{s.passage}</td>
                          <td className="py-3.5 px-4 text-neutral-500">{s.series || '—'}</td>
                          <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{s.date}</td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                contentService.toggleMessageFeatured(s.id);
                                showNotification('Featured state updated');
                              }}
                              className={`px-2 py-1 text-[10px] font-semibold rounded border cursor-pointer ${
                                s.isFeatured ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {s.isFeatured ? '★ Featured' : 'Feature'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 9. LEADERSHIP PROFILES MANAGEMENT */}
          {section === 'leadership' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">Church Leadership Profiles</h2>
                <p className="text-xs text-neutral-500">Confirmed pastoral elders and ministry directors of JCLS Church.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map(l => (
                  <div key={l.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 shadow-xs">
                    <div className="aspect-4/5 rounded-xl overflow-hidden bg-neutral-900">
                      <img
                        src={l.image}
                        alt={l.name}
                        onError={e => { e.currentTarget.src = '/images/pastor-preaching.jpg'; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-neutral-900">{l.name}</h3>
                      <div className="text-xs font-semibold text-amber-800">{l.role}</div>
                      {l.bio && <p className="text-xs text-neutral-500 line-clamp-3 mt-2 leading-relaxed">{l.bio}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. WEBSITE SETTINGS */}
          {section === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h2 className="font-serif text-2xl font-light text-neutral-900">Website & Church Settings</h2>
                <p className="text-xs text-neutral-500">Update church address, contact telephone, email, and confirmed service schedules.</p>
              </div>

              {/* Church Information Card */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-semibold text-neutral-900 pb-3 border-b">General Church Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">Full Church Name</label>
                    <input
                      type="text"
                      value={settingsChurchInfo.name}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settingsChurchInfo.tagline}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, tagline: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={settingsChurchInfo.phone}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={settingsChurchInfo.email}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold block mb-1">Street Address (Line 1)</label>
                    <input
                      type="text"
                      value={settingsChurchInfo.addressLine1}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, addressLine1: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold block mb-1">Barangay & City (Line 2)</label>
                    <input
                      type="text"
                      value={settingsChurchInfo.addressLine2}
                      onChange={e => setSettingsChurchInfo({ ...settingsChurchInfo, addressLine2: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <button
                    onClick={() => {
                      contentService.updateChurchInfo(settingsChurchInfo);
                      showNotification('Church information saved');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold flex items-center gap-2 hover:bg-neutral-800 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Church Details</span>
                  </button>
                </div>
              </div>

              {/* Reset to Defaults */}
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold block">Restore Factory Defaults</span>
                  <span className="text-neutral-500">Reset ministries, events, and leadership to original verified values.</span>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Reset website content back to default verified data?')) {
                      contentService.resetAllToDefaults();
                      loadAll();
                      showNotification('Restored to default church content');
                    }
                  }}
                  className="px-3 py-1.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-white text-xs font-medium cursor-pointer"
                >
                  Reset Defaults
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
};
