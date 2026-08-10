import React from 'react';

const variantMap = {
  active:   'badge-active',
  inactive: 'badge-inactive',
  pending:  'badge-pending',
  trial:    'badge-trial',
};

export default function Badge({ children, variant = 'active' }) {
  return (
    <span className={`badge ${variantMap[variant?.toLowerCase()] || 'badge-active'}`}>
      {children}
    </span>
  );
}
