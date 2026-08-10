import React from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

const data = [
  { name: 'Basic',      value: 35, color: '#6366f1' },
  { name: 'Standard',   value: 28, color: '#8b5cf6' },
  { name: 'Premium',    value: 22, color: '#a78bfa' },
  { name: 'Enterprise', value: 15, color: '#c4b5fd' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-xs">
        <p className="font-semibold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
        <p className="text-gray-600 mt-0.5">{payload[0].value}% of schools</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="space-y-1.5 mt-2">
      {payload.map((entry, i) => (
        <li key={i} className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
            <span className="text-gray-600">{entry.value}</span>
          </span>
          <span className="font-semibold text-gray-800">{data[i].value}%</span>
        </li>
      ))}
    </ul>
  );
};

export default function SubscriptionPlan() {
  return (
    <div className="card h-full flex flex-col">
      <div className="mb-3">
        <h2 className="section-title">Subscription Plan</h2>
        <p className="section-sub mt-0.5">Plan distribution</p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre label overlay trick via legend */}
        <div className="w-full px-2">
          <Legend content={renderLegend} payload={data.map(d => ({ value: d.name, color: d.color }))} />
        </div>
      </div>
    </div>
  );
}
