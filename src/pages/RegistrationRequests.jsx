import { useState } from 'react';
import { registrationProposals } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Pending', 'Approved', 'Rejected'];
const PLAN_OPTIONS   = ['All Plans', 'Basic', 'Premium', 'Enterprise'];

export default function RegistrationRequests() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter]     = useState('All Plans');
  const [page, setPage]                 = useState(1);
  const [perPage, setPerPage]           = useState(10);

  const filtered = registrationProposals.filter((r) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      r.schoolName.toLowerCase().includes(q) ||
      (r.reqId && r.reqId.toLowerCase().includes(q)) ||
      r.adminName.toLowerCase().includes(q) ||
      r.adminEmail.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || r.status === statusFilter;
    const matchPlan   = planFilter   === 'All Plans'  || r.plan   === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Pending:  'bg-[#FDF5E6] text-[#F69F11]',
      Approved: 'bg-[#E8F9EE] text-[#21C45D]',
      Rejected: 'bg-[#FDECEC] text-[#EF4343]',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function planBadgeClass() {
    return 'bg-[#EEEEEE] text-[#696969]';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Registration Requests</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-Public-Sans">Review and approve new school registration requests</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search requests..."
            className="w-full pl-9 pr-3.5 py-2 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlanFilter(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">REQ ID</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School Name</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Admin</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden sm:table-cell">Plan</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Date</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Expiry</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400 text-sm">No registration requests found</td>
                </tr>
              ) : paginated.map((r) => (
                <tr key={r.id} className="border-b border-[#F2F3F5] last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 align-middle text-[14px] font-[400] font-mono text-[#6B7280]">{r.reqId}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[160px]">{r.schoolName}</p>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle hidden lg:table-cell">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[140px]">{r.adminName}</p>
                      <p className="text-[14px] text-[#6B7280] truncate max-w-[140px]">{r.adminEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle hidden sm:table-cell">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${planBadgeClass()}`}>
                      {r.plan}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6B7280] align-middle hidden md:table-cell text-[14px]">{r.date}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6B7280] align-middle hidden lg:table-cell text-[14px]">{r.expiry}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'View Details', icon: <EyeIcon />,     onClick: () => {} },
                        { label: 'Approve',      icon: <CheckIcon />,   onClick: () => {} },
                        { label: 'Reject',       icon: <CrossIcon />,   onClick: () => {}, danger: true },
                      ]}
                      align="right"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination outside table card in blank space */}
      <div className="flex-shrink-0 px-1 mt-1">
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
  );
}

function SearchIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function CheckIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M3 8l3.5 3.5L13 4" /></svg>; }
function CrossIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M4 4l8 8M12 4l-8 8" /></svg>; }
