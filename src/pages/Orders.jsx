import { useState } from 'react';
import { orders } from '../data/dummyData';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';

const STATUS_OPTIONS = ['All Status', 'Paid', 'Pending', 'Overdue'];
const METHOD_OPTIONS = ['All Methods', 'Credit Card', 'Bank Transfer'];

export default function Orders() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All Status');
  const [methodFilter, setMethod] = useState('All Methods');
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);

  const filtered = orders.filter((p) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || p.school.toLowerCase().includes(q) || p.txnId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status'  || p.status === statusFilter;
    const matchMethod = methodFilter === 'All Methods' || p.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Paid:    'bg-[#E8F9EE] text-[#21C45D]',
      Overdue: 'bg-[#FDECEC] text-[#EF4343]',
      Pending: 'bg-[#FDF5E6] text-[#F69F11]',
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
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Orders</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Track and manage all subscription orders</p>
        </div>
        {/* <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto">
          <DownloadIcon /> Export Payments
        </button> */}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-1">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by school or Order..."
            className="w-full pl-9 pr-3.5 py-2 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
        <FilterDropdown value={methodFilter} onChange={(v) => { setMethod(v); setPage(1); }} options={METHOD_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Payment ID</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden sm:table-cell">Plan</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Taxable Amt</th>
                              <th className="px-5 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">GST</th>
                         <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Total</th>
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Receipt</th>

                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Date</th>
                                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                {/* <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden xl:table-cell">Invoice</th> */}
                <th className="px-6 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No payments found</td>
                </tr>
              ) : paginated.map((p) => (
                <tr key={p.id} className="border-b border-[#F2F3F5] last:border-b-0  transition-colors">
                  <td className="px-4 py-6 text-[14px] font-[400] font-mono text-[#2563EB] align-middle">{p.paymentId}</td>
                  <td className="px-4 py-6 font-semibold text-[#0F1729] text-[14px] align-middle">{p.school}</td>
                  <td className="px-4 py-6 align-middle hidden sm:table-cell">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${planBadgeClass()}`}>
                      {p.plan}
                    </span>
                  </td>
                  <td className="px-5 py-6 font-normal text-[#0F1729] text-[14px] align-middle"> ₹{p.taxableAmt}</td>
                       <td className="px-4 py-6 font-normal text-[#0F1729] text-[14px] align-middle"> ₹{p.gst}</td>
                        <td className="px-4 py-6 font-bold font-[700] text-[#0F1729] text-[14px] align-middle"> ₹{p.total}</td>
                  <td className="px-4 py-6 text-[#6B7280] text-[14px] align-middle hidden md:table-cell">{p.receipt}</td>
                 
                  <td className="px-4 py-6 text-[#6B7280] text-[14px] align-middle hidden lg:table-cell">{p.date}</td>
                   <td className="px-3 py-6 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
            
                
                    {/* <ActionMenu
                      actions={[
                        { label: 'Download Invoice', icon: <DownloadIcon />, onClick: () => {} },
                        { label: 'View Receipt',     icon: <EyeIcon />,      onClick: () => {} },
                      ]}
                      align="right"
                    /> */}
    <td className="px-5 py-6 text-[14px] font-inter text-[#0DA2E7] align-middle hidden xl:table-cell">Details</td>

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
function DownloadIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M8 3v8M5 8l3 3 3-3M3 13h10" /></svg>; }
function EyeIcon()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
