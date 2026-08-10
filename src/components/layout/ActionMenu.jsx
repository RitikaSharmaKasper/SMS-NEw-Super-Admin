import { useState, useRef, useEffect } from 'react';

/**
 * ActionMenu - Reusable "..." action dropdown
 *
 * Props:
 *   actions  {Array}  - array of { label, icon?, onClick, danger? }
 *   align    {string} - 'left' | 'right' (default 'right')
 */
export default function ActionMenu({ actions = [], align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (!actions.length) return null;

  return (
    <div ref={ref} className="relative inline-flex">
      {/* Dots trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Actions"
        className="inline-flex items-center justify-center w-8 h-8  bg-white cursor-pointer text-[#0F1729] transition-colors"
      >
        <DotsIcon />
      </button>

      {/* Menu panel */}
      {open && (
        <div
          className={`absolute top-[calc(100%+2px)] z-50 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.06)] p-1 animate-[fd-fade_0.1s_ease] ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { action.onClick?.(); setOpen(false); }}
              className={`flex items-center gap-2.5 w-full px-2 py-1.5 text-sm rounded-md border-none cursor-pointer text-left whitespace-nowrap transition-colors ${
                action.danger
                  ? 'text-red-600 bg-transparent hover:bg-red-50'
                  : 'text-gray-700 bg-transparent hover:bg-gray-100'
              }`}
            >
              {action.icon && (
                <span className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  {action.icon}
                </span>
              )}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
    </svg>
  );
}
