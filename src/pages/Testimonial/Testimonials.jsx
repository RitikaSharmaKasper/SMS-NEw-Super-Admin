import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterDropdown from '../../components/layout/FilterDropdown';
import ActionMenu from '../../components/layout/ActionMenu';
import Pagination from '../../components/layout/Pagination';
import PLUS from "../../assets/images/PLUS.svg";
import section from "../../assets/images/section.svg";
import staricon from "../../assets/images/Star.svg";
const STATUS_OPTIONS = ['All Status', 'Published', 'Hidden'];

const initialTestimonials = [
  {
    id: 1,
    school: 'Riverside High School',
    person: 'Mr. Ravi Sharma',
    testimonial: '"Create informative webinars that showcase your expertise, enabling direct engagement with potential clients and building trust through valuable content."',
    landingPage: true,
    rating: 5.0,
    status: 'Hidden'
  },
  {
    id: 2,
    school: 'Greenwood Academy',
    person: 'Ms. Emily Chen',
    testimonial: '"Utilize push notifications to keep users informed about new updates or promotions, ensuring they feel valued and engaged."',
    landingPage: true,
    rating: 5.1,
    status: 'Hidden'
  },
  {
    id: 3,
    school: 'Cedar Creek School',
    person: 'Ms. Laura Kim',
    testimonial: '"Adopt email marketing strategies that segment audiences, providing targeted content that resonates with specific customer needs and preferences."',
    landingPage: true,
    rating: 4.8,
    status: 'Hidden'
  },
  {
    id: 4,
    school: 'Riverside High School',
    person: 'Mr. Ravi Sharma',
    testimonial: '"Implement chatbots on your website for instant support, allowing for real-time communication and improving user experience."',
    landingPage: true,
    rating: 4.7,
    status: 'Published'
  },
  {
    id: 5,
    school: 'Lakeside College',
    person: 'Dr. Jason Lee',
    testimonial: '"Leverage social media platforms to amplify brand visibility, fostering a community through authentic interactions and user-generated content."',
    landingPage: false,
    rating: 4.9,
    status: 'Hidden'
  },
  {
    id: 6,
    school: 'Maplewood Institute',
    person: 'Mrs. Sarah Johnson',
    testimonial: '"Utilize SMS to connect with potential clients, ensuring timely updates and personalized interactions that enhance customer engagement and satisfaction."',
    landingPage: true,
    rating: 5.0,
    status: 'Published'
  },
  {
    id: 7,
    school: 'Pine Valley High',
    person: 'Mr. Thomas Wilson',
    testimonial: '"Encourage feedback through surveys post-purchase, using insights to improve offerings and meet customer expectations more effectively."',
    landingPage: false,
    rating: 4.6,
    status: 'Published'
  }
];

const avatarColors = ['#0DA2E7', '#21C45D', '#F69F11', '#EF4444', '#8B5CF6'];

export default function Testimonials() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  useEffect(() => {
    try {
      const custom = JSON.parse(localStorage.getItem('customTestimonials') || '[]');
      setTestimonials([...custom, ...initialTestimonials]);
    } catch (err) {
      console.error('Failed to load custom testimonials', err);
    }
  }, []); 

  const toggleLandingPage = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, landingPage: !t.landingPage } : t))
    );
  };

  const filtered = testimonials.filter((t) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      t.school.toLowerCase().includes(q) ||
      t.person.toLowerCase().includes(q) ||
      t.testimonial.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All Status' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function statusBadgeClass(s) {
    const map = {
      Published: 'bg-[#E8F9EE] text-[#21C45D]',
      Hidden: 'bg-[#FDF5E6] text-[#F69F11]',
    };
    return map[s] || 'bg-gray-100 text-gray-500';
  }

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mb-2">
        <div>
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] font-sans leading-snug">Testimonial Management</h1>
          <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage customer testimonials displayed on landing page.</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 mb-4">
        <div className="relative flex items-center flex-1">
          <span className="absolute left-2.5 text-[#696969] pointer-events-none"><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search by recipient or subject...."
            className="w-full pl-9 pr-3.5 py-1.25 text-[16px] border border-[#DDDDDD] rounded-[8px] outline-none bg-[#F3F4F6] text-[#696969] transition-colors"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
      </div>

      {/* Table card */}
      <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm align-top">
            <thead className="bg-[#FFFFFF]">
              <tr>

                <th className="px-6 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">School/Person</th>
                <th className="px-5 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Testimonial</th>
                <th className="px-0 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Landing Page</th>
                <th className="px-7 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Rating</th>
                <th className="px-8 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Status</th>
                <th className="px-4 py-2.5 text-left text-[14px] font-[600] font-semibold text-[#6B7280] border-b border-[#F2F3F5] whitespace-nowrap sticky top-0 z-[1] bg-[#F9F9FA]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No testimonials found</td>
                </tr>
              ) : paginated.map((t, idx) => (
                <tr key={t.id} className="border-b border-[#F2F3F5] last:border-b-0 transition-colors">
                  
                  <td className="px-5 py-3.5 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0"
                        style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}
                      >
                        {t.school.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0F1729] text-[14px] truncate max-w-[180px]">{t.school}</p>
                        <p className="text-[12px] text-[#6B7280] font-[400]  truncate max-w-[180px]">{t.person}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 align-middle">
                    <p className="text-[14px] text-[#6B7280]  max-w-[420px] font-normal leading-relaxed">
                      {t.testimonial}
                    </p>
                  </td>
                  <td className="px-3 py-3.5 align-middle">
                    <button
                      type="button"
                      onClick={() => toggleLandingPage(t.id)}
                      className={`relative w-7 h-2 rounded-full transition-colors flex-shrink-0 border-none cursor-pointer ${
                        t.landingPage ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
                      }`}
                      style={{ width: '35px', height: '18px' }}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white transition-transform"
                        style={{ transform: t.landingPage ? 'translateX(18px)' : 'translateX(0)' }}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-3.5 align-middle">
                    <div className="flex items-center gap-3 text-[14px] font-[400] text-[#0F1729]">
                    <img src={staricon} alt="" className="w-5 h-5" />
                      <span>{t.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 align-middle">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 align-middle">
                    <ActionMenu
                      actions={[
                        { label: 'Edit', icon: <EditIcon />, onClick: () => {} },
                        { label: 'Delete', icon: <TrashIcon />, onClick: () => {}, danger: true },
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

      {/* Pagination */}
      <div className="flex-shrink-0 px-1 mt-6">
        <Pagination
          page={page}
          totalPages={totalPages}
          perPage={perPage}
          total={filtered.length}
          onPageChange={setPage}
          onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
        />
      </div>

      {/* Floating Add button */}
      <button
        onClick={() => navigate('/testimonials/create')}
        className="fixed bottom-17 right-6 w-11 h-11 flex items-center justify-center bg-[#0DA2E7] text-white rounded-full border-none cursor-pointer  transition-colors  z-50"
  title="Add Testimonial"
>
        <img src={PLUS} alt="" className="w-8 h-8" />
      </button>
    
    </div>
  );
}

function SearchIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" /></svg>;
}
function DragIcon() {
  return <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[#9CA3AF]"><circle cx="5" cy="3" r="1" /><circle cx="5" cy="8" r="1" /><circle cx="5" cy="13" r="1" /><circle cx="10" cy="3" r="1" /><circle cx="10" cy="8" r="1" /><circle cx="10" cy="13" r="1" /></svg>;
}
function StarIcon() {
  return <svg viewBox="0 0 20 20" fill="#F59E0B" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}
function EditIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M11 2l3 3-9 9H2v-3l9-9z" /></svg>;
}
function TrashIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>;
}
