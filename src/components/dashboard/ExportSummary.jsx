import React, { useState } from 'react';
import { MdDownload, MdTableChart, MdPictureAsPdf, MdGridOn } from 'react-icons/md';

const formats = [
  { id: 'csv',  label: 'CSV',   icon: <MdTableChart size={18} />,    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 'pdf',  label: 'PDF',   icon: <MdPictureAsPdf size={18} />,  color: 'text-red-500',     bg: 'bg-red-50',     border: 'border-red-200'     },
  { id: 'xlsx', label: 'Excel', icon: <MdGridOn size={18} />,        color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-200'     },
];

const filters = ['All Schools', 'Active Only', 'Expiring Soon', 'Inactive'];

export default function ExportSummary() {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedFilter, setSelectedFilter] = useState('All Schools');

  return (
    <div className="card h-full flex flex-col">
      <div className="mb-4">
        <h2 className="section-title">Export School Summary</h2>
        <p className="section-sub mt-0.5">Download school data report</p>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 font-medium mb-2">Filter by</p>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all
                ${selectedFilter === f
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Format Selection */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 font-medium mb-2">Export format</p>
        <div className="grid grid-cols-3 gap-2">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all
                ${selectedFormat === fmt.id
                  ? `${fmt.bg} ${fmt.border} ${fmt.color}`
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
            >
              {fmt.icon}
              <span className="text-[11px] font-semibold">{fmt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Export Button */}
      <button className="btn-primary flex items-center justify-center gap-2 w-full mt-auto">
        <MdDownload size={16} />
        Export {formats.find(f => f.id === selectedFormat)?.label} Report
      </button>
    </div>
  );
}
