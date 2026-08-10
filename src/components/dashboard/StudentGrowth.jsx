import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

const data = [
  { month: 'Jan', students: 4200 },
  { month: 'Feb', students: 4600 },
  { month: 'Mar', students: 4900 },
  { month: 'Apr', students: 6000 },
  { month: 'May', students: 7500 },
  { month: 'Jun', students: 8800 },
  { month: 'Jul', students: 10000 },
  { month: 'Aug', students: 8000 },
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
        <p className="text-[#21C45D94] font-[600]  mt-0.5">{payload[0].value.toLocaleString()} students</p>
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
    
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="text-[11px] text-gray-500">Year:</span> */}
          <select className="text-[12px] border border-gray-200 rounded-[6px] px-5 py-2 text-[#6B7280] bg-white outline-none cursor-pointer">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="stuGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#21C45D94" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#21C45D94" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
          <XAxis tick={{ fontSize: 12, fill: '#9C9C9C' }} dataKey="month"         tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }} 
                     axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }} 
          />
                   <YAxis tick={{ fontSize: 12, fill: '#9C9C9C' }} 
                     axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}   tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22}} 
                   
            tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="students" stroke="#21C45D94" strokeWidth={2.5}
            fill="url(#stuGrad)" dot={false} activeDot={{ r: 4, fill: '#21C45D94' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
