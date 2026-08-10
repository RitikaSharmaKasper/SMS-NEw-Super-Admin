import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell
} from 'recharts';

const data = [
  { month: 'Jan', enrolled: 120 },
  { month: 'Feb', enrolled: 180 },
  { month: 'Mar', enrolled: 150 },
  { month: 'Apr', enrolled: 210 },
  { month: 'May', enrolled: 190 },
  { month: 'Jun', enrolled: 260 },
  { month: 'Jul', enrolled: 240 },
  { month: 'Aug', enrolled: 300 },
  { month: 'Sep', enrolled: 275 },
  { month: 'Oct', enrolled: 320 },
  { month: 'Nov', enrolled: 290 },
  { month: 'Dec', enrolled: 350 },
];

const COLORS = data.map((_, i) =>
  i === data.length - 1 ? '#4f46e5' : '#818cf8'
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-xs">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-indigo-600 font-medium mt-0.5">{payload[0].value} schools</p>
      </div>
    );
  }
  return null;
};

export default function SchoolEnrollment() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">School Enrollment</h2>
          <p className="section-sub mt-0.5">Monthly new enrollments</p>
        </div>
        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none cursor-pointer">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={14}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
          <Bar dataKey="enrolled" name="Enrolled" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
