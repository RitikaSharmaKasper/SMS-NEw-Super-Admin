import React from 'react';
import { MdWarningAmber, MdInfo, MdError } from 'react-icons/md';

const news = [
  {
    id: 1,
    icon: <MdError size={15} />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'Subscription expiring for Green Valley School',
    desc: 'Expires in 3 days. Action required.',
    time: '2 hrs ago',
    dot: 'bg-red-500',
  },
  {
    id: 2,
    icon: <MdWarningAmber size={15} />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    title: 'Blue Ridge Academy plan renewal pending',
    desc: 'Payment overdue by 5 days.',
    time: '5 hrs ago',
    dot: 'bg-orange-500',
  },
  {
    id: 3,
    icon: <MdInfo size={15} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    title: 'Hillside School upgraded to Premium',
    desc: 'Upgrade successful, new features unlocked.',
    time: '1 day ago',
    dot: 'bg-blue-500',
  },
  {
    id: 4,
    icon: <MdWarningAmber size={15} />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title: 'Maple Grove Institute trial ending',
    desc: 'Trial period ends in 7 days.',
    time: '2 days ago',
    dot: 'bg-yellow-500',
  },
  {
    id: 5,
    icon: <MdError size={15} />,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    title: 'Cedar Park school subscription lapsed',
    desc: 'Access has been restricted.',
    time: '3 days ago',
    dot: 'bg-red-400',
  },
];

export default function ExpiryNews() {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="section-title">Expiry News</h2>
          <p className="section-sub mt-0.5">Recent expiry alerts</p>
        </div>
        <button className="text-[11px] text-indigo-600 font-semibold hover:underline">View all</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5 scrollbar-thin">
        {news.map((item) => (
          <div key={item.id} className="flex gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-800 leading-snug">{item.title}</p>
              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                <span className="text-[10px] text-gray-400">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
