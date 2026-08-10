import { useState } from 'react';
import { supportTickets } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS   = ['All Status', 'Active', 'Suspended', 'Resolved'];
const PRIORITY_OPTIONS = ['All Priority', 'High', 'Medium', 'Low'];

export default function SupportTickets() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatus]       = useState('All Status');
  const [priorityFilter, setPriority]   = useState('All Priority');
  const [page, setPage]                 = useState(1);
  const [perPage, setPerPage]           = useState(10);

  const filtered = supportTickets.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch   = t.school.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.ticketId.toLowerCase().includes(q);
    const matchStatus   = statusFilter   === 'All Status'   || t.status   === statusFilter;
    const matchPriority = priorityFilter === 'All Priority' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const openCount     = supportTickets.filter(t => t.status === 'Active').length;
  const resolvedCount = supportTickets.filter(t => t.status === 'Resolved').length;
  const highCount     = supportTickets.filter(t => t.priority === 'High').length;

  function statusBadge(s)   { return s === 'Active' ? 'badge-active' : s === 'Resolved' ? 'badge-paid' : 'badge-suspended'; }
  function priorityBadge(p) { return p === 'High' ? 'badge-high' : p === 'Medium' ? 'badge-medium' : 'badge-low'; }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="page-title">Support Tickets</h1>
          <p className="page-subtitle">Manage support requests from schools</p>
        </div>
        <button className="btn-primary self-start sm:self-auto"><PlusIcon /> New Ticket</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <div className="sa-card text-center py-3">
          <p className="text-2xl font-bold text-gray-900">{openCount}</p>
          <p className="text-xs text-gray-500 mt-1">Open</p>
        </div>
        <div className="sa-card text-center py-3">
          <p className="text-2xl font-bold text-green-600">{resolvedCount}</p>
          <p className="text-xs text-gray-500 mt-1">Resolved</p>
        </div>
        <div className="sa-card text-center py-3">
          <p className="text-2xl font-bold text-red-500">{highCount}</p>
          <p className="text-xs text-gray-500 mt-1">High Priority</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <div className="sa-search-wrapper flex-1">
          <span className="sa-search-icon"><SearchIcon /></span>
          <input type="text" placeholder="Search tickets..." className="sa-search" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <FilterDropdown value={statusFilter}   onChange={(v) => { setStatus(v);   setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={priorityFilter} onChange={(v) => { setPriority(v); setPage(1); }} options={PRIORITY_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="sa-table-wrapper flex-1 min-h-0">
        <div className="sa-table-scroll">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>School</th>
                <th className="hidden md:table-cell">Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="hidden lg:table-cell">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400 text-sm">No tickets found</td></tr>
              ) : paginated.map((t) => (
                <tr key={t.id}>
                  <td className="text-xs font-mono text-gray-500">{t.ticketId}</td>
                  <td className="font-medium text-gray-900 text-sm">{t.school}</td>
                  <td className="hidden md:table-cell text-sm text-gray-600 max-w-[220px]"><span className="truncate block">{t.subject}</span></td>
                  <td><span className={`badge ${priorityBadge(t.priority)}`}>{t.priority}</span></td>
                  <td><span className={`badge ${statusBadge(t.status)}`}>{t.status}</span></td>
                  <td className="hidden lg:table-cell text-xs text-gray-500">{t.date}</td>
                  <td><button className="btn-icon"><EyeIcon /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sa-table-footer">
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
