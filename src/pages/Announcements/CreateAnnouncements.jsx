import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Clock, Pin, X, Eye, Monitor, Mail } from 'lucide-react';
import section from "../../assets/images/section.svg";
import sectiontitle from "../../assets/images/title.svg";
import inapp_banner from "../../assets/images/inapp_banner.svg";
import uploadIcon from "../../assets/images/upload.svg";
// import Switch from '../../components/ui/Switch'; // Assuming you have a Switch component

// Shared Styles (Reused from your blog code)
const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] font-bold text-[#000000] mb-1 font-sans";
const sectionSubClass = "text-[13px] text-[#6B7280] font-[400] mb-4";
const errorClass = "text-[12px] text-[#EF4444] mt-1";

// TYPE OPTIONS
const TYPE_OPTIONS = ['Release', 'Warning', 'Success', 'Info', 'Maintenance'];

// SECTION LOGIC
let sectionIdCounter = 1;
const newSection = () => ({
  id: sectionIdCounter++,
  title: '',
  content: '',
  bullets: [''],
});

export default function CreateAnnouncements() {
  const navigate = useNavigate();

  // MAIN FORM STATE
  const [form, setForm] = useState({
    title: '',
    type: '',
    message: '',
    audience: 'All tenants',
    targetSchools: [], // For specific schools
    showFrom: '',
    hideAfter: '',
    buttonLink: '',
    buttonLabel: '',
    pinToTop: false,
    dismissible: false,
    emailBlast: false,
  });

  // SECTION STATE (Reused from blog)
  const [sections, setSections] = useState([newSection()]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [coverImageName, setCoverImageName] = useState('');

  // HELPER: Update top-level form fields
  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // --- SECTION FUNCTIONS (Identical to blogs) ---
  const updateSection = (id, key, value) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
    setErrors((prev) => {
      const errKey = `section_${id}_${key}`;
      if (!prev[errKey]) return prev;
      const next = { ...prev };
      delete next[errKey];
      return next;
    });
  };

  const addSection = () => setSections((prev) => [...prev, newSection()]);
  const removeSection = (id) => setSections((prev) => prev.filter((s) => s.id !== id));

  const updateBullet = (sectionId, idx, value) => {
    setSections((prev) => prev.map((s) =>
      s.id === sectionId ? { ...s, bullets: s.bullets.map((b, i) => (i === idx ? value : b)) } : s
    ));
  };

  const addBullet = (sectionId) => {
    setSections((prev) => prev.map((s) =>
      s.id === sectionId ? { ...s, bullets: [...s.bullets, ''] } : s
    ));
  };

  const removeBullet = (sectionId, idx) => {
    setSections((prev) => prev.map((s) =>
      s.id === sectionId ? { ...s, bullets: s.bullets.length > 1 ? s.bullets.filter((_, i) => i !== idx) : s.bullets } : s
    ));
  };

  // --- IMAGE HANDLER ---
  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, coverImage: 'Please select a valid image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, coverImage: 'Image must be under 5MB' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      update('coverImage', reader.result);
      setCoverImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // --- VALIDATION ---
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (!form.type) newErrors.type = 'Select a type';
    if (!form.audience) newErrors.audience = 'Select an audience';
    
    // Optional: Validate button link if label exists
    if (form.buttonLabel && !form.buttonLink) {
      newErrors.buttonLink = 'Link is required if a label is added';
    }

    sections.forEach((s) => {
      if (!s.title.trim()) newErrors[`section_${s.id}_title`] = 'Section title is required';
      if (!s.content.trim()) newErrors[`section_${s.id}_content`] = 'Section content is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMIT LOGIC ---
  const handlePublish = () => {
    if (!validateForm()) return;
    
    // Build Payload matching your design's summary
    const payload = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      description: form.message,
      audience: form.audience,
      targetSchools: form.targetSchools,
      dates: { showFrom: form.showFrom, hideAfter: form.hideAfter },
      cta: { link: form.buttonLink, label: form.buttonLabel },
      options: { pinToTop: form.pinToTop, dismissible: form.dismissible, emailBlast: form.emailBlast },
      sections: sections,
      status: 'Active', // Default for new announcement
      thumbnail: form.coverImage || `https://picsum.photos/seed/${Date.now()}/100/100`,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('customAnnouncements') || '[]');
      localStorage.setItem('customAnnouncements', JSON.stringify([payload, ...existing]));
    } catch (err) {
      console.error('Failed to save announcement', err);
    }
    navigate('/announcements'); // Navigate to listing page
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-6 pb-24">
      <button
        type="button"
        onClick={() => navigate('/announcements')}
        className="flex items-center mb-2 mt-2 gap-1.5 text-[16px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
 

        {/* RIGHT PANEL: Announcement Configuration (Match Design) */}
        <div className="lg:col-span-2 w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF] h-fit">

      
          <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
            <h1 className="text-[24px] font-[700] font-bold text-[#000000] font-sans">New Announcement</h1>
            <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Broadcast an in-app banner and an optional email to your tenants.</p>
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-4">


      
            
            <h3 className={sectionTitleClass}>Content</h3>
            {/* Title Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                placeholder="e.g., Beginner, Enterprise"
                className={inputClass}
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                maxLength={80}
              />
              <p className="text-right text-[12px] text-[#9C9C9C] mt-1">{form.title.length}/80</p>
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>




             <div>
              <label className={labelClass}>Type</label>
              <select
                className={inputClass}
                value={form.type}
                onChange={(e) => update('type', e.target.value)}
              >
                <option value="">Select type</option>
                {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <p className={errorClass}>{errors.type}</p>}
            </div>
</div>
            {/* Type Select */}
           

            {/* Message */}
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                rows={3}
                placeholder="e.g., Beginner, Enterprise"
                className={`${inputClass} resize-none`}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                maxLength={300}
              />
              <p className="text-right text-[12px] text-[#9C9C9C] ">{form.message.length}/300</p>
              {errors.message && <p className={errorClass}>{errors.message}</p>}
            </div>


            <h3 className={`${sectionTitleClass}  -mt-[15px]`}>Audience & Schedule</h3>
            {/* Audience */}
            <div>
              <label className={`${labelClass} mt-0`}>Audience</label>
              <select
                className={inputClass}
                value={form.audience}
                onChange={(e) => update('audience', e.target.value)}
              >
                <option value="All tenants">All tenants</option>
                <option value="Specific schools">Specific schools</option>
              </select>
              {errors.audience && <p className={errorClass}>{errors.audience}</p>}
            </div>

            {/* Target Schools (If specific) */}
            {form.audience === 'Specific schools' && (
              <div>
                <label className={labelClass}>Target Schools</label>
            <div className="border border-[#E6E6E6] text-[#696969] rounded-[12px] p-3 space-y-2">
                  {['ABC Public School', 'DEF Public School', 'GHI Public School'].map((school) => (
                    <label key={school} className="flex items-center gap-2 text-[14px] font-[400] text-[#1C1C1C]">
                      <input 
                        type="checkbox" 
                        checked={form.targetSchools.includes(school)}
                        onChange={(e) => {
                          const newSet = e.target.checked 
                            ? [...form.targetSchools, school] 
                            : form.targetSchools.filter(s => s !== school);
                          update('targetSchools', newSet);
                        }}
                        className="w-4 h-4 text-[#0DA2E7] border-[#E6E6E6] rounded"
                      />
                      {school}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Show From</label>
                <input type="date" className={inputClass} value={form.showFrom} onChange={(e) => update('showFrom', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Hide After</label>
                <input type="date" className={inputClass} value={form.hideAfter} onChange={(e) => update('hideAfter', e.target.value)} />
              </div>
            </div>
            <p className="text-[12px] text-[#9C9C9C] -mt-[9px]">Leave "Show From" to publish immediately</p>

   

            <h3 className={`${sectionTitleClass} -mt-[0px]`}>Call To Action</h3>
            {/* CTA */}
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            
            <div >
              <label className={`${labelClass} -mt-[2px]`}>Button Link</label>
              <input type="text" className={inputClass} placeholder="e.g., 14" value={form.buttonLink} onChange={(e) => update('buttonLink', e.target.value)} />
              {errors.buttonLink && <p className={errorClass}>{errors.buttonLink}</p>}
            </div>
            <div>
              <label className={labelClass}>Button Label</label>
              <input type="text" className={inputClass} placeholder="e.g., 50" value={form.buttonLabel} onChange={(e) => update('buttonLabel', e.target.value)} />
            </div>
</div>
          
<h3 className={sectionTitleClass}>Delivery & Options</h3>

<div className="flex flex-wrap gap-3">
<button
  type="button"
  onClick={() => update('inAppBanner', !form.inAppBanner)}
  className={`flex items-center gap-2 pl-2 pr-4 sm:pr-40 py-2 rounded-[12px] border text-left transition-colors w-full sm:w-fit ${
    form.inAppBanner ? 'border-[#0F92F7] bg-[#F3F9FE] ' : 'border-[#E6E6E6] '
  }`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 rounded-[8px] flex-shrink-0 ${
      form.inAppBanner ? '' : ''
    }`}
  >
    {/* <Monitor className={`w-4 h-4 ${form.inAppBanner ? 'text-[#0DA2E7]' : 'text-[#696969]'}`} /> */}
 <img 
  src={inapp_banner} 
  alt="" 
  className={`w-4 h-4 ${form.inAppBanner ? 'filter-blue' : 'filter-gray'}`} 
/>
  </span>
  <div className="flex flex-col">
    <span className={`text-[14px] font-[600] font-semibold font-segoe whitespace-nowrap ${form.inAppBanner ? 'text-[#007AFF] ' : 'text-[#696969]'}`}>
      In-app banner
    </span>
    <span className="text-[12px] font-[400] text-[#9C9C9C] whitespace-nowrap">Top of tenant dashboard</span>
  </div>
</button>

  <button
    type="button"
    onClick={() => update('emailBlast', !form.emailBlast)}
    className={`flex items-center gap-1 pl-2 pr-4 sm:pr-40 py-2 rounded-[10px] border text-left transition-colors w-full sm:w-fit  ${
      form.emailBlast ? 'border-[#0F92F7]  bg-[#F3F9FE]' : 'border-[#E6E6E6]'
    }`}
  > <span
    className={`flex items-center justify-center w-8 h-8 rounded-[10px] flex-shrink-0 ${
      form.inAppBanner ? '' : ''
    }`}
  >
    <Mail className={`w-4 h-4 ${form.emailBlast ? 'text-[#007AFF]' : 'text-[#696969]'}`} />
    </span>
    <div className="flex flex-col">
      <span className={`text-[14px] font-[600] font-segoe whitespace-nowrap ${form.emailBlast ? 'text-[#007AFF] ' : 'text-[#696969]'}`}>
        Email blast
      </span>
      <span className="text-[12px] text-[#6B7280] whitespace-nowrap">To tenant owners</span>
    </div>
  </button>
</div>


<div className="space-y-3">
  <div className="flex items-center justify-between gap-2 border border-[#E6E6E6] rounded-[10px] p-3.5">
    <div className="flex items-center gap-2">
      <Pin className="w-4 h-4 text-[#696969] flex-shrink-0" />
      <div className="flex flex-col">
        <span className="text-[14px] font-[600] text-[#1C1C1C]">Pin to top</span>
        <span className="text-[12px] text-[#6B7280]">Show above other banners</span>
      </div>
    </div>
    <Switch checked={form.pinToTop} onCheckedChange={(val) => update('pinToTop', val)} />
  </div>

  <div className="flex items-center justify-between gap-3 border border-[#E6E6E6] rounded-[12px] p-3.5">
    <div className="flex items-center gap-2">
      <X className="w-4 h-4 text-[#696969] flex-shrink-0" />
      <div className="flex flex-col">
        <span className="text-[14px] font-[600] text-[#1C1C1C]">Dismissible</span>
        <span className="text-[12px] text-[#6B7280]">Let tenants close the banner</span>
      </div>
    </div>
    <Switch checked={form.dismissible} onCheckedChange={(val) => update('dismissible', val)} />
  </div>
</div>

            {/* Delivery Summary (Design Match) */}
            <hr className="border-[#E6E6E6] my-2" />
            <h3 className={sectionTitleClass}>Delivery Summary</h3>
            <div className="bg-[#FBFCFD] border border-[#E6E6E6] rounded-[12px] p-4 space-y-2 text-[12px] text-[#1C1C1C]">
              <div className="flex justify-between gap-2"><span className="text-[#6B7280]">Audience</span><span className="font-semibold text-right">{form.audience}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#6B7280]">Schedule</span><span className="font-semibold text-right">{form.showFrom || 'Immediately'} {form.hideAfter ? `→ ${form.hideAfter}` : ''}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#6B7280]">Channels</span><span className="font-semibold text-right">{form.emailBlast ? 'Email & In-app' : 'In-app'}</span></div>
              <div className="flex justify-between gap-2"><span className="text-[#6B7280]">Options</span><span className="font-semibold text-right">{form.pinToTop ? 'Pinned' : 'Standard'}</span></div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-2 border-t border-[#E6E6E6] pt-4">
              <button
                type="button"
                className="flex items-center justify-center sm:justify-start px-4 py-2 text-[16px] font-[600] text-[#0DA2E7] border border-[#0DA2E7] rounded-[8px] bg-transparent gap-2 w-full sm:w-auto"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button type="button" className="px-4 py-2 text-[16px] font-[600] text-[#6B7280] border border-[#E6E6E6] rounded-[8px] bg-white w-full sm:w-auto">Cancel</button>
                <button type="button" onClick={handlePublish} className="px-4 py-2 text-[16px] font-[600] text-white rounded-[8px] bg-[#0DA2E7] w-full sm:w-auto">Publish</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Icons (Reused from blogs) ──
function BackIcon()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ParagraphIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M2 4h12M2 8h12M2 12h8" /></svg>; }
function ListIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="2.5" cy="4" r="0.8" fill="currentColor" /><circle cx="2.5" cy="8" r="0.8" fill="currentColor" /><circle cx="2.5" cy="12" r="0.8" fill="currentColor" /><path d="M6 4h8M6 8h8M6 12h8" /></svg>; }
function XIcon()          { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" /></svg>; }
function Switch({ checked, onCheckedChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
}