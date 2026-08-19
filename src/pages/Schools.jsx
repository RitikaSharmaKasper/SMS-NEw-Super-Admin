import { useState } from 'react';
import { schools } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';
import PLUS from  "../assets/images/PLUS.svg";
const STATUS_OPTIONS = ['All Status', 'Active', 'Trial', 'Suspended', 'Expired'];
const PLAN_OPTIONS = ['All Plans', 'Basic', 'Premium', 'Enterprise'];

export default function Schools() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter] = useState('All Plans');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = schools.filter((s) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.schoolId.toLowerCase().includes(q) ||
      s.admin.toLowerCase().includes(q) ||
      (s.adminEmail && s.adminEmail.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    const matchPlan = planFilter === 'All Plans' || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-[#E8F9EE] text-[#21C45D]',
      Trial:     'bg-[#E6F5FC] text-[#59A2E7]',
      Suspended: 'bg-[#FDF5E6] text-[#F69F11]',
      Expired:   'bg-[#FDECEC] text-[#EF4343]',
      Inactive:  'bg-gray-100 text-gray-500',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function planBadgeClass(p) {
    const map = {
      Premium:    'bg-[#EEEEEE] text-[#696969]',
      Enterprise: 'bg-[#EEEEEE] text-[#696969]',
      Basic:      'bg-[#EEEEEE] text-[#696969]',
    };
    return map[p] || 'bg-gray-100 text-gray-700';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* ── Top: header + button ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Schools</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage all registered schools on the platform</p>
        </div>
       
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-4">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search schools..."
         font-sans   className="w-full pl-9 pr-3.5 py-1.25 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlanFilter(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* ── Table card ── */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">

        {/* Scrollable table body */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School Name</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  md:table-cell">School ID</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  lg:table-cell">Admin</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  sm:table-cell">Plan</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  xl:table-cell">Students</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  xl:table-cell">Teachers</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] lg:table-cell">Expiry</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No schools found</td>
                </tr>
              ) : paginated.map((s) => (
                <tr key={s.id} className="border-b border-[#F2F3F5] last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[160px]">{s.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 align-middle  md:table-cell text-[14px] font-[400] font-mono text-[#6B7280]">{s.schoolId}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle  lg:table-cell">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[140px]">{s.admin}</p>
                      <p className="text-[14px] text-[#6B7280] truncate max-w-[140px]">{s.adminEmail}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle  sm:table-cell">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${planBadgeClass(s.plan)}`}>
                      {s.plan}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#0F1729] font-[400] align-middle xl:table-cell text-[14px]">{s.students?.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-[#0F1729] font-[400] align-middle  xl:table-cell text-[14px]">{s.teachers}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[#6B7280] align-middle  lg:table-cell text-[14px]">{s.expiry}</td>
                  <td className="px-4 py-2.5 text-gray-700 align-middle">
                    <div className="flex items-center gap-1">
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
      </div>
{/* <button
  onClick={() => {}}
className="fixed bottom-17 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer  transition-colors  z-50"
  title="Add School"
>
  {/* <PlusIcon className="w-6 h-6" /> */}
{/* 
  <img src={PLUS} alt="" className="w-8 h-8" />
</button> } */}
    
      <div className="flex-shrink-0 px-1 mt-2">
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

function PlusIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function UpgradeIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M8 11V5M5.5 7.5L8 5l2.5 2.5" /></svg>; }
function RenewIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M13 8A5 5 0 113 8" /><path d="M13 5v3h-3" /></svg>; }
function SuspendIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M6 5.5v5M10 5.5v5" /></svg>; }
function TrashIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }
