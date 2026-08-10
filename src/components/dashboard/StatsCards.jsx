import React from 'react';
import { MdSchool, MdPeople, MdMonetizationOn, MdConfirmationNumber, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md';
import { dashboardStats, recentActivity, schools, supportTickets } from "../../data/dummyData";
  const stats = [
    { label: 'Total Schools', value: dashboardStats.totalSchools, sub: `+${dashboardStats.schoolGrowth} this month`, color: 'bg-blue-50', icon: <MdSchool className="w-5 h-5" />, iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Active Schools', value: dashboardStats.activeSchools, sub: 'Currently active', color: 'bg-teal-50', icon: <MdCheckCircle className="w-5 h-5" />, iconBg: 'bg-teal-100 text-teal-600' },
    { label: 'Trial Schools', value: dashboardStats.trialSchools, sub: 'Awaiting review', color: 'bg-yellow-50', icon: <MdHourglassEmpty className="w-5 h-5" />, iconBg: 'bg-yellow-100 text-yellow-600' },
  
    { label: 'Total Students', value: dashboardStats.totalStudents.toLocaleString(), sub: `+${dashboardStats.studentGrowth} this month`, color: 'bg-green-50', icon: <MdPeople className="w-5 h-5" />, iconBg: 'bg-green-100 text-green-600' },
       { label: 'Total Teachers  ', value: dashboardStats.totalTeachers.toLocaleString(), sub: `+${dashboardStats.teacherGrowth} this month`, color: 'bg-green-50', icon: <MdPeople className="w-5 h-5" />, iconBg: 'bg-green-100 text-green-600' },
    { label: 'Monthly Revenue', value: `$${dashboardStats.totalRevenue.toLocaleString()}`, sub: `${dashboardStats.revenueGrowth} from last month`, color: 'bg-purple-50', icon: <MdMonetizationOn className="w-5 h-5" />, iconBg: 'bg-purple-100 text-purple-600' },
  
    { label: 'Active Subscriptions', value: dashboardStats.activeSubscriptions, sub: 'Currently active', color: 'bg-teal-50', icon: <MdCheckCircle className="w-5 h-5" />, iconBg: 'bg-teal-100 text-teal-600' },
    { label: 'Expiry Plans', value: dashboardStats.expiringPlans, sub: 'Awaiting review', color: 'bg-yellow-50', icon: <MdHourglassEmpty className="w-5 h-5" />, iconBg: 'bg-yellow-100 text-yellow-600' },
  ];
export default function StatsCards() {
  return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-lg p-4 sm:p-5 flex flex-col gap-2 shadow-sm ${s.color} border-0`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 leading-none mt-1">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.sub}</p>
              </div>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconBg}`}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

  );
}
