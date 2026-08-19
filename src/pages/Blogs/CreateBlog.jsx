import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import section from "../../assets/images/section.svg";
import sectiontitle from "../../assets/images/title.svg";
import { Trash2 } from 'lucide-react';
import uploadIcon from "../../assets/images/upload.svg";
const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px]  font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] font-bold text-[#000000] mb-1 font-sans";
const sectionSubClass = "text-[13px] text-[#6B7280] font-[400] mb-4";
const errorClass = "text-[12px] text-[#EF4444] mt-1";

const CATEGORY_OPTIONS = ['Product Update', 'Company News', 'Tutorial', 'Announcement'];
const STATUS_OPTIONS = ['Draft', 'Published'];

let sectionIdCounter = 1;
const newSection = () => ({
  id: sectionIdCounter++,
  title: '',
  content: '',
  bullets: [''],
});

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    category: '',
    author: '',
    status: 'Draft',
    publishDate: '',
    coverImage: '',
    tags: '',
  });











  const [sections, setSections] = useState([newSection()]);
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

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

  const removeSection = (id) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const updateBullet = (sectionId, idx, value) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, bullets: s.bullets.map((b, i) => (i === idx ? value : b)) } : s
      )
    );
  };

  const addBullet = (sectionId) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, bullets: [...s.bullets, ''] } : s))
    );
  };

  const removeBullet = (sectionId, idx) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, bullets: s.bullets.length > 1 ? s.bullets.filter((_, i) => i !== idx) : s.bullets }
          : s
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!form.category) newErrors.category = 'Select a category';
    if (!form.author.trim()) newErrors.author = 'Author is required';
    if (!form.status) newErrors.status = 'Select a status';
    if (!form.publishDate) newErrors.publishDate = 'Publish date is required';

    if (form.tags.trim()) {
      const invalidTag = form.tags.split(',').some((t) => t.trim() === '');
      if (invalidTag) newErrors.tags = 'Remove empty tags (check for stray commas)';
    }

    sections.forEach((s) => {
      if (!s.title.trim()) newErrors[`section_${s.id}_title`] = 'Section title is required';
      if (!s.content.trim()) newErrors[`section_${s.id}_content`] = 'Section content is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = (statusOverride) => {
    const status = statusOverride || form.status;
    return {
      id: Date.now(),
      title: form.title,
      description: form.excerpt,
      category: form.category,
      author: form.author,
      date: form.publishDate,
      status,
      thumbnail: form.coverImage || `https://picsum.photos/seed/${Date.now()}/100/100`,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      sections,
    };
  };

const fileInputRef = useRef(null);

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
    update('coverImage', reader.result); // base64 data URL, stored same as before
    setCoverImageName(file.name);
  };
  reader.readAsDataURL(file);
};

