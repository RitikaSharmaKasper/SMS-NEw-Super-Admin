import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 32000, target: 28000 },
  { month: 'Feb', revenue: 38000, target: 32000 },
  { month: 'Mar', revenue: 35000, target: 36000 },
  { month: 'Apr', revenue: 44000, target: 40000 },
  { month: 'May', revenue: 42000, target: 42000 },
  { month: 'Jun', revenue: 50000, target: 45000 },
  { month: 'Jul', revenue: 48000, target: 47000 },
  { month: 'Aug', revenue: 56000, target: 50000 },
  { month: 'Sep', revenue: 52000, target: 53000 },
  { month: 'Oct', revenue: 61000, target: 55000 },
  { month: 'Nov', revenue: 58000, target: 58000 },
  { month: 'Dec', revenue: 65000, target: 60000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-100 text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyRevenue() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Monthly Revenue</h2>
          <p className="section-sub mt-0.5">Jan — Dec 2024</p>
        </div>
        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white outline-none cursor-pointer">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#a5b4fc" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a5b4fc" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5}
            fill="url(#revGrad)" dot={false} activeDot={{ r: 4 }} />
          <Area type="monotone" dataKey="target" name="Target" stroke="#a5b4fc" strokeWidth={1.5}
            fill="url(#tgtGrad)" dot={false} activeDot={{ r: 3 }} strokeDasharray="4 2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
