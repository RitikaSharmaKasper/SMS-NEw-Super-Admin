import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogData } from "../../data/blogData";
import FilterDropdown from '../../components/layout/FilterDropdown';
import ActionMenu from '../../components/layout/ActionMenu';
import Pagination from '../../components/layout/Pagination';
import PLUS from "../../assets/images/PLUS.svg";
const STATUS_OPTIONS = ['All Status', 'Published', 'Draft'];

export default function Blogs() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All Status');
  const [page, setPage]           = useState(1);
  const [perPage, setPerPage]     = useState(10);
  const [allPosts, setAllPosts]   = useState(blogData);

  // pull in any articles created via CreateArticle.jsx and merge them on top of the dummy data
  useEffect(() => {
    try {
      const custom = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
      setAllPosts([...custom, ...blogData]);
    } catch (err) {
      console.error('Failed to load custom blog posts', err);
      setAllPosts(blogData);
    }
  }, []);

  const filtered = allPosts.filter((b) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Published: 'bg-[#E8F9EE] text-[#21C45D]',
      Draft:     'bg-[#FDF5E6] text-[#F69F11]',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  function categoryBadgeClass() {
    return 'bg-[#E6EEFC] text-[#5977E7]';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] font-sans">Blog Management</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Create and manage public blog articles.</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-4">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search article..."
            className="w-full pl-9 pr-3.5 py-1.25 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
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
                <th className="px-5 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280]  border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Article</th>
                <th className="pl-4 pr-7 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280]  border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden sm:table-cell">Category</th>
                <th className="pl-7 pr-8 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden md:table-cell">Author</th>
                <th className="px-7 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280]  border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA] hidden lg:table-cell">Date</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280]  border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2 text-left text-[14px] font-[600] font-semibold text-[#6B7280]  border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No articles found</td>
                </tr>
              ) : paginated.map((b) => (
                <tr key={b.id} className="border-b border-[#F2F3F5] last:border-b-0 transition-colors">
                  <td className="px-4 py-4 align-middle">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-[8px] flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${b.thumbnail})` }}
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1C1C1C] text-[14px] font-[600] truncate max-w-[280px]">{b.title}</p>
                        <p className="text-[12px] font-normal text-[#696969] font-[400] truncate max-w-[600px]">{b.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-0 pr-7 py-4 align-middle hidden sm:table-cell">
                    <span className={`inline-flex items-center px-3 py-0.85 rounded-full text-[13px] font-[600] font-semibold whitespace-nowrap ${categoryBadgeClass()}`}>
                      {b.category}
                    </span>
                  </td>
                  <td className="pl-6 pr-8 py-4 text-[#6B7280] font-[400] text-[14px] align-middle hidden md:table-cell">{b.author}</td>
                  <td className="px-4 py-4 text-[#6B7280] text-[14px] align-middle hidden lg:table-cell">{b.date}</td>
                  <td className="px-4 py-4 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.55 rounded-full text-[13px] font-medium whitespace-nowrap ${statusBadgeClass(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'Edit',      icon: <EditIcon />,   onClick: () => {} },
                        { label: 'Preview',   icon: <EyeIcon />,    onClick: () => {} },
                        { label: 'Publish',   icon: <PublishIcon />, onClick: () => {} },
                        { label: 'Delete',    icon: <TrashIcon />,  onClick: () => {}, danger: true },
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
      <div className="flex-shrink-0 px-1 mt-7">
        <Pagination
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          total={filtered.length}
          onPageChange={setPage}
          onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        />
      </div>

  


    <button
       onClick={() => navigate('/blogs/create')}
    className="fixed bottom-17 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer  transition-colors  z-50"
      title="Add School"
    >
      {/* <PlusIcon className="w-6 h-6" /> */}
    
      <img src={PLUS} alt="" className="w-8 h-8" />
    </button>
    </div>
  );
}

function SearchIcon()  { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>; }
function EyeIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><circle cx="8" cy="8" r="2" /></svg>; }
function EditIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>; }
function PublishIcon() { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M8 11V3M4.5 6.5L8 3l3.5 3.5" /><path d="M3 13h10" /></svg>; }
function TrashIcon()   { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }