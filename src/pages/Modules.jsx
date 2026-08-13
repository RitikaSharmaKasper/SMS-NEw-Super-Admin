import { useState } from 'react';
import { modules as initialModules } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Active', 'Inactive'];
const PLAN_OPTIONS   = ['All Plans', 'Basic', 'Standard', 'Premium'];

export default function Modules() {
  const [moduleList, setModuleList]     = useState(initialModules);
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [planFilter, setPlanFilter]     = useState('All Plans');
  const [page, setPage]                 = useState(1);
  const [perPage, setPerPage]           = useState(10);

  const filtered = moduleList.filter((m) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || (m.category && m.category.toLowerCase().includes(q));
    const matchStatus = statusFilter === 'All Status' || m.status === statusFilter;
    const matchPlan   = planFilter   === 'All Plans'  || (m.plan && m.plan === planFilter);
    return matchSearch && matchStatus && matchPlan;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleModule(id) {
    setModuleList((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, enabled: !m.enabled, status: !m.enabled ? 'Active' : 'Inactive' }
          : m
      )
    );
  }

  function statusBadgeClass(s) {
    const map = {
      Active:   'bg-[#E8F9EE] text-[#21C45D]',
      Inactive: 'bg-gray-100 text-gray-500',
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
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Modules</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Enable or disable platform modules globally</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search modules..."
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
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Module</th>
                <th className="px-29 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Plan</th>
                <th className="px-16 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Plan Scope</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Toggle</th>
                {/* <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No modules found</td>
                </tr>
              ) : paginated.map((m) => (
                <tr key={m.id} className="border-b border-[#F2F3F5] last:border-b-0 transition-colors">
                  <td className="px-4 py-4 font-semibold text-[#0F1729] text-[14px] align-middle">{m.name}</td>
                  <td className="px-27 py-4 text-gray-700 align-middle">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${planBadgeClass()}`}>
                      {m.plan || 'Basic'}
                    </span>
                  </td>
                  <td className="px-15 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
        <td className="px-4 py-4 align-middle  md:table-cell">
  <div className="flex items-center gap-1.5 flex-wrap">
    {(m.planScope || 'Basic | Standard | Premium')
      .split('|')
      .map((plan) => plan.trim())
      .filter(Boolean)
      .map((plan) => (
        <span
          key={plan}
          className="inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap bg-gray-100 text-[#6B7280]"
        >
          {plan}
        </span>
      ))}
  </div>
</td>
                  <td className="px-4 py-2.5 align-middle">
                    <button
                      type="button"
                      onClick={() => toggleModule(m.id)}
                      className={`relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        m.enabled ? 'bg-[#2563EB]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          m.enabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                  {/* <td className="px-4 py-2.5 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'Configure Settings', icon: <SettingsIcon />, onClick: () => {} },
                        { label: 'View Audit Logs',    icon: <EyeIcon />,      onClick: () => {} },
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

function SearchIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function SettingsIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="2" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2" /></svg>; }
