import React from 'react';
import { MdCardMembership, MdSearch } from 'react-icons/md';

const SUBS = [
  { id: 1, school: 'Greenwood High',       plan: 'Pro',   started: '01 Jan 2024', expires: '31 Dec 2024', amount: '$299', status: 'Active'   },
  { id: 2, school: 'Sunrise Academy',      plan: 'Basic', started: '15 Mar 2024', expires: '14 Mar 2025', amount: '$99',  status: 'Active'   },
  { id: 3, school: 'Blue Bell Institute',  plan: 'Pro',   started: '01 Aug 2023', expires: '31 Jul 2024', amount: '$299', status: 'Expiring' },
  { id: 4, school: 'Delhi Public School',  plan: 'Pro',   started: '01 Nov 2023', expires: '31 Oct 2024', amount: '$299', status: 'Active'   },
  { id: 5, school: 'Horizon International',plan: 'Pro',   started: '10 Apr 2024', expires: '09 Apr 2025', amount: '$299', status: 'Active'   },
  { id: 6, school: 'Springfield School',   plan: 'Basic', started: '20 Feb 2024', expires: '19 Feb 2025', amount: '$99',  status: 'Inactive' },
];

function statusBadgeClass(s) {
  const map = {
    Active:   'bg-green-100 text-green-700',
    Expiring: 'bg-yellow-100 text-yellow-700',
    Inactive: 'bg-gray-100 text-gray-500',
  };
  return map[s] || 'bg-gray-100 text-gray-500';
}

export default function ActiveSubscription() {
  return (
    <div className="page-body">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="section-title text-xl">Active Subscriptions</h2>
          <p className="section-sub mt-0.5">Monitor all school subscription statuses</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Active',    value: '4',    color: 'text-green-700'  },
          { label: 'Expiring Soon',   value: '1',    color: 'text-yellow-700' },
          { label: 'Inactive',        value: '1',    color: 'text-red-700'    },
          { label: 'Monthly Revenue', value: '$997', color: 'text-indigo-700' },
        ].map(s => (
          <div key={s.label} className="card flex flex-col gap-1">
            <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            <span className="section-sub">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="card flex items-center gap-2 py-2.5">
        <MdSearch className="text-gray-400" size={16} />
        <input type="text" placeholder="Search subscriptions..." className="text-sm outline-none bg-transparent w-full placeholder:text-gray-400" />
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                {['School', 'Plan', 'Started', 'Expires', 'Amount', 'Status', 'Action'].map(h => (
                  <th key={h} className="table-th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBS.map(s => (
                <tr key={s.id} className="table-row-hover hover:bg-indigo-50/40">
                  <td className="table-td font-medium text-gray-800 flex items-center gap-2">
                    <MdCardMembership className="text-indigo-500" size={15} />
                    {s.school}
                  </td>
                  <td className="table-td">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-blue-100 text-blue-700">
                      {s.plan}
                    </span>
                  </td>
                  <td className="table-td">{s.started}</td>
                  <td className="table-td">{s.expires}</td>
                  <td className="table-td font-semibold text-gray-700">{s.amount}</td>
                  <td className="table-td">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusBadgeClass(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="table-td">
                    <button className="text-indigo-600 hover:underline text-xs font-semibold">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
