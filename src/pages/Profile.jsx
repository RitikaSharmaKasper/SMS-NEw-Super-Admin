import { useState, useEffect } from 'react';
import User from "../assets/images/user.svg";
import Mobile from "../assets/images/mobile.svg";
import Email from "../assets/images/email.svg";
const PROFILE_KEY = 'superadmin_profile';

const defaultProfile = {
  name: 'Super Admin',
  email: 'admin@mun-c.com',
  mobile: '',
};

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return { ...defaultProfile, ...JSON.parse(saved) };
  } catch { /* ignore */ }
  return { ...defaultProfile };
}

function saveProfile(data) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

export default function Profile() {
  const [profile, setProfile] = useState(loadProfile);
  const [name, setName] = useState(profile.name);
  const [mobile, setMobile] = useState(profile.mobile);
  const [email, setEmail] = useState(profile.email);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Sync from localStorage on mount
  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setName(p.name);
    setMobile(p.mobile);
    setEmail(p.email);
  }, []);

  const initials = (name || 'SA')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleReset = () => {
    setName(profile.name);
    setMobile(profile.mobile);
    setEmail(profile.email);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSaved(false);
  };

  const handleSave = () => {
    setError('');
    setSaved(false);

    // Password validation (only if user is trying to change password)
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) { setError('Current password is required'); return; }
      if (!newPassword) { setError('New password is required'); return; }
      if (newPassword.length < 6) { setError('New password must be at least 6 characters'); return; }
      if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    }

    const updated = { name: name.trim() || 'Super Admin', mobile, email };
    saveProfile(updated);
    setProfile(updated);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col h-full gap-4 min-h-0 p-5">
      {/* Page heading — same style as Schools */}
      <div className="flex-shrink-0 mb-2">
        <h1 className="text-[24px] font-[700] font-bold text-[#000000] leading-snug">Profile</h1>
        <p className="text-[16px] text-[#6B7280] font-[400] -mt-[2px] font-sans">Manage your account settings</p>
      </div>

      {/* Profile card */}
    <div className="w-full rounded-[10px] border border-[#00000014] bg-[#FFFFFF] overflow-hidden">
        <div className="px-4 py-4 sm:px-5 sm:py-5">

          {/* Avatar + Name row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-shrink-0">
              <div className="w-[90px] h-[90px] rounded-full bg-[#0DA2E7] text-white flex items-center justify-center text-[28px] font-[700] font-bold select-none">
                {initials}
              </div>
              {/* Camera icon overlay */}
              <button
                type="button"
                className="absolute -bottom-0.5 -right-0.5 w-[30px] h-[30px] rounded-full bg-[#FFFFFF] border-1 border-[#E2E2E2] flex items-center justify-center cursor-pointer"
                title="Change avatar"
              >
                <CameraIcon />
              </button>
            </div>
            <div className="min-w-0">
              <h2 className="text-[18px] font-[700] font-bold text-[#000000] leading-snug truncate">{name || 'Super Admin'}</h2>
              <p className="text-[14px] text-[#6B7280] font-[400] truncate -mt-[2px]">{email || 'admin@mun-c.com'}</p>
            </div>
          </div>

          {/* ── Personal Info Fields ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4 mb-6 pb-5 border-b border-[#E5E7EB] ">
           
            {/* Name */}
            <div>
              <label className="block text-[12px] font-[500] text-[#374151] mb-1 font-segoe">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"> <img 
        src={User}
        alt="User" 
        className="w-5 h-5"
      /></span>
             
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full pl-9 pr-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[8px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-[12px] font-[500] text-[#374151] mb-1 font-segoe">
                Mobile No. <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <img 
        src={Mobile}
        alt="mobile" 
        className="w-5 h-5"
      /></span>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="w-full pl-9 pr-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[10px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div> 
              <label className="block text-[12px] font-[500] text-[#374151] mb-1 font-segoe">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <img 
        src={Email}
        alt="email" 
        className="w-5 h-5"
      /></span>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full pl-9 pr-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[10px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
           
          </div>

          {/* ── Change Password Section ── */}
          <div className="mb-8">
            <h3 className="text-[14px] font-[500] font-medium font-body-m-12-a text-[#1C1C1C] mb-3.5">Change Password</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
              {/* Current Password */}
              <div>
                <label className="block font-segoe text-[12px] font-[500] text-[#1C1C1C] mb-1">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-[12px] border border-[#E5E7EB] rounded-[10px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[12px] font-[500] text-[#1C1C1C] mb-1 font-segoe">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-[12px] border border-[#E5E7EB] rounded-[10px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[12px] font-[500] text-[#1C1C1C] mb-1 font-segoe">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-[14px] border border-[#E5E7EB] rounded-[10px] outline-none bg-[#FFFFFF] text-[#1C1C1C] placeholder-[#9CA3AF] transition-colors "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Error / Success messages */}
          {error && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-red-50 border border-red-200 text-red-600 text-[14px] font-[500]">
              {error}
            </div>
          )}
          {saved && (
            <div className="mb-4 px-3.5 py-2.5 rounded-[8px] bg-green-50 border border-green-200 text-green-600 text-[14px] font-[500]">
              Profile saved successfully!
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-[14px] font-[500] w-[71px] h-[44px] text-[#6B7280] bg-white border border-[#E5E7EB] rounded-[10px] cursor-pointer transition-colors hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex   font-body-m-12-a items-center gap-1.5 px-4 py-2 font-medium  text-[14px] font-[500]  h-[44px] text-white bg-[#2563EB] border-none rounded-[10px] cursor-pointer transition-colors "
            >
              Save Detail <CheckIcon />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG Icons ── */
function CameraIcon() {
  return (
   <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-4 h-4 text-black">
  <path d="M5 2L4 3.5H2a1 1 0 00-1 1V11a1 1 0 001 1h10a1 1 0 001-1V4.5a1 1 0 00-1-1h-2L9 2H5z" stroke="currentColor" strokeWidth="1.2" />
  <circle cx="7" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" />
</svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" className="w-5 h-5">
      <circle cx="8" cy="5" r="3" />
      <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M3.5 1.5h3L8 5 6 6.5c.7 1.5 2 2.8 3.5 3.5L11 8l3.5 1.5v3c0 .6-.4 1-1 1C7 13 1 7 1 2.5c0-.6.4-1 1-1h1.5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4.5L8 9l7-4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.05" className="w-4 h-5">
      <path d="M2.5 7.5l3 3L11.5 4" />
    </svg>
  );
}
