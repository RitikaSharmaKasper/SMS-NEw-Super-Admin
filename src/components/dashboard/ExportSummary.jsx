import React, { useState } from 'react';
import { MdDownload, MdTableChart, MdPictureAsPdf, MdGridOn } from 'react-icons/md';

const formats = [
  { id: 'csv',  label: 'Open',   value:'2'  ,color:'#0DA2E7'  },
  { id: 'pdf',  label: 'In Progress',   value:'1', color:'#F59F0A' },
  { id: 'xlsx', label: 'Resolved', value: '3', color:'#21C45D' },
  { id: 'xlsx', label: 'Closed', value: '4', color:'#6B7280' },
];


export default function ExportSummary() {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [selectedFilter, setSelectedFilter] = useState('All Schools');

  return (
    <div className="card h-[280px] flex flex-col">
      <div className="mb-7">
        <h2 className="section-title mt-1">Support TicketSummary</h2>

      </div>

    

      {/* Format Selection */}
      <div className="mb-2">

        <div className="grid grid-cols-2 gap-4">
          {formats.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
           className={`flex flex-col items-start gap-1.5 px-3 py-3 rounded-[12px] transition-all
                ${selectedFormat === fmt.id
                  ? 'bg-[#F3F4F6] '
                  : 'bg-[#F3F4F6]'
                }`}
            >
                          <div className="flex items-center gap-2">
                <span style={{ color: fmt.color }}>{fmt.icon}</span>
                <span className="text-[22px] font-semibold mt" style={{ color: fmt.color }}>
                  {fmt.value}
                </span>
              </div>

              <span className="text-[14px]  font-[400] font-normal text-[#6B7280] -mt-[4px] ml-2 ">{fmt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Export Button */}
   
    </div>
  );
}
