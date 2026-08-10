import React from 'react';
import StatsCards        from '../components/dashboard/StatsCards';
import StudentGrowth     from '../components/dashboard/StudentGrowth';
import MonthlyRevenue    from '../components/dashboard/MonthlyRevenue';
import SchoolEnrollment  from '../components/dashboard/SchoolEnrollment';
import SubscriptionPlan  from '../components/dashboard/SubscriptionPlan';
import GrowthTable       from '../components/dashboard/GrowthTable';
import ExpiryNews        from '../components/dashboard/ExpiryNews';
import ExportSummary     from '../components/dashboard/ExportSummary';
import CountryEnrollment from '../components/dashboard/CountryEnrollment';

export default function Dashboard() {
  return (
    <div className="page-body">
 <div className="space-y-3">
     <div className="page-header">
        <h1 className=" text-[30px] text-[700]  text-[#000000] font-bold">Dashboard</h1>
        <p className="text-[24px]  font-[400] text-[#6B7280]  -mt-[6px]  ">Welcome back, Super Admin. Here's what's happening.</p>
      </div>
   <StatsCards />

 </div>
      {/* Row 1 — KPI stat cards */}
   

      {/* Row 2 — Monthly Revenue chart (left 2/3) + School Growth Per Month (right 1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 min-h-0"><MonthlyRevenue /></div>
        <div className="min-h-0"><SchoolEnrollment /></div>
      </div>

      {/* Row 3 — Student Growth chart (left 2/3) + Subscription Plan donut (right 1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 min-h-0"><StudentGrowth /></div>
        <div className="min-h-0"><SubscriptionPlan /></div>
      </div>

      {/* Row 4 — Growth Table (left 2/3) + Expiry News (right 1/3) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 min-h-0"><GrowthTable /></div>
        <div className="min-h-0"><ExpiryNews /></div>
      </div>

      {/* Row 5 — Export Summary (left) + Country Enrollment (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ExportSummary />
        <CountryEnrollment />
      </div>

    </div>
  );
}
