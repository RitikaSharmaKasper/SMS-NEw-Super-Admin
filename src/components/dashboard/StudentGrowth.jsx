import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

const data = [
  { month: 'Jan', students: 4200 },
  { month: 'Feb', students: 5800 },
  { month: 'Mar', students: 5200 },
  { month: 'Apr', students: 7100 },
  { month: 'May', students: 6500 },
  { month: 'Jun', students: 8900 },
  { month: 'Jul', students: 8300 },
  { month: 'Aug', students: 10200 },
  { month: 'Sep', students: 9600 },
  { month: 'Oct', students: 11400 },
  { month: 'Nov', students: 10800 },
  { month: 'Dec', students: 12600 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-xs">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-teal-600 font-medium mt-0.5">{payload[0].value.toLocaleString()} students</p>
      </div>
    );
  }
  return null;
};

export default function StudentGrowth() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Student Growth Across Platform</h2>
          <p className="section-sub mt-0.5">Total active students over time</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500">Year:</span>
          <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none cursor-pointer">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="stuGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#14b8a6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="students" stroke="#14b8a6" strokeWidth={2.5}
            fill="url(#stuGrad)" dot={false} activeDot={{ r: 4, fill: '#14b8a6' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
