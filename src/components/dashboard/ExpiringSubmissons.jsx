import React from 'react';

// Mock data based on your screenshot
const subscriptions = [
  {
    id: 1,
    school: 'Maple Heights School',
    expires: '2026-04-01',
    status: 'Trial',
  },
  {
    id: 2,
    school: 'Maple Heights School',
    expires: '2026-04-01',
    status: 'Expired',
  },
];

// Helper function to style the status badges
function getStatusBadge(status) {
  switch (status) {
    case 'Trial':
      return 'bg-[#DBEBF4] text-[#2EBBEE]'; // Light Blue background, Blue text
    case 'Expired':
      return 'bg-[#F2E2E4] text-[#EF4343]'; // Light Red background, Red text
    default:
      return 'bg-gray-100 text-gray-500';
  }
}

export default function ExpiringSubmissions() {
  return (
    <div className="card h-full flex flex-col bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header Title */}
      <h2 className="text-[16px] font-semibold text-[#0F1729] mb-4">
        Expiring Subscriptions
      </h2>

      {/* List of Subscriptions */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {subscriptions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#F3F4F6] rounded-[12px] p-4 mt-[9px]"
          >
            {/* Left Side: School Name and Date */}
            <div className="flex flex-col">
              <p className="text-[16px] font-semibold text-[#0F1729]">
                {item.school}
              </p>
              <p className="text-[14px] text-[#6B7280] mt-0">
                Expires: {item.expires}
              </p>
            </div>

            {/* Right Side: Status Pill Badge */}
            <div className="flex-shrink-0 ml-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium ${getStatusBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}