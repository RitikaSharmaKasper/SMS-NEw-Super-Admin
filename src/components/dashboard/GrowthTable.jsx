import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const rows = [
  { school: 'Springfield Academy',   plan:"Premium",  students: '1250', status: 'Active'   },
  { school: 'Sundale High School',   plan:"Basic",  students: '1800', status: 'Active'   },
  { school: 'Riverside Institute',   plan:"Standard",  students: '1600', status: 'Suspended' },
  { school: 'Lakeside Primary',      plan:"Basic",  students: '1400', status: 'Suspended'  },
  { school: 'Crestwood School',      plan:"Premium",  students: '1500', status: 'Active'   },
  { school: 'Maplewood Academy',     plan:"Standard",  students: '1900', status: 'Trial'    },
  { school: 'Brookfield College',    plan:"Basic",  students: '1700',   status: 'Active'   },
  { school: 'Pinecrest Institution', plan:"Standard",  students: '1500',     status: 'Suspended' },
];

function statusBadgeClass(s) {
  const map = {
    Active:   'bg-[#E8F9EE] text-[#21C45D]',
    Suspended: 'bg-[#FDF5E6] text-[#F69F11]',

    Trial:    'bg-[#E6F5FC] text-[#59A2E7]',
  };
  return map[s] || 'bg-gray-100 text-gray-500';
}

export default function GrowthTable() {
  const [search, setSearch] = useState('');
  const filtered = rows.filter(r =>
    r.school.toLowerCase().includes(search.toLowerCase()) ||
    r.course.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Slice the data to only take the first 5 items
  const visibleRows = rows.slice(0, 5);
  return (
    
    <div className="card h-[410px] flex flex-col ">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="section-title">Student Growth Across Platform</h2>
    
        </div>
        {/* Search */}
       
      </div>

    {/* Border and rounded corners moved to this wrapper div */}
 <div className="overflow-x-auto -mx-1.5 sm:mx-0 flex-1 border border-[#E5E7EB] rounded-xl bg-white">
         <div className="max-h-[300px] overflow-y-auto">
  {/* The table acts purely as a container for rows now */}
  <table className="w-full min-w-[480px] text-[14px] border-collapse">
    <thead>
      <tr className="border-b border-[#E5E7EB] bg-[#F9F9FA] sticky top-0 z-10">
        <th className="text-left py-3 px-3 text-[#6B7280] text-[14px]  font-[600] font-semibold">School Name</th>
        <th className="text-left py-3 pl-18 text-[#6B7280] text-[14px] font-[600] font-semibold">Plan</th>
        <th className="text-left py-3 pl-9 pr-2 text-[#6B7280] text-[14px] font-[600] font-semibold">Students</th>
        <th className="text-left py-3 pl-10  pr-2 text-[#6B7280] text-[14px] font-[600] font-semibold">Status</th>
      </tr>
    </thead>
    <tbody>
      {filtered.map((row, i) => (
        <tr key={i} className="border-b border-[#F2F3F5]  table-row-hover">
          <td className="py-3 px-3 font-[600] text-[14px] text-[#0F1729]">{row.school}</td>
          <td className="py-3 pl-15">
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-semibold font-[600] whitespace-nowrap ${statusBadgeClass(row.plan)}`}>
              {row.plan}
            </span>
          </td>
          <td className="py-3  pl-12 pr-2 text-[14px] font-[400] font-normal">{row.students}</td>
          <td className="py-3 pl-9  pr-2">
            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-semibold font-[600] whitespace-nowrap ${statusBadgeClass(row.status)}`}>
              {row.status}
            </span>
          </td>
        </tr>
      ))}
      {filtered.length === 0 && (
        <tr><td colSpan={4} className="py-6 text-center text-gray-400">No results found</td></tr>
      )}
    </tbody>
  </table>
  </div>
</div>
    </div>
  );
}
