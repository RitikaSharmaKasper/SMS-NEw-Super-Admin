import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../assets/images/upload.svg";
import staricon from "../../assets/images/Star.svg";

const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[700] font-bold text-[#000000] mb-1 font-sans";
const errorClass = "text-[12px] text-[#EF4444] mt-1";

export default function CreateTestimonial() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    personName: '',
    designation: '',
    schoolName: '',
    testimonialText: '',
    rating: 3.0,
    showOnLandingPage: true,
    personPhoto: null,
    schoolLogo: null,
  });

  const [errors, setErrors] = useState({});
  const photoInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleImageUpload = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      update(key, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    update('personPhoto', null);
    if (photoInputRef.current) {
      photoInputRef.current.value = '';
    }
  };

  const handleRemoveLogo = () => {
    update('schoolLogo', null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.personName.trim()) newErrors.personName = 'Person name is required';
    if (!form.designation.trim()) newErrors.designation = 'Designation is required';
    if (!form.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!form.testimonialText.trim()) newErrors.testimonialText = 'Testimonial text is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newTestimonial = {
      id: Date.now(),
      school: form.schoolName,
      person: `${form.personName} (${form.designation})`,
      testimonial: `"${form.testimonialText}"`,
      landingPage: form.showOnLandingPage,
      rating: form.rating,
      status: form.showOnLandingPage ? 'Published' : 'Hidden',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('customTestimonials') || '[]');
      localStorage.setItem('customTestimonials', JSON.stringify([newTestimonial, ...existing]));
    } catch (err) {
      console.error('Failed to save custom testimonial', err);
    }

    navigate('/testimonials');
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto gap-4 p-6 pb-24">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/testimonials')}
        className="flex items-center mb-2 mt-2 gap-1.5 text-[16px] font-[400] text-[#6B7280] bg-transparent border-none cursor-pointer w-fit transition-colors"
      >
        <BackIcon /> Back
      </button>

      {/* Main card */}
      <div className="w-full rounded-[16px] border border-[#00000014] bg-[#FFFFFF]">
        <div className="flex-shrink-0 -mt-1 pt-5 pl-5 pb-1 pr-5">
          <h1 className="text-[24px] font-[700] font-bold text-[#000000] font-sans leading-snug">Create Testimonial</h1>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-6 flex flex-col gap-6">
          {/* ── Person Details ── */}
          <section>
            <h3 className={sectionTitleClass}>Person Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-4 mt-4">
              <div>
                <label className={labelClass}>Person Name</label>
                <input
                  type="text"
                  placeholder="e.g. rahul kumar"
                  className={inputClass}
                  value={form.personName}
                  onChange={(e) => update('personName', e.target.value)}
                />
                {errors.personName && <p className={errorClass}>{errors.personName}</p>}
              </div>
              <div>
                <label className={labelClass}>Designation</label>
                <input
                  type="text"
                  placeholder="e.g. parents, teacher"
                  className={inputClass}
                  value={form.designation}
                  onChange={(e) => update('designation', e.target.value)}
                />
                {errors.designation && <p className={errorClass}>{errors.designation}</p>}
              </div>
              <div>
                <label className={labelClass}>School Name</label>
                <input
                  type="text"
                  placeholder="e.g. abc public school"
                  className={inputClass}
                  value={form.schoolName}
                  onChange={(e) => update('schoolName', e.target.value)}
                />
                {errors.schoolName && <p className={errorClass}>{errors.schoolName}</p>}
              </div>
            </div>

            {/* Photo & Logo Uploads */}
            <div className="flex items-center gap-6 mt-4">
              {/* Photo Upload Section */}
              <div>
                <label className={labelClass}>Photo</label>
                <div className="relative">
                  <div
                    onClick={() => photoInputRef.current?.click()}
                    className="w-18 h-18 rounded-full border-2 border border-[#D1D5DC] flex items-center justify-center cursor-pointer bg-[#FAFAFA] hover:bg-gray-50 transition-colors relative overflow-hidden"
                  >
                    {form.personPhoto ? (
                      <img src={form.personPhoto} alt="Photo" className="w-full h-full object-cover" />
                    ) : (
                      <img src={uploadIcon} alt="Upload" className="w-5 h-5 opacity-60 grayscale" />
                    )}
                  </div>

                  {form.personPhoto && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto();
                      }}
                      className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#EF4444] text-[#FFFFFF] text-[20px] flex items-center justify-center hover:bg-[#DC2626] transition-colors shadow-md"
                    >
                      ×
                    </button>
                  )}
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'personPhoto')}
                  className="hidden"
                />
              </div>

              {/* School Logo Upload Section */}
             
            </div>
          </section>

          {/* ── Testimonial Details ── */}
          <section>
            <h3 className={sectionTitleClass}>Testimonial Details</h3>
            <div className="mt-4">
              <label className={labelClass}>Testimonial Text</label>
              <div className="relative">
                <textarea
                  rows={4}
                  placeholder="Lorem ipsum dolor sit amet consectetur. Et urna tellus ac diam donec diam porta elit tortor..."
                  className={`${inputClass} resize-none`}
                  value={form.testimonialText}
                  onChange={(e) => update('testimonialText', e.target.value)}
                />
                <span className="absolute right-3 bottom-2 text-[12px] text-[#9CA3AF]">
                  100/500
                </span>
              </div>
              {errors.testimonialText && <p className={errorClass}>{errors.testimonialText}</p>}
            </div>

            {/* Rating */}
            <div className="mt-4">
              <label className={labelClass}>Rating</label>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => update('rating', star)}
                    className="p-0.5 bg-transparent border-none cursor-pointer"
                  >
                    <img
                      src={staricon}
                      alt="star"
                      className="w-5 h-5"
                      style={{ opacity: star <= form.rating ? 1 : 0.3 }}
                    />
                  </button>
                ))}
                <span className="text-[14px] font-[600] px-2  text-[#1C1C1C] ml-2 border border-[#E5E7EB] rounded-[4px]">
                  {form.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </section>

          {/* ── Display Settings ── */}
          <section>
            <h3 className={sectionTitleClass}>Display Settings</h3>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-[14px] font-[600] font-semibold text-[#1C1C1C]">Show On Landing Page</span>
              <button
                type="button"
                onClick={() => update('showOnLandingPage', !form.showOnLandingPage)}
                className={`relative w-10 h-2 rounded-full transition-colors flex-shrink-0 border-none cursor-pointer ${
                  form.showOnLandingPage ? 'bg-[#155A7A]' : 'bg-[#D1D5DB]'
                }`}
                style={{ width: '36px', height: '18px' }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white transition-transform"
                  style={{ transform: form.showOnLandingPage ? 'translateX(18px)' : 'translateX(0)' }}
                />
              </button>
            </div>
          </section>

          {/* Save button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-[16px] font-[400] rounded-[8px] bg-[#0DA2E7] text-white border-none cursor-pointer transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5"><path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}