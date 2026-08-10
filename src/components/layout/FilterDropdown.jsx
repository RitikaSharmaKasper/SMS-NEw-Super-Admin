import { useState, useRef, useEffect } from 'react';

/**
 * FilterDropdown - Reusable custom dropdown matching Figma design
 *
 * Props:
 *   value       {string}   - currently selected option
 *   onChange    {fn}       - called with new value string
 *   options     {string[]} - list of option strings
 *   className   {string}   - extra classes on the trigger button (optional)
 *
 * Usage:
 *   <FilterDropdown value={status} onChange={setStatus} options={['All Status','Active','Suspended']} />
 */
export default function FilterDropdown({ value, onChange, options = [], className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
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
        className="fd-trigger"
      >
        <span className="truncate">{value}</span>
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="fd-panel">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => select(opt)}
                className={`fd-option ${isSelected ? 'fd-option-selected' : ''}`}
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
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 flex-shrink-0 text-blue-600">
      <path d="M3 8l3.5 3.5L13 4" />
    </svg>
  );
}
