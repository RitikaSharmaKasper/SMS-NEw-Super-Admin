import { useState } from 'react';
import { payments } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Paid', 'Pending', 'Overdue'];
const METHOD_OPTIONS = ['All Methods', 'Credit Card', 'Bank Transfer'];

export default function Payments() {
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('All Status');
  const [methodFilter, setMethod]   = useState('All Methods');
  const [page, setPage]             = useState(1);
  const [perPage, setPerPage]       = useState(10);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.school.toLowerCase().includes(q) || p.txnId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status'  || p.status === statusFilter;
    const matchMethod = methodFilter === 'All Methods' || p.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalPages    = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated     = filtered.slice((page - 1) * perPage, page * perPage);
  const totalRevenue  = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const overdueCount  = payments.filter(p => p.status === 'Overdue').length;
  const pendingCount  = payments.filter(p => p.status === 'Pending').length;

  function statusBadge(s) { return s === 'Paid' ? 'badge-paid' : s === 'Overdue' ? 'badge-overdue' : 'badge-pending'; }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Track all payment transactions</p>
        </div>
        <button className="btn-secondary self-start sm:self-auto"><DownloadIcon /> Export</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 border-l-4 border-l-green-400 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Total Collected</p>
          <p className="text-2xl font-bold leading-none text-green-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 border-l-4 border-l-red-400 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Overdue</p>
          <p className="text-2xl font-bold leading-none text-red-500">{overdueCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 border-l-4 border-l-yellow-400 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Pending</p>
          <p className="text-2xl font-bold leading-none text-yellow-500">{pendingCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <div className="sa-search-wrapper flex-1">
          <span className="sa-search-icon"><SearchIcon /></span>
          <input type="text" placeholder="Search by school or TXN ID..." className="sa-search" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={methodFilter} onChange={(v) => { setMethod(v); setPage(1); }} options={METHOD_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="sa-table-wrapper flex-1 min-h-0">
        <div className="sa-table-scroll">
          <table className="sa-table">
            <thead>
              <tr>
                <th>TXN ID</th>
                <th>School</th>
                <th className="hidden sm:table-cell">Plan</th>
                <th>Amount</th>
                <th className="hidden md:table-cell">Method</th>
                <th>Status</th>
                <th className="hidden lg:table-cell">Date</th>
                <th className="hidden xl:table-cell">Invoice</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No payments found</td></tr>
              ) : paginated.map((p) => (
                <tr key={p.id}>
                  <td className="text-xs font-mono text-gray-500">{p.txnId}</td>
                  <td className="font-medium text-gray-900 text-sm">{p.school}</td>
                  <td className="hidden sm:table-cell">
                    <span className={`badge ${p.plan === 'Premium' ? 'badge-premium' : p.plan === 'Enterprise' ? 'badge-enterprise' : 'badge-basic'}`}>{p.plan}</span>
                  </td>
                  <td className="font-semibold text-gray-800">${p.amount}</td>
                  <td className="hidden md:table-cell text-sm text-gray-600">{p.method}</td>
                  <td><span className={`badge ${statusBadge(p.status)}`}>{p.status}</span></td>
                  <td className="hidden lg:table-cell text-xs text-gray-500">{p.date}</td>
                  <td className="hidden xl:table-cell text-xs font-mono text-gray-500">{p.invoice}</td>
                  <td><button className="btn-icon"><DownloadIcon /></button></td>
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

function SearchIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function DownloadIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M8 3v8M5 8l3 3 3-3M3 13h10" /></svg>; }
