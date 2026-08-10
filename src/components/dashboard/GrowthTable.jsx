import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const rows = [
  { school: 'Springfield Academy',  time: '9:00 AM',  course: 'Mathematics', status: 'Active'   },
  { school: 'Sundale High School',  time: '10:30 AM', course: 'Science',     status: 'Active'   },
  { school: 'Riverside Institute',  time: '11:00 AM', course: 'English',     status: 'Inactive' },
  { school: 'Lakeside Primary',     time: '1:00 PM',  course: 'History',     status: 'Pending'  },
  { school: 'Crestwood School',     time: '2:30 PM',  course: 'Geography',   status: 'Active'   },
  { school: 'Maplewood Academy',    time: '3:00 PM',  course: 'Physics',     status: 'Trial'    },
  { school: 'Brookfield College',   time: '4:15 PM',  course: 'Chemistry',   status: 'Active'   },
  { school: 'Pinecrest Institution',time: '5:00 PM',  course: 'Biology',     status: 'Inactive' },
];

const statusClass = {
  Active:   'badge badge-active',
  Inactive: 'badge badge-inactive',
  Pending:  'badge badge-pending',
  Trial:    'badge badge-trial',
};

export default function GrowthTable() {
  const [search, setSearch] = useState('');
  const filtered = rows.filter(r =>
    r.school.toLowerCase().includes(search.toLowerCase()) ||
    r.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="section-title">Student Growth Across Platform</h2>
          <p className="section-sub mt-0.5">School-level enrollment activity</p>
        </div>
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
          <MdSearch className="text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search school..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs text-gray-700 bg-transparent outline-none w-32 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-1.5 sm:mx-0 flex-1">
        <table className="w-full min-w-[480px] text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2.5 px-3 text-gray-500 font-semibold">School Name</th>
              <th className="text-left py-2.5 px-3 text-gray-500 font-semibold">Time</th>
              <th className="text-left py-2.5 px-3 text-gray-500 font-semibold">Course</th>
              <th className="text-left py-2.5 px-3 text-gray-500 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-indigo-50/40 table-row-hover"
              >
                <td className="py-2.5 px-3 font-medium text-gray-800">{row.school}</td>
                <td className="py-2.5 px-3 text-gray-500">{row.time}</td>
                <td className="py-2.5 px-3 text-gray-600">{row.course}</td>
                <td className="py-2.5 px-3">
                  <span className={statusClass[row.status] || 'badge'}>{row.status}</span>
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
  );
}
