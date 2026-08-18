import { useState } from 'react';
import {  emailLogs } from '../data/emaildata';
import FilterDropdown from '../components/layout/FilterDropdown';
import ActionMenu from '../components/layout/ActionMenu';
import Pagination from '../components/layout/Pagination';
import { RotateCw } from 'lucide-react';
import retry from "../assets/images/Retry.svg";
const STATUS_OPTIONS = ['All Status', 'Sent','Failed'];


export default function EmailLogs() {
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All Status');
  const [methodFilter, setMethod] = useState('All Methods');
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);

  const filtered = emailLogs.filter((p) => {
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
     Sent:    'bg-[#E8F9EE] text-[#21C45D]',
    
      Failed:  'bg-[#FDECEC] text-[#EF4343]',         
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
          <h1 className="text-[24px] font-[700] font-bold text-[#000000]  font-sans">Email Deliverability</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Every platform email — delivery status, failures & resend</p>
        </div>
        {/* <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md border-none cursor-pointer transition-colors hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto">
          <DownloadIcon /> Export Payments
        </button> */}
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-4">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by school or Order..."
         font-sans   className="w-full pl-9 pr-3.5 py-1.25 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatus(v); setPage(1); }} options={STATUS_OPTIONS} />
       
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>
                <th className="pl-4  py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Recipient</th>
                <th className="pr-3 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Subject</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] sm:table-cell">Status</th>
                <th className="px-7 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Sent</th>


                <th className="px-3 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] lg:table-cell">Error</th>
                                <th className="px-1 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] tracking-wide border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
               
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No payments found</td>
                </tr>
              ) : paginated.map((p) => (
                <tr key={p.id} className="border-b border-[#F2F3F5] last:border-b-0  transition-colors">


             
                                    {/* <td className="px-1 py-6 align-middle">
                    <span  className={` inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${planBadgeClass(p.plan)}`}>{p.plan}
                    </span>
                  </td>  */}
                  
                  <td className="px-4 py-5 font-semibold text-[#1C1C1C] font-[600] text-[14px] align-middle"> {p.recipient}</td>
                      <td className="pr-0 py-5 font-normal text-[#0F1729] text-[14px] align-middle">
  <div className="truncate max-w-[360px]">
    {p.subject}
  </div>
</td>  
                 
                   <td className="px-3 py-5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(p.status)}`}>
                      {p.status}
                    </span>
                  </td>

<td className="px-5 py-5 font-normal text-[#0F1729] text-[14px] align-middle"> {p.sentAt}</td>
<td className="px-2 py-5 font-normal text-[#B60000] font-[400] text-[14px] align-middle">
  <div className="truncate max-w-[370px]">
    {p.error||"-"}
  </div>
</td>



<td className="px-0 pr-4 py-5 font-normal text-[#0F1729] text-[14px] align-middle">
  <div className="flex items-center justify-start gap-1.25">
  
    <img
  src={retry}
      onClick={() => handleRetry(p)}
      className="inline-flex items-center "
    >
  
    </img>
   <p className="text-[#2675F4] font-semibold font-[600] text-[14px]"> Retry</p>
  </div>
</td>
                 
            {/* <td className="px-3 py-2.5 text-gray-700 align-middle">
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


function DownloadIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M8 3v8M5 8l3 3 3-3M3 13h10" /></svg>; }
   

function PlusIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M8 3v10M3 8h10" /></svg>; }
function SearchIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function UpgradeIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M8 11V5M5.5 7.5L8 5l2.5 2.5" /></svg>; }
function RenewIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M13 8A5 5 0 113 8" /><path d="M13 5v3h-3" /></svg>; }
function SuspendIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="8" cy="8" r="6.5" /><path d="M6 5.5v5M10 5.5v5" /></svg>; }
function TrashIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }
