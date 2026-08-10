import { useState, useRef, useEffect } from 'react';

/**
 * ActionMenu - Reusable "..." action dropdown matching Figma design
 *
 * Props:
 *   actions  {Array}  - array of { label, icon?, onClick, danger? }
 *   align    {string} - 'left' | 'right' (default 'right')
 *
 * Usage:
 *   <ActionMenu actions={[
 *     { label: 'View',         icon: <EyeIcon />,    onClick: () => {} },
 *     { label: 'Upgrade Plan', icon: <UpgradeIcon />,onClick: () => {} },
 *     { label: 'Renew',        icon: <RenewIcon />,  onClick: () => {} },
 *     { label: 'Suspend',      icon: <SuspendIcon />,onClick: () => {} },
 *     { label: 'Delete',       icon: <TrashIcon />,  onClick: () => {}, danger: true },
 *   ]} />
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
        className="btn-icon"
        title="Actions"
      >
        <DotsIcon />
      </button>

      {/* Menu panel */}
      {open && (
        <div className={`am-panel ${align === 'left' ? 'left-0' : 'right-0'}`}>
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { action.onClick?.(); setOpen(false); }}
              className={`am-item ${action.danger ? 'am-item-danger' : ''}`}
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
