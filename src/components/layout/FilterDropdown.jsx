import { useState, useRef, useEffect } from 'react';

/**
 * FilterDropdown - Reusable custom dropdown
 *
 * Props:
 *   value       {string}   - currently selected option
 *   onChange    {fn}       - called with new value string
 *   options     {string[]} - list of option strings
 *   className   {string}   - extra classes on the trigger button (optional)
 */
export default function FilterDropdown({ value, onChange, options = [], className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  function select(opt) {
    onChange(opt);
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 min-w-[9rem] bg-[#F3F4F6] border border-[#DDDDDD] rounded-[8px] text-[14px] text-[#696969] cursor-pointer whitespace-nowrap select-none transition-colors "
      >
        <span className="truncate">{value}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[6px]  p-1">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => select(opt)}
                className={`flex items-center gap-9 w-full px-3 py-1 text-[14px] font-[500]  rounded-[4px] border-none cursor-pointer text-left transition-colors ${
                  isSelected
                    ? 'bg-[#7C3BED] text-white hover:bg-[#7C3BED]'
                    : 'text-gray-700 bg-transparent hover:bg-[#F3F4F6]'
                }`}
              >
                <span className="truncate flex-1 text-left">{opt}</span>
                {isSelected && <CheckIcon />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-150 ${open ? '' : ''}`}
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0 text-white">
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
  );
}
