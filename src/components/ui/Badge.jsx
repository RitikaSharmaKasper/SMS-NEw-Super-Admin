import React from 'react';

const variantMap = {
  active:   'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  pending:  'bg-yellow-100 text-yellow-700',
  trial:    'bg-blue-100 text-blue-700',
};

export default function Badge({ children, variant = 'active' }) {
  const cls = variantMap[variant?.toLowerCase()] || variantMap.active;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cls}`}>
      {children}
    </span>
  );
}
