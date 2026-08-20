import { useState } from 'react';
import { announcements } from "../../data/announcements";
import { useNavigate } from 'react-router-dom';
import FilterDropdown from '../../components/layout/FilterDropdown';
import ActionMenu from '../../components/layout/ActionMenu';
import PLUS from '../../assets/images/PLUS.svg';
import sparkles from "../../assets/images/sparkles.svg";
import password from "../../assets/images/Password.svg";
import userrole from "../../assets/images/UserRole.svg";
import datafeature1 from "../../assets/images/DataEncryptionFeature.svg";
import datafeature2 from "../../assets/images/DataEncryptionfeature2.svg";
import tenants from "../../assets/images/alltenants.svg";
import Setupnow from "../../assets/images/Setupnow.svg";
import app from "../../assets/images/app.svg";
const STATUS_OPTIONS = ['All Status', 'Active', 'Scheduled', 'Expired'];
const TYPE_OPTIONS = ['All Types', 'Release', 'Warning', 'Success', 'Info', 'Maintenance'];

export default function Announcements() {
  
  const navigate = useNavigate(); // <--- 2. ADD THIS HOOK
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = announcements.filter((a) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || a.status === statusFilter;
    const matchType = typeFilter === 'All Types' || a.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  function statusBadgeClass(s) {
    const map = {
      Active:    'bg-[#E8F9EE] text-[#21C45D]',
      Scheduled: 'bg-[#FDF5E6] text-[#F69F11]',
      Expired:   'bg-[#FDECEC] text-[#EF4343]',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function typeBadgeClass() {
    return 'bg-[#EEEEEE] text-[#696969]';
  }

  function iconWrapClass(icon) {
    const map = {
      release: 'text-[#0DA2E7]',
      warning: 'text-[#F69F11]',
      success: 'text-[#21C45D]',
      info: 'text-[#0DA2E7]',
      maintenance: 'text-[#0DA2E7]',
    };
    return map[icon] || 'text-[#0DA2E7]';
  }

  function AnnouncementIcon({ icon, className }) {
    switch (icon) {
      case 'release':     return <img src={sparkles} className={className} />;
      case 'warning':     return <img src={password} className={className} />;
      case 'success':     return <img src={userrole} className={className} />;
      case 'info':        return <img src={datafeature1} className={className} />;
      case 'maintenance': return <img src={datafeature2} className={className} />;
      default:             return <InfoIcon className={className} />;
    }
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* ── Top: header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Announcements</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Broadcast in-app banners &amp; email notices to your tenants</p>
        </div>
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-4">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search announcements..."
         font-sans   className="w-full pl-9 pr-3.5 py-1.25 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
        <FilterDropdown value={typeFilter}   onChange={setTypeFilter}   options={TYPE_OPTIONS} />
      </div>

      {/* ── Announcement cards ── */}
      <div className="flex flex-col gap-4 overflow-y-auto pb-20 pr-4">
        {filtered.length === 0 ? (
          <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white text-center py-12 text-gray-400 text-sm">
            No announcements found
          </div>
        ) : filtered.map((a) => {
          const isSelected = selectedId === a.id;
          return (
            <div
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full rounded-[12px] bg-white pt-6 px-7 pb-6 cursor-pointer transition-colors ${
                isSelected
                  ? 'border border-[#E5E7EB]'
                  : 'border border-[#E5E7EB]'
              }`}
            >
              <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
  {/* Top Row: Icon + Title + Badges */}
  <div className="flex items-center gap-2 min-w-0">
    <span className={`flex-shrink-0 ${iconWrapClass(a.icon)}`}>
      <AnnouncementIcon icon={a.icon} className="w-5 h-5" />
    </span>
    
    <div className="flex items-center flex-wrap gap-2 min-w-0">
      <p className="font-semibold text-[#0F1729] text-[18px] font-[600] font-sans">{a.title}</p>
      <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[12px] font-[600]  font-semibold whitespace-nowrap ${statusBadgeClass(a.status)}`}>
        {a.status}
      </span>
      <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-[600] whitespace-nowrap ${typeBadgeClass()}`}>
        {a.type}
      </span>
    </div>
  </div>

  {/* Description (starts directly below the icon) */}
  <p className="text-[14px] text-[#6B7280] font-[400] mt-1">{a.description}</p>

  {/* Footer Metadata (starts directly below the icon) */}
  <div className="flex items-center flex-wrap gap-x-5 gap-y-1.5 mt-4 text-[12px] text-[#9C9C9C] font-[400]  font-sans">
    <span className="inline-flex items-center gap-1.5 text-[12px] font-[400]  font-normal text-[#9C9C9C] font-[400] font-sans"><img src={tenants} className="w-4 h-4" />{a.audience}</span>
    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#9C9C9C]  font-[400]  font-normal font-[400]  font-sans"><img src={app}  className="w-4 h-4" />In-
    app · {a.inAppMeta}</span>
    <span className="inline-flex items-center gap-1.5 text-[#0DA2E7]   font-[400]  font-normaltext-[12px] text-[#9C9C9C] font-[400]  font-sans"><img src={Setupnow} alt="link" className="w-4 h-4 object-contain" />
      {a.actionLabel}</span>
    <span className="inline-flex items-center gap-1.5"><CalendarIcon className="w-4 h-4   font-[400]  font-normal font-sans" />Publish Date: {a.publishDate}</span>
    <span className="inline-flex items-center gap-1.5"><CalendarIcon className="w-4 h-4  font-[400]  font-normal  font-sans" />End Date: {a.endDate}</span>
  </div>
</div>
                <div className="flex-shrink-0">
                  <ActionMenu
                    actions={[
                      { label: 'View',      icon: <EyeIcon />,   onClick: () => {} },
                      { label: 'Edit',      icon: <EditIcon />,  onClick: () => {} },
                      { label: 'Duplicate', icon: <CopyIcon />,  onClick: () => {} },
                      { label: 'Delete',    icon: <TrashIcon />, onClick: () => {}, danger: true },
                    ]}
                    align="right"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/create-announcement')} 
        className="fixed bottom-13 right-10 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer transition-colors z-50"
        title="New Announcement"
      >
        <img src={PLUS} alt="" className="w-8 h-8" />
      </button>
    </div>
  );
}

function SearchIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()        { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function EditIcon()       { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-8 8H3v-3l8-8z" /></svg>; }
function CopyIcon()       { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><rect x="5" y="5" width="9" height="9" rx="1.5" /><path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" /></svg>; }
function TrashIcon()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }

function UserIcon({ className })     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="8" cy="5.5" r="2.5" /><path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /></svg>; }
function ChatIcon({ className })     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M2 3.5h12v7H6l-3 3v-3H2v-7z" /></svg>; }
function LinkIcon({ className })     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M6.5 9.5a3 3 0 004.24 0l1.5-1.5a3 3 0 10-4.24-4.24L7 4.76" /><path d="M9.5 6.5a3 3 0 00-4.24 0l-1.5 1.5a3 3 0 104.24 4.24L9 11.24" /></svg>; }
function CalendarIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="2" y="3" width="12" height="11" rx="1.5" /><path d="M2 6.5h12M5 2v2.5M11 2v2.5" /></svg>; }

function BoltIcon({ className })        { return <svg viewBox="0 0 16 16" fill="currentColor" className={className}><path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" /></svg>; }
function WarningIcon({ className })     { return <svg viewBox="0 0 16 16" fill="currentColor" className={className}><path d="M8 1.5L15 14H1L8 1.5z" stroke="currentColor" strokeWidth="1" fill="none" /><path d="M8 6v4M8 11.5v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>; }
function CheckCircleIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="8" cy="8" r="6.5" /><path d="M5.5 8l1.8 1.8L10.5 6" /></svg>; }
function InfoIcon({ className })        { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="8" cy="8" r="6.5" /><path d="M8 7.5v3.5M8 5v.01" strokeLinecap="round" /></svg>; }
function WrenchIcon({ className })      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M10.5 2.5a3 3 0 00-3.9 3.9L2 11l1.5 1.5 4.6-4.6a3 3 0 003.9-3.9l-2 2-1.5-1.5 2-2z" /></svg>; }