import { useState } from 'react';
import { supportTickets } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS   = ['All Status', 'Active', 'Suspended', 'Resolved'];
const PRIORITY_OPTIONS = ['All Priority', 'High', 'Medium', 'Low'];

export default function SupportTickets() {
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatus]     = useState('All Status');
  const [priorityFilter, setPriority] = useState('All Priority');
  const [page, setPage]               = useState(1);
  const [perPage, setPerPage]         = useState(10);

  const filtered = supportTickets.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch   = t.school.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.ticketId.toLowerCase().includes(q);
    const matchStatus   = statusFilter   === 'All Status'   || t.status   === statusFilter;
    const matchPriority = priorityFilter === 'All Priority' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalPages    = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated     = filtered.slice((page - 1) * perPage, page * perPage);
  const openCount     = supportTickets.filter(t => t.status === 'Active').length;
  const resolvedCount = supportTickets.filter(t => t.status === 'Resolved').length;
  const highCount     = supportTickets.filter(t => t.priority === 'High').length;

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-green-100 text-green-700',
      Resolved:  'bg-green-100 text-green-700',
      Suspended: 'bg-amber-100 text-amber-700',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function priorityBadgeClass(p) {
    const map = {
      High:   'bg-red-100 text-red-700',
      Medium: 'bg-amber-100 text-amber-700',
      Low:    'bg-blue-100 text-blue-700',
    };
    return map[p] || 'bg-gray-100 text-gray-500';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="text-[1.375rem] font-bold text-gray-900 leading-snug">Support Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">Manage support requests from schools</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto">
          <PlusIcon /> New Ticket
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-2xl font-bold text-gray-900">{openCount}</p>
          <p className="text-xs text-gray-500 mt-1">Open</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Resolved</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
          <p className="text-2xl font-bold text-red-500">{highCount}</p>
          <p className="text-xs text-gray-500 mt-1">High Priority</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-gray-400 pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-md outline-none bg-white text-gray-700 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter}   onChange={(v) => { setStatus(v);   setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={priorityFilter} onChange={(v) => { setPriority(v); setPage(1); }} options={PRIORITY_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-lg border border-gray-200 bg-white flex flex-col overflow-hidden flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Ticket ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">School</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden md:table-cell">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400 text-sm">No tickets found</td></tr>
              ) : paginated.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono text-gray-500 align-middle">{t.ticketId}</td>
                  <td className="px-4 py-3.5 font-medium text-gray-900 text-sm align-middle">{t.school}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 align-middle hidden md:table-cell max-w-[220px]">
                    <span className="truncate block">{t.subject}</span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${priorityBadgeClass(t.priority)}`}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 align-middle hidden lg:table-cell">{t.date}</td>
                  <td className="px-4 py-3.5 align-middle">
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white cursor-pointer text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                      <EyeIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4">
          <Pagination page={page} totalPages={totalPages} perPage={perPage} total={filtered.length}
            onPageChange={setPage} onPerPageChange={(n) => { setPerPage(n); setPage(1); }} />
        </div>
      </div>
    </div>
  );
}

function PlusIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
