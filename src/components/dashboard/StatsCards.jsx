import React from 'react';
import { MdSchool, MdPeople, MdMonetizationOn, MdConfirmationNumber, MdCheckCircle, MdHourglassEmpty } from 'react-icons/md';
import { dashboardStats, recentActivity, schools, supportTickets } from "../../data/dummyData";
import totalschools from "../../assets/images/totalSchools.svg";
import activeSchools from "../../assets/images/ActiveSchools.svg";
import trialSchools from "../../assets/images/trialSchools.svg";
import totalStudents from  "../../assets/images/totalStudents.svg";
import expiryPlans  from "../../assets/images/expiryPlans.svg";
import monthlyRevenue from "../../assets/images/monthlyRevenue.svg";
import activeSubscriptions from "../../assets/images/activeSubscriptions.svg";
import totalTeachers from "../../assets/images/totalTeachers.svg";

  const stats = [
    { label: 'Total Schools', value: dashboardStats.totalSchools, sub: `+${dashboardStats.schoolGrowth} this month`,     icon: totalschools, // This will now use your new image
  iconBg: "bg-[#E6F5FC]" ,   subColor: 'text-[#009638]',},
  { label: 'Active Schools', value: dashboardStats.activeSchools, sub: `${dashboardStats.activeSchoolsGrowth} of total`,   icon: activeSchools, // This will now use your new image
    iconBg: "bg-[#E6F5FC]",    subColor: 'text-[#009638]',},
    { label: 'Trial Schools', value: dashboardStats.trialSchools, sub: `${dashboardStats.trialSchoolsGrowth} conversion state`,    icon: trialSchools, // This will now use your new image
    iconBg: "bg-[#FDF5E6]",   subColor: 'text-[#009638]', },
  
    { label: 'Total Students', value: dashboardStats.totalStudents.toLocaleString(), sub: `+${dashboardStats.studentGrowth} this month`,  icon: totalStudents, // This will now use your new image
    iconBg: "bg-[#F1EBFD]",  subColor: 'text-[#009638]', },
       { label: 'Total Teachers  ', value: dashboardStats.totalTeachers.toLocaleString(), sub: `+${dashboardStats.teacherGrowth} this month`,    icon: totalTeachers, // This will now use your new image
    iconBg: "bg-[#E6F5FC]",  subColor: 'text-[#009638]', },
    { label: 'Monthly Revenue', value: `$${dashboardStats.totalRevenue.toLocaleString()}`, sub: `${dashboardStats.revenueGrowth} vs last month`,  icon: monthlyRevenue, iconBg: "bg-[#E8F9EE]", subColor: 'text-green-600', },
  
    { label: 'Active Subscriptions', value: dashboardStats.activeSubscriptions, sub: `${dashboardStats.activeSubscriptionsGrowth} renewal state`,    icon: activeSubscriptions, // This will now use your new image
    iconBg: "bg-[#E6F5FC]",   subColor: 'text-[#009638]',},
    { label: 'Expiry Plans', value: dashboardStats.expiringPlans, sub: 'Next 30 days',   icon: expiryPlans, // This will now use your new image
    iconBg: "bg-[#FDECEC]",  subColor: 'text-[#009638]',},
  ];
export default function StatsCards() {

 const getSubColor = (sub) => {
    if (sub.includes('this month') && !sub.includes('-')) {
      return 'text-[#009638]'; // Green for positive growth
    }
    if (sub.includes('vs last month') && sub.includes('+')) {
      return 'text-[#009638]';
    }
     if (sub.includes('renewal state') && sub.includes('')) {
      return 'text-[#009638]';
    }
    if (sub.includes('Awaiting review') || sub.includes('Currently active')) {
      return 'text-[#009638]'; // Default gray for status messages
    }
     if (sub.includes('Next 30 days') || sub.includes('Next 30 days')) {
      return 'text-[#DC2626]'; // Default gray for status messages
    }
    return 'text-[#696969]';
  };



  return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 ">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-[16px] py-5   sm:p-3  flex flex-col gap-5  bg-[#FFFFFF]   border border-[#E5E7EB]`}>
            <div className="flex items-start justify-between gap-2 px-2">
              <div className="flex-1 min-w-0">
                <p className="text-[18px] text-[400]">{s.label}</p>
                <p className="text-[24px]  font-bold text-[700] text-[#000000] leading-none mt-2">{s.value}</p>
               
              <p className={`text-[14px] mt-1 ${getSubColor(s.sub)}`}>{s.sub}</p>

              </div>
             <div
            className={`w-13 h-13 rounded-[12px] mt-[12px] flex items-center justify-center flex-shrink-0 ${s.iconBg}`}
          >
            <img
              src={s.icon}
              alt={s.label}
              className="w-7 h-7 object-contain"
            />
          </div>
            </div>
          </div>
        ))}
      </div>

  );
}
