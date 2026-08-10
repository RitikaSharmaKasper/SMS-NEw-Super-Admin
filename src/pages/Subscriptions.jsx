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

  function statusBadge(s) {
    const m = { Active: 'badge-active', Trial: 'badge-trial', Suspended: 'badge-suspended', Expired: 'badge-expired' };
    return m[s] || 'badge-inactive';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="page-title">Subscriptions</h1>
        <p className="page-subtitle">Manage school subscription statuses and billing cycles</p>
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
        <div className="sa-search-wrapper flex-1">
          <span className="sa-search-icon"><SearchIcon /></span>
          <input type="text" placeholder="Search schools..." className="sa-search" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlan(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="sa-table-wrapper flex-1 min-h-0">
        <div className="sa-table-scroll">
          <table className="sa-table">
            <thead>
              <tr>
                <th>School</th>
                <th>Plan</th>
                <th className="hidden sm:table-cell">Amount</th>
                <th>Status</th>
                <th className="hidden md:table-cell">Billing</th>
                <th className="hidden lg:table-cell">Start Date</th>
                <th className="hidden lg:table-cell">End Date</th>
                <th className="hidden xl:table-cell">Next Billing</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No subscriptions found</td></tr>
              ) : paginated.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium text-gray-900 text-sm">{s.school}</td>
                  <td><span className={`badge ${s.plan === 'Premium' ? 'badge-premium' : s.plan === 'Enterprise' ? 'badge-enterprise' : 'badge-basic'}`}>{s.plan}</span></td>
                  <td className="hidden sm:table-cell font-semibold text-gray-800">${s.amount}/mo</td>
                  <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                  <td className="hidden md:table-cell text-sm text-gray-600">{s.billingCycle}</td>
                  <td className="hidden lg:table-cell text-xs text-gray-500">{s.startDate}</td>
                  <td className="hidden lg:table-cell text-xs text-gray-500">{s.endDate}</td>
                  <td className="hidden xl:table-cell text-xs text-gray-500">{s.nextBilling}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn-icon"><EyeIcon /></button>
                    </div>
                  </td>
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

function SearchIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
