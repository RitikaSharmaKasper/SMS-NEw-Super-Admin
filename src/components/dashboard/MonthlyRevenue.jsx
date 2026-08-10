import React from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 32000, target: 28000 },
  { month: 'Feb', revenue: 34000, target: 29000 },
  { month: 'Mar', revenue: 39000, target: 36000 },
  { month: 'Apr', revenue: 42000, target: 40000 },
  { month: 'May', revenue: 45000, target: 42000 },
  { month: 'Jun', revenue: 50000, target: 45000 },
  { month: 'Jul', revenue: 52000, target: 47000 },
  { month: 'Aug', revenue: 43000, target: 50000 },
  { month: 'Sep', revenue: 48000, target: 53000 },
  { month: 'Oct', revenue: 60000, target: 55000 },
  { month: 'Nov', revenue: 59000, target: 58000 },
  { month: 'Dec', revenue: 69000, target: 60000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-100 text-xs">
        <p className="font-semibold text-[16px] text-[#0F1729] mb-1">{label}</p>
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
          <h2 className="section-title">Monthly Revenue Growth</h2>
          {/* <p className="section-sub mt-0.5">Jan — Dec 2024</p> */}
        </div>
        <select className="text-[12px] font-[500]  border border-[#E5E7EB] rounded-[6px] px-5 py-2 text-[#6B7280] bg-white outline-none cursor-pointer">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0DA2E794" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0DA2E794" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#0DA2E794" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FFFFFF00" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0"  />
          <XAxis tick={{ fontSize: 12, fill: '#9C9C9C' }} dataKey="month"         tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }} 
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }} 
 />
          <YAxis tick={{ fontSize: 12, fill: '#9C9C9C' }} 
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}   tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22}} 
            tickFormatter={(v) => `₹${v / 1000}k`} /> 
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} /> */}
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0DA2E794" strokeWidth={2.5}
            fill="url(#revGrad)" dot={false} activeDot={{ r: 5 }} />
          {/* <Area type="monotone" dataKey="target" name="Target" stroke="#0DA2E794" strokeWidth={1.5}
            fill="url(#tgtGrad)" dot={false} activeDot={{ r: 3 }} strokeDasharray="5 5" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
