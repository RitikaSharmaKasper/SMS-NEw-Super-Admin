import { useState } from 'react';
import { subscriptions } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Active', 'Trial', 'Suspended', 'Expired'];
const PLAN_OPTIONS   = ['All Plans', 'Basic', 'Premium', 'Enterprise'];

export default function Subscriptions() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All Status');
  const [planFilter, setPlan]     = useState('All Plans');
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);

  const filtered = subscriptions.filter((s) => {
    const matchSearch = s.school.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    const matchPlan   = planFilter   === 'All Plans'  || s.plan   === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages   = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated    = filtered.slice((page - 1) * perPage, page * perPage);
  const activeCount  = subscriptions.filter(s => s.status === 'Active').length;
  const trialCount   = subscriptions.filter(s => s.status === 'Trial').length;
  const expiredCount = subscriptions.filter(s => s.status === 'Expired' || s.status === 'Suspended').length;
  const totalMRR     = subscriptions.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.amount, 0);

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-green-100 text-green-700',
      Trial:     'bg-blue-100 text-blue-700',
      Suspended: 'bg-amber-100 text-amber-700',
      Expired:   'bg-red-100 text-red-700',
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
      <div className="flex-shrink-0">
        <h1 className="text-[1.375rem] font-bold text-gray-900 leading-snug">Subscriptions</h1>
        <p className="text-sm text-gray-500 mt-1">Manage school subscription statuses and billing cycles</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Active</p>
          <p className="text-2xl font-bold leading-none text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Trial</p>
          <p className="text-2xl font-bold leading-none text-blue-600">{trialCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Expired/Suspended</p>
          <p className="text-2xl font-bold leading-none text-red-500">{expiredCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 flex flex-col gap-2 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold leading-none text-gray-900">${totalMRR}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-gray-400 pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search schools..."
            className="w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-md outline-none bg-white text-gray-700 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlan(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-lg border border-gray-200 bg-white flex flex-col overflow-hidden flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-gray-50">
              <tr>
                {['School', 'Plan', 'Amount', 'Status', 'Billing', 'Start Date', 'End Date', 'Next Billing', 'Action'].map((h, i) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 whitespace-nowrap sticky top-0 z-[1] bg-gray-50 ${
                      i === 2 ? 'hidden sm:table-cell' :
                      i === 4 ? 'hidden md:table-cell' :
                      (i === 5 || i === 6) ? 'hidden lg:table-cell' :
                      i === 7 ? 'hidden xl:table-cell' : ''
                    }`}
                  >{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No subscriptions found</td></tr>
              ) : paginated.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-gray-900 text-sm align-middle">{s.school}</td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${planBadgeClass(s.plan)}`}>
                      {s.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-gray-800 align-middle hidden sm:table-cell">${s.amount}/mo</td>
                  <td className="px-4 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 align-middle hidden md:table-cell">{s.billingCycle}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 align-middle hidden lg:table-cell">{s.startDate}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 align-middle hidden lg:table-cell">{s.endDate}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 align-middle hidden xl:table-cell">{s.nextBilling}</td>
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

function SearchIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
