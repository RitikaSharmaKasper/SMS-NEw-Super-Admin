import about_upload from "../../assets/images/about_upload.svg";
import aboutusicon from "../../assets/images/Aboutusicon.svg";
const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[18px] font-[600] font-semibold text-[#0F1729] font-sans";

export default function HeroSection({ hero, setHero, isOpen, onToggle, isActive, onToggleActive, galleryInputRef, fileError, handleAttachmentUpload, removeAttachment }) {
  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-5 py-4 bg-white cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0 bg-[#E6EEFC] rounded-[12px] p-2"><img src={aboutusicon} alt="" className="w-4 h-4" /></span>
          <h2 className={sectionTitleClass}>Hero Section</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-5 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Badge Text</label>
              <input
                type="text"
                className={inputClass}
                value={hero.badgeText}
                onChange={(e) => setHero({ ...hero, badgeText: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Designation / Tagline</label>
              <input
                type="text"
                className={inputClass}
                value={hero.designation}
                onChange={(e) => setHero({ ...hero, designation: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Subtitle</label>
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>CTA Label</label>
              <input
                type="text"
                className={inputClass}
                value={hero.ctaLabel}
                onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>CTA Path</label>
              <input
                type="text"
                className={inputClass}
                value={hero.ctaPath}
                onChange={(e) => setHero({ ...hero, ctaPath: e.target.value })}
              />
            </div>
          </div>

          {/* ── Image Upload Box ── */}
          <div>
            <label className={labelClass}>Image</label>
            <div
              onClick={() => galleryInputRef.current?.click()}
              className="w-full h-47 rounded-[16px] border-2 border-dashed border-[#D1D5DB] flex flex-col items-center justify-center cursor-pointer bg-[#FFFFFF]  transition-colors relative"
            >
              <div className="flex flex-col items-center gap-2 text-center p-4">
                <img src={about_upload} alt="Upload" className="w-16 h-16" />
                <p className="text-[14px] font-[400] text-[#9CA3AF] font-inter font-normal">
                  Drag &amp; Drop your files here <span className="text-[#6B7280]"><br />
                    <span className="text-[14px] font-[400] text-[#9CA3AF] font-inter mt-1">Or</span></span>
                </p>
                <button
                  type="button"
                  className="px-3.5 py-2 text-[12px] font-[500]  font-medium bg-[#2563EB] text-white rounded-[10px] border-none cursor-pointer transition-colors"
                >
                  Browse files
                </button>
              </div>
            </div>
          </div>

          {/* ── Attachments Section (Matches Figma screenshot 1:1) ── */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className={`${labelClass} mb-0`}>Attachments</label>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#9CA3AF] font-[400] font-sans">{hero.attachments.length}/8</span>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="text-[13px] text-[#0DA2E7] font-[600] bg-transparent border-none cursor-pointer"
                >
                  + Add Images
                </button>
                <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleAttachmentUpload} className="hidden" />
              </div>
            </div>

            {fileError && <p className="text-[12px] text-[#EF4444] mb-2">{fileError}</p>}

            {/* Grid of attachment cards matching Figma red circle cross */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {hero.attachments.map((img, idx) => (
                <div key={idx} className="relative w-full h-42 rounded-[8px] overflow-hidden border border-[#E5E7EB] bg-[#F1F1F1] py-7.5">
                  <img src={img} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeAttachment(idx)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[19px] font-normal cursor-pointer shadow-sm"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-8 h-[16px] rounded-full transition-colors border-none cursor-pointer flex-shrink-0 ${
        checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-[11px] h-[12px] rounded-full bg-white transition-transform"
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(0)' }}
      />
    </button>
  );
}

function SectionIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 text-[#0DA2E7]">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" />
      <path d="M5 6h6M5 9h4" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-4 h-4 text-[#6B7280] transition-transform duration-200 ${open ? '' : ''}`}
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
