import { useState } from "react";
import { X } from "lucide-react";
import aboutusicon from "../../assets/images/Aboutusicon.svg";

const inputClass =
  "w-full px-3.5 py-2.5 text-[16px] border border-[#E6E6E6] rounded-[12px] font-segoe outline-none bg-[#FFFFFF] text-[#696969] placeholder-[#696969] transition-colors";
const labelClass = "block text-[14px] font-[600] text-[#1C1C1C] mb-1 font-segoe font-semibold";
const sectionTitleClass = "text-[16px] font-[600] font-semibold text-[#0F1729] font-sans";

let statIdCounter = 1;
const newStat = () => ({
  id: `stat_${statIdCounter++}`,
  value: "",
  label: "",
});

export default function StatsSection({ stats, setStats, isOpen, onToggle, isActive, onToggleActive }) {
  const updateStat = (id, key, value) => {
    setStats(stats.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  const addStat = () => setStats([...stats, newStat()]);

  const removeStat = (id) => setStats(stats.filter((s) => s.id !== id));

  return (
    <div className="w-full rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden">
      <div
        onClick={onToggle}
        className="flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50/50 cursor-pointer select-none transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-[#0DA2E7] flex-shrink-0 bg-[#E6EEFC] rounded-[12px] p-2"><img src={aboutusicon} alt="" className="w-4 h-4" /></span>
          <h2 className={sectionTitleClass}>Stats</h2>
          <ToggleSwitch checked={isActive} onChange={onToggleActive} />
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 flex flex-col gap-4 border-t border-[#F2F3F5] bg-[#FFFFFF]">
          <div className="flex flex-col gap-4">
            {stats.map((s) => (
              <div key={s.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-end">
                <div>
                  <label className={labelClass}>Value</label>
                  <input
                    type="text"
                    placeholder="e.g., 1,000+"
                    className={inputClass}
                    value={s.value}
                    onChange={(e) => updateStat(s.id, "value", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Label</label>
                  <input
                    type="text"
                    placeholder="e.g., Schools Trust Us"
                    className={inputClass}
                    value={s.label}
                    onChange={(e) => updateStat(s.id, "label", e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(s.id)}
                  className="flex-shrink-0 w-12 h-[43px] flex items-center justify-center rounded-[10px] bg-[#EF4444]  text-white border-none cursor-pointer transition-colors"
                  title="Remove stat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addStat}
            className="text-[14px] font-[600] text-[#0DA2E7] font-sans border border-[#0DA2E7] rounded-[8px] px-3 py-1.5 bg-transparent cursor-pointer w-fit"
          >
            Add Stat
          </button>
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