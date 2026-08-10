import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';

const countries = [
  { name: 'India',          code: 'IN', flag: '🇮🇳', schools: 82,  total: 248, color: 'bg-indigo-500' },
  { name: 'United States',  code: 'US', flag: '🇺🇸', schools: 54,  total: 248, color: 'bg-blue-500'   },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', schools: 38,  total: 248, color: 'bg-purple-500' },
  { name: 'Canada',         code: 'CA', flag: '🇨🇦', schools: 28,  total: 248, color: 'bg-red-500'    },
  { name: 'Australia',      code: 'AU', flag: '🇦🇺', schools: 24,  total: 248, color: 'bg-emerald-500'},
  { name: 'Germany',        code: 'DE', flag: '🇩🇪', schools: 18,  total: 248, color: 'bg-yellow-500' },
  { name: 'Others',         code: '--', flag: '🌍',  schools: 4,   total: 248, color: 'bg-gray-400'   },
];

export default function CountryEnrollment() {
  const [showModal, setShowModal] = useState(false);
  const [newCountry, setNewCountry] = useState('');

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Country Enrollment</h2>
          <p className="section-sub mt-0.5">Schools by country</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-1 !px-2.5 !py-1.5 text-[11px]"
        >
          <MdAdd size={14} /> Add New
        </button>
      </div>

      {/* Country List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 scrollbar-thin">
        {countries.map((c) => {
          const pct = Math.round((c.schools / c.total) * 100);
          return (
            <div key={c.code} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="text-xs font-medium text-gray-700">{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">{c.schools}</span>
                  <span className="text-[10px] text-gray-400">/ {c.total}</span>
                </div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${c.color} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Add New Country</h3>
            <p className="text-xs text-gray-500 mb-4">Enter the country to add to enrollment</p>
            <input
              type="text"
              placeholder="Country name..."
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 transition mb-4"
            />
            <div className="flex gap-2">
              <button className="btn-outline flex-1" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary flex-1" onClick={() => setShowModal(false)}>Add Country</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
