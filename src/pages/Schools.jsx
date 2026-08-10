import { useState } from 'react';
import { schools } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Active', 'Trial', 'Suspended', 'Expired'];
const PLAN_OPTIONS = ['All Plans', 'Basic', 'Premium', 'Enterprise'];

export default function Schools() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = schools.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.schoolId.toLowerCase().includes(search.toLowerCase()) ||
      s.admin.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    const matchPlan = planFilter === 'All Plans' || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = { Active: 'badge-active', Trial: 'badge-trial', Suspended: 'badge-suspended', Expired: 'badge-expired', Inactive: 'badge-inactive' };
    return map[s] || 'badge-inactive';
  }

  return (
    /* Full-height flex column — header + filters fixed, table fills rest */
    <div className="flex flex-col h-full gap-4 min-h-0">

      {/* ── Top: header + button ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0">
        <div>
          <h1 className="page-title">Schools</h1>
          <p className="page-subtitle">Manage all registered schools on the platform</p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <PlusIcon /> Add School
        </button>
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
        <div className="sa-search-wrapper flex-1">
          <span className="sa-search-icon"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search schools..."
            className="sa-search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlanFilter(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* ── Table card — grows to fill remaining height ── */}
      <div className="sa-table-wrapper flex-1 min-h-0">

        {/* Scrollable table body */}
        <div className="sa-table-scroll">
          <table className="sa-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th className="hidden md:table-cell">School ID</th>
                <th className="hidden lg:table-cell">Admin</th>
                <th className="hidden sm:table-cell">Plan</th>
                <th className="hidden xl:table-cell">Students</th>
                <th className="hidden xl:table-cell">Teachers</th>
                <th>Status</th>
                <th className="hidden lg:table-cell">Expiry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-gray-400 text-sm">No schools found</td>
                </tr>
              ) : paginated.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {s.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate max-w-[140px]">{s.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[140px]">{s.adminEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-xs font-mono text-gray-500">{s.schoolId}</td>
                  <td className="hidden lg:table-cell text-sm text-gray-700">{s.admin}</td>
                  <td className="hidden sm:table-cell">
                    <span className={`badge ${s.plan === 'Premium' ? 'badge-premium' : s.plan === 'Enterprise' ? 'badge-enterprise' : 'badge-basic'}`}>
                      {s.plan}
                    </span>
                  </td>
                  <td className="hidden xl:table-cell text-sm text-gray-700">{s.students.toLocaleString()}</td>
                  <td className="hidden xl:table-cell text-sm text-gray-700">{s.teachers}</td>
                  <td><span className={`badge ${statusBadgeClass(s.status)}`}>{s.status}</span></td>
                  <td className="hidden lg:table-cell text-xs text-gray-500">{s.expiry}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button className="btn-icon" title="View"><EyeIcon /></button>
                      <ActionMenu
                        actions={[
                          { label: 'View',         icon: <EyeIcon />,     onClick: () => {} },
                          { label: 'Upgrade Plan', icon: <UpgradeIcon />, onClick: () => {} },
                          { label: 'Renew',        icon: <RenewIcon />,   onClick: () => {} },
                          { label: 'Suspend',      icon: <SuspendIcon />, onClick: () => {} },
                          { label: 'Delete',       icon: <TrashIcon />,   onClick: () => {}, danger: true },
                        ]}
                        align="right"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination pinned at bottom of card */}
        <div className="sa-table-footer">
          <Pagination
            page={page}
            totalPages={totalPages}
            perPage={perPage}
            total={filtered.length}
            onPageChange={setPage}
            onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
          />
        </div>
      </div>

    </div>
  );
}

function PlusIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function UpgradeIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M8 11V5M5.5 7.5L8 5l2.5 2.5" /></svg>; }
function RenewIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M13 8A5 5 0 113 8" /><path d="M13 5v3h-3" /></svg>; }
function SuspendIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M6 5.5v5M10 5.5v5" /></svg>; }
function TrashIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }
