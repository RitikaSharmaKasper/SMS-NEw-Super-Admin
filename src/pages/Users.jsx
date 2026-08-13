import { useState } from 'react';
import { users } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Active', 'Suspended', 'Inactive'];
const ROLE_OPTIONS   = ['All Roles', 'School Admin', 'Super Admin'];

export default function Users() {
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [roleFilter, setRoleFilter]     = useState('All Roles');
  const [page, setPage]                 = useState(1);
  const [perPage, setPerPage]           = useState(10);

  const filtered = users.filter((u) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.school && u.school.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'All Status' || u.status === statusFilter;
    const matchRole   = roleFilter   === 'All Roles'  || u.role   === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-[#E8F9EE] text-[#21C45D]',
      Suspended: 'bg-[#FDF5E6] text-[#F69F11]',
      Inactive:  'bg-gray-100 text-gray-500',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function roleBadgeClass() {
    return 'bg-[#EEEEEE] text-[#696969]';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Users</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage platform users and admin access</p>
        </div>
        {/* <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto">
          <PlusIcon /> Add User
        </button> */}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-9 pr-3.5 py-2 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={roleFilter}   onChange={(v) => { setRoleFilter(v);   setPage(1); }} options={ROLE_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">User</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Email</th>
                <th className="px-7 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden sm:table-cell">Role</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">School</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Last Login</th>
                {/* <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No users found</td>
                </tr>
              ) : paginated.map((u) => (
                <tr key={u.id} className="border-b border-[#F2F3F5] last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-5 text-gray-700 align-middle">
                    <div className="flex items-center gap-2.5">
                      {/* <div className="w-7.5 h-7.5 rounded-full bg-[#0DA2E7] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {u.avatar || u.name.slice(0, 2).toUpperCase()}
                      </div> */}
                      <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[140px]">{u.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-[#6B7280] align-middle hidden md:table-cell text-[14px]">{u.email}</td>
                  <td className="px-4 py-5 text-gray-700 align-middle hidden sm:table-cell">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${roleBadgeClass()}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-[#0F1729] font-[400] align-middle hidden lg:table-cell text-[14px]">{u.school || '—'}</td>
                  <td className="px-4 py-5 text-gray-700 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(u.status)}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-[#6B7280] align-middle hidden lg:table-cell text-[14px]">{u.lastLogin}</td>
                  {/* <td className="px-4 py-5 text-gray-700 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'View Profile', icon: <EyeIcon />,     onClick: () => {} },
                        { label: 'Edit Role',    icon: <EditIcon />,    onClick: () => {} },
                        { label: 'Suspend',      icon: <SuspendIcon />, onClick: () => {} },
                        { label: 'Delete',       icon: <TrashIcon />,   onClick: () => {}, danger: true },
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

function PlusIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function EditIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>; }
function SuspendIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M6 5.5v5M10 5.5v5" /></svg>; }
function TrashIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }
