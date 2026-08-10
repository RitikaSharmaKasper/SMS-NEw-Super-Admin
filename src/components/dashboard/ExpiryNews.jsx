import React from 'react';
import { MdWarningAmber, MdInfo, MdError } from 'react-icons/md';
const fallbackColors = [
  'bg-[#21C45D]', // Green
  'bg-[#0DA2E7]', // Blue
  'bg-[#EF4343]', // Red
  'bg-[#F59F0A]', // Amber
];
const news = [
  {
    id: 1,

    iconBg: 'bg-[#21C45D]',
  
    title: 'Subscription expiring for Green Valley School',
    desc: 'Expires in 3 days. Action required.',
    time: '2 hrs ago',
    dot: 'bg-[#21C45D]',
  },
  {
    id: 2,
  
    iconBg: 'bg-[#0DA2E7]',
  
    title: 'Blue Ridge Academy plan renewal pending',
    desc: 'Payment overdue by 5 days.',
    time: '5 hrs ago',
    dot: 'bg-[#0DA2E7]',
  },
  {
    id: 3,
  
    iconBg: 'bg-[#EF4343]',
  
    title: 'Hillside School upgraded to Premium',
    desc: 'Upgrade successful, new features unlocked.',
    time: '1 day ago',
    dot: 'bg-[#EF4343]',
  },
  {
    id: 4,
   
    iconBg: 'bg-[#F59F0A]',
  
    title: 'Maple Grove Institute trial ending',
    desc: 'Trial period ends in 7 days.',
    time: '2 days ago',
    dot: 'bg-[#F59F0A]',
  },
  {
    id: 5,
  
    iconBg: 'bg-[#F59F0A]',
  
    title: 'Cedar Park school subscription lapsed',
    desc: 'Access has been restricted.',
    time: '3 days ago',
    dot: 'bg-[#F59F0A]',
  },
];

export default function ExpiryNews() {
  return (
    <div className="card h-[410px] flex flex-col ">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Activity Feed</h2>
       
        </div>
  
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pr-0.5 scrollbar-thin">
        {news.map((item) => 
        { 
          return ( // <--- SIRF YAHAN CHANGE KIYA HAI (return aur ( ko ek line par kar diya)
            <div key={item.id} className="flex gap-3 p-1 rounded-lg  transition-colors cursor-pointer">
              <div className={`w-3 h-3 rounded-full ${item.iconBg}  flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-normal font-[400] text-[#0F1729] leading-snug">{item.title}</p>
                <div className="flex items-center gap-1.5 mt-0">
                  <span className="text-[14px] text-[#6B7280]">{item.time}</span>
                </div>
              </div>
            </div>
          ) // <--- closing bracket yahan hai
        })}
      </div>
    </div>
  );
}