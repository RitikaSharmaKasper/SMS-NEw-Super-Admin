import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdNotificationsNone, MdSearch } from 'react-icons/md';

const ROUTE_TITLES = {
  '/':                      { title: 'Dashboard',             sub: "Welcome back, Super Admin. Here's your platform overview." },
  '/schools':               { title: 'Schools',               sub: 'Manage all registered schools on the platform.' },
  '/registration-requests': { title: 'Registration Requests', sub: 'Review and approve new school registrations.' },
  '/plans':                 { title: 'Plans',                 sub: 'Manage subscription plans available to schools.' },
  '/subscriptions':         { title: 'Subscriptions',         sub: 'Monitor all school subscription statuses.' },
  '/payments':              { title: 'Payments',              sub: 'Track all payment transactions across schools.' },
  '/modules':               { title: 'Modules',               sub: 'Enable or disable platform modules globally.' },
  '/users':                 { title: 'Users',                 sub: 'Manage all platform users and their roles.' },
  '/notifications':         { title: 'Notifications',         sub: 'Send announcements and alerts to schools.' },
  '/support-tickets':       { title: 'Support Tickets',       sub: 'Manage all school support requests.' },
  '/reports':               { title: 'Reports & Analytics',   sub: 'Platform performance insights and data exports.' },
  '/audit-logs':            { title: 'Audit Logs',            sub: 'View all system activity and admin action logs.' },
  '/system-settings':       { title: 'System Settings',       sub: 'Configure global platform settings.' },
  '/profile':               { title: 'Profile',               sub: 'View and update your admin profile details.' },
};

export default function Header() {
  const { pathname } = useLocation();
  const { title, sub } = ROUTE_TITLES[pathname] ?? { title: 'Dashboard', sub: '' };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-[#FFFFFF] backdrop-blur-sm border-b border-[#E5E7EB] px-5 pt-2 pb-2 flex-shrink-0">
      
      {/* Left: page title */}
      <div className="pl-1 lg:pl-0 min-w-0">
        <div className="hidden md:flex items-center gap-2 bg-[#F6F7F9] rounded-[8px] px-2 py-1  w-40 lg:w-100">
          <MdSearch className="text-gray-400 flex-shrink-0" size={19} />
          <input
            type="text"
            placeholder="Search schools, tickets..."
            className="text-[16px] text-[#696969] outline-none bg-transparent w-full placeholder:text-[#696969]"
          />
        </div>
      </div>

      {/* Right: search + bell + avatar */}
      <div className="flex items-center gap-2.5 flex-shrink-0">

        {/* Search bar */}
      

        {/* Notification bell */}
        <button className="relative w-8 h-9 rounded-[18px] bg-[#F3F4F6]  flex items-center justify-center text-[#000000] transition-all">
          <MdNotificationsNone size={20} />
          <span className="absolute top-2 right-[3px] w-2 h-2 rounded-full bg-red-500 border-[1.5px] border-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-7.5 h-8 rounded-[18px] bg-[#0DA2E7] flex items-center justify-center text-[#FFFFFF] font-bold text-[14px] font-[600]  transition-shadow">
            SA
          </div>
          {/* <div className="hidden lg:block">
            <p className="text-[12px] font-semibold text-gray-800 leading-tight">Super Admin</p>
            <p className="text-[10px] text-gray-400 leading-tight">admin@mun-c.com</p>
          </div> */}
        </div>
      </div>
    </header>
  );
}
