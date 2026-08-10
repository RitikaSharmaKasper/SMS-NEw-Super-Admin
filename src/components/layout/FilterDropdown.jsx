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
        className="inline-flex items-center gap-1.5 px-3 py-2 min-w-[9rem] bg-[#F3F4F6] border border-[#DDDDDD] rounded-[8px] text-sm text-gray-700 cursor-pointer whitespace-nowrap select-none transition-colors "
      >
        <span className="truncate">{value}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-full bg-[#F3F4F6] border border-[#DDDDDD] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] p-1 animate-[fd-fade_0.1s_ease]">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => select(opt)}
                className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md border-none cursor-pointer text-left transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white hover:bg-blue-600'
                    : 'text-gray-700 bg-transparent hover:bg-gray-100'
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
      className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 flex-shrink-0 text-white">
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
  );
}
