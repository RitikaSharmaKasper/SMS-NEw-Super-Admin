import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


import auditlogs from "../../assets/images/auditlogs.svg";

import dashboard from "../../assets/images/Dashboard.svg";

import registrationrequest from "../../assets/images/registrationrequest.svg";
import { FaListAlt } from 'react-icons/fa';
import Plans from "../../assets/images/Plans.svg";
import Subscriptions from "../../assets/images/Subscriptions.svg";
import payments from "../../assets/images/payments.svg";
import  modules  from  "../../assets/images/modules.svg";
import users from "../../assets/images/users.svg";
import notification from "../../assets/images/notification.svg";
import profile from "../../assets/images/profile.svg";
import supporttickets from "../../assets/images/supporttickets.svg";
import reportsandanalytics from "../../assets/images/reportsandanalytics.svg";
import systemsettings from "../../assets/images/systemsettings.svg";
import school from "../../assets/images/schools.svg";
import munclogo  from "../../assets/images/munclogo.svg";
import order from "../../assets/images/Order.svg";
import coupon from "../../assets/images/coupon.svg";
import emaillogs from "../../assets/images/Email_Logs.svg";
import Export_Component from "../../assets/images/Export_Components.svg";
import trial from "../../assets/images/trials.svg";
import faq from "../../assets/images/FAQ.svg";
import testimonials from "../../assets/images/Testimonials.svg";
import blogs from "../../assets/images/Blogs.svg";
import aboutus from "../../assets/images/Aboutus.svg";


import { MdSupportAgent, MdBarChart, MdSettings, MdPerson, MdMenu, MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';
/* ─── Navigation structure matching Figma exactly ─── */
const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/', image: dashboard },
    ],
  },
  {
    label: 'School Management',
    items: [
      { label: 'Schools',               path: '/schools',               image:school},
      { label: 'Registration Requests', path: '/registration-requests', image:registrationrequest},
            { label: 'Demo Requests', path: '/demo-requests', image:registrationrequest},
    ],
  },
  {
    label: 'BILLING',
    items: [
      { label: 'Plans',         path: '/plans',         image: Plans      },
      { label: 'Subscriptions', path: '/subscriptions', image:Subscriptions },
       { label: 'Coupons',      path: '/coupons',      image: coupon      },
      { label: 'Payments',      path: '/payments',      image: payments      },
      { label: 'Orders',      path: '/orders',      image: order      },
          { label: 'Trials',      path: '/trials',      image: trial      },

    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Modules',       path: '/modules',      image: modules        },
      { label: 'Announcement',         path: '/announcement',         image: Export_Component          },
      // { label: 'Notifications', path: '/notifications', image: notification },
          
      { label: 'Users',         path: '/users',         image: users           },
      { label: 'Notifications', path: '/notifications', image: notification },
       { label: 'Email Logs',       path: '/emaillogs',      image: emaillogs        },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Support Tickets', path: '/support-tickets', image: supporttickets},
    ],
  },


    {
    label: 'Website',
    items: [
      { label: 'FAQ',         path: '/faq',         image: faq     },
      { label: 'Blogs', path: '/blogs', image: blogs },
       { label: 'Testimonials',      path: '/testimonials',      image: testimonials     },
      { label: 'About Us',      path: '/aboutus',      image: aboutus      },
  
    ],
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Reports & Analytics', path: '/reportsanalytics',    image: reportsandanalytics  },
      { label: 'Audit Logs',          path: '/audit-logs', image: auditlogs },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'System Settings', path: '/systemsettings', image:systemsettings },
      { label: 'Profile',         path: '/profile',          image: profile  },
    ],
  },
];

/* ─── Single nav item ─── */
function NavItem({ label, path, image, collapsed, onClick }) {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        [
            'flex items-center gap-3 rounded-[8px] text-[16px] font-semibold duration-150 select-none no-underline font-Public Sans',
          collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2.5 mx-2',
          isActive
            ? 'bg-[#0F2C46] text-[#0EA2E6] font-semibold font-[500] text-[16px] '
            : 'text-[#FFFFFF] hover:text-white hover:bg-white/8',
        ].join(' ')
      }
    >
         {/* render the SVG image as an icon */}
      <img src={image} alt="" width={16} height={16} className="flex-shrink-0 brightness-0 invert" />

      {!collapsed &&   <span className="leading-snug break-words">{label}</span>}
    </NavLink>
  );
}

