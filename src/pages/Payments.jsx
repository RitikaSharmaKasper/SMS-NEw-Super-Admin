import { useState } from 'react';
import { payments } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Paid', 'Pending', 'Overdue'];
const METHOD_OPTIONS = ['All Methods', 'Credit Card', 'Bank Transfer'];

export default function Payments() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All Status');
  const [methodFilter, setMethod] = useState('All Methods');
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.school.toLowerCase().includes(q) || p.txnId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status'  || p.status === statusFilter;
    const matchMethod = methodFilter === 'All Methods' || p.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalPages   = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated    = filtered.slice((page - 1) * perPage, page * perPage);
  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const overdueCount = payments.filter(p => p.status === 'Overdue').length;
  const pendingCount = payments.filter(p => p.status === 'Pending').length;

  function statusBadgeClass(s) {
    const map = {
      Paid:    'bg-green-100 text-green-700',
      Overdue: 'bg-red-100 text-red-700',
      Pending: 'bg-yellow-100 text-yellow-700',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function planBadgeClass(p) {
    const map = {
      Premium:    'bg-violet-100 text-violet-700',
      Enterprise: 'bg-fuchsia-50 text-fuchsia-700',
      Basic:      'bg-gray-100 text-gray-700',
    };
    return map[p] || 'bg-gray-100 text-gray-700';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="text-[1.375rem] font-bold text-gray-900 leading-snug">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">Track all payment transactions</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 cursor-pointer transition-colors hover:bg-gray-50 whitespace-nowrap self-start sm:self-auto">
          <DownloadIcon /> Export
        </button>
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
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-gray-400 pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by school or TXN ID..."
            className="w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-md outline-none bg-white text-gray-700 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={methodFilter} onChange={(v) => { setMethod(v); setPage(1); }} options={METHOD_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-lg border border-gray-200 bg-white flex flex-col overflow-hidden flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">TXN ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">School</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden sm:table-cell">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden md:table-cell">Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 hidden xl:table-cell">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No payments found</td></tr>
              ) : paginated.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 text-xs font-mono text-gray-500 align-middle">{p.txnId}</td>
                  <td className="px-4 py-3.5 font-medium text-gray-900 text-sm align-middle">{p.school}</td>
                  <td className="px-4 py-3.5 align-middle hidden sm:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${planBadgeClass(p.plan)}`}>{p.plan}</span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 align-middle">${p.amount}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 align-middle hidden md:table-cell">{p.method}</td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(p.status)}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 align-middle hidden lg:table-cell">{p.date}</td>
                  <td className="px-4 py-3.5 text-xs font-mono text-gray-500 align-middle hidden xl:table-cell">{p.invoice}</td>
                  <td className="px-4 py-3.5 align-middle">
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white cursor-pointer text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                      <DownloadIcon />
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

function SearchIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function DownloadIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M8 3v8M5 8l3 3 3-3M3 13h10" /></svg>; }
