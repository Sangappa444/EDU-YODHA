'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, MessageSquare, LogOut, RefreshCw, CheckCircle2,
  Clock, XCircle, Eye, ChevronDown, Search, BarChart3
} from 'lucide-react';

interface Application {
  _id: string;
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  courseSemester: string;
  domain: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  submittedAt: string;
  notes: string;
}

interface Enquiry {
  _id: string;
  enquiryId: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  submittedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending:  'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  new:      'bg-purple-100 text-purple-700',
  read:     'bg-slate-100 text-slate-600',
  replied:  'bg-green-100 text-green-700',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'applications' | 'enquiries'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedEnq, setSelectedEnq] = useState<Enquiry | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [appRes, enqRes] = await Promise.all([
        fetch('/api/admin/applications'),
        fetch('/api/admin/enquiries'),
      ]);
      if (appRes.status === 401 || enqRes.status === 401) { router.push('/admin'); return; }
      const appData = await appRes.json() as { applications: Application[] };
      const enqData = await enqRes.json() as { enquiries: Enquiry[] };
      setApplications(appData.applications || []);
      setEnquiries(enqData.enquiries || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateAppStatus = async (id: string, status: string, notes?: string) => {
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, notes }),
    });
    await fetchData();
    setSelectedApp(null);
  };

  const updateEnqStatus = async (id: string, status: string) => {
    await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await fetchData();
    setSelectedEnq(null);
  };

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  };

  const filteredApps = applications.filter(a =>
    search === '' ||
    a.fullName.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.domain.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEnqs = enquiries.filter(e =>
    search === '' ||
    e.fullName.toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    newEnq: enquiries.filter(e => e.status === 'new').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <nav className="bg-[#0f172a] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg">EDU YODHA</span>
          <span className="text-slate-400 text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchData} className="text-slate-400 hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, icon: <Users className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50' },
            { label: 'Pending Review', value: stats.pending, icon: <Clock className="w-5 h-5" />, color: 'text-yellow-600 bg-yellow-50' },
            { label: 'Accepted', value: stats.accepted, icon: <CheckCircle2 className="w-5 h-5" />, color: 'text-green-600 bg-green-50' },
            { label: 'New Enquiries', value: stats.newEnq, icon: <MessageSquare className="w-5 h-5" />, color: 'text-purple-600 bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-[#0f172a]">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 gap-4 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => setTab('applications')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'applications' ? 'bg-[#1e40af] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <span className="flex items-center gap-2"><Users className="w-4 h-4" />Applications ({applications.length})</span>
              </button>
              <button
                onClick={() => setTab('enquiries')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'enquiries' ? 'bg-[#1e40af] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" />Enquiries ({enquiries.length})</span>
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading…
            </div>
          ) : tab === 'applications' ? (
            <div className="overflow-x-auto">
              {filteredApps.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No applications yet.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['ID','Name','Email','Domain','College','Status','Date','Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApps.map(app => (
                      <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-slate-400">{app.applicationId.slice(-8)}</td>
                        <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">{app.fullName}</td>
                        <td className="px-5 py-4 text-slate-500">{app.email}</td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{app.domain}</td>
                        <td className="px-5 py-4 text-slate-500 max-w-[150px] truncate">{app.collegeName}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[app.status]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                          {new Date(app.submittedAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="flex items-center gap-1 text-[#1e40af] hover:underline text-xs font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" /> Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredEnqs.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No enquiries yet.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {['Name','Email','Subject','Status','Date','Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnqs.map(enq => (
                      <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">{enq.fullName}</td>
                        <td className="px-5 py-4 text-slate-500">{enq.email}</td>
                        <td className="px-5 py-4 text-slate-600 max-w-[200px] truncate">{enq.subject}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[enq.status]}`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                          {new Date(enq.submittedAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelectedEnq(enq)}
                            className="flex items-center gap-1 text-[#1e40af] hover:underline text-xs font-medium"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#0f172a] mb-1">{selectedApp.fullName}</h3>
            <p className="text-slate-500 text-sm mb-5">{selectedApp.applicationId}</p>
            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              {[
                ['Email', selectedApp.email],
                ['Phone', selectedApp.phone],
                ['College', selectedApp.collegeName],
                ['Course', selectedApp.courseSemester],
                ['Domain', selectedApp.domain],
                ['Applied', new Date(selectedApp.submittedAt).toLocaleDateString('en-IN')],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-slate-400 font-medium">{k}</p>
                  <p className="text-slate-700 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="mb-5">
              <p className="text-xs text-slate-400 font-medium mb-1">Notes</p>
              <textarea
                defaultValue={selectedApp.notes}
                id="app-notes"
                rows={2}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/30 resize-none"
                placeholder="Add internal notes…"
              />
            </div>
            <p className="text-xs text-slate-400 font-medium mb-2">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {(['pending','reviewed','accepted','rejected'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => {
                    const notes = (document.getElementById('app-notes') as HTMLTextAreaElement)?.value;
                    updateAppStatus(selectedApp._id, s, notes);
                  }}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors ${
                    selectedApp.status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-current' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s === 'pending' && <Clock className="w-3.5 h-3.5 inline mr-1" />}
                  {s === 'accepted' && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                  {s === 'rejected' && <XCircle className="w-3.5 h-3.5 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedApp(null)} className="mt-4 w-full text-slate-400 text-sm hover:text-slate-600 transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {selectedEnq && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setSelectedEnq(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-[#0f172a] mb-1">{selectedEnq.fullName}</h3>
            <p className="text-slate-500 text-sm mb-1">{selectedEnq.email} · {selectedEnq.phone}</p>
            <p className="text-xs text-slate-400 mb-4">{new Date(selectedEnq.submittedAt).toLocaleString('en-IN')}</p>
            <div className="bg-slate-50 rounded-xl p-4 mb-5">
              <p className="text-xs text-slate-400 font-medium mb-1">Subject</p>
              <p className="text-slate-700 font-medium text-sm">{selectedEnq.subject}</p>
              <p className="text-xs text-slate-400 font-medium mt-3 mb-1">Message</p>
              <p className="text-slate-600 text-sm whitespace-pre-wrap">{selectedEnq.message}</p>
            </div>
            <p className="text-xs text-slate-400 font-medium mb-2">Update Status</p>
            <div className="flex gap-2">
              {(['new','read','replied'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => updateEnqStatus(selectedEnq._id, s)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors ${
                    selectedEnq.status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-current' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedEnq(null)} className="mt-4 w-full text-slate-400 text-sm hover:text-slate-600 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
