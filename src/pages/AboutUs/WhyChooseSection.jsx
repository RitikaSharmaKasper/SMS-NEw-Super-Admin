const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[16px] font-[600] font-semibold text-[#0F1729] font-sans";

export default function WhyChooseSection({ whyChoose, setWhyChoose, isOpen, onToggle, isActive, onToggleActive }) {
  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50/50 cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0"><SectionIcon /></span>
          <h2 className={sectionTitleClass}>Why Choose MUN-C</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-4 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          {whyChoose.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-[12px] border border-[#E5E7EB] bg-[#FBFCFD] flex flex-col gap-3">
              <p className="text-[14px] font-[600] text-[#0F1729]">Feature {idx + 1}</p>
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => setWhyChoose(whyChoose.map((w) => (w.id === item.id ? { ...w, title: e.target.value } : w)))}
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={2}
                  className={`${inputClass} resize-none`}
                  value={item.description}
                  onChange={(e) => setWhyChoose(whyChoose.map((w) => (w.id === item.id ? { ...w, description: e.target.value } : w)))}
                />
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
      className={`relative w-9 h-[17.5px] rounded-full transition-colors border-none cursor-pointer flex-shrink-0 ${
        checked ? 'bg-[#0DA2E7]' : 'bg-[#D1D5DB]'
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-[14px] h-[14px] rounded-full bg-white transition-transform"
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
      className={`w-4 h-4 text-[#6B7280] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
