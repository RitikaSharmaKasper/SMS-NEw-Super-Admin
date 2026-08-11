import { useState } from 'react';
import { subscriptions } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
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
    const q = search.trim().toLowerCase();
    const matchSearch = !q || s.school.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;
    const matchPlan   = planFilter   === 'All Plans'  || s.plan   === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-[#E8F9EE] text-[#21C45D]',
      Trial:     'bg-[#E6F5FC] text-[#59A2E7]',
      Suspended: 'bg-[#FDF5E6] text-[#F69F11]',
      Expired:   'bg-[#FDECEC] text-[#EF4343]',
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
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Subscriptions</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-Public-Sans">Manage school subscription statuses and billing cycles</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="w-full pl-9 pr-3.5 py-2 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={planFilter}   onChange={(v) => { setPlan(v);   setPage(1); }} options={PLAN_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School</th>
                <th className="px-7 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Plan</th>
                         <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
               
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]  ">Student</th>
      
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Teacher</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Start Date</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">End Date</th>
        
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No subscriptions found</td>
                </tr>
              ) : paginated.map((s) => (
                <tr key={s.id} className="border-b border-[#F2F3F5] last:border-b-0 transition-colors">
                  <td className="px-4 py-5 font-semibold text-[#0F1729] text-[14px] align-middle">{s.school}</td>
                  <td className="px-4 py-5 align-middle">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${planBadgeClass()}`}>
                      {s.plan}
                    </span>
                  </td>
                  
                  <td className="px-4 py-5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                           <td className="px-4 py-5 text-[#0F1729] text-[14px] align-middle hidden md:table-cell">{s.student}</td>
                  <td className="px-4 py-5 text-[#6B7280] text-[14px] align-middle hidden md:table-cell">{s.teacher}</td>
                  <td className="px-4 py-5 text-[#6B7280] text-[14px] align-middle hidden lg:table-cell">{s.startDate}</td>
                  <td className="px-4 py-5 text-[#6B7280] text-[14px] align-middle hidden lg:table-cell">{s.endDate}</td>
              
                  {/* <td className="px-4 py-5 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'View Subscription', icon: <EyeIcon />, onClick: () => {} },
                        { label: 'Change Plan',       icon: <EditIcon />, onClick: () => {} },
                      ]}
                      align="right"
                    />
                  </td> */}
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
function EditIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>; }
