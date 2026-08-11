import React from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

// Updated data with higher values like your screenshot
const data = [
  { name: 'Basic',      value: 85, color: '#0DA2E7' }, // Cyan
  { name: 'Standard',   value: 98, color: '#7C3BED' }, // Purple
  { name: 'Premium',    value: 65, color: '#21C45D' }, // Green
];

// Custom label to show "Name: Value" outside the chart
const renderCustomLabel = (entry) => {
  return `${entry.name}: ${entry.value}`;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-xs">
        <p className="font-semibold" style={{ color: payload[0].payload.color }}>{payload[0].name}</p>
        <p className="text-gray-600 mt-0.5">{payload[0].value} schools</p>
      </div>
    );
  }
  return null;
};

// Fixed Legend renderer (Recharts passes 'payload' automatically)
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center gap-6 mt-1 text-[15px] font-medium">
      {payload.map((entry, i) => (
        <li key={i} className="flex items-center gap-2">
          {/* Colored Square */}
          <span className="w-3 h-3 flex-shrink-0" style={{ background: entry.color }} />
          
          {/* CHANGED: Using entry.name instead of entry.value */}
     <span style={{ color: entry.color }}>{entry.payload.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default function SubscriptionPlan() {
  return (
    <div className="card h-full flex flex-col">
      <div className="mb-3">
        <h2 className="section-title">Subscription Plan Distribution</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
     <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={75}
      outerRadius={95}
      paddingAngle={3}
      dataKey="value"
      label={renderCustomLabel}
      labelLine={{ stroke: '#b0b0b0', strokeWidth: 1 }}
    >
      {data.map((entry, i) => (
        <Cell key={i} fill={entry.color} stroke="none" />
      ))}
    </Pie>
    <Tooltip content={<CustomTooltip />} />
    <Legend content={renderLegend} />
  </PieChart>
</ResponsiveContainer>
        {/* 👇 FIXED: REMOVED 'payload' prop completely. Let Recharts handle it automatically */}
        <div className="w-full px-2">
          <Legend content={renderLegend} />
        </div>
      </div>
    </div>
  );
}