const [coverImageName, setCoverImageName] = useState('');










  const persistAndGo = (statusOverride) => {
    const payload = buildPayload(statusOverride);
    try {
      const existing = JSON.parse(localStorage.getItem('customBlogPosts') || '[]');
      localStorage.setItem('customBlogPosts', JSON.stringify([payload, ...existing]));
    } catch (err) {
      console.error('Failed to save article to localStorage', err);
    }
    navigate('/blogs');
  };

  const handleSaveDraft = () => {
    if (!validateForm()) return;
    persistAndGo('Draft');
  };

  const handlePublish = () => {
    if (!validateForm()) return;
    persistAndGo('Published');
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-6 pb-24">

      <button
        type="button"
        onClick={() => navigate('/blogs')}
        className="flex items-center mb-2 mt-2 gap-1.5 text-[16px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: Article Content ── */}
        <div className="lg:col-span-2 w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF]">
          <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
            <h1 className="text-[24px] font-[700] font-bold text-[#000000]  font-sans">Create New Article</h1>
            <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Write and publish a new blog article.</p>
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-4">
            <h3 className={sectionTitleClass}>Article Content</h3>

            <div className="flex flex-col gap-4">
              {sections.map((s, idx) => (

              <div key={s.id} className="border border-[#E5E7EB] rounded-[12px] bg-[#FBFCFD] overflow-hidden">
  {/* Separated Header Bar */}
  <div className="flex items-center justify-between px-4 py-2 bg-[#FBFCFD] border-b border-[#E5E7EB]">
    <span className="flex items-center gap-4 text-[14px] font-[600] text-[#696969] font-semibold">
     <img src={section} alt="" /> Section {idx + 1}
    </span>
    <button
      type="button"
      onClick={() => removeSection(s.id)}
      className="text-[#9CA3AF] hover:text-[#EF4444] bg-transparent border-none cursor-pointer p-1 transition-colors"
      title="Remove section"
    >
    <Trash2 className="w-4 h-4" />
    </button>
  </div>

  {/* Form Fields Section */}
  <div className="p-4 flex flex-col gap-5 bg-[#FFFFFF]">
    <div>
      <label className={labelClass}><img src={sectiontitle} className="inline w-2.5 h-2.5 mr-1 -mt-0.5" />Section Title</label>
      <input
        type="text"
        placeholder="e.g., beginner, enterprise"
        className={inputClass}
        value={s.title}
        onChange={(e) => updateSection(s.id, 'title', e.target.value)}
      />
      {errors[`section_${s.id}_title`] && <p className={errorClass}>{errors[`section_${s.id}_title`]}</p>}
    </div>

    <div>
      <label className={labelClass}><ParagraphIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Content</label>
      <textarea
        rows={4}
        placeholder="e.g., beginner, enterprise"
        className={`${inputClass} resize-none`}
        value={s.content}
        onChange={(e) => updateSection(s.id, 'content', e.target.value)}
      />
      {errors[`section_${s.id}_content`] && <p className={errorClass}>{errors[`section_${s.id}_content`]}</p>}
    </div>

    <div>
      <div className="flex items-center justify-between mb-1">
        <label className={`${labelClass} mb-0`}><ListIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />Bullet List</label>
        <button
          type="button"
          onClick={() => addBullet(s.id)}
          className="text-[13px] font-[600] text-[#0DA2E7] border border-[#0DA2E7] rounded-[8px] px-3 py-1 bg-transparent cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {s.bullets.map((b, bIdx) => (
          <div key={bIdx} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add bullet point..."
              className={inputClass}
              value={b}
              onChange={(e) => updateBullet(s.id, bIdx, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeBullet(s.id, bIdx)}
              className="flex-shrink-0 w-13 h-11 flex items-center justify-center rounded-[8px] bg-[#EF4444] text-white border-none cursor-pointer transition-colors"
              title="Remove bullet"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSection}
              className="mt-3 text-[16x] font-[600]  text-[#0DA2E7] font-sans border border-[#0DA2E7] rounded-[8px] px-3 py-1.5 bg-transparent cursor-pointer w-fit"
            >
              Add Section
            </button>
          </div>
        </div>

        {/* ── Right: Article Information ── */}
        <div className="lg:col-span-1 w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF] h-fit">
          <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-4">
            <h3 className={sectionTitleClass}>Article Information</h3>

            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                placeholder="e.g., beginner, enterprise"
                className={inputClass}
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>

            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea
                rows={3}
                placeholder="Brief summary for cards and SEO..."
                className={`${inputClass} resize-none`}
                value={form.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
              />
              {errors.excerpt && <p className={errorClass}>{errors.excerpt}</p>}
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className={errorClass}>{errors.category}</p>}
            </div>

            <div>
              <label className={labelClass}>Author</label>
              <input
                type="text"
                placeholder="Author name..."
                className={inputClass}
                value={form.author}
                onChange={(e) => update('author', e.target.value)}
              />
              {errors.author && <p className={errorClass}>{errors.author}</p>}
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.status && <p className={errorClass}>{errors.status}</p>}
            </div>

            <div>
              <label className={labelClass}>Publish Date</label>
              <input
                type="date"
                className={inputClass}
                value={form.publishDate}
                onChange={(e) => update('publishDate', e.target.value)}
              />
              {errors.publishDate && <p className={errorClass}>{errors.publishDate}</p>}
            </div>

         <div>
  <label className={labelClass}>Cover Image</label>
  <div className="flex items-center gap-2.5">
    <input
      type="text"
      placeholder="Choose image"
      className={inputClass}
      value={coverImageName}
      readOnly
      onClick={() => fileInputRef.current?.click()}
    />
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleCoverImageChange}
      className="hidden"
    />
    <button
      type="button"
      onClick={() => fileInputRef.current?.click()}
      className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-[8px] border border-[#0DA2E7] text-[#0DA2E7] bg-transparent cursor-pointer"
      title="Upload image"
    >
      <img src={uploadIcon} alt="" />
    </button>
  </div>
  {errors.coverImage && <p className={errorClass}>{errors.coverImage}</p>}

  {form.coverImage && (
    <div className="mt-2.5 relative w-20 h-20">
      <img
        src={form.coverImage}
        alt="Cover preview"
        className="w-20 h-20 rounded-[8px] object-cover border border-[#E6E6E6]"
      />
      <button
        type="button"
        onClick={() => { update('coverImage', ''); setCoverImageName(''); }}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#EF4444] text-white border-none cursor-pointer text-[10px]"
        title="Remove image"
      >
        ×
      </button>
    </div>
  )}
</div>

            <div>
            <label className={`${labelClass} mt-2`}>Tags</label>
              <input
                type="text"
                placeholder="CRM, Sales, Automation"
                className={inputClass}
                value={form.tags}
                onChange={(e) => update('tags', e.target.value)}
              />
              <p className="text-[14px] text-[#9C9C9C] mt-1">Comma-separated tags.</p>
              {errors.tags && <p className={errorClass}>{errors.tags}</p>}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-3 py-1 w-[112px] h-[40px] text-[16px] font-semibold font-[600] rounded-[8px] bg-transparent text-[#0DA2E7] border border-[#0DA2E7] cursor-pointer transition-colors"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="px-3 py-1 w-[89px] h-[40px] text-[16px] font-[600] font-semibold rounded-[8px] bg-[#0DA2E7] text-white border-none cursor-pointer transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */
function BackIcon()      { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function DragIcon()      { return <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[#9CA3AF]"><circle cx="5" cy="3" r="1" /><circle cx="5" cy="8" r="1" /><circle cx="5" cy="13" r="1" /><circle cx="10" cy="3" r="1" /><circle cx="10" cy="8" r="1" /><circle cx="10" cy="13" r="1" /></svg>; }
function TrashIcon()     { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" /></svg>; }
function XIcon()          { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" /></svg>; }
function TextIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M3 3h10M8 3v10" /></svg>; }
function ParagraphIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M2 4h12M2 8h12M2 12h8" /></svg>; }
function ListIcon({ className }) { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="2.5" cy="4" r="0.8" fill="currentColor" /><circle cx="2.5" cy="8" r="0.8" fill="currentColor" /><circle cx="2.5" cy="12" r="0.8" fill="currentColor" /><path d="M6 4h8M6 8h8M6 12h8" /></svg>; }
function UploadIcon()    { return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M8 11V3M4.5 6.5L8 3l3.5 3.5" /><path d="M3 13h10" /></svg>; }