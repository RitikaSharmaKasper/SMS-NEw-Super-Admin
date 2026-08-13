import { useState } from 'react';
import { supportTickets } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
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
    const q = search.trim().toLowerCase();
    const matchSearch   = !q || t.school.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.ticketId.toLowerCase().includes(q);
    const matchStatus   = statusFilter   === 'All Status'   || t.status   === statusFilter;
    const matchPriority = priorityFilter === 'All Priority' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const totalPages    = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated     = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-[#E8F9EE] text-[#21C45D]',
      Resolved:  'bg-[#E8F9EE] text-[#21C45D]',
      Suspended: 'bg-[#FDF5E6] text-[#F69F11]',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function priorityBadgeClass(p) {
    const map = {
      High:   'bg-[#FDECEC] text-[#EF4343]',
      Medium: 'bg-[#FDF5E6] text-[#F69F11]',
      Low:    'bg-[#E6F5FC] text-[#59A2E7]',
    };
    return map[p] || 'bg-gray-100 text-gray-500';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Support Tickets</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage support requests from schools</p>
        </div>
        {/* <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto">
          <PlusIcon /> New Ticket
        </button> */}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-9 pr-3.5 py-2 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter}   onChange={(v) => { setStatus(v);   setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={priorityFilter} onChange={(v) => { setPriority(v); setPage(1); }} options={PRIORITY_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Ticket ID</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Subject</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Priority</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Date</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No tickets found</td>
                </tr>
              ) : paginated.map((t) => (
                <tr key={t.id} className="border-b border-[#F2F3F5] last:border-b-0  transition-colors">
                  <td className="px-4 py-4 text-[14px] font-[400] font-mono text-[#6B7280] align-middle">{t.ticketId}</td>
                  <td className="px-4 py-4 font-semibold text-[#0F1729] text-[14px] align-middle">{t.school}</td>
                  <td className="px-4 py-4 text-[#6B7280] align-middle hidden md:table-cell text-[14px] max-w-[220px]">
                    <span className="truncate block">{t.subject}</span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${priorityBadgeClass(t.priority)}`}>{t.priority}</span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-4 text-[#6B7280] align-middle hidden lg:table-cell text-[14px]">{t.date}</td>
                  <td className="px-4 py-4 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'View Ticket', icon: <EyeIcon />,   onClick: () => {} },
                        { label: 'Resolve',     icon: <CheckIcon />, onClick: () => {} },
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

function PlusIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function CheckIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M3 8l3.5 3.5L13 4" /></svg>; }
