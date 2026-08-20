import { XIcon } from "lucide-react";
import aboutusicon from "../../assets/images/Aboutusicon.svg";
import { useState } from "react";

const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[16px] font-[600] font-semibold text-[#0F1729] font-sans";

// Define the newSection function
const newVisionSection = () => ({
  id: Date.now().toString(),
  bullets: [''],
});

export default function VisionSection({ vission = { title: '', description: '' }, setVission, isOpen, onToggle, isActive, onToggleActive }) {
  const [visionsections, setVisionSections] = useState([newVisionSection()]);

  const updateBullet = (sectionId, idx, value) => {
    setVisionSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, bullets: s.bullets.map((b, i) => (i === idx ? value : b)) } : s
      )
    );
  };

  const addBullet = (sectionId) => {
    setVisionSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, bullets: [...s.bullets, ''] } : s))
    );
  };

  const removeBullet = (sectionId, idx) => {
    setVisionSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, bullets: s.bullets.length > 1 ? s.bullets.filter((_, i) => i !== idx) : s.bullets }
          : s
      )
    );
  };

  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50/50 cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0 bg-[#E6EEFC] rounded-[12px] p-2"><img src={aboutusicon} alt="" className="w-4 h-4" /></span>
          <h2 className={sectionTitleClass}>Vission</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-4 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Title"
              value={vission.title}
              onChange={(e) => setVission({ ...vission, title: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Body</label>
            <textarea
              rows={3}
              className={`${inputClass} resize-none`}
              value={vission.description}
              placeholder="description here"
              onChange={(e) => setVission({ ...vission, description: e.target.value })}
            />
          </div>

          {/* Map over sections to render each section's bullet list */}
          {visionsections.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between mb-1">
                <label className={`${labelClass} mb-0`}>Bullet List</label>
                <button
                  type="button"
                  onClick={() => addBullet(s.id)}
                  className="text-[13px] font-[600] text-[#0DA2E7] border border-[#0DA2E7] rounded-[8px] px-3 py-0.5 bg-transparent cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                {s.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add point..."
                      className={inputClass}
                      value={b}
                      onChange={(e) => updateBullet(s.id, bIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeBullet(s.id, bIdx)}
                      className="flex-shrink-0 w-12 h-11 flex items-center justify-center rounded-[8px] bg-[#EF4444] text-white border-none cursor-pointer transition-colors"
                      title="Remove bullet"
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
      className={`relative w-8 h-[15px] rounded-full transition-colors border-none cursor-pointer flex-shrink-0 ${
        checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-[10.5px] h-[11px] rounded-full bg-white transition-transform"
        style={{ transform: checked ? 'translateX(18px)' : 'translateX(0)' }}
      />
    </button>
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