/* ─── Nav list with section groups ─── */
function NavList({ collapsed, onItemClick }) {
  return (
    <nav className="flex-1 overflow-y-auto py-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
      {NAV_SECTIONS.map((section, si) => (
        <div key={section.label} className={si > 0 ? 'mt-1' : ''}>

          {/* Section label */}
          {!collapsed ? (
           <p className={`🔴 ${si === 0 ? 'pt-1' : 'pt-4'} 🔴 pb-1.5 px-5 text-[12px] font-[500] uppercase text-[#6B7280] select-none truncate leading-none whitespace-nowrap`}>
              {section.label}
            </p>
          ) : (
            si > 0 && <div className="mx-3 my-2 border-t border-white/10" />
          )}

          {/* Items */}
          <div className="flex flex-col gap-0.5">
            {section.items.map(item => (
              <NavItem
                key={item.path}
                {...item}
                collapsed={collapsed}
                onClick={onItemClick}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

/* ─── Logo ─── */
function Logo({ collapsed }) {
  return (
    <div className={`flex items-center border-b border-[#1C2740] flex-shrink-0 h-[60px] ${collapsed ? 'justify-center px-1' : 'gap-2.5 px-2'}`}>
      {/* Icon mark */}
    <img src={munclogo} alt="Logo" width={100} height={100} />
  
    </div>
  );
}

/* ─── User footer ─── */
function UserFooter({ collapsed }) {
  return (
    <div className={`flex items-center border-t border-white/10 flex-shrink-0 py-3 ${collapsed ? 'justify-center px-2' : 'gap-2 px-4'}`}>
      <div className="w-8 h-8 rounded-[18px] bg-[#0DA2E7] flex items-center justify-center text-[#FFFFFF] font-bold text-[14px] font-[600]  flex-shrink-0 shadow-md">
        SA
      </div>
      {!collapsed && (
        <div className="min-w-0 flex-1 w-full flex items-center justify-between ml-3">
          
          <div className="min-w-0">
            <p className="text-white text-[16px] font-[700] font-semibold truncate leading-tight">Super Admin</p>
            <p className="text-white/40 text-[12px] font-[400] truncate leading-tight mt-0.5">admin@mun-c.com</p>
          </div>

          {/* Add your icon here */}
          <button className="text-white/40 hover:text-white transition-colors flex-shrink-0 cursor-pointer">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>

        </div>
        
      )}




    </div>
  );
}

/* ─── Main Sidebar component ─── */
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarBase = 'flex flex-col bg-[#0F1729] ';
  const desktopWidth = collapsed ? 'w-[70px]' : 'w-[270px] xl:w-[270px]';

  return (
    <>
      {/* ── Mobile hamburger button ── */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-xl bg-[#0F1729] text-white flex items-center justify-center shadow-lg border border-white/10"
        onClick={() => setMobileOpen(v => !v)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <MdClose size={19} /> : <MdMenu size={19} />}
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile sidebar ── */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 h-full z-40 w-[235px]
          ${sidebarBase}
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Logo collapsed={false} />
        <NavList collapsed={false} onItemClick={() => setMobileOpen(false)} />
        <UserFooter collapsed={false} />
      </aside>

      {/* ── Desktop sidebar ── */}
      <aside
        className={`
          hidden lg:flex flex-col h-screen sticky top-0 flex-shrink-0
          ${sidebarBase} ${desktopWidth}
          transition-all duration-300 ease-in-out
        `}
      >
        <Logo collapsed={collapsed} />



{/* ── Collapse Toggle Button (absolutely positioned on the right edge) ── */}
<div className="relative z-10 flex-shrink-0">
  <button
    onClick={() => setCollapsed(v => !v)}
    className="absolute -right-3 top-2 w-8 h-8 rounded-full bg-[#0F2C46] text-white border border-white/20 flex items-center justify-center cursor-pointer shadow-md hover:bg-[#133A5C] transition-all"
    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
  >
    {collapsed ? <MdChevronRight size={19} /> : <MdChevronLeft size={19} />}
  </button>
</div>

<NavList collapsed={collapsed} />

        {/* Collapse toggle */}
       

        <UserFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
