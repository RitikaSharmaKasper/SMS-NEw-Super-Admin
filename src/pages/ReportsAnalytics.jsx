import React, { useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { schools, monthlyRevenueData } from '../data/dummyData';

// ============================================================
// Dummy data
// ============================================================

// Same monthlyRevenueData used by Dashboard's MonthlyRevenue.jsx — no changes made to it

// No dedicated "active users" field in dummyData yet — replace once tracked
const activeUsersData = [
  { month: 'Jan', users: 92 },
  { month: 'Feb', users: 158 },
  { month: 'Mar', users: 172 },
  { month: 'Apr', users: 188 },
  { month: 'May', users: 195 },
  { month: 'Jun', users: 178 },
  { month: 'Jul', users: 168 },
  { month: 'Aug', users: 172 },
  { month: 'Sep', users: 210 },
  { month: 'Oct', users: 248 },
  { month: 'Nov', users: 232 },
  { month: 'Dec', users: 214 },
];

const newSchoolsData = [
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
const monthlyRevenue = [
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

// ============================================================
// Helpers
// ============================================================

function planBadgeClass(p) {
  const map = {
    Premium:    'bg-[#EEEEEE] text-[#696969]',
    Enterprise: 'bg-[#EEEEEE] text-[#696969]',
    Basic:      'bg-[#EEEEEE] text-[#696969]',
  };
  return map[p] || 'bg-gray-100 text-gray-700';
}

function RevenueTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-100 text-xs">
        <p className="font-semibold text-[16px] text-[#0F1729] mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: ₹{p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function ActiveUsersTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-[14px]">
        <p className="font-semibold text-gray-600">{label}</p>
        <p className="text-[#21C45D] font-[500] mt-0.5">{payload[0].value}k active users</p>
      </div>
    );
  }
  return null;
}

function NewSchoolsTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-2.5 border border-gray-100 text-[14px]">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-indigo-600 font-medium mt-0.5">{payload[0].value} new schools</p>
      </div>
    );
  }
  return null;
}


function RevenueByMonth() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Monthly Revenue Growth</h2>
        </div>
        <select className="text-[12px] font-[500]  border border-[#E5E7EB] rounded-[6px] px-5 py-2 text-[#6B7280] bg-white outline-none cursor-pointer">
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyRevenue} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
          <Tooltip content={<RevenueTooltip />} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0DA2E794" strokeWidth={2.5}
            fill="url(#revGrad)" dot={false} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}





function ActiveUsersGrowth() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Active Users Growth</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activeUsersData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={22}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            tick={{ fontSize: 12, fill: '#9C9C9C' }}
            dataKey="month"
            tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }}
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9C9C9C' }}
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}
            tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }}
          />
          <Tooltip content={<ActiveUsersTooltip />} cursor={{ fill: 'rgba(33,196,93,0.06)' }} />
          <Bar dataKey="users" name="Active Users" radius={[4, 4, 0, 0]}>
            {activeUsersData.map((_, i) => (
              <Cell key={i} fill="#21C45D" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function TopSchoolsByStudents() {
  const topSchools = [...schools]
    .sort((a, b) => (b.students || 0) - (a.students || 0))
    .slice(0, 5);

  return (
    <div className="card h-[410px] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="section-title">Top School By Students Count</h2>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1.5 sm:mx-0 flex-1 border border-[#E5E7EB] rounded-xl bg-white">
        <div className="max-h-[300px] overflow-y-auto">
          <table className="w-full min-w-[420px] text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9F9FA] sticky top-0 z-10">
                <th className="text-left py-3 px-3 text-[#6B7280] text-[14px] font-[600] font-semibold w-10">#</th>
                <th className="text-left py-3 px-3 text-[#6B7280] text-[14px] font-[600] font-semibold">School Name</th>
                <th className="text-left py-3 px-3 text-[#6B7280] text-[14px] font-[600] font-semibold">Students</th>
                <th className="text-left py-3 px-3 text-[#6B7280] text-[14px] font-[600] font-semibold">Plan</th>
              </tr>
            </thead>
            <tbody>
              {topSchools.map((s, i) => (
                <tr key={s.id} className="border-b border-[#F2F3F5] table-row-hover">
                  <td className="py-3 px-3 text-[14px] font-[400] text-[#6B7280]">{i + 1}</td>
                  <td className="py-3 px-3 font-[600] text-[14px] text-[#0F1729]">{s.name}</td>
                  <td className="py-3 px-3 text-[14px] font-[400]">{s.students?.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-[13px] font-semibold font-[600] whitespace-nowrap ${planBadgeClass(s.plan)}`}>
                      {s.plan}
                    </span>
                  </td>
                </tr>
              ))}
              {topSchools.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-gray-400">No results found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NewSchoolsPerMonth() {
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">New Schools Per Month</h2>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={newSchoolsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={25}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            tick={{ fontSize: 12, fill: '#9C9C9C' }}
            dataKey="month"
            tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }}
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#9C9C9C' }}
            axisLine={{ stroke: '#9C9C9C', strokeWidth: 1 }}
            tickLine={{ stroke: '#9C9C9C', strokeWidth: 1, length: 22 }}
          />
          <Tooltip content={<NewSchoolsTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
          <Bar dataKey="enrolled" name="New Schools" radius={[4, 4, 0, 0]}>
            {newSchoolsData.map((_, i) => (
              <Cell key={i} fill="#7C3BED" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function ReportsAnalytics() {
  return (
    <div className="page-body">
      <div className="space-y-2">
        <div className="mb-2">
          <h1 className="text-[24px] text-[#000000] font-bold leading-snug">Reports & Analytics</h1>
          <p className="text-[16px] font-normal text-[#6B7280] -mt-[1px]">Platform-level insights and metrics</p>
        </div>
      </div>

      {/* Row 1 — Revenue By Month + Active Users Growth */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="min-h-0"><RevenueByMonth /></div>
        <div className="min-h-0"><ActiveUsersGrowth /></div>
      </div>

      {/* Row 2 — Top School By Students Count + New Schools Per Month */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="min-h-0"><TopSchoolsByStudents /></div>
        <div className="min-h-0"><NewSchoolsPerMonth /></div>
      </div>
    </div>
  );